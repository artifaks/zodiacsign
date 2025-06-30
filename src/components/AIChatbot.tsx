"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Luna, your cosmic AI assistant. I can help you with astrology, lunar phases, birth charts, and spiritual topics. What would you like to know? 🌙✨",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response with cosmic knowledge
    const responses = {
      'birth chart': "A birth chart, also known as a natal chart, is a snapshot of the sky at the exact moment you were born. It shows the positions of the Sun, Moon, and planets in the zodiac signs and houses. This cosmic blueprint reveals your personality traits, strengths, challenges, and life path. Would you like to learn how to calculate your birth chart? 🌟",
      
      'lunar phases': "The lunar phases represent the Moon's journey through its 29.5-day cycle. Each phase has unique energy: New Moon (new beginnings), Waxing Crescent (intention setting), First Quarter (action), Waxing Gibbous (refinement), Full Moon (culmination), Waning Gibbous (gratitude), Last Quarter (release), and Waning Crescent (rest). Which phase interests you most? 🌙",
      
      'zodiac signs': "The 12 zodiac signs are divided into four elements: Fire (Aries, Leo, Sagittarius) - passionate and dynamic; Earth (Taurus, Virgo, Capricorn) - practical and grounded; Air (Gemini, Libra, Aquarius) - intellectual and social; Water (Cancer, Scorpio, Pisces) - emotional and intuitive. Each sign has unique traits and ruling planets. What's your sign? ✨",
      
      'mercury retrograde': "Mercury retrograde occurs when Mercury appears to move backward in the sky. This period (usually 3-4 times per year) is associated with communication mishaps, technology glitches, and travel delays. It's actually a great time for reflection, review, and revisiting old projects. The key is to slow down and double-check everything! 🔄",
      
      'crystals': "Crystals are powerful tools for energy work and spiritual healing. Each crystal has unique properties: Amethyst (spiritual protection), Rose Quartz (love and healing), Clear Quartz (amplification), Black Tourmaline (grounding), and Citrine (abundance). They work by interacting with your energy field and chakras. Which crystal calls to you? 💎",
      
      'meditation': "Meditation is a powerful practice for connecting with your inner wisdom and the cosmic energies. Try this simple technique: Find a quiet space, sit comfortably, close your eyes, and focus on your breath. As thoughts arise, gently return to your breath. Start with 5-10 minutes daily and gradually increase. The key is consistency! 🧘‍♀️",
      
      'rituals': "Rituals are sacred practices that help us align with cosmic energies and set intentions. They can be as simple as lighting a candle, saying affirmations, or creating an altar. The most important part is your intention and presence. Rituals help us create sacred space and connect with something greater than ourselves. ��",
      
      'astrology': "Astrology is the ancient study of how celestial bodies influence human behavior and events. It's based on the principle 'as above, so below' - the macrocosm reflects the microcosm. While not predictive, astrology offers insights into personality, relationships, timing, and life patterns. It's a tool for self-awareness and growth! 🌌",
      
      'moon sign': "Your Moon sign represents your emotional nature, inner self, and what makes you feel secure. While your Sun sign shows your core identity, your Moon sign reveals your emotional responses and subconscious patterns. To find your Moon sign, you need your exact birth time and location. It's often called your 'emotional compass'! 🌙",
      
      'sun sign': "Your Sun sign represents your core identity, ego, and the essence of who you are. It's determined by the position of the Sun at your birth and shows your basic personality traits, strengths, and life purpose. The Sun sign is often what people refer to when they ask 'What's your sign?' It's your cosmic fingerprint! ☀️"
    };

    // Check for keywords in the user message
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses for general questions
    const defaultResponses = [
      "That's a fascinating question about the cosmos! While I can't provide specific predictions, I can share insights about how celestial energies might influence different aspects of life. What specific area interests you most? 🌟",
      
      "The universe is full of mysteries and wisdom! I'd love to help you explore this topic. Could you tell me more about what you're looking to understand? Whether it's about astrology, crystals, meditation, or spiritual practices, I'm here to guide you! ✨",
      
      "What an interesting cosmic inquiry! The stars and planets have much to teach us about ourselves and the world around us. Let me know if you'd like to learn about birth charts, lunar phases, zodiac signs, or any other spiritual topics! 🌙",
      
      "The cosmos speaks to each of us in unique ways! I'd be happy to share insights about astrology, energy work, or spiritual practices. What resonates with you most right now? 🔮",
      
      "There's so much wisdom in the stars and ancient practices! Whether you're curious about astrology, crystals, meditation, or rituals, I can help guide you on your spiritual journey. What calls to your soul? 💫"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = await generateAIResponse(userMessage.text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to the cosmic energies right now. Please try again in a moment! 🌙",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#FFD700] to-[#FFED4E] text-[#191970] p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-[#232946] rounded-lg shadow-2xl border border-[#FFD700]/20 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFED4E] text-[#191970] p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#191970] rounded-full flex items-center justify-center">
                <span className="text-[#FFD700] text-xl">🌙</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Luna AI</h3>
                <p className="text-sm opacity-80">Cosmic Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#FFD700] text-[#191970]'
                      : 'bg-[#191970] text-[#C0C0C0]'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#191970] text-[#C0C0C0] p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#FFD700]/20">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about astrology, crystals, or cosmic wisdom..."
                className="flex-1 bg-[#191970] text-[#C0C0C0] p-3 rounded-lg border border-[#FFD700]/20 focus:outline-none focus:border-[#FFD700] placeholder-[#C0C0C0]/50"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-[#FFD700] text-[#191970] p-3 rounded-lg hover:bg-[#FFED4E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
