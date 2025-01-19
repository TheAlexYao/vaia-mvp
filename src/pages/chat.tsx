import { useState, useRef, useEffect } from 'react';
import { Camera, Play, Send, Globe } from 'lucide-react';
import { Card } from "../components/ui/card"
import { Button } from '../components/ui/button';
// @ts-ignore
import { ScrollArea } from '../components/ui/scroll-area';

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
    // @ts-ignore
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div className={`flex ${isVai ? 'justify-start' : 'justify-end'} mb-4`}>
        {isVai && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700 to-purple-600 mr-2 flex-shrink-0" />
        )}
        <div className={`max-w-[80%] ${isVai ? 'mr-12' : 'ml-12'}`}>
          <Card className={`${
            isVai 
              ? 'bg-gradient-to-br from-indigo-700 to-purple-600 text-white shadow-lg' 
              : 'bg-white border-indigo-100 shadow'
          } p-4 rounded-2xl ${isVai ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
            {message.image && (
              <div className="mb-3">
                <img 
                  src={message.image} 
                  alt="Shared content"
                  className="rounded-xl max-w-full h-auto border border-white/10"
                />
              </div>
            )}

            <p className={`text-sm ${!isVai && 'text-gray-700'}`}>{message.content}</p>

            {message.phrase && (
              <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">{message.phrase.original}</p>
                  {message.phrase.audioUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`rounded-full ${isVai ? 'text-white hover:bg-white/10' : 'text-indigo-700 hover:bg-indigo-50'}`}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-sm opacity-90">{message.phrase.romanized}</p>
                <p className="text-sm opacity-80">{message.phrase.meaning}</p>
              </div>
            )}

            {message.actions && message.actions.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap pt-2 border-t border-white/10">
                {message.actions.map((action, i) => (
                  <QuickAction key={i} {...action} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const StatusBar = () => (
    <div className="py-2 px-4 bg-white border-b">
      <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-indigo-700">
          <Globe className="w-4 h-4" />
          <span>{currentLanguage}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">{currentLocation}</span>
        </div>
      </div>
    </div>
  );

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);

    // Add user message immediately
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      content: input
    }]);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: input })
      });

      if (!response.ok) throw new Error('AI request failed');
      
      const { aiResponse } = await response.json();

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'vai',
        content: aiResponse,
        // Keep your existing action structure if needed
        actions: [
          { 
            label: "Practice Now",
            action: () => console.log("Practice"),
            primary: true,
          },
          // ... other actions
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
      setInput('');
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
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />

          {input ? (
            <Button 
              size="icon"
              className="rounded-full bg-indigo-700 hover:bg-indigo-800"
              onClick={handleSend}
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