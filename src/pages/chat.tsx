import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Camera, Play, Send, Globe } from 'lucide-react';
import { Card } from "../components/ui/card"
import { Button } from '../components/ui/button';
// @ts-ignore
import { ScrollArea } from '../components/ui/scroll-area';
import { OnboardingModal } from '../components/OnboardingModal';
import { azureVoiceMap } from '../lib/azureVoiceMap';
import { CityModal } from '../components/CityModal';
import { addToHistory, toggleFavorite } from '../lib/historyStore';
import { HistoryView } from '../components/HistoryView';

interface Message {
  id: string;
  sender: 'user' | 'vai';
  content: string;
  image?: string;
  phrase?: {
    original: string;
    romanized: string;
    meaning: string;
    audioUrl?: string;
    saved?: boolean;
  };
  phraseObj?: {
    phrase: {
      original: string;
      romanized: string;
      meaning: string;
    };
    locale: string;
    culturalTip: string;
  };
  locale?: string;
  actions?: {
    label: string;
    icon?: string;
    action: () => void;
    primary?: boolean;
  }[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('vaiaMessages');
    return saved ? JSON.parse(saved) : [{
      id: '1',
      sender: 'vai',
      content: 'Hey I\'m Vai! I can help you learn phrases and learn about cultures around the world. Share a photo of a menu or ask me about any phrase!',
    }];
  });
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [threadId, setThreadId] = useState<string | null>(
    typeof window !== 'undefined' 
      ? localStorage.getItem('vaiaThreadId') 
      : null
  );

  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showCityModal, setShowCityModal] = useState(false);

  const [langCode, setLangCode] = useState<string>('th-TH');
  const [city, setCity] = useState<string>('Bangkok');

  const [showHistory, setShowHistory] = useState(false);

  // Add assistantId state
  const [assistantId, setAssistantId] = useState<string | null>(
    typeof window !== 'undefined' 
      ? localStorage.getItem('vaiaAssistantId') 
      : null
  );

  // Add effect to save messages
  useEffect(() => {
    localStorage.setItem('vaiaMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const savedLang = localStorage.getItem('vaiaLangCode');
    const savedCity = localStorage.getItem('vaiaCity');
    
    if (savedLang) {
      setLangCode(savedLang);
      setCity(savedCity || 'Bangkok');
      setShowOnboarding(false);
      
      fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: '[SYSTEM] Initializing with saved settings',
          threadId,
          langCode: savedLang,
          city: savedCity || 'Bangkok',
          assistantId
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.assistantId && !assistantId) {
          setAssistantId(data.assistantId);
          localStorage.setItem('vaiaAssistantId', data.assistantId);
        }
      })
      .catch(error => console.error('Failed to initialize assistant:', error));
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // @ts-ignore
  const QuickAction = ({ label, action, primary = false, icon }: Partial<Message['actions'][0]> & { action: () => void }) => (
    <Button
      variant={primary ? "default" : "outline"}
      size="sm"
      onClick={action}
      className={`
        h-8 px-4 rounded-full text-sm font-medium
        ${primary ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 
        'border-indigo-200 text-indigo-700 hover:bg-indigo-50'}
      `}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </Button>
  );

  const Message = ({ message }: { message: Message }) => {
    const isVai = message.sender === 'vai';
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const playTTS = async (text: string, locale: string) => {
      try {
        setIsPlaying(true);
        console.log('TTS request:', { text, locale }); // Debug log
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            language: locale, // Don't lowercase, preserve BCP-47 format
            gender: 'Female'
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`TTS failed: ${response.status} - ${errorText}`);
        }
        
        const { audioBase64, contentType } = await response.json();
        if (!audioBase64) {
          throw new Error('No audio data received');
        }

        const binaryString = window.atob(audioBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const blob = new Blob([bytes], { type: contentType });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(url);
        };
        
        await audio.play();
      } catch (error) {
        console.error('TTS error:', error);
        setIsPlaying(false);
      }
    };

    const TTSButton = ({ text, locale }: { text: string, locale: string }) => (
      <Button 
        variant="ghost" 
        size="sm"
        className={`ml-2 rounded-full ${
          isVai ? 'text-white hover:bg-white/10' : 'text-indigo-700 hover:bg-indigo-50'
        }`}
        onClick={() => playTTS(text, message.locale || locale)}
        disabled={isPlaying}
      >
        {isPlaying ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
    );

    const handleFavorite = () => {
      const updated = toggleFavorite(message.id);
      if (updated) {
        setIsFavorite(updated.isFavorite);
      }
    };

    const cleanText = (text: string | undefined | null, hasPhrase: boolean = false) => {
      if (!text) return '';
      
      // First remove markdown formatting
      text = text
        .replace(/\*\*/g, '')  // Remove bold
        .replace(/\*/g, '')    // Remove italic
        .replace(/_/g, '')     // Remove underline
        .replace(/`/g, '')     // Remove code ticks
        .trim();

      if (!hasPhrase) return text;
      
      // Then remove redundant phrase sections if structured
      return text
        .replace(/(?:In[^:]*):.*(?:\r?\n|\r|$)/g, '')
        .replace(/(?:Romanized|Pronunciation|Transliteration):\s*[^\n]+\n?/g, '')
        .replace(/(?:Meaning|Translation|Literally|English):\s*[^\n]+\n?/g, '')
        .replace(/\n{2,}/g, '\n')
        .trim();
    };

    const content = cleanText(message.content, !!message.phrase);
    const phrase = message.phrase ? {
      ...message.phrase,
      original: cleanText(message.phrase.original),
      meaning: cleanText(message.phrase.meaning),
      romanized: message.phrase.romanized ? cleanText(message.phrase.romanized) : undefined
    } : undefined;

    return (
      <div className={`flex ${isVai ? 'justify-start' : 'justify-end'} mb-2`}>
        {isVai && (
          <div className="flex items-start gap-2">
            <img 
              src="/vai-avatar.png"
              alt="Vai"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <button
              onClick={handleFavorite}
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        )}
        <div className={`max-w-[80%] ${isVai ? 'mr-12' : 'ml-12'}`}>
          <Card className={`${
            isVai 
              ? 'bg-gradient-to-br from-indigo-600 to-purple-500 text-white shadow-lg' 
              : 'bg-white border-indigo-100 shadow'
          } p-5 rounded-2xl ${isVai ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
            {message.image && (
              <div className="mb-3">
                <img 
                  src={message.image} 
                  alt="Shared content"
                  className="rounded-xl max-w-full h-auto border border-white/10"
                />
              </div>
            )}

            {(!message.phrase || message.content !== message.phrase.meaning) && (
              <div className="flex items-center justify-between mb-4">
                <p className={`text-sm ${!isVai && 'text-gray-700'}`}>
                  {content}
                </p>
                {isVai && message.locale && !message.phrase && (
                  <TTSButton text={content} locale={message.locale} />
                )}
              </div>
            )}

            {message.phrase && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{phrase?.original}</p>
                    {phrase?.romanized && <p className="text-sm opacity-90 mt-1">{phrase.romanized}</p>}
                    {phrase?.meaning && <p className="text-sm opacity-80 mt-1">{phrase.meaning}</p>}
                  </div>
                  {message.locale && phrase?.original && (
                    <TTSButton text={phrase.original} locale={message.locale} />
                  )}
                </div>
                {message.phraseObj?.culturalTip && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-sm opacity-80">
                      <span className="mr-2">💡</span>
                      {message.phraseObj.culturalTip}
                    </p>
                  </div>
                )}
              </div>
            )}

            {(message.actions?.length ?? 0) > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap pt-2 border-t border-white/10">
                {message.actions!.map((action, i) => (
                  <QuickAction key={i} {...action} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const StatusBar = () => {
    const handleCityChange = async (newCity: string) => {
      try {
        setCity(newCity);
        localStorage.setItem('vaiaCity', newCity);
        
        // Update assistant with new city
        const response = await fetch('/api/ask-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userMessage: `[SYSTEM] Switching to ${newCity}`,
            threadId,
            langCode,
            city: newCity,
            assistantId
          })
        });
        
        const data = await response.json();
        console.log('API response:', data); // Debug log
        if (data.assistantId && !assistantId) {
          setAssistantId(data.assistantId);
          localStorage.setItem('vaiaAssistantId', data.assistantId);
        }

        setShowCityModal(false);
      } catch (error) {
        console.error('Failed to update city:', error);
      }
    };

    return (
      <>
        <div className="py-2 px-4 bg-white border-b">
          <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-indigo-700">
              <Globe className="w-4 h-4" />
              <button 
                onClick={() => setShowOnboarding(true)} 
                className="hover:text-indigo-800 flex items-center gap-2"
              >
                <span>{azureVoiceMap[langCode]?.displayName || 'Select Language'}</span>
                <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded-full">Change</span>
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setShowCityModal(true)}
                className="hover:text-indigo-800 flex items-center gap-2"
              >
                <span className="text-gray-600">{city || 'Select City'}</span>
                <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded-full">Change</span>
              </button>
            </div>
          </div>
        </div>
        {showCityModal && (
          <CityModal 
            onComplete={handleCityChange}
            onClose={() => setShowCityModal(false)}
          />
        )}
      </>
    );
  };

  const handleSend = async (message: string) => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      const messageId = Date.now().toString() + Math.random().toString(36).slice(2);
      
      // Check for duplicate messages
      if (messages.some(m => 
        m.sender === 'user' && 
        m.content === message && 
        Date.now() - parseInt(m.id) < 2000
      )) {
        return;
      }
      
      setMessages(prev => [...prev, {
        id: messageId,
        sender: 'user',
        content: message
      }]);

      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: message,
          threadId,
          langCode,
          city,
          assistantId
        })
      });

      const data = await response.json();
      console.log('API response:', data);

      if (data.threadId) {
        setThreadId(data.threadId);
        localStorage.setItem('vaiaThreadId', data.threadId);
      }

      if (data.phraseObj?.phrase) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'vai',
          content: data.aiText,
          phrase: data.phraseObj.phrase,
          phraseObj: data.phraseObj,
          locale: data.phraseObj.locale
        }]);

        addToHistory(data.aiText, {
          original: data.phraseObj.phrase.original,
          romanized: data.phraseObj.phrase.romanized,
          meaning: data.phraseObj.phrase.meaning,
          locale: data.phraseObj.locale,
          culturalTip: data.phraseObj.culturalTip
        });
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'vai',
          content: data.aiText
        }]);
      }

      setInput('');

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        sender: 'vai',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isProcessing) return;

    try {
      setIsProcessing(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'user',
          content: '',
          image: reader.result as string
        }]);

        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            sender: 'vai',
            content: "yo this is interesting! notice how they use these specific kanji patterns? this is a traditional menu format. here's what it says:",
            phrase: {
              original: "特選マグロ",
              romanized: "tokusen maguro",
              meaning: "premium tuna (特選 means specially selected)",
              audioUrl: "/temp.mp3"
            },
            actions: [
              { 
                label: "Read Full Menu",
                action: () => console.log("Read"),
                primary: true
              },
              {
                label: "Save Phrase",
                action: () => console.log("Save"),
              },
              {
                label: "Learn More",
                action: () => console.log("Learn"),
              }
            ]
          }]);
          setIsProcessing(false);
        }, 1500);
      };
      reader.readAsDataURL(file);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: reader.result as string,
          locale: langCode,
          city,
          assistantId,
          threadId
        })
      });

      if (!response.ok) {
        throw new Error('Image analysis failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'vai',
        content: data.text || "I've analyzed the image.",
        locale: langCode,
        ...(data.phrase && {
          phrase: data.phrase
        })
      }]);

    } catch (error) {
      console.error('Image upload error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'vai',
        content: "Sorry, I had trouble analyzing that image."
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageSelect = async ({ langCode, city }: { langCode: string; city: string }) => {
    try {
      setLangCode(langCode);
      setCity(city);
      localStorage.setItem('vaiaLangCode', langCode);
      localStorage.setItem('vaiaCity', city);
      
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: `[SYSTEM] Switching to ${langCode} for ${city}`,
          threadId,
          langCode,
          city,
          assistantId
        })
      });
      
      const data = await response.json();
      console.log('API response:', data); // Debug log
      if (data.assistantId && !assistantId) {
        setAssistantId(data.assistantId);
        localStorage.setItem('vaiaAssistantId', data.assistantId);
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'vai',
        content: `I've switched to ${azureVoiceMap[langCode]?.displayName || 'the new language'} mode! How can I help you?`
      }]);
      
      setShowOnboarding(false);
    } catch (error) {
      console.error('Failed to update assistant:', error);
    }
  };

  useEffect(() => {
    console.log('Thread ID changed:', threadId);
    if (threadId) {
      localStorage.setItem('vaiaThreadId', threadId);
    }
  }, [threadId]);

  if (showOnboarding) {
    return <OnboardingModal onComplete={handleLanguageSelect} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="p-4 bg-white border-b">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vai-avatar.png" alt="Vai" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <h1 className="font-medium text-indigo-700">vai</h1>
              <p className="text-xs text-purple-600">ai language companion</p>
            </div>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            {showHistory ? 'Back to Chat' : 'View History'}
          </button>
        </div>
      </div>

      <StatusBar />

      <div className="flex-1 p-4 overflow-auto" ref={scrollRef}>
        {showHistory ? (
          <HistoryView />
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex gap-1 ml-10">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700/20 border border-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          />

          {input ? (
            <Button 
              disabled={isProcessing || !input.trim()} 
              onClick={() => handleSend(input)}
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          ) : (
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <Button 
                size="icon"
                className="rounded-full bg-gradient-to-r from-indigo-700 to-purple-600 hover:opacity-90"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;