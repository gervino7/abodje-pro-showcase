import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis l'assistant personnel de Konan Abodje Inde Gervais. Comment puis-je vous aider à en savoir plus sur son profil professionnel ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-anthropic', {
        body: { message: input }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-6 z-50 w-16 h-16 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-110 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        style={{
          background: 'var(--gradient-chat)',
          boxShadow: 'var(--shadow-glow), var(--shadow-chat)',
        }}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 z-50 w-80 h-[420px] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Card className="h-full backdrop-blur-xl border-0 overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: 'var(--shadow-chat)',
        }}>
          <CardHeader className="pb-3 rounded-t-lg relative overflow-hidden" style={{
            background: 'var(--gradient-chat)',
          }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white drop-shadow-sm" />
                </div>
                <CardTitle className="text-base text-white font-semibold drop-shadow-sm">
                  ✨ Assistant Konan
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        message.sender === 'user'
                          ? 'text-white'
                          : 'text-white'
                      }`}
                      style={{
                        background: message.sender === 'user' 
                          ? 'var(--gradient-button)'
                          : 'var(--gradient-accent)',
                        boxShadow: message.sender === 'user'
                          ? 'var(--shadow-elegant)'
                          : 'var(--shadow-purple)'
                      }}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[280px] p-4 rounded-xl text-sm shadow-md backdrop-blur-sm ${
                        message.sender === 'user'
                          ? 'ml-auto text-white'
                          : 'text-slate-700'
                      }`}
                      style={{
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, rgba(0, 191, 255, 0.9) 0%, rgba(179, 71, 217, 0.9) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                        border: message.sender === 'user' 
                          ? 'none'
                          : '1px solid rgba(0, 191, 255, 0.2)'
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div 
                      className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-lg"
                      style={{
                        background: 'var(--gradient-accent)',
                        boxShadow: 'var(--shadow-purple)'
                      }}
                    >
                      <Bot className="h-4 w-4" />
                    </div>
                    <div 
                      className="p-4 rounded-xl text-sm shadow-md backdrop-blur-sm text-slate-700"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                        border: '1px solid rgba(0, 191, 255, 0.2)'
                      }}
                    >
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ 
                          background: 'var(--gradient-chat)',
                          animationDelay: '0s' 
                        }} />
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ 
                          background: 'var(--gradient-chat)',
                          animationDelay: '0.1s' 
                        }} />
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ 
                          background: 'var(--gradient-chat)',
                          animationDelay: '0.2s' 
                        }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gradient-to-r from-cyan-200/30 to-purple-200/30 bg-gradient-to-r from-white/50 to-slate-50/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="✨ Posez votre question magique..."
                  disabled={isLoading}
                  className="flex-1 border-0 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-all duration-300 placeholder:text-slate-400"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 191, 255, 0.1)'
                  }}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--gradient-button)',
                    boxShadow: 'var(--shadow-elegant)'
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};