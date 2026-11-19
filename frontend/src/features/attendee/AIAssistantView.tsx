import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAIChat } from '../../context/AIChatContext';
import { useI18n } from '../../i18n';
import { Button } from '../../components/ui/Button';
import { AIAssistantFullSkeleton } from '../../components/ui/skeleton';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Filter,
  X,
  Trash2,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import clsx from 'clsx';

export const AIAssistantView: React.FC = () => {
  const { events, go, isLoading } = useApp();
  const {
    messages,
    isThinking,
    extractedSlots,
    handleSend,
    clearChat,
    removeSlot,
  } = useAIChat();
  const { t, dir, language } = useI18n();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRtl = dir === 'rtl';

  const quickPrompts = [
    { text: 'عايز ورش عمل تك في القاهرة بميزانية أقل من 500 جنيه', icon: '💻' },
    { text: 'عايز مؤتمر ريادة أعمال في الإسكندرية', icon: '🚀' },
    { text: 'Show free networking events this weekend', icon: '🎟️' },
    { text: 'Indie music festivals in Cairo', icon: '🎵' },
    { text: 'ورش عمل تصميم جرافيك و UI/UX', icon: '🎨' },
  ];

  // Auto-scroll when messages change or while thinking
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isThinking) return;
    handleSend(inputVal.trim());
    setInputVal('');
  };

  const onQuickClick = (promptText: string) => {
    handleSend(promptText);
  };

  if (isLoading) {
    return <AIAssistantFullSkeleton />;
  }

  const hasSlots =
    extractedSlots.category ||
    extractedSlots.city ||
    extractedSlots.budgetMax !== undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-indigo-100/80 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-6 text-white shadow-xl shadow-indigo-950/10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
              <Sparkles className="size-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {t('AI Event Assistant')}
                </h1>
                <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  NLP Advisory Mode
                </span>
              </div>
              <p className="mt-1 text-xs text-indigo-100/80 max-w-xl leading-relaxed">
                {language === 'ar'
                  ? 'مساعد ذكي يفهم نيتك باللغة الطبيعية (باللهجة المصرية أو الإنجليزية)، يستخرج تفضيلاتك ويرشح أنسب الفعاليات بدقة.'
                  : 'Natural language discovery & slot extraction assistant with fallback SQL filtering support.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all"
              title={t('Clear Chat')}
            >
              <Trash2 className="size-3.5" />
              <span>{t('Clear Chat')}</span>
            </button>
          </div>
        </div>

        {/* Extracted Slots Chips Bar */}
        {hasSlots && (
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-indigo-200 flex items-center gap-1">
              <Filter className="size-3.5" />
              {t('Active Filters')}
            </span>
            {extractedSlots.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                <span>{t('Category')}: {extractedSlots.category}</span>
                <button
                  onClick={() => removeSlot('category')}
                  className="hover:text-red-300 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            {extractedSlots.city && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                <span>{t('City')}: {extractedSlots.city}</span>
                <button
                  onClick={() => removeSlot('city')}
                  className="hover:text-red-300 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            {extractedSlots.budgetMax !== undefined && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                <span>
                  {t('Budget')}:{' '}
                  {extractedSlots.budgetMax === 0 ? t('Free') : `≤ ${extractedSlots.budgetMax} ${t('EGP')}`}
                </span>
                <button
                  onClick={() => removeSlot('budgetMax')}
                  className="hover:text-red-300 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
          <HelpCircle className="size-3.5" />
          <span>{language === 'ar' ? 'اقتراحات سريعة للبدء:' : 'Quick Suggested Prompts:'}</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onQuickClick(p.text)}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-xs hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all shrink-0 active:scale-95"
            >
              <span className="text-sm">{p.icon}</span>
              <span>{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden h-[540px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={clsx(
                  'flex gap-3 max-w-[85%] sm:max-w-[78%]',
                  isUser ? 'ms-auto flex-row-reverse' : 'me-auto'
                )}
              >
                {/* Avatar */}
                <div
                  className={clsx(
                    'flex size-9 shrink-0 items-center justify-center rounded-2xl shadow-sm text-white font-bold text-xs',
                    isUser
                      ? 'bg-slate-900'
                      : 'bg-gradient-to-tr from-indigo-600 to-blue-500 border border-indigo-400/30'
                  )}
                >
                  {isUser ? <User className="size-4" /> : <Bot className="size-5" />}
                </div>

                {/* Message Content Bubble */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div
                    className={clsx(
                      'rounded-2xl px-4 sm:px-5 py-3 text-sm leading-relaxed shadow-xs',
                      isUser
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                        : 'border border-slate-200/80 bg-white text-slate-800 rounded-tl-none'
                    )}
                  >
                    <p className="whitespace-pre-line text-sm break-words">{m.text}</p>
                    <div
                      className={clsx(
                        'mt-1.5 flex items-center justify-end gap-1 text-[10px]',
                        isUser ? 'text-blue-100' : 'text-slate-400'
                      )}
                    >
                      <span>{m.timestamp}</span>
                      {isUser && <CheckCircle className="size-2.5" />}
                    </div>
                  </div>

                  {/* Suggested Event Cards inside AI response */}
                  {m.suggestedEventIds && m.suggestedEventIds.length > 0 && (
                    <div className="pt-1 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1">
                          <Sparkles className="size-3.5 text-indigo-600" />
                          {t('Suggested Events')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {m.suggestedEventIds.map((id) => {
                          const ev = events.find((e) => e.id === id);
                          if (!ev) return null;
                          return (
                            <div
                              key={ev.id}
                              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all"
                            >
                              <div>
                                <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-100 mb-2">
                                  <img
                                    src={ev.img}
                                    alt={ev.title}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <span className="absolute top-2 left-2 rounded-lg bg-indigo-600/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                                    {ev.match || 95}% {t('Match')}
                                  </span>
                                  <span className="absolute bottom-2 right-2 rounded-lg bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
                                    {ev.price === 0 ? t('Free') : `${ev.price} ${t('EGP')}`}
                                  </span>
                                </div>

                                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                  {language === 'ar' && ev.titleAr ? ev.titleAr : ev.title}
                                </h4>

                                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="size-3 text-slate-400" />
                                    {ev.city}
                                  </span>
                                  <span>·</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="size-3 text-slate-400" />
                                    {ev.date}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => go('details', { id: ev.id })}
                                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-slate-900 py-1.5 text-xs font-bold text-white hover:bg-indigo-600 transition-colors"
                              >
                                <span>{t('View Details')}</span>
                                {isRtl ? (
                                  <ArrowLeft className="size-3" />
                                ) : (
                                  <ArrowRight className="size-3" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isThinking && (
            <div className="flex gap-3 max-w-sm me-auto">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-sm">
                <Bot className="size-5" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">
                  {language === 'ar' ? 'جارٍ تحليل الطلب...' : 'Thinking & Extracting slots...'}
                </span>
                <span className="inline-flex gap-1">
                  <span className="size-1.5 rounded-full bg-indigo-600 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Footer */}
        <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t(
                'Type your request, e.g. "Find tech workshops in Cairo under 500 EGP"'
              )}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            />
            <Button
              type="submit"
              v="ai"
              size="md"
              icon={Send}
              disabled={!inputVal.trim() || isThinking}
              className="rounded-2xl px-5"
            >
              {language === 'ar' ? 'إرسال' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
