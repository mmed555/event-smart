import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorSettingsSkeleton } from '../../components/ui/skeleton';
import {
  Smartphone,
  Save,
  Building2,
  Bell,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

export const VendorSettingsView: React.FC = () => {
  const { vendorPayoutSettings, updateVendorPayoutSettings, vendorProfile, updateVendorProfile, isLoading } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [bankName, setBankName] = useState(vendorPayoutSettings.bankName);
  const [accountHolder, setAccountHolder] = useState(vendorPayoutSettings.accountHolderName);
  const [iban, setIban] = useState(vendorPayoutSettings.iban);
  const [swift, setSwift] = useState(vendorPayoutSettings.swiftCode);
  const [instapay, setInstapay] = useState(vendorPayoutSettings.instapayHandle || '');
  const [vodafoneCash, setVodafoneCash] = useState(vendorPayoutSettings.vodafoneCash || '');
  const [schedule, setSchedule] = useState(vendorPayoutSettings.payoutSchedule);
  const [isAvailable, setIsAvailable] = useState(vendorProfile.isAvailable);

  const [notifRfqs, setNotifRfqs] = useState(true);
  const [notifQuotes, setNotifQuotes] = useState(true);
  const [notifReviews, setNotifReviews] = useState(true);
  const [copiedIban, setCopiedIban] = useState(false);

  if (isLoading) {
    return <VendorSettingsSkeleton />;
  }

  const handleCopyIban = () => {
    navigator.clipboard.writeText(iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendorPayoutSettings({
      bankName,
      accountHolderName: accountHolder,
      iban,
      swiftCode: swift,
      instapayHandle: instapay,
      vodafoneCash,
      payoutSchedule: schedule,
    });
    updateVendorProfile({ isAvailable });
  };

  return (
    <div className="space-y-5 w-full">
      <form onSubmit={handleSave} className="space-y-5">
        {/* 1. Availability Status Toggle Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-soft transition hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'حالة التوفر لاستقبال طلبات الـ RFQ' : 'Market Availability Status'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {isAr
                  ? 'عند تفعيل الحالة، تظهر شركتك تلقائياً في ترشيحات الذكاء الاصطناعي للمنظمين وتتلقى دعوات عروض الأسعار.'
                  : 'When active, your company appears in AI matching rankings and receives incoming organizer RFQ bids.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAvailable(!isAvailable)}
              className={clsx(
                'flex items-center justify-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-xs shrink-0',
                isAvailable
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              )}
            >
              <span className={clsx('size-2 rounded-full', isAvailable ? 'bg-white' : 'bg-slate-400')} />
              <span>
                {isAvailable
                  ? isAr
                    ? 'متاح ومستعد للعمل'
                    : 'Available for Bids'
                  : isAr
                  ? 'مشغول مؤقتاً'
                  : 'Temporarily Paused'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Corporate Bank Account Details */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                <Building2 className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'بيانات الحساب البنكي الرسمي للتحويلات' : 'Corporate Bank Account for Payouts'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {isAr ? 'يتم تحويل مستحقات العقود وأوامر التشغيل المنفذة مباشرة لهذا الحساب' : 'Contract payouts and milestone clearances will be wired to this account'}
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="size-3.5" />
              <span>{isAr ? 'حساب تجاري معتمد' : 'Verified Corporate'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'اسم البنك التجاري' : 'Bank Name'}
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-start font-medium text-slate-800 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'اسم صاحب الحساب (مطابق للسجل التجاري)' : 'Account Holder Name (as in CR)'}
              </label>
              <input
                type="text"
                required
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-start font-medium text-slate-800 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'رقم الحساب الدولي (IBAN)' : 'International Bank Account Number (IBAN)'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono text-start font-bold text-slate-900 focus:bg-white focus:border-[#2563EB] focus:outline-hidden pe-16 transition"
                />
                <button
                  type="button"
                  onClick={handleCopyIban}
                  className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg bg-white px-2 py-1 text-[11px] font-bold text-slate-600 hover:text-blue-600 border border-slate-200 flex items-center gap-1 shadow-2xs"
                >
                  {copiedIban ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  <span>{copiedIban ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'رمز السويفت كود (SWIFT / BIC)' : 'SWIFT Code'}
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono text-start font-bold text-slate-900 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'دورية التحويل التلقائي للمستحقات' : 'Automatic Payout Schedule'}
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value as 'weekly' | 'biweekly' | 'monthly')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-start font-medium text-slate-800 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              >
                <option value="weekly">{isAr ? 'أسبوعياً (كل يوم خميس)' : 'Weekly (Every Thursday)'}</option>
                <option value="biweekly">{isAr ? 'كل أسبوعين' : 'Bi-weekly'}</option>
                <option value="monthly">{isAr ? 'شهرياً (نهاية كل شهر ميلادي)' : 'Monthly (End of month)'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Fast Payouts (Instapay & Mobile Wallets) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Smartphone className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'وسائل الدفع اللحظي والمحافظ الإلكترونية (مصر)' : 'Instant Egypt Transfers (Instapay & Wallets)'}
              </h3>
              <span className="text-[11px] text-slate-400">
                {isAr ? 'لتسهيل استقبال العرابين والدفعات السريعة الفورية' : 'For rapid deposits and expedited settlements'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'عنوان الدفع اللحظي (Instapay IPA Handle)' : 'Instapay IPA Handle'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={instapay}
                onChange={(e) => setInstapay(e.target.value)}
                placeholder="company@instapay"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono text-start font-bold text-slate-900 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isAr ? 'رقم المحفظة الإلكترونية (فودافون كاش / أورنج / اتصالات)' : 'Mobile Wallet Number (Vodafone Cash / etc.)'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={vodafoneCash}
                onChange={(e) => setVodafoneCash(e.target.value)}
                placeholder="+20 102 345 6789"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono text-start font-bold text-slate-900 focus:bg-white focus:border-[#2563EB] focus:outline-hidden transition"
              />
            </div>
          </div>
        </div>

        {/* 4. Notification Preferences */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Bell className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'تفضيلات الإشعارات والتنبيهات الفورية' : 'Notification Preferences'}
              </h3>
              <span className="text-[11px] text-slate-400">
                {isAr ? 'حدد القنوات والأحداث التي ترغب في تلقي تنبيهات فورية بشأنها' : 'Control how and when you get alerted about bids and orders'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">
                  {isAr ? 'إشعارات طلبات عروض الأسعار الجديدة (Matching RFQs)' : 'New Matching RFQ Alerts'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isAr ? 'إشعار فوري عند طرح منظم لطلب يطابق كتالوج ومعدات شركتك بنسبة > 80%' : 'Instant alert when an organizer posts an RFQ matching your catalog'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifRfqs}
                onChange={(e) => setNotifRfqs(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">
                  {isAr ? 'إشعارات قبول العروض وترسية العقود' : 'Quote Award & Acceptance Alerts'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isAr ? 'تنبيه فوري عند قبول المنظم لعرض السعر وبدء أمر التشغيل' : 'Instant notification when an organizer accepts your bid'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifQuotes}
                onChange={(e) => setNotifQuotes(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">
                  {isAr ? 'تنبيهات تقييمات المنظمين الجديدة' : 'New Organizer Review Alerts'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isAr ? 'إشعار عند إضافة المنظم لتقييم جديد بعد إتمام الفعالية' : 'Notify when an organizer submits a post-event rating'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifReviews}
                onChange={(e) => setNotifReviews(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Sticky Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {isAr ? 'يتم حفظ البيانات وتطبيقها فورياً على جميع العمليات' : 'Changes take effect immediately across all services'}
          </span>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-2.5 text-xs shadow-soft transition transform hover:-translate-y-0.5"
          >
            <Save className="size-4" />
            <span>{isAr ? 'حفظ إعدادات الحساب' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
