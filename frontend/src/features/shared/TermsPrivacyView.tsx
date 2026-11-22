import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { TermsPrivacySkeleton } from '../../components/ui/skeleton';
import {
  Scale,
  Printer,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

export const TermsPrivacyView: React.FC = () => {
  const { isLoading: isSkeletonPreview } = useApp();
  const { language } = useI18n();
  const location = useLocation();
  const isAr = language === 'ar';

  const defaultTab = location.pathname.includes('privacy') ? 'privacy' : 'terms';
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (isSkeletonPreview) {
    return <TermsPrivacySkeleton />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-10">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
            <Sparkles className="size-3" />
            <span>S10 · {isAr ? 'الحوكمة والشروط القانونية' : 'Legal & Governance Hub'}</span>
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'شروط الخدمة وسياسة الخصوصية' : 'Terms of Service & Privacy Policy'}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {isAr
              ? 'آخر تحديث: 1 نوفمبر 2026 · متوافق مع القانون المصري لحماية البيانات رقم 151 لسنة 2020'
              : 'Last updated: November 1, 2026 · Compliant with Egyptian Personal Data Protection Law No. 151/2020'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Switcher */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('terms')}
              className={clsx(
                'rounded-lg px-3.5 py-1.5 text-xs font-bold transition',
                activeTab === 'terms'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {isAr ? 'شروط الخدمة' : 'Terms of Service'}
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={clsx(
                'rounded-lg px-3.5 py-1.5 text-xs font-bold transition',
                activeTab === 'privacy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <Printer className="size-3.5" />
            <span>{isAr ? 'طباعة الوثيقة' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar Navigation */}
        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isAr ? 'فهرس البنود والمحتوى' : 'Table of Contents'}
            </h3>
            <nav className="space-y-1 text-xs">
              {activeTab === 'terms' ? (
                <>
                  <a href="#t1" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    1. {isAr ? 'الأهلية وحساب المستخدم' : 'Eligibility & Account'}
                  </a>
                  <a href="#t2" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    2. {isAr ? 'تذاكر QR وأمان البوابات' : 'QR Tickets & Anti-Replay'}
                  </a>
                  <a href="#t3" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    3. {isAr ? 'سوق المناقصات وحساب الضمان' : 'B2B RFQ & Escrow'}
                  </a>
                  <a href="#t4" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    4. {isAr ? 'حسابات الذكاء الاصطناعي' : 'AI Suggestions & Golden Rule'}
                  </a>
                  <a href="#t5" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    5. {isAr ? 'الإلغاء واسترداد الأموال' : 'Refunds & Cancellation'}
                  </a>
                </>
              ) : (
                <>
                  <a href="#p1" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    1. {isAr ? 'البيانات التي نجمعها' : 'Data We Collect'}
                  </a>
                  <a href="#p2" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    2. {isAr ? 'خزينة وثائق KYC المشفرة' : 'Encrypted KYC Vault'}
                  </a>
                  <a href="#p3" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    3. {isAr ? 'قانون حماية البيانات رقم 151' : 'Egyptian Law 151 Compliance'}
                  </a>
                  <a href="#p4" className="block py-1.5 px-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium">
                    4. {isAr ? 'أمان التشفير والمدفوعات' : 'PCI-DSS & Encryption'}
                  </a>
                </>
              )}
            </nav>
          </div>

          <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100 text-xs text-blue-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Scale className="size-4 text-blue-600" />
              <span>{isAr ? 'الحماية القانونية' : 'Legal Compliance'}</span>
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              {isAr
                ? 'جميع المعاملات المالية ومناقصات التجهيزات محمية بعقود إلكترونية رسمية تخضع للقوانين المنظمة في جمهورية مصر العربية.'
                : 'All transactions and B2B procurement tenders are protected under Egyptian electronic commerce laws.'}
            </p>
          </div>
        </div>

        {/* Main Document Body */}
        <div className="lg:col-span-3 rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-soft space-y-8">
          {activeTab === 'terms' ? (
            <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Section 1 */}
              <section id="t1" className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">1</span>
                  <h2>{isAr ? 'الأهلية، الحسابات، وصلاحيات الوصول (RBAC)' : 'Eligibility, Accounts, and RBAC'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'باستخدام منصة Smart Event، فإنك تقر بأن عمرك لا يقل عن 18 عاماً وأنك مؤهل قانونياً لإبرام العقود. تنقسم المنظومة إلى أربعة أدوار صلاحية رئيسية (حاضر، منظم فعاليات، شركة تنفيذ/مورد، ومشرف عام)، ويلتزم كل مستخدم بعدم محاولة تجاوز حدود صلاحياته المعتمدة.'
                    : 'By using Smart Event, you represent that you are at least 18 years old and legally competent. The system enforces Role-Based Access Control (RBAC) across Attendees, Organizers, Vendors, and Admins. Attempting to bypass access controls is strictly prohibited.'}
                </p>
              </section>

              {/* Section 2 */}
              <section id="t2" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">2</span>
                  <h2>{isAr ? 'تذاكر الـ QR وحماية بوابات الدخول من إعادة الاستخدام' : 'Digital QR Tickets & Gate Anti-Replay Protection'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'تعتبر تذكرة الدخول رمزاً رقمياً مشفراً غير قابل للتحويل أو التكرار. بمجرد مسح رمز الـ QR عند بوابة الفعالية، يتم تحويل حالة التذكرة في قاعدة البيانات تلقائياً وبشكل ذري (Atomic Transaction) إلى مستخدمة (USED). أي محاولة لمسح لقطة شاشة مكررة ستؤدي لإنذار الرفض الفوري لحماية الفعالية من التزوير.'
                    : 'Tickets carry HMAC-SHA256 cryptographically signed tokens. Verification executes within an atomic database transaction transitioning the ticket state to USED once. Duplicate screenshot attempts are blocked instantaneously.'}
                </p>
              </section>

              {/* Section 3 */}
              <section id="t3" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">3</span>
                  <h2>{isAr ? 'سوق التجهيزات B2B، طلبات عروض الأسعار وحساب الضمان' : 'B2B Logistics Marketplace, RFQs & Escrow Protection'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'يتم إيداع المبالغ المالية لعقود التجهيزات اللوجستية في حساب الضمان البنكي الآمن (Escrow). لا يتم تحرير الدفعة النهائية إلا بعد اعتماد المنظم الفعلي لاستلام المعدات وفحص جودتها في موقع الفعالية دون مخالفات لشروط الـ SLA.'
                    : 'Contract values are held in secure escrow. Milestone release schedules enforce 30% advance, 40% upon verified on-site equipment arrival, and 30% upon event conclusion and positive sign-off.'}
                </p>
              </section>

              {/* Section 4 */}
              <section id="t4" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">4</span>
                  <h2>{isAr ? 'القاعدة الذهبية للذكاء الاصطناعي (The Golden Rule of AI)' : 'The Golden Rule of AI (Advisory Only)'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'جميع مخرجات محركات الذكاء الاصطناعي (مثل تقديرات كميات الصوت وشاشات العرض واقتراحات الفعاليات وترشيحات الموردين) هي توصيات استشارية بحتة (Advisory Suggestions). المسؤولية والقرار النهائي والتعاقدي يقع بالكامل على عاتق المنظم والمورد البشري بعد المراجعة والاعتماد.'
                    : 'All AI outputs (logistics equipment plans, hybrid recommendations, vendor match scores) have zero business authority. They are advisory suggestions requiring human validation and explicit user confirmation.'}
                </p>
              </section>

              {/* Section 5 */}
              <section id="t5" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">5</span>
                  <h2>{isAr ? 'الإلغاء، تأجيل الفعاليات، وسياسة الاسترداد' : 'Cancellation, Postponement & Refund Policies'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'يحق للحاضرين استرداد قيمة التذكرة بنسبة 100% في حال إلغاء الفعالية من المنظم. في حال الإلغاء بطلب من الحاضر قبل 7 أيام من الفعالية، تطبق سياسة الاسترداد المحددة لكل نوع تذكرة مع خصم رسوم المعالجة الإدارية 5%.'
                    : '100% refund is guaranteed if an event is cancelled by the organizer. Attendee-initiated cancellations requested up to 7 days prior adhere to ticket tier policies subject to a 5% processing fee.'}
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Privacy 1 */}
              <section id="p1" className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">1</span>
                  <h2>{isAr ? 'البيانات الشخصية التي نجمعها' : 'Personal Data Collection'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'نجمع بياناتك الضرورية لتشغيل الخدمات فقط: الاسم، البريد الإلكتروني، رقم الهاتف، وسجلات حضور الفعاليات، بالإضافة للمستندات الرسمية للشركات المعتمدة. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض إعلانية.'
                    : 'We collect minimal necessary personal data: full name, verified email, telephone, attendance timestamps, and corporate verification docs. We never monetize or sell personal data to third parties.'}
                </p>
              </section>

              {/* Privacy 2 */}
              <section id="p2" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">2</span>
                  <h2>{isAr ? 'حماية وثائق الشركات في خزينة KYC المشفرة' : 'Encrypted KYC Vault & Document Storage'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'تُحفظ ملفات السجل التجاري والبطاقة الضريبية لشركات التنفيذ في خزائن تخزين سحابية معزولة (Protected KYC Vault) ومحمية بتشفير AES-256، ولا يمكن الوصول إليها عبر روابط إنترنت عامة، ويقتصر فحصها على المشرفين المصرح لهم.'
                    : 'Vendor Commercial Registers and Tax Cards reside inside an isolated, access-controlled vault encrypted with AES-256. Public unauthenticated access is strictly blocked at network gateways.'}
                </p>
              </section>

              {/* Privacy 3 */}
              <section id="p3" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">3</span>
                  <h2>{isAr ? 'الامتثال لقانون حماية البيانات الشخصية المصري (رقم 151 لسنة 2020)' : 'Egyptian Data Protection Law No. 151/2020 Compliance'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'تلتزم Smart Event بالمعايير المقررة في القانون المصري لحماية البيانات رقم 151 لسنة 2020، بما يضمن حق المستخدم في الوصول لبياناته، تصحيحها، طلب حذفها، أو سحب الموافقة على معالجتها في أي وقت عبر التواصل مع مسؤول حماية البيانات (DPO).'
                    : 'We operate in strict alignment with Egyptian Personal Data Protection Law No. 151/2020, guaranteeing rights of access, rectification, erasure, and consent withdrawal through our Data Protection Officer.'}
                </p>
              </section>

              {/* Privacy 4 */}
              <section id="p4" className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-slate-900 text-white text-xs">4</span>
                  <h2>{isAr ? 'أمان التشفير، كلمات المرور وبوابات الدفع (PCI-DSS)' : 'Encryption, Passwords & PCI-DSS Compliance'}</h2>
                </div>
                <p>
                  {isAr
                    ? 'تُشفر جميع كلمات المرور بخوارزميات تجزئة غير قابلة للعكس (Argon2id/bcrypt). وتتم معالجة بطاقات الدفع البنكية عبر قنوات مشفرة وفق معايير PCI-DSS المستوى الأول دون حفظ بيانات البطاقات الحساسة على خوادم المنظومة.'
                    : 'Passwords are irreversibly salted and hashed. Payment transactions route through PCI-DSS Level 1 certified gateways; no raw credit card details are ever stored on platform servers.'}
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
