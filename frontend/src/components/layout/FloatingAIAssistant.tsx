import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat } from '../../context/AIChatContext';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
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

  // Staged Choreography states:
  // 1. isVisible: triggers after 3.0s silent loading
  // 2. mascotPose: 'peeking' (at 45° angle, arm & head visible) -> 'ducking' (brief anticipation) -> 'standing' (hops into screen full body)
  // 3. showSpeechBubble: pops up right above the robot with refined styling
  const [isVisible, setIsVisible] = useState(false);
  const [mascotPose, setMascotPose] = useState<'peeking' | 'ducking' | 'repositioning' | 'standing'>('peeking');
  const [isHovered, setIsHovered] = useState(false);
  const [showPeekingBubble, setShowPeekingBubble] = useState(false);
  const [showStandingBubble, setShowStandingBubble] = useState(false);
  const [activeMsgIndex, setActiveMsgIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRtl = dir === 'rtl';

  // Dynamic suggestions cycling while standing
  const smartSuggestions = language === 'ar' ? [
    {
      title: 'أقدر أساعدك في اختياراتك! 🎯',
      desc: 'رشّح لي اهتماماتك أو الميزانية اللي تناسبك',
    },
    {
      title: 'بتدور على فعاليات قريبة أو مجانية؟ 💡',
      desc: 'اطلب مني حصر الفعاليات حسب مدينتك وتفضيلاتك',
    },
    {
      title: 'استكشف فعاليات التكنولوجيا والذكاء الاصطناعي 🤖',
      desc: 'حجز تذاكر وتأكيد فوري بالذكاء الاصطناعي',
    },
    {
      title: 'جاهز لتخطيط يومك الاستثنائي؟ 🎟️',
      desc: 'انقر وتحدث مع المساعد الذكي Eviq الآن',
    },
  ] : [
    {
      title: 'I can help with your choices! 🎯',
      desc: 'Tell me your interests or budget preferences',
    },
    {
      title: 'Looking for free or nearby events? 💡',
      desc: 'Ask me to filter by city, date, or category',
    },
    {
      title: 'Explore AI & tech conferences 🤖',
      desc: 'Smart booking with instant AI verification',
    },
    {
      title: 'Ready to plan your day? 🎟️',
      desc: 'Click here to chat with Eviq AI Assistant',
    },
  ];

  // Rotate suggestion messages every 4.5 seconds
  useEffect(() => {
    if (!showStandingBubble || isFloatingOpen) return;
    const interval = setInterval(() => {
      setActiveMsgIndex((prev) => (prev + 1) % smartSuggestions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [showStandingBubble, isFloatingOpen, smartSuggestions.length]);

  // Do not show the floating assistant if user is ALREADY on the full-screen AI Assistant screen ('ai')
  const isOnFullScreenAi = screen === 'ai';

  // Staged Storytelling Choreography:
  // 1. 3.0s: Robot peeks from the corner and starts waving
  // 2. +0.6s: Thought bubble pops up right above his peeking head: "محتاج مساعدة؟ 🤔"
  // 3. +2.0s: Thought bubble fades out smoothly
  // 4. +0.25s: Robot retreats into corner along the exact reverse peeking trajectory (ducking)
  // 5. +0.28s: Instant zero-duration reposition behind the side edge at floor level while invisible
  // 6. +0.04s: Crisp horizontal slide-in onto floor (100% horizontal, zero arc)
  // 7. +0.4s: Standing rotating smart suggestions bubble pops up
  useEffect(() => {
    if (isOnFullScreenAi || isFloatingOpen) return;

    // Phase 1: 3.0s - Emerge peeking
    const entryTimer = setTimeout(() => {
      setIsVisible(true);
      setMascotPose('peeking');

      // Phase 1.5: +0.6s - Peeking thought bubble: "محتاج مساعدة؟ 🤔"
      const peekBubbleTimer = setTimeout(() => {
        setShowPeekingBubble(true);

        // Phase 1.8: +2.0s - Thought bubble fades out
        const peekBubbleHideTimer = setTimeout(() => {
          setShowPeekingBubble(false);

          // Phase 2: +0.25s - Duck back into corner (exact reverse of peeking)
          const duckTimer = setTimeout(() => {
            setMascotPose('ducking');

            // Phase 2.5: +0.28s - Reposition behind side edge at ground level while invisible
            const prepTimer = setTimeout(() => {
              setMascotPose('repositioning');

              // Phase 3: +0.04s - Crisp horizontal side slide-in (grounded floor entrance, no vertical arc)
              const standTimer = setTimeout(() => {
                setMascotPose('standing');
                triggerRobotInteraction('wave');

                // Phase 4: +0.4s - Rotating smart suggestions bubble pops up
                const standingBubbleTimer = setTimeout(() => {
                  setShowStandingBubble(true);
                }, 400);

                return () => {
                  clearTimeout(standingBubbleTimer);
                };
              }, 40);

              return () => {
                clearTimeout(standTimer);
              };
            }, 280);

            return () => {
              clearTimeout(prepTimer);
            };
          }, 250);

          return () => {
            clearTimeout(duckTimer);
          };
        }, 2000);

        return () => {
          clearTimeout(peekBubbleHideTimer);
        };
      }, 600);

      return () => {
        clearTimeout(peekBubbleTimer);
      };
    }, 3000);

    return () => {
      clearTimeout(entryTimer);
    };
  }, [isOnFullScreenAi, isFloatingOpen, triggerRobotInteraction]);

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
    <>
      {/* ================= 1. FULL-HEIGHT SLIDE-OVER DRAWER (RTL: LEFT, LTR: RIGHT) ================= */}
      <AnimatePresence>
        {isFloatingOpen && (
          <div
            className={clsx(
              'fixed inset-0 z-50 pointer-events-auto flex',
              isRtl ? 'justify-start' : 'justify-end'
            )}
          >
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={toggleFloating}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={clsx(
                'relative z-10 flex h-full flex-col bg-white shadow-2xl',
                isRtl ? 'border-e border-slate-200/80' : 'border-s border-slate-200/80',
                'w-full sm:w-[420px]'
              )}
            >
              {/* Drawer Header with Floating Transparent 3D Robot (NO BOX CONTAINER) */}
              <div className="flex items-center justify-between border-b border-indigo-100/60 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-4 text-white">
                <div className="flex items-center gap-3">
                  {/* Clean transparent 3D Mascot without any border box */}
                  <div className="relative size-12 shrink-0 flex items-center justify-center">
                    <Suspense fallback={<Bot className="size-6 text-cyan-300 animate-pulse" />}>
                      <Robot3DMascot
                        state="wave"
                        className="size-full"
                        isRtl={isRtl}
                        isThinking={isThinking}
                        showShadow={false}
                      />
                    </Suspense>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      {t('Ask Eviq AI')}
                      <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-[11px] text-indigo-200">Advisory NLP & Event Matcher</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Clear Chat */}
                  <button
                    onClick={clearChat}
                    title={t('Clear Chat')}
                    className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>

                  {/* Maximize to full A03 view */}
                  <button
                    onClick={handleMaximize}
                    title={t('Expand to Full Screen')}
                    className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Maximize2 className="size-4" />
                  </button>

                  {/* Close/Slide away */}
                  <button
                    onClick={toggleFloating}
                    title={t('Close')}
                    className="rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Extracted Slots Strip if active */}
              {(extractedSlots.category || extractedSlots.city || extractedSlots.budgetMax !== undefined) && (
                <div className="flex items-center gap-1.5 overflow-x-auto bg-indigo-50/70 px-4 py-2 text-[11px] font-semibold text-indigo-700 border-b border-indigo-100/80">
                  <Filter className="size-3.5 shrink-0" />
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                {messages.map((m) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={clsx(
                        'flex gap-2.5 max-w-[88%]',
                        isUser ? 'ms-auto flex-row-reverse' : 'me-auto'
                      )}
                    >
                      <div
                        className={clsx(
                          'flex size-8 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs shadow-xs',
                          isUser
                            ? 'bg-slate-900'
                            : 'bg-gradient-to-tr from-indigo-600 to-blue-500'
                        )}
                      >
                        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
                      </div>

                      <div className="space-y-2 flex-1 min-w-0">
                        <div
                          className={clsx(
                            'rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs',
                            isUser
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                              : 'border border-slate-200/80 bg-white text-slate-800 rounded-tl-none'
                          )}
                        >
                          <p className="whitespace-pre-line break-words">{m.text}</p>
                          <span
                            className={clsx(
                              'mt-1 block text-[10px] text-end',
                              isUser ? 'text-blue-200' : 'text-slate-400'
                            )}
                          >
                            {m.timestamp}
                          </span>
                        </div>

                        {/* Suggested Event Cards */}
                        {m.suggestedEventIds && m.suggestedEventIds.length > 0 && (
                          <div className="space-y-2 pt-1">
                            {m.suggestedEventIds.map((id) => {
                              const ev = events.find((e) => e.id === id);
                              if (!ev) return null;
                              return (
                                <div
                                  key={ev.id}
                                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs hover:border-indigo-300 transition-all"
                                >
                                  <img
                                    src={ev.img}
                                    alt={ev.title}
                                    className="size-12 rounded-lg object-cover shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-xs text-slate-900 truncate">
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
                                    className="rounded-lg bg-slate-900 p-2 text-white hover:bg-indigo-600 transition-colors shrink-0"
                                  >
                                    {isRtl ? (
                                      <ArrowLeft className="size-3.5" />
                                    ) : (
                                      <ArrowRight className="size-3.5" />
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
                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-500 shadow-xs">
                      <span>{language === 'ar' ? 'جارٍ التحليل...' : 'Thinking...'}</span>
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

              {/* Input Bar */}
              <form
                onSubmit={onSendSubmit}
                className="border-t border-slate-200 bg-white p-3 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={t('Type a message…')}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isThinking}
                  className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 transition-all shrink-0"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 2. TWO-STAGE CHIBI ROBOT (AFTER 3.0s DELAY) ================= */}
      {/* Stage 1: Peeks out at angle from edge (head, chest & raised arm clearly visible) */}
      {/* Stage 2: Ducks back behind edge briefly for anticipation (~300ms) */}
      {/* Stage 3: Hops smoothly into screen, lands standing upright on floor with contact shadow */}
      {/* Stage 4: Refined speech bubble pops up directly above the robot */}
      {!isFloatingOpen && !isDismissed && isVisible && (
        <div
          className={clsx(
            'fixed bottom-6 sm:bottom-8 z-40 select-none print:hidden pointer-events-none',
            isRtl ? 'left-0' : 'right-0'
          )}
        >
          <div className="relative flex flex-col items-center">
            {/* A1. Peeking Thought Bubble: "محتاج مساعدة؟ 🤔" with trailing thought dots */}
            <AnimatePresence>
              {showPeekingBubble && mascotPose === 'peeking' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.72, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.78, y: -6 }}
                  transition={{ type: 'spring', damping: 16, stiffness: 300 }}
                  onClick={() => {
                    triggerRobotInteraction('welcome');
                    toggleFloating();
                  }}
                  className={clsx(
                    'pointer-events-auto absolute z-30 cursor-pointer group select-none',
                    'bottom-[115px] sm:bottom-[130px]',
                    isRtl ? 'left-6 sm:left-10' : 'right-6 sm:right-10'
                  )}
                >
                  <div className="relative rounded-2xl border border-cyan-200/90 bg-white/95 px-3.5 py-2 shadow-lg shadow-indigo-950/15 backdrop-blur-md hover:border-cyan-400 hover:scale-105 transition-all flex items-center gap-2">
                    {/* Thinking pulsing dot */}
                    <span className="size-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />

                    {/* Thought text */}
                    <span className="text-xs font-black text-slate-900 whitespace-nowrap">
                      {language === 'ar' ? 'محتاج مساعدة؟' : 'Need help?'}
                    </span>
                    <span className="text-sm">🤔</span>

                    {/* Thought bubble trail dots trailing down to peeking robot */}
                    <div
                      className={clsx(
                        'absolute -bottom-2 size-2 rounded-full bg-white border border-cyan-200 shadow-xs',
                        isRtl ? 'left-4' : 'right-4'
                      )}
                    />
                    <div
                      className={clsx(
                        'absolute -bottom-3.5 size-1.5 rounded-full bg-white border border-cyan-200 shadow-xs',
                        isRtl ? 'left-2.5' : 'right-2.5'
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* A2. Standing Rotating Smart Suggestions Bubble with cycling tips */}
            <AnimatePresence>
              {showStandingBubble && mascotPose === 'standing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 6 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                  onClick={() => {
                    triggerRobotInteraction('welcome');
                    toggleFloating();
                  }}
                  className={clsx(
                    'pointer-events-auto absolute bottom-full mb-2 cursor-pointer group z-20',
                    isRtl ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
                  )}
                >
                  <div className="relative rounded-2xl border border-indigo-100/90 bg-white/95 p-3.5 shadow-xl shadow-indigo-950/15 backdrop-blur-md group-hover:border-blue-300 transition-all w-[240px] sm:w-[265px]">
                    {/* Close Button (✕) integrated on the top corner */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStandingBubble(false);
                      }}
                      title={t('Close')}
                      className={clsx(
                        'absolute -top-2 flex size-5 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm hover:bg-slate-100 hover:text-slate-700 hover:scale-110 transition-all',
                        isRtl ? '-left-2' : '-right-2'
                      )}
                    >
                      <X className="size-3" />
                    </button>

                    {/* Rotating Content with smooth AnimatePresence transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMsgIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.22 }}
                        className="text-start space-y-1"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {smartSuggestions[activeMsgIndex].title}
                          </h4>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 leading-snug">
                          {smartSuggestions[activeMsgIndex].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Footer bar with dots indicator & interactive hint */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-blue-600 group-hover:underline">
                        {language === 'ar' ? 'انقر للتحدث الآن 💬' : 'Click to chat 💬'}
                      </span>
                      <div className="flex items-center gap-1">
                        {smartSuggestions.map((_, idx) => (
                          <span
                            key={idx}
                            className={clsx(
                              'h-1 rounded-full transition-all duration-300',
                              idx === activeMsgIndex ? 'w-3 bg-blue-600' : 'w-1 bg-slate-200'
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Speech bubble tail pointing directly down to the robot's head */}
                    <div
                      className={clsx(
                        'absolute -bottom-1.5 w-0 h-0 border-x-5 border-x-transparent border-t-6 border-t-white',
                        isRtl ? 'left-14 sm:left-16' : 'right-14 sm:right-16'
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* B. The Mascot: Peeks from edge, ducks back, then slides in crisp from the side */}
            <motion.div
              initial={
                isRtl
                  ? { x: '-100%', y: '36%', rotate: 26, opacity: 0 }
                  : { x: '100%', y: '36%', rotate: -26, opacity: 0 }
              }
              animate={
                mascotPose === 'peeking'
                  ? {
                      // Peeking state: legs & feet tucked safely behind/below the edge, arm & head clearly out
                      x: isRtl ? (isHovered ? '-28%' : '-46%') : (isHovered ? '28%' : '46%'),
                      y: isHovered ? '6%' : '16%',
                      rotate: isRtl ? (isHovered ? 12 : 24) : (isHovered ? -12 : -24),
                      scale: isHovered ? 1.08 : 1,
                      opacity: 1,
                    }
                  : mascotPose === 'ducking'
                  ? {
                      // Ducking state: retreats into corner along the exact reverse trajectory of peeking!
                      x: isRtl ? '-100%' : '100%',
                      y: '36%',
                      rotate: isRtl ? 26 : -26,
                      scale: 1,
                      opacity: 0,
                    }
                  : mascotPose === 'repositioning'
                  ? {
                      // Instant snap behind the side edge at floor level while invisible
                      x: isRtl ? '-115%' : '115%',
                      y: '0%',
                      rotate: 0,
                      scale: 1,
                      opacity: 0,
                    }
                  : {
                      // Standing state: pure horizontal side slide-in onto floor (zero arc!)
                      x: isRtl ? '24px' : '-24px',
                      y: '0%',
                      rotate: 0,
                      scale: isHovered ? 1.06 : 1,
                      opacity: 1,
                    }
              }
              transition={
                mascotPose === 'standing'
                  ? { type: 'spring', damping: 20, stiffness: 260 }
                  : mascotPose === 'repositioning'
                  ? { duration: 0 }
                  : mascotPose === 'ducking'
                  ? { duration: 0.28, ease: 'easeInOut' }
                  : { type: 'spring', damping: 24, stiffness: 200 }
              }
              style={{
                transformOrigin: isRtl ? 'bottom left' : 'bottom right',
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                if (mascotPose !== 'standing') {
                  setMascotPose('standing');
                }
                setShowStandingBubble(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                triggerRobotInteraction('welcome');
                toggleFloating();
              }}
              className="pointer-events-auto relative w-[130px] sm:w-[150px] h-[135px] sm:h-[155px] cursor-pointer group"
              title={language === 'ar' ? 'انقر لفتح المساعد الذكي Eviq' : 'Click to chat with Eviq AI Assistant'}
            >
              {/* Dismiss button when standing without speech bubble (NEVER when peeking/ducking; neatly anchored on hover) */}
              {mascotPose === 'standing' && !showStandingBubble && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDismissed(true);
                  }}
                  title={t('Close')}
                  className={clsx(
                    'absolute top-1 z-30 flex size-5 items-center justify-center rounded-full bg-white/95 border border-slate-200 text-slate-400 shadow-xs hover:bg-slate-100 hover:text-slate-700 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-200',
                    isRtl ? 'right-7' : 'left-7'
                  )}
                >
                  <X className="size-3" />
                </button>
              )}

              <Suspense
                fallback={
                  <div className="flex size-full items-center justify-center">
                    <Bot className="size-8 text-cyan-400 animate-pulse" />
                  </div>
                }
              >
                <Robot3DMascot
                  state={isHovered ? 'wave' : robotState}
                  className="size-full"
                  isRtl={isRtl}
                  isThinking={isThinking}
                  showShadow={mascotPose === 'standing'}
                />
              </Suspense>
            </motion.div>
          </div>
        </div>
      )}

      {/* Minimal Re-open button if user dismissed the robot */}
      {!isFloatingOpen && isDismissed && (
        <button
          onClick={() => {
            setIsDismissed(false);
            setIsVisible(true);
            setMascotPose('standing');
            setShowStandingBubble(true);
          }}
          className={clsx(
            'fixed bottom-6 z-40 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all',
            isRtl ? 'left-4' : 'right-4'
          )}
        >
          <Bot className="size-3.5 text-cyan-300" />
          <span>{t('AI Assistant')}</span>
        </button>
      )}
    </>
  );
};

export default FloatingAIAssistant;
