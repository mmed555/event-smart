import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat } from '../../context/AIChatContext';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Sparkles,
  Maximize2,
  X,
  Send,
  Trash2,
  Bot,
  User,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Filter,
  MessageCircle,
} from 'lucide-react';
import clsx from 'clsx';

// Lazy load 3D Three.js mascot on-demand
const Robot3DMascot = React.lazy(() => import('../3d/Robot3DMascot'));

export const FloatingAIAssistant: React.FC = () => {
  const {
    messages,
    isThinking,
    extractedSlots,
    isFloatingOpen,
    robotState,
    handleSend,
    clearChat,
    toggleFloating,
    setIsFloatingOpen,
    triggerRobotInteraction,
  } = useAIChat();

  const { events, go, screen } = useApp();
  const { t, dir, language } = useI18n();

  const [inputVal, setInputVal] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRtl = dir === 'rtl';

  // Do not show the floating widget if user is ALREADY on the full-screen AI Assistant screen ('ai')
  const isOnFullScreenAi = screen === 'ai';

  // Auto-scroll chat messages
  useEffect(() => {
    if (isFloatingOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, isFloatingOpen]);

  const onSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isThinking) return;
    handleSend(inputVal.trim());
    setInputVal('');
  };

  const handleMaximize = () => {
    setIsFloatingOpen(false);
    go('ai');
  };

  if (isOnFullScreenAi) {
    return null;
  }

  return (
    <div className="fixed z-50 select-none print:hidden right-0 bottom-4 sm:bottom-6 pointer-events-none">
      {/* ================= 1. EXPANDED CHAT WINDOW (POPOVER) ================= */}
      <AnimatePresence>
        {isFloatingOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={clsx(
              'pointer-events-auto flex flex-col rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/25 overflow-hidden me-4 sm:me-8 mb-3',
              'w-[calc(100vw-32px)] sm:w-[395px] h-[520px] max-h-[82vh]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-indigo-100/60 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <Sparkles className="size-4 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                    {t('Ask Eviq AI')}
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-indigo-200">Advisory NLP & Event Matcher</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Clear Chat */}
                <button
                  onClick={clearChat}
                  title={t('Clear Chat')}
                  className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>

                {/* Maximize to full A03 view */}
                <button
                  onClick={handleMaximize}
                  title={t('Expand to Full Screen')}
                  className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Maximize2 className="size-3.5" />
                </button>

                {/* Close/Minimize */}
                <button
                  onClick={toggleFloating}
                  title={t('Minimize')}
                  className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Extracted Slots Strip if active */}
            {(extractedSlots.category || extractedSlots.city || extractedSlots.budgetMax !== undefined) && (
              <div className="flex items-center gap-1.5 overflow-x-auto bg-indigo-50/70 px-3 py-1.5 text-[10px] font-semibold text-indigo-700 border-b border-indigo-100/80">
                <Filter className="size-3 shrink-0" />
                {extractedSlots.category && (
                  <span className="rounded-md bg-white px-2 py-0.5 shadow-xs border border-indigo-200/50 shrink-0">
                    {extractedSlots.category}
                  </span>
                )}
                {extractedSlots.city && (
                  <span className="rounded-md bg-white px-2 py-0.5 shadow-xs border border-indigo-200/50 shrink-0">
                    {extractedSlots.city}
                  </span>
                )}
                {extractedSlots.budgetMax !== undefined && (
                  <span className="rounded-md bg-white px-2 py-0.5 shadow-xs border border-indigo-200/50 shrink-0">
                    {extractedSlots.budgetMax === 0 ? t('Free') : `≤ ${extractedSlots.budgetMax} ${t('EGP')}`}
                  </span>
                )}
              </div>
            )}

            {/* Messages stream */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-slate-50/60">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    className={clsx(
                      'flex gap-2 max-w-[90%]',
                      isUser ? 'ms-auto flex-row-reverse' : 'me-auto'
                    )}
                  >
                    <div
                      className={clsx(
                        'flex size-7 shrink-0 items-center justify-center rounded-xl text-white font-bold text-[10px] shadow-xs',
                        isUser
                          ? 'bg-slate-900'
                          : 'bg-gradient-to-tr from-indigo-600 to-blue-500'
                      )}
                    >
                      {isUser ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div
                        className={clsx(
                          'rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs',
                          isUser
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                            : 'border border-slate-200/80 bg-white text-slate-800 rounded-tl-none'
                        )}
                      >
                        <p className="whitespace-pre-line break-words">{m.text}</p>
                        <span
                          className={clsx(
                            'mt-1 block text-[9px] text-end',
                            isUser ? 'text-blue-200' : 'text-slate-400'
                          )}
                        >
                          {m.timestamp}
                        </span>
                      </div>

                      {/* Suggested Event Cards */}
                      {m.suggestedEventIds && m.suggestedEventIds.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {m.suggestedEventIds.map((id) => {
                            const ev = events.find((e) => e.id === id);
                            if (!ev) return null;
                            return (
                              <div
                                key={ev.id}
                                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2 shadow-2xs hover:border-indigo-300 transition-all"
                              >
                                <img
                                  src={ev.img}
                                  alt={ev.title}
                                  className="size-12 rounded-lg object-cover shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-bold text-[11px] text-slate-900 truncate">
                                    {language === 'ar' && ev.titleAr ? ev.titleAr : ev.title}
                                  </h5>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="size-2.5" />
                                      {ev.city}
                                    </span>
                                    <span>·</span>
                                    <span className="font-semibold text-indigo-600">
                                      {ev.price === 0 ? t('Free') : `${ev.price} ${t('EGP')}`}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setIsFloatingOpen(false);
                                    go('details', { id: ev.id });
                                  }}
                                  className="rounded-lg bg-slate-900 p-1.5 text-white hover:bg-indigo-600 transition-colors shrink-0"
                                >
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
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex gap-2 max-w-[80%] me-auto items-center">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Bot className="size-3.5" />
                  </div>
                  <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-500 shadow-xs">
                    <span>{language === 'ar' ? 'جارٍ التحليل...' : 'Thinking...'}</span>
                    <span className="inline-flex gap-0.5">
                      <span className="size-1 rounded-full bg-indigo-600 animate-bounce" />
                      <span className="size-1 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="size-1 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={onSendSubmit}
              className="border-t border-slate-200 bg-white p-2.5 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('Type a message…')}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isThinking}
                className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 transition-all shrink-0"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE PEEKING ROBOT MASCOT & LAUNCHER CLUSTER ================= */}
      {/* Directly on the right screen boundary without any circular clipping frame */}
      {!isFloatingOpen && !isDismissed && (
        <div className="relative pointer-events-auto flex items-end justify-end">
          {/* A. FLOATING SPEECH BUBBLE ("محتاج مساعدة؟") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260, delay: 0.3 }}
            onClick={() => {
              triggerRobotInteraction('welcome');
              toggleFloating();
            }}
            className="absolute bottom-36 sm:bottom-40 right-28 sm:right-36 cursor-pointer group z-20"
          >
            {/* Sparkle energy lines on top */}
            <div className="flex justify-center gap-1.5 mb-1 text-cyan-400">
              <span className="text-xs font-bold -rotate-12 animate-pulse">/</span>
              <span className="text-sm font-bold animate-pulse [animation-delay:0.2s]">|</span>
              <span className="text-xs font-bold rotate-12 animate-pulse [animation-delay:0.4s]">\</span>
            </div>

            {/* Bubble Pill */}
            <div className="relative rounded-3xl border border-slate-100 bg-white/95 px-5 py-3 shadow-2xl shadow-indigo-900/20 backdrop-blur-md group-hover:border-cyan-300 group-hover:shadow-cyan-500/20 transition-all text-center">
              <h4 className="text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
                محتاج مساعدة؟
              </h4>
              <p className="text-[11px] font-bold text-indigo-600 mt-0.5 whitespace-nowrap">
                أنا هنا لمساعدتك!
              </p>

              {/* Conversational tail pointing right toward the robot */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
            </div>
          </motion.div>

          {/* B. DISMISS BUTTON (✕) */}
          <button
            onClick={() => setIsDismissed(true)}
            title={t('Close')}
            className="absolute top-2 right-4 z-30 flex size-7 items-center justify-center rounded-full bg-white/90 border border-slate-200 text-slate-500 shadow-md hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <X className="size-4" />
          </button>

          {/* C. PEEKING 3D ROBOT MASCOT (Emits directly from the right border) */}
          <div className="relative w-[230px] sm:w-[260px] h-[250px] sm:h-[270px] translate-x-4 sm:translate-x-2 pointer-events-auto">
            <Suspense
              fallback={
                <div className="flex size-full items-center justify-center">
                  <Bot className="size-12 text-cyan-400 animate-pulse" />
                </div>
              }
            >
              <Robot3DMascot
                state={robotState}
                className="size-full"
                onClick={toggleFloating}
              />
            </Suspense>
          </div>

          {/* D. FLOATING CIRCULAR CHAT LAUNCHER BUTTON (Under the robot's left hand) */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleFloating}
            className="absolute bottom-2 right-4 sm:right-6 z-20 flex size-14 sm:size-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-2xl shadow-blue-600/50 border-2 border-white/80 group"
          >
            {/* Outer soft blue glow pulse ring */}
            <span className="absolute -inset-2 rounded-full bg-blue-400/40 blur-md group-hover:bg-cyan-400/50 transition-all animate-pulse" />

            {/* Inner White Chat Icon */}
            <span className="relative flex items-center justify-center">
              <MessageCircle className="size-6 sm:size-7 text-white fill-white" />
            </span>
          </motion.button>
        </div>
      )}

      {/* Re-open pill if dismissed */}
      {!isFloatingOpen && isDismissed && (
        <button
          onClick={() => {
            setIsDismissed(false);
            toggleFloating();
          }}
          className="pointer-events-auto me-4 mb-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <Bot className="size-4 text-cyan-300" />
          <span>{t('Ask Eviq AI')}</span>
        </button>
      )}
    </div>
  );
};

export default FloatingAIAssistant;
