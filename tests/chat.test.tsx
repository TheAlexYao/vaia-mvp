import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Chat from '../src/pages/chat'

// Mock fetch globally
global.fetch = jest.fn()

describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle phrase translation requests', async () => {
    // Mock successful phrase response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        aiText: "Here's how to say hello in Thai:",
        phraseObj: {
          phrase: {
            original: "สวัสดี",
            romanized: "sawadee",
            meaning: "hello/goodbye (formal)"
          },
          locale: "th-TH",
          culturalTip: "Used throughout the day"
        },
        threadId: "thread_123"
      })
    })

    render(<Chat />)
    
    // Type and send message
    const input = screen.getByPlaceholderText(/type a message/i)
    fireEvent.change(input, { target: { value: "How do you say hello in Thai?" }})
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    // Verify response rendering
    await waitFor(() => {
      expect(screen.getByText("Here's how to say hello in Thai:")).toBeInTheDocument()
      expect(screen.getByText("สวัสดี")).toBeInTheDocument()
      expect(screen.getByText("sawadee")).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    })
  })

  it('should handle non-phrase requests', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        aiText: "Bangkok's weather is tropical year-round.",
        phraseObj: null,
        threadId: "thread_123"
      })
    })

    render(<Chat />)
    
    fireEvent.change(screen.getByPlaceholderText(/type a message/i), {
      target: { value: "What's the weather like in Bangkok?" }
    })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText("Bangkok's weather is tropical year-round.")).toBeInTheDocument()
      // Play button should not be present for non-phrase responses
      expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
    })
  })
}) 