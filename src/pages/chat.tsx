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

interface Phrase {
  original: string;
  romanized: string;
  meaning: string;
  audioUrl?: string;
  saved?: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'vai';
  content: string;
  image?: string;
  phrase?: Phrase;
  actions?: {
    label: string;
    icon?: string;
    action: () => void;
    primary?: boolean;
  }[];
  language?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    sender: 'vai',
    content: 'Hey I\'m Vai! I can help you learn phrases and learn about cultures around the world. Share a photo of a menuor ask me about any phrase!',
  }]);
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  // @ts-ignore
  const [currentLanguage, setCurrentLanguage] = useState('Japanese');
  // @ts-ignore
  const [currentLocation, setCurrentLocation] = useState('Tokyo, Japan');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [threadId, setThreadId] = useState<string | null>(
    typeof window !== 'undefined' 
      ? localStorage.getItem('vaiaThreadId') 
      : null
  );

  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentLangCode, setCurrentLangCode] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('vaiaLangCode');
    const savedCity = localStorage.getItem('vaiaCity');
    if (savedLang) {
      setCurrentLangCode(savedLang);
      setCurrentLocation(savedCity || '');
      setShowOnboarding(false);
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

    const playTTS = async (text: string, language: string) => {
      try {
        setIsPlaying(true);
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, language })
        });
        
        if (!response.ok) {
          throw new Error(`TTS failed: ${response.status}`);
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

    const TTSButton = ({ text, language }: { text: string, language: string }) => (
      <Button 
        variant="ghost" 
        size="sm"
        className={`ml-2 rounded-full ${
          isVai ? 'text-white hover:bg-white/10' : 'text-indigo-700 hover:bg-indigo-50'
        }`}
        onClick={() => playTTS(text, language)}
        disabled={isPlaying}
      >
        {isPlaying ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
    );

    return (
      <div className={`flex ${isVai ? 'justify-start' : 'justify-end'} mb-2`}>
        {isVai && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 mr-2 flex-shrink-0" />
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
              <div className="flex items-center justify-between">
                <p className={`text-sm ${!isVai && 'text-gray-700'}`}>
                  {message.content}
                </p>
                {isVai && message.language && !message.phrase && (
                  <TTSButton text={message.content} language={message.language} />
                )}
              </div>
            )}

            {message.phrase && (
              <div className={`${message.content !== message.phrase.meaning ? 'mt-4' : ''} space-y-1.5`}>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg leading-tight">{message.phrase.original}</p>
                  {message.language && (
                    <TTSButton text={message.phrase.original} language={message.language} />
                  )}
                </div>
                <p className="text-sm opacity-90">{message.phrase.romanized}</p>
                <p className="text-sm opacity-80">{message.phrase.meaning}</p>
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
    const handleCityChange = (newCity: string) => {
      localStorage.setItem('vaiaCity', newCity);
      setCurrentLocation(newCity);
      setShowCityModal(false);
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
                <span>{currentLangCode ? azureVoiceMap[currentLangCode]?.displayName : 'Select Language'}</span>
                <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded-full">Change</span>
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setShowCityModal(true)}
                className="hover:text-indigo-800 flex items-center gap-2"
              >
                <span className="text-gray-600">{currentLocation || 'Select City'}</span>
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

  const cleanAIText = (text: string, hasPhrase: boolean) => {
    if (!hasPhrase) return text;
    return text
      .replace(/(?:In|In Thai|In Japanese|In Korean):\s*[^\n]+\n?/g, '')
      .replace(/(?:Romanized|Pronunciation):\s*[^\n]+\n?/g, '')
      .replace(/(?:Meaning|Translation|Literally):\s*[^\n]+\n?/g, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
  };

  const handleSend = async (userMessage: string) => {
    setIsProcessing(true);
    setInput('');
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: userMessage
    };
    
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userMessage, 
          threadId,
          langCode: currentLangCode,
          city: currentLocation 
        })
      });

      const { aiText, phraseObj, threadId: newThreadId } = await response.json();

      if (newThreadId && !threadId) {
        setThreadId(newThreadId);
        localStorage.setItem('vaiaThreadId', newThreadId);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'vai',
        content: cleanAIText(
          aiText
            .replace(/\*\*/g, '')
            .replace(/_/g, '')
            .replace(/`/g, '')
            .trim(),
          !!phraseObj
        ),
        ...(phraseObj && {
          phrase: {
            original: phraseObj.phrase.original,
            romanized: phraseObj.phrase.romanized,
            meaning: phraseObj.phrase.meaning
          },
          language: phraseObj.languageCode
        }),
        actions: [
          { 
            label: "Practice Now",
            action: () => console.log("Practice"),
            primary: true,
          }
        ]
      }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'vai',
        content: "Sorry, I had trouble processing that request."
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isProcessing) return;

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
  };

  const handleLanguageSelect = ({ langCode, city }: { langCode: string; city: string }) => {
    localStorage.setItem('vaiaLangCode', langCode);
    localStorage.setItem('vaiaCity', city);
    setCurrentLangCode(langCode);
    setCurrentLocation(city);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingModal onComplete={handleLanguageSelect} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="p-4 bg-white border-b">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700 to-purple-600" />
          <div>
            <h1 className="font-medium text-indigo-700">vai</h1>
            <p className="text-xs text-purple-600">ai language companion</p>
          </div>
        </div>
      </div>

      <StatusBar />

      <div className="flex-1 p-4 overflow-auto" ref={scrollRef}>
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
              size="icon"
              className="rounded-full bg-indigo-700 hover:bg-indigo-800"
              onClick={() => handleSend(input)}
              disabled={isProcessing}
            >
              <Send className="w-4 h-4" />
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