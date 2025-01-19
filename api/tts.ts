import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { azureVoiceMap } from '../src/lib/azureVoiceMap'

// Validate required environment variables
const AZURE_TTS_KEY = process.env.AZURE_TTS_KEY
const AZURE_TTS_REGION = process.env.AZURE_TTS_REGION

if (!AZURE_TTS_KEY || !AZURE_TTS_REGION) {
  throw new Error('Missing Azure TTS configuration')
}

// Helper to convert audio buffer to base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return Buffer.from(binary, 'binary').toString('base64')
}

interface SynthesisError {
  error: Error;
  result?: sdk.SpeechSynthesisResult;
}

// Replace the existing voiceMap with a function that gets the first voice for a language
const getVoiceForLanguage = (language: string): string => {
  const voices = azureVoiceMap[language]?.voices
  if (!voices?.length) {
    throw new Error(`No voice found for language: ${language}`)
  }
  return voices[0].name
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text, language } = req.body

  // Validate request body
  if (!text?.trim()) {
    return res.status(400).json({ error: 'Missing text parameter' })
  }
  if (!language?.match(/^[a-z]{2}-[A-Z]{2}$/)) {
    return res.status(400).json({ error: 'Invalid language code format' })
  }

  try {
    // Type assertion since we validated AZURE_TTS_KEY above
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      AZURE_TTS_KEY as string,
      AZURE_TTS_REGION as string
    )
    speechConfig.speechSynthesisOutputFormat = 
      sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3

    // Update where voiceMap was used
    speechConfig.speechSynthesisVoiceName = getVoiceForLanguage(language)

    return new Promise<void>((resolve, reject) => {
      // Create synthesizer
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig)

      // Handle synthesis completion
      synthesizer.synthesisCompleted = (
        _: unknown, 
        e: sdk.SpeechSynthesisEventArgs
      ) => {
        const audioBase64 = arrayBufferToBase64(e.result.audioData)
        res.status(200).json({ 
          success: true,
          audioBase64,
          contentType: 'audio/mp3'
        })
        resolve()
      }

      // Handle synthesis errors using the proper event
      synthesizer.SynthesisCanceled = (
        _: unknown, 
        e: sdk.SpeechSynthesisEventArgs
      ) => {
        if (e.result.reason === sdk.ResultReason.Canceled) {
          reject(new Error(`Synthesis failed: ${e.result.errorDetails}`))
        }
      }

      // Start synthesis
      synthesizer.speakTextAsync(
        text,
        result => {
          synthesizer.close()
          if (result) {
            resolve()
          }
        },
        error => {
          synthesizer.close()
          reject(error)
        }
      )
    })

  } catch (error) {
    console.error('TTS Error:', error)
    return res.status(500).json({ 
      error: 'Failed to generate speech' 
    })
  }
} 