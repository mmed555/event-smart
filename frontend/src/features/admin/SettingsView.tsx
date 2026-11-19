import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  CreditCard,
  Shield,
  Percent,
  Sparkles,
  Save,
  Cpu,
  Sliders,
  CheckCircle,
  Bot,
  Key,
  ShieldAlert,
} from 'lucide-react';
import clsx from 'clsx';

export const SettingsView: React.FC = () => {
  const { adminSettings, updateAdminSettings } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [form, setForm] = useState({ ...adminSettings });
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'payments' | 'governance'>('all');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(form);
  };

  const modelOptions = [
    {
      id: 'gemini-1.5-pro',
      provider: 'gemini',
      label: 'Google Gemini 1.5 Pro',
      badge: isAr ? 'الموصى به للتحليل المعقد' : 'Recommended / High Reasoning',
      context: '2M tokens',
      speed: '~240ms',
    },
    {
      id: 'gemini-1.5-flash',
      provider: 'gemini',
      label: 'Google Gemini 1.5 Flash',
      badge: isAr ? 'فائق السرعة وخفيف' : 'Ultra Fast / Low Latency',
      context: '1M tokens',
      speed: '~80ms',
    },
    {
      id: 'gpt-4o',
      provider: 'openai',
      label: 'OpenAI GPT-4o',
      badge: isAr ? 'متعدد الوسائط' : 'Multimodal Omni',
      context: '128K tokens',
      speed: '~280ms',
    },
    {
      id: 'claude-3-5-sonnet',
      provider: 'anthropic',
      label: 'Anthropic Claude 3.5 Sonnet',
      badge: isAr ? 'تخطيط عالي الجودة' : 'State-of-the-Art Planning',
      context: '200K tokens',
      speed: '~320ms',
    },
    {
      id: 'fastapi-local-bert',
      provider: 'fastapi_local',
      label: 'Local Microservice (spaCy + BERT)',
      badge: isAr ? 'محلي دون استهلاك API' : 'Air-gapped Local Engine',
      context: '8K tokens',
      speed: '~118ms',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={clsx(
              'rounded-lg px-3 py-1.5 text-xs font-bold transition shrink-0',
              activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {isAr ? 'جميع الإعدادات' : 'All Settings'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={clsx(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition shrink-0',
              activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <Sparkles className="size-3.5" />
            <span>{isAr ? 'التحكم بالذكاء الاصطناعي' : 'AI Models & Governance'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={clsx(
              'rounded-lg px-3 py-1.5 text-xs font-bold transition shrink-0',
              activeTab === 'payments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {isAr ? 'المدفوعات والـ Sandbox' : 'Payments'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('governance')}
            className={clsx(
              'rounded-lg px-3 py-1.5 text-xs font-bold transition shrink-0',
              activeTab === 'governance' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {isAr ? 'الحوكمة والسياسات' : 'Governance'}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white transition shadow-xs self-start sm:self-auto"
        >
          <Save className="size-4" />
          <span>{isAr ? 'حفظ كافة الإعدادات والسياسات' : 'Save All Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. EXTENSIVE AI MODELS & INTELLIGENCE CONTROLS (سادس تعديل: التحكم الكامل بالموديلات) */}
        {(activeTab === 'all' || activeTab === 'ai') && (
          <div className="rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Bot className="size-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <span>{isAr ? 'حوكمة وتخصيص نماذج الذكاء الاصطناعي (AI Model Controls)' : 'AI Model & Microservice Governance Suite'}</span>
                    <span className="rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 font-bold">
                      ADR-0002 Advisory
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isAr
                      ? 'التحكم الكامل في مزود النموذج، معايير التوليد، وحد التراجع التلقائي، وتفعيل/تعطيل القدرات الذكية'
                      : 'Full governance over AI models, generation temperature, confidence fallback, and feature activations'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>{isAr ? 'الخدمة متصلة (FastAPI: 118ms)' : 'FastAPI Connected'}</span>
                </span>
              </div>
            </div>

            {/* Model Provider & Active Model Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 block flex items-center justify-between">
                <span>{isAr ? 'اختيار النموذج الأساسي للمنظومة (Active Primary AI Model):' : 'Select Primary AI Model:'}</span>
                <span className="text-[11px] font-mono text-indigo-600 font-bold">{form.aiModelName}</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {modelOptions.map((opt) => {
                  const isSelected = form.aiModelName === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          aiModelName: opt.id,
                          aiProvider: opt.provider as any,
                        })
                      }
                      className={clsx(
                        'flex flex-col justify-between p-3.5 rounded-xl border text-start transition',
                        isSelected
                          ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white/70'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                        {isSelected && <CheckCircle className="size-4 text-indigo-600 shrink-0" />}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span className="rounded bg-indigo-50 text-indigo-700 px-1.5 py-0.5 font-bold">
                          {opt.badge}
                        </span>
                        <span className="font-mono">{opt.speed}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Model Hyperparameters & Fallback Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Temperature Slider */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                <div className="flex justify-between font-bold text-xs text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-indigo-600" />
                    <span>{isAr ? 'درجة الإبداع (Temperature):' : 'Creativity (Temperature):'}</span>
                  </span>
                  <span className="font-mono text-indigo-600 font-bold">{form.aiTemperature}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={form.aiTemperature}
                  onChange={(e) => setForm({ ...form, aiTemperature: Number(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>{isAr ? 'دقيق وصارم (0.0)' : 'Strict (0.0)'}</span>
                  <span className="text-indigo-600 font-bold">
                    {form.aiTemperature <= 0.3
                      ? isAr ? 'استخراج دقيق' : 'Deterministic'
                      : form.aiTemperature <= 0.7
                        ? isAr ? 'متوازن' : 'Balanced'
                        : isAr ? 'إبداعي' : 'Creative'}
                  </span>
                  <span>{isAr ? 'إبداعي (1.0)' : 'Creative (1.0)'}</span>
                </div>
              </div>

              {/* Max Output Tokens */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                <div className="flex justify-between font-bold text-xs text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="size-3.5 text-blue-600" />
                    <span>{isAr ? 'الحد الأقصى للرموز (Max Tokens):' : 'Max Output Tokens:'}</span>
                  </span>
                  <span className="font-mono text-blue-600 font-bold">{form.aiMaxTokens}</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="4096"
                  step="256"
                  value={form.aiMaxTokens}
                  onChange={(e) => setForm({ ...form, aiMaxTokens: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>512 tokens</span>
                  <span>2,048 tokens</span>
                  <span>4,096 tokens</span>
                </div>
              </div>

              {/* Fallback Confidence Threshold (Golden Rule ADR-0002) */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                <div className="flex justify-between font-bold text-xs text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="size-3.5 text-amber-600" />
                    <span>{isAr ? 'حد التراجع التلقائي (Fallback):' : 'Fallback Threshold:'}</span>
                  </span>
                  <span className="font-mono text-amber-600 font-bold">
                    {Math.round(form.aiConfidenceThreshold * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.95"
                  step="0.05"
                  value={form.aiConfidenceThreshold}
                  onChange={(e) =>
                    setForm({ ...form, aiConfidenceThreshold: Number(e.target.value) })
                  }
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 leading-tight">
                  {isAr
                    ? 'إذا قلت ثقة النموذج عن هذه النسبة، تتراجع المنظومة فورياً لمحرك الـ SQL دون خطأ'
                    : 'If confidence drops below threshold, fallback to SQL keyword filter triggers seamlessly'}
                </div>
              </div>
            </div>

            {/* Feature-by-Feature AI Control Toggles */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 block">
                {isAr ? 'تفعيل وتعطيل ميزات وقدرات الذكاء الاصطناعي:' : 'Feature-Level AI Engine Toggles:'}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 1. Recommendation Engine */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition">
                  <div className="space-y-0.5 pe-2">
                    <span className="font-bold text-xs text-slate-900 block">
                      {isAr ? 'محرك التوصيات الهجين للفعاليات:' : 'Hybrid Event Recommendation Engine:'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr
                        ? 'توليد توصيات مخصصة للجمهور استناداً للتفضيلات والحجوزات السابقة'
                        : 'Personalized event discovery based on attendee history & categories'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.aiRecommendationEngineEnabled}
                    onChange={(e) =>
                      setForm({ ...form, aiRecommendationEngineEnabled: e.target.checked })
                    }
                    className="size-4 rounded text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                </label>

                {/* 2. Conversational Intent & Slot Extraction */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition">
                  <div className="space-y-0.5 pe-2">
                    <span className="font-bold text-xs text-slate-900 block">
                      {isAr ? 'استخراج النوايا والمتطلبات (Intent & Slot):' : 'Intent & Slot Extraction:'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr
                        ? 'فهم استفسارات المحادثة بالعربية والإنجليزية واستخراج المدينة والموعد والميزانية'
                        : 'Parse natural language queries and extract city, budget, and dates'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.aiIntentExtractionEnabled}
                    onChange={(e) =>
                      setForm({ ...form, aiIntentExtractionEnabled: e.target.checked })
                    }
                    className="size-4 rounded text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                </label>

                {/* 3. Logistics & Equipment Predictor */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition">
                  <div className="space-y-0.5 pe-2">
                    <span className="font-bold text-xs text-slate-900 block">
                      {isAr ? 'مساعد تقدير المعدات اللوجستية للـ RFQ:' : 'Logistics Equipment Auto-Estimation:'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr
                        ? 'اقتراح متطلبات الصوتيات، الإضاءة، وحجم القاعة حسب السعة الاستيعابية للمنظم'
                        : 'Automatically suggest sound, lighting, and stage capacity for RFQs'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.aiEquipmentPredictorEnabled}
                    onChange={(e) =>
                      setForm({ ...form, aiEquipmentPredictorEnabled: e.target.checked })
                    }
                    className="size-4 rounded text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                </label>

                {/* 4. Smart Vendor Matching */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition">
                  <div className="space-y-0.5 pe-2">
                    <span className="font-bold text-xs text-slate-900 block">
                      {isAr ? 'محرك مطابقة الموردين الذكية:' : 'Intelligent B2B Vendor Matching:'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr
                        ? 'ترشيح الشركات المعتمدة الأكثر ملائمة لتلبية متطلبات المنظم'
                        : 'Match RFQs with top-rated verified vendors based on capacity & domain'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.aiVendorMatchingEnabled}
                    onChange={(e) =>
                      setForm({ ...form, aiVendorMatchingEnabled: e.target.checked })
                    }
                    className="size-4 rounded text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                </label>
              </div>
            </div>

            {/* API Key & Security Config Bar */}
            <div className="p-4 rounded-xl bg-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Key className="size-4 text-indigo-400 shrink-0" />
                <div>
                  <div className="font-bold">{isAr ? 'مفتاح الربط الآمن للنموذج (API Key)' : 'AI API Key Configured'}</div>
                  <div className="font-mono text-slate-400 text-[11px]">{form.aiApiKeyMasked}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-300">
                  {isAr ? 'معدل الطلبات المسموح:' : 'Rate limit:'} <span className="font-mono font-bold text-white">{form.aiRateLimitPerMin} req/min</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle className="size-3" />
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Payment & Sandbox Gateway */}
        {(activeTab === 'all' || activeTab === 'payments') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="size-4 text-blue-600" />
                  <span>{isAr ? 'بوابة الدفع والـ Sandbox (Phase 1 Mock)' : 'Payment Gateway Sandbox (Phase 1)'}</span>
                </h3>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  Mock Adapter Active
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'تفعيل محاكي الدفع التجريبي (Mock Payment):' : 'Enable Mock Payment Gateway:'}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'محاكاة نجاح الدفع وإصدار الـ QR فورياً بدون رسوم بنكية حقيقية'
                        : 'Instantly simulate card / Fawry authorization and activate QR tickets'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.mockPaymentEnabled}
                    onChange={(e) => setForm({ ...form, mockPaymentEnabled: e.target.checked })}
                    className="size-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{isAr ? 'تأخير محاكاة الدفع البنكي:' : 'Simulated Gateway Latency:'}</span>
                    <span className="font-mono text-blue-600">{form.sandboxGatewayLatencyMs} ms</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2500"
                    step="50"
                    value={form.sandboxGatewayLatencyMs}
                    onChange={(e) =>
                      setForm({ ...form, sandboxGatewayLatencyMs: Number(e.target.value) })
                    }
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[10px] text-slate-400">
                    {isAr
                      ? 'يحدد وقت انتظار عملية الدفع في الفرونت إند لاختبار حالات الـ Loading'
                      : 'Adjusts simulated network delay before payment completion'}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Policies & Commission */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Percent className="size-4 text-purple-600" />
                  <span>{isAr ? 'السياسات المالية ونسب المنصة' : 'Financial & Commission Policies'}</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{isAr ? 'نسبة عمولة المنصة على التذاكر:' : 'Platform Ticket Fee Commission:'}</span>
                    <span className="font-mono text-purple-600">{form.defaultCommissionPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={form.defaultCommissionPercent}
                    onChange={(e) =>
                      setForm({ ...form, defaultCommissionPercent: Number(e.target.value) })
                    }
                    className="w-full accent-purple-600"
                  />
                  <span className="text-[10px] text-slate-400">
                    {isAr ? 'النسبة المقتطعة تلقائياً من مبيعات تذاكر المنظمين' : 'Deducted automatically from gross event ticket sales'}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{isAr ? 'مهلة استرداد التذاكر التلقائي:' : 'Ticket Refund Grace Window:'}</span>
                    <span className="font-mono text-purple-600">{form.ticketRefundGraceHours} hours</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="12"
                    value={form.ticketRefundGraceHours}
                    onChange={(e) =>
                      setForm({ ...form, ticketRefundGraceHours: Number(e.target.value) })
                    }
                    className="w-full accent-purple-600"
                  />
                  <span className="text-[10px] text-slate-400">
                    {isAr
                      ? 'أقصى مهلة يسمح فيها للعميل بطلب الاسترداد قبل انطلاق الفعالية'
                      : 'Hours before event start time where attendee can request cancellation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Governance, B2B Rules & Maintenance */}
        {(activeTab === 'all' || activeTab === 'governance') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Governance & B2B Rules */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Shield className="size-4 text-emerald-600" />
                  <span>{isAr ? 'حوكمة سوق الشركات والـ KYC' : 'Marketplace & B2B Governance'}</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'إلزامية اعتماد الـ KYC لتقديم عروض الأسعار:' : 'Require Verified KYC for RFQ Quotations:'}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'منع الشركات غير المعتمدة من تقديم عروض أسعار للمنظمين'
                        : 'Prevent unverified vendors from submitting pricing or accepting RFQs'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.requireKYCForRFQs}
                    onChange={(e) => setForm({ ...form, requireKYCForRFQs: e.target.checked })}
                    className="size-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'فتح تسجيل شركات التنفيذ الجديدة:' : 'Allow New Vendor Registrations:'}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'السماح للشركات بإنشاء حسابات جديدة ورفع وثائق التوثيق'
                        : 'Permit new B2B companies to register and upload KYC certificates'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.allowNewVendorRegistrations}
                    onChange={(e) =>
                      setForm({ ...form, allowNewVendorRegistrations: e.target.checked })
                    }
                    className="size-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>
              </div>
            </div>

            {/* Maintenance Mode & Safety Flags */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="size-4 text-red-600" />
                  <span>{isAr ? 'طوارئ وصيانة المنظومة' : 'Emergency & System State'}</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'فحص المحتوى التلقائي بالـ AI:' : 'AI Auto-flag Suspicious Event Content:'}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'كشف النصوص المخالفة أو التكرار غير المصرح به قبل التحويل لطابور المشرف'
                        : 'Pre-screen submissions with NLP classifier before queuing for human review'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.aiAutoFlagSuspiciousContent}
                    onChange={(e) =>
                      setForm({ ...form, aiAutoFlagSuspiciousContent: e.target.checked })
                    }
                    className="size-5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-red-50/60 border border-red-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-red-950 block">
                      {isAr ? 'وضع صيانة المنصة الكامل (Maintenance Mode):' : 'System Maintenance Mode:'}
                    </span>
                    <span className="text-red-700 text-[11px]">
                      {isAr
                        ? 'إيقاف حجز التذاكر وطرح الـ RFQ مؤقتاً وعرض شاشة الصيانة'
                        : 'Temporarily pause marketplace transactions and show maintenance page'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.maintenanceMode}
                    onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
                    className="size-5 rounded text-red-600 focus:ring-red-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};