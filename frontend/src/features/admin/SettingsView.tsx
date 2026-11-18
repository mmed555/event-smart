import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Settings,
  CreditCard,
  Shield,
  Percent,
  Sparkles,
  Save,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { adminSettings, updateAdminSettings } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [form, setForm] = useState({ ...adminSettings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(form);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="size-6 text-slate-700" />
            {isAr ? 'الإعدادات العامة وحوكمة المنظومة' : 'Platform System Settings'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'ضبط وتكوين بوابات الدفع التجريبية، سياسات الإلغاء، ونسب العمولة ومفاتيح الميزات التشغيلية'
              : 'Configure payment adapter sandbox, platform commission, cancellation grace periods, and feature flags'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
        >
          <Save className="size-4" />
          <span>{isAr ? 'حفظ كافة الإعدادات' : 'Save System Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment & Mock Sandbox Gateway */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CreditCard className="size-4 text-blue-600" />
              {isAr ? 'بوابة الدفع والـ Sandbox (Phase 1 Mock)' : 'Payment Gateway Sandbox (Phase 1)'}
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
                {isAr ? 'يحدد وقت انتظار عملية الدفع في الفرونت إند لاختبار حالات الـ Loading' : 'Adjusts simulated network delay before payment completion'}
              </span>
            </div>
          </div>
        </div>

        {/* Governance & B2B Rules */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Shield className="size-4 text-emerald-600" />
              {isAr ? 'حوكمة سوق الشركات والـ KYC' : 'Marketplace & B2B Governance'}
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

        {/* Financial Policies & Commission */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Percent className="size-4 text-purple-600" />
              {isAr ? 'السياسات المالية ونسب المنصة' : 'Financial & Commission Policies'}
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
                {isAr ? 'أقصى مهلة يسمح فيها للعميل بطلب الاسترداد قبل انطلاق الفعالية' : 'Hours before event start time where attendee can request cancellation'}
              </span>
            </div>
          </div>
        </div>

        {/* AI Safety & System Controls */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-600" />
              {isAr ? 'حوكمة الذكاء الاصطناعي والصيانة' : 'AI Safety & Maintenance Flags'}
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
      </form>
    </div>
  );
};
