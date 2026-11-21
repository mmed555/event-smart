import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { HelpCenterSkeleton } from '../../components/ui/skeleton';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  Ticket,
  Briefcase,
  Store,
  ShieldCheck,
  MessageSquare,
  Mail,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import clsx from 'clsx';

interface FaqItem {
  id: string;
  category: 'all' | 'attendee' | 'organizer' | 'vendor' | 'security';
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'attendee',
    question: 'How does the digital QR ticket anti-replay security work?',
    questionAr: 'كيف يعمل نظام أمان تذاكر الـ QR ومنع إعادة الاستخدام (Anti-Replay)؟',
    answer: 'Every ticket generates an HMAC-SHA256 cryptographically signed dynamic QR token. Once scanned at the event gate, our atomic database transaction immediately transitions ticket state to USED, rejecting any duplicate or screenshot attempts in under 1 second.',
    answerAr: 'تنتج كل تذكرة رمز QR ديناميكي موقع بتشفير HMAC-SHA256. بمجرد مسحها عند بوابة الدخول، تقوم المعاملة الذرية في قاعدة البيانات بتحويل حالة التذكرة فوراً إلى USED، مما يرفض أي محاولة تكرار أو مسح لقطات شاشة في أقل من ثانية واحدة.',
  },
  {
    id: 'faq-2',
    category: 'attendee',
    question: 'Can I get a refund if an event is cancelled or postponed?',
    questionAr: 'هل يمكنني استرداد قيمة التذكرة في حال إلغاء أو تأجيل الفعالية؟',
    answer: 'Yes! If an event is officially cancelled by the organizer, automated refunds are issued back to your original payment method or platform wallet within 3–5 business days.',
    answerAr: 'نعم! في حال تم إلغاء الفعالية رسمياً من قبل المنظم، يتم رد المبالغ تلقائياً إلى وسيلة الدفع الأصلية أو محفظتك في المنصة خلال 3 إلى 5 أيام عمل.',
  },
  {
    id: 'faq-3',
    category: 'organizer',
    question: 'How do I use the AI Logistics Equipment Planner?',
    questionAr: 'كيف أستخدم مخطط التجهيزات اللوجستية الذكي بالذكاء الاصطناعي؟',
    answer: 'Navigate to AI Equipment Planner in your Organizer dashboard, type your event brief (e.g. "Tech summit for 1,000 attendees in Cairo with 2 stages"), and our AI model will estimate sound systems, LED walls, lighting, and badges. You can edit line items and convert them into an RFQ with one click.',
    answerAr: 'انتقل إلى شاشة المخطط الذكي للوجستيات في لوحة المنظم، واكتب متطلبات فعاليتك (مثل: "قمة تقنية لـ 1,000 حاضر في القاهرة مع مسرحين")، ليقترح الذكاء الاصطناعي أنظمة الصوت وشاشات الـ LED والإضاءة والبطاقات، ويمكنك تعديلها وتحويلها لمناقصة RFQ بنقرة واحدة.',
  },
  {
    id: 'faq-4',
    category: 'organizer',
    question: 'How fast is gate attendance synchronized across gate staff?',
    questionAr: 'ما مدى سرعة مزامنة بيانات حضور البوابات بين فريق التنظيم؟',
    answer: 'We utilize persistent Socket.IO gate rooms. When any gate scanner validates a ticket, attendance counts and scan logs sync to the dashboard and other scanners in real-time (< 200ms latency).',
    answerAr: 'نستخدم غرف Socket.IO مباشرة للبوابات. عندما يتحقق أي ماسح ضوئي من تذكرة، تتزامن عدادات الحضور وسجلات المسح على لوحة التحكم وجميع الأجهزة في الوقت الفعلي بأقل من 200 مللي ثانية.',
  },
  {
    id: 'faq-5',
    category: 'vendor',
    question: 'What documents are required for Vendor KYC verification?',
    questionAr: 'ما هي المستندات المطلوبة لتوثيق وتفعيل حساب شركة التنفيذ (KYC)؟',
    answer: 'To bid on RFQs and receive escrow payments, vendors must upload a valid Egyptian Commercial Register (سجل تجاري ساري) and Tax Card (بطاقة ضريبية). Documents are stored in encrypted vaults and reviewed by Admin within 24 hours.',
    answerAr: 'للمشاركة في المناقصات واستلام المستحقات، يلزم رفع مستخرج حديث من السجل التجاري والبطاقة الضريبية. تُحفظ الملفات في خزائن مشفرة وتتم مراجعتها من قبل الإدارة خلال 24 ساعة.',
  },
  {
    id: 'faq-6',
    category: 'vendor',
    question: 'When are contract escrow milestone payments released?',
    questionAr: 'متى يتم تحرير ودفع مستحقات مراحل عقود التجهيزات (Milestones)؟',
    answer: 'Funds are held in secure escrow: 30% advance on contract award, 40% upon equipment arrival & setup sign-off, and the final 30% after successful event completion and organizer review.',
    answerAr: 'تُحفظ الأموال في حساب ضمان آمن (Escrow): 30% دفعة مقدمة عند توقيع العقد، 40% عند وصول المعدات واعتماد الفحص الميداني، و30% النهائية بعد انتهاء الفعالية وتقييم المنظم.',
  },
  {
    id: 'faq-7',
    category: 'security',
    question: 'How does Smart Event protect user privacy and payment data?',
    questionAr: 'كيف تضمن المنظومة خصوصية بيانات المستخدمين ومعلومات الدفع؟',
    answer: 'We comply with Egyptian Data Protection Law No. 151/2020. Passwords are hash-encrypted with Argon2/bcrypt, all API traffic requires TLS 1.3, and payment gateways operate under PCI-DSS compliance without saving raw card numbers.',
    answerAr: 'نلتزم بقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020. كلمات المرور مشفرة بخوارزميات Argon2/bcrypt، وجميع الاتصالات محمية بـ TLS 1.3، وبوابات الدفع حاصلة على شهادات PCI-DSS دون تخزين أرقام البطاقات.',
  },
];

export const HelpCenterView: React.FC = () => {
  const { isLoading: isSkeletonPreview, showToast } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'attendee' | 'organizer' | 'vendor' | 'security'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  if (isSkeletonPreview) {
    return <HelpCenterSkeleton />;
  }

  const categories = [
    { id: 'all', label: isAr ? 'جميع الأسئلة' : 'All FAQs', icon: Sparkles },
    { id: 'attendee', label: isAr ? 'الحاضرين والتذاكر' : 'Attendees & Tickets', icon: Ticket },
    { id: 'organizer', label: isAr ? 'منظمي الفعاليات' : 'Organizers & Gates', icon: Briefcase },
    { id: 'vendor', label: isAr ? 'شركات التنفيذ والمناقصات' : 'Vendors & RFQ', icon: Store },
    { id: 'security', label: isAr ? 'الأمان والخصوصية' : 'Security & Trust', icon: ShieldCheck },
  ] as const;

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.question.toLowerCase().includes(query) ||
      item.questionAr.includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      item.answerAr.includes(query);
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-10">
      {/* 1. Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
          <HelpCircle className="size-7" />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
            <Sparkles className="size-3" />
            <span>S06 · {isAr ? 'مركز المساعدة والدعم الفني' : 'Help Center & Knowledge Base'}</span>
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {isAr
              ? 'إجابات شاملة لجميع الاستفسارات المتعلقة بحجز التذاكر، إدارة بوابات الدخول، ومناقصات التجهيزات اللوجستية.'
              : 'Comprehensive answers regarding ticket bookings, gate check-in security, and logistics vendor tenders.'}
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative pt-2">
          <Search className="absolute start-4 top-5 size-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث في الأسئلة (مثال: حجز تذكرة، توثيق KYC، بوابات QR، إلغاء الفعالية)...'
                : 'Search questions (e.g., ticket booking, KYC verify, QR scanner, cancellation)...'
            }
            className="w-full rounded-2xl border border-slate-200 bg-white ps-11 pe-4 py-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-soft focus:border-blue-500 focus:outline-hidden transition"
          />
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx(
                'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-xs',
                isActive
                  ? 'bg-slate-900 text-white shadow-soft'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              )}
            >
              <Icon className="size-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-800">
              {isAr ? 'لم نعثر على نتائج مطابقة لبحثك' : 'No matching questions found'}
            </p>
            <p className="text-xs text-slate-500">
              {isAr ? 'جرب كلمات بحث أخرى أو تواصل مباشرة مع فريق الدعم أدناه' : 'Try searching with different terms or contact our support team below'}
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={clsx(
                  'rounded-2xl border transition-all duration-200 overflow-hidden bg-white',
                  isOpen ? 'border-blue-500 shadow-soft' : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-start gap-4 transition hover:bg-slate-50/50"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {isAr ? faq.questionAr : faq.question}
                  </span>
                  <div
                    className={clsx(
                      'size-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 bg-slate-50/40">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {isAr ? faq.answerAr : faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Support Contact Cards */}
      <div className="max-w-3xl mx-auto pt-6 border-t border-slate-200">
        <h3 className="text-center text-sm font-bold text-slate-900 mb-4">
          {isAr ? 'ما زلت بحاجة إلى مساعدة؟ تواصل مع فريق الدعم الفني' : 'Still need assistance? Connect with our support team'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-2">
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">{isAr ? 'البريد الإلكتروني' : 'Email Support'}</h4>
            <p className="text-[11px] text-slate-500">support@smart-event.eg</p>
            <a
              href="mailto:support@smart-event.eg"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
            >
              <span>{isAr ? 'إرسال رسالة' : 'Send email'}</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-2">
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">{isAr ? 'واتساب للمنظمين' : 'WhatsApp Desk'}</h4>
            <p className="text-[11px] text-slate-500">+20 100 234 5678</p>
            <button
              onClick={() => showToast(isAr ? 'جاري فتح محادثة WhatsApp...' : 'Opening WhatsApp chat...', 'ok')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
            >
              <span>{isAr ? 'محادثة فورية' : 'Chat now'}</span>
              <ExternalLink className="size-3" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-2">
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <PhoneCall className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">{isAr ? 'الخط الساخن للفعاليات' : 'Hotline 24/7'}</h4>
            <p className="text-[11px] text-slate-500">19876</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="size-3" />
              <span>{isAr ? 'متاح أثناء الفعاليات' : 'Active during events'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
