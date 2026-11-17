import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AIChatMessage, AISlots } from '../types';
import { useApp } from './AppContext';
import { useI18n } from '../i18n';

export type RobotState = 'idle' | 'peek' | 'wave' | 'point' | 'welcome';
export type MascotMode = 'rive' | 'masko' | 'canvas';

interface AIChatContextType {
  messages: AIChatMessage[];
  isThinking: boolean;
  extractedSlots: AISlots;
  isFloatingOpen: boolean;
  robotState: RobotState;
  hasUnread: boolean;
  mascotMode: MascotMode;
  setMascotMode: (mode: MascotMode) => void;
  handleSend: (textToSend?: string) => void;
  clearChat: () => void;
  removeSlot: (key: keyof AISlots) => void;
  setIsFloatingOpen: (open: boolean) => void;
  toggleFloating: () => void;
  setRobotState: (state: RobotState) => void;
  triggerRobotInteraction: (state?: RobotState) => void;
}

const AIChatContext = createContext<AIChatContextType | null>(null);

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { events } = useApp();
  const { language } = useI18n();

  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [robotState, setRobotState] = useState<RobotState>('peek');
  const [mascotMode, setMascotMode] = useState<MascotMode>('rive');

  const [extractedSlots, setExtractedSlots] = useState<AISlots>({
    category: 'Technology',
    city: 'Cairo',
    budgetMax: 500,
  });

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'init-msg-1',
      sender: 'ai',
      text:
        language === 'ar'
          ? 'أهلاً بك! أنا إيفيك (Eviq)، مساعدك الذكي لاكتشاف الفعاليات وحجز التذاكر. أخبرني بما تبحث عنه بالعربية أو الإنجليزية — مثل مجالك المفضل، ميزانيتك، أو مدينتك.'
          : 'Hello! I am Eviq, your AI Event Assistant. Tell me what kind of events you are looking for in English or Egyptian Arabic — such as your favorite topic, budget limit, or city.',
      timestamp: '10:00 AM',
      suggestedEventIds: [1, 2],
      extractedSlots: {
        category: 'Technology',
        city: 'Cairo',
        budgetMax: 500,
      },
    },
  ]);

  // Update initial message language if only 1 message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'init-msg-1') {
      setMessages([
        {
          id: 'init-msg-1',
          sender: 'ai',
          text:
            language === 'ar'
              ? 'أهلاً بك! أنا إيفيك (Eviq)، مساعدك الذكي لاكتشاف الفعاليات وحجز التذاكر. أخبرني بما تبحث عنه بالعربية أو الإنجليزية — مثل مجالك المفضل، ميزانيتك، أو مدينتك.'
              : 'Hello! I am Eviq, your AI Event Assistant. Tell me what kind of events you are looking for in English or Egyptian Arabic — such as your favorite topic, budget limit, or city.',
          timestamp: '10:00 AM',
          suggestedEventIds: [1, 2],
          extractedSlots: {
            category: 'Technology',
            city: 'Cairo',
            budgetMax: 500,
          },
        },
      ]);
    }
  }, [language]);

  // Temporary robot state triggers (e.g. wave for 3s then return to idle)
  const triggerRobotInteraction = useCallback((state: RobotState = 'wave') => {
    setRobotState(state);
    const timer = setTimeout(() => {
      setRobotState('idle');
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const toggleFloating = () => {
    setIsFloatingOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasUnread(false);
        triggerRobotInteraction('welcome');
      }
      return next;
    });
  };

  const removeSlot = (key: keyof AISlots) => {
    setExtractedSlots((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: `clear-${Date.now()}`,
        sender: 'ai',
        text:
          language === 'ar'
            ? 'تم بدء محادثة جديدة. كيف يمكنني مساعدتك اليوم؟'
            : 'Starting a fresh conversation. How can I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setExtractedSlots({});
    triggerRobotInteraction('wave');
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend?.trim();
    if (!text) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setRobotState('point');

    // Simulate Advisory NLP & Intent & Slot Extraction Chain
    setTimeout(() => {
      const lower = text.toLowerCase();
      const isArabic = /[\u0600-\u06FF]/.test(text);

      const newSlots: AISlots = { ...extractedSlots };

      // Category detection
      if (lower.includes('tech') || text.includes('تقني') || text.includes('برمج') || text.includes('ذكاء')) {
        newSlots.category = 'Technology';
      } else if (lower.includes('business') || text.includes('أعمال') || text.includes('ريادة') || text.includes('ستارت')) {
        newSlots.category = 'Business & Entrepreneurship';
      } else if (lower.includes('design') || text.includes('تصميم') || text.includes('جرافيك')) {
        newSlots.category = 'Design & Creativity';
      } else if (lower.includes('music') || text.includes('موسيقى') || text.includes('حفلة') || text.includes('غناء')) {
        newSlots.category = 'Music & Entertainment';
      }

      // City detection
      if (lower.includes('alex') || text.includes('إسكندرية') || text.includes('اسكندرية')) {
        newSlots.city = 'Alexandria';
      } else if (lower.includes('cairo') || text.includes('قاهرة') || text.includes('معادي') || text.includes('تجمع')) {
        newSlots.city = 'Cairo';
      } else if (lower.includes('giza') || text.includes('جيزة') || text.includes('زايد')) {
        newSlots.city = 'Giza';
      }

      // Budget detection
      if (lower.includes('free') || text.includes('مجاني') || text.includes('ببلاش')) {
        newSlots.budgetMax = 0;
      } else {
        const budgetMatch = text.match(/(\d+)\s*(جنية|جنيه|egp|le|\$)?/i);
        if (budgetMatch && budgetMatch[1]) {
          newSlots.budgetMax = parseInt(budgetMatch[1], 10);
        }
      }

      setExtractedSlots(newSlots);

      // Score events based on slots
      const scored = events.map((ev) => {
        let score = 70;
        if (newSlots.category && ev.cat.toLowerCase().includes(newSlots.category.toLowerCase().split(' ')[0])) {
          score += 15;
        }
        if (newSlots.city && ev.city.toLowerCase() === newSlots.city.toLowerCase()) {
          score += 10;
        }
        if (newSlots.budgetMax !== undefined) {
          if (newSlots.budgetMax === 0 && ev.price === 0) score += 10;
          else if (ev.price <= newSlots.budgetMax) score += 5;
        }
        return { id: ev.id, score };
      });

      scored.sort((a, b) => b.score - a.score);
      const topMatches = scored.slice(0, 2).map((s) => s.id);

      const aiResponseText = isArabic
        ? `حللت طلبك بنجاح واستخرجت معايير الاهتمام. هذه أفضل الفعاليات المطابقة بناءً على تفضيلاتك:`
        : `I analyzed your request and extracted relevant criteria. Here are the top events matching your preferences:`;

      const aiResponse: AIChatMessage = {
        id: `ai-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedEventIds: topMatches,
        extractedSlots: newSlots,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
      triggerRobotInteraction('wave');

      if (!isFloatingOpen) {
        setHasUnread(true);
      }
    }, 650);
  };

  return (
    <AIChatContext.Provider
      value={{
        messages,
        isThinking,
        extractedSlots,
        isFloatingOpen,
        robotState,
        hasUnread,
        mascotMode,
        setMascotMode,
        handleSend,
        clearChat,
        removeSlot,
        setIsFloatingOpen,
        toggleFloating,
        setRobotState,
        triggerRobotInteraction,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
};
