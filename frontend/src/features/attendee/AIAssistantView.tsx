import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AIChatMessage } from '../../types';
import { EventCard } from '../../components/ui/EventCard';
import { Button } from '../../components/ui/Button';
import { Sparkles, Send, Bot, User, Filter } from 'lucide-react';
import clsx from 'clsx';

export const AIAssistantView: React.FC = () => {
  const { events, favs, toggleFav, go } = useApp();
  const { t } = useI18n();

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello! I am Eviq AI Assistant. Tell me what kind of events you are looking for in natural English or Egyptian Arabic — such as your favorite topic, budget limit, or city.',
      timestamp: '10:00 AM',
      suggestedEventIds: [1, 3],
      extractedSlots: {
        category: 'Technology',
        city: 'Cairo & Giza',
        budgetMax: 500,
      },
    },
  ]);

  const quickPrompts = [
    'Find tech workshops in Cairo under 500 EGP',
    'عايز مؤتمر ريادة أعمال في الإسكندرية',
    'Show free events this weekend',
    'Indie music festivals in Cairo',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Simulate AI slot extraction and advisory suggestion
    let matchedIds: number[] = [1, 2];
    const lower = text.toLowerCase();

    if (lower.includes('alex') || text.includes('إسكندرية')) {
      matchedIds = [4];
    } else if (lower.includes('free') || text.includes('مجاني')) {
      matchedIds = [3, 7];
    } else if (lower.includes('music') || text.includes('موسيقى')) {
      matchedIds = [5];
    } else if (lower.includes('design') || text.includes('تصميم')) {
      matchedIds = [2];
    }

    const aiResponse: AIChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: `I parsed your query and extracted relevant event preferences. Here are the top-ranked recommendations matching your criteria:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedEventIds: matchedIds,
      extractedSlots: {
        category: lower.includes('music') ? 'Music' : lower.includes('free') ? 'Workshops & Networking' : 'Technology',
        city: lower.includes('alex') ? 'Alexandria' : 'Cairo',
      },
    };

    setMessages((prev) => [...prev, userMsg, aiResponse]);
    setInputVal('');
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#4F46E5] text-white">
              <Sparkles className="size-4" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('AI Event Assistant')}
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Advisory NLP discovery & slot-extraction engine with fallback SQL search support
          </p>
        </div>

        {/* Quick prompt chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-soft hover:border-indigo-300 hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-all shrink-0"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="my-8 space-y-6 min-h-[500px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={clsx(
              'flex gap-3 max-w-3xl',
              m.sender === 'user' ? 'ms-auto flex-row-reverse' : 'me-auto'
            )}
          >
            {/* Avatar */}
            <div
              className={clsx(
                'flex size-8 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs',
                m.sender === 'ai' ? 'bg-[#4F46E5]' : 'bg-slate-900'
              )}
            >
              {m.sender === 'ai' ? <Bot className="size-4" /> : <User className="size-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div
                className={clsx(
                  'rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-soft',
                  m.sender === 'ai'
                    ? 'border border-indigo-100 bg-white text-slate-800'
                    : 'bg-[#2563EB] text-white'
                )}
              >
                <p>{m.text}</p>
                <span
                  className={clsx(
                    'mt-1 block text-[10px]',
                    m.sender === 'ai' ? 'text-slate-400' : 'text-blue-200'
                  )}
                >
                  {m.timestamp}
                </span>
              </div>

              {/* Extracted Slots Pill */}
              {m.extractedSlots && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-semibold text-slate-400 flex items-center gap-1">
                    <Filter className="size-3" /> Extracted Slots:
                  </span>
                  {m.extractedSlots.category && (
                    <span className="rounded-md bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 font-bold text-[#4F46E5]">
                      Category: {m.extractedSlots.category}
                    </span>
                  )}
                  {m.extractedSlots.city && (
                    <span className="rounded-md bg-blue-50 border border-blue-200/60 px-2 py-0.5 font-bold text-[#2563EB]">
                      City: {m.extractedSlots.city}
                    </span>
                  )}
                </div>
              )}

              {/* Suggested Event Cards inside Chat */}
              {m.suggestedEventIds && m.suggestedEventIds.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    {t('Suggested Events')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {m.suggestedEventIds.map((id) => {
                      const ev = events.find((e) => e.id === id);
                      if (!ev) return null;
                      return (
                        <EventCard
                          key={ev.id}
                          event={ev}
                          fav={favs.includes(ev.id)}
                          onFav={() => toggleFav(ev.id)}
                          onOpen={() => go('details', { id: ev.id })}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="sticky bottom-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/80"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t(
              'Type your request, e.g. "Find tech workshops in Cairo under 500 EGP"'
            )}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <Button type="submit" v="ai" size="md" icon={Send} disabled={!inputVal.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
