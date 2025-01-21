import { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';

export const TTSButton = ({ text, locale, variant = 'default' }: { 
  text: string, 
  locale: string,
  variant?: 'default' | 'light'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTTS = async () => {
    try {
      setIsPlaying(true);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: locale, gender: 'Female' })
      });
      
      const { audioBase64, contentType } = await response.json();
      const audio = new Audio(`data:${contentType};base64,${audioBase64}`);
      audio.onended = () => setIsPlaying(false);
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlaying(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm"
      className={`ml-2 ${variant === 'light' ? 'text-white hover:bg-white/10' : 'text-indigo-700 hover:bg-indigo-50'}`}
      onClick={playTTS}
      disabled={isPlaying}
    >
      {isPlaying ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </Button>
  );
}; 