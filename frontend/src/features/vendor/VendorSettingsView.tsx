import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Settings,
  CreditCard,
  Smartphone,
  Save,
} from 'lucide-react';
import clsx from 'clsx';

export const VendorSettingsView: React.FC = () => {
  const { vendorPayoutSettings, updateVendorPayoutSettings, vendorProfile, updateVendorProfile } = useApp();
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
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="size-6 text-[#2563EB]" />
          <span>{isAr ? 'إعدادات الحساب والمستحقات المالية' : 'Account & Payout Settings'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {isAr
            ? 'إدارة الحسابات البنكية، وسائل استقبال الدفعات، وحالة استقبال الطلبات (V16)'
            : 'Configure bank payouts, instant transfers (Instapay/Vodafone Cash), and availability status'}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Availability Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'حالة التوفر لاستقبال طلبات الـ RFQ' : 'Market Availability Status'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'عند التعطيل، لن تظهر شركتك في ترشيحات الـ AI للطلبات الجديدة مؤقتاً'
                : 'When paused, your profile will not be matched for incoming organizer RFQs'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition border',
              isAvailable
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            )}
          >
            <span className={clsx('size-2 rounded-full', isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400')} />
            <span>{isAvailable ? (isAr ? 'متاح ومستعد للعمل' : 'Available') : isAr ? 'مشغول / غير متاح' : 'Busy / Paused'}</span>
          </button>
        </div>

        {/* Banking and Payout Methods */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="size-4 text-[#2563EB]" />
              <span>{isAr ? 'بيانات الحساب البنكي الرسمي للتحويلات' : 'Corporate Bank Account Details'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'يتم تحويل مستحقات العقود وأوامر التشغيل المنفذة مباشرة لهذا الحساب'
                : 'Contract payouts and milestone clearances will be wired to this account'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'اسم البنك' : 'Bank Name'}
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'اسم صاحب الحساب (مطابق للسجل التجاري)' : 'Account Holder Name'}
              </label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'رقم الحساب الدولي (IBAN)' : 'International Bank Account Number (IBAN)'}
              </label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'رمز السويفت (SWIFT / BIC)' : 'SWIFT Code'}
              </label>
              <input
                type="text"
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'دورية التحويل التلقائي للمستحقات' : 'Automatic Payout Schedule'}
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value as 'weekly' | 'biweekly' | 'monthly')}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              >
                <option value="weekly">{isAr ? 'أسبوعياً (كل خميس)' : 'Weekly (Every Thursday)'}</option>
                <option value="biweekly">{isAr ? 'كل أسبوعين' : 'Bi-weekly'}</option>
                <option value="monthly">{isAr ? 'شهرياً' : 'Monthly'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Local Instant Transfers: Instapay & Vodafone Cash */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="size-4 text-emerald-600" />
              <span>{isAr ? 'وسائل الدفع اللحظي والمحافظ الإلكترونية (مصر)' : 'Instant Egypt Transfers (Instapay & Wallets)'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr ? 'لتسهيل استقبال العرابين والدفعات السريعة' : 'For rapid deposits and expedited settlements'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'عنوان الدفع اللحظي (Instapay IPA Handle)' : 'Instapay Handle'}
              </label>
              <input
                type="text"
                value={instapay}
                onChange={(e) => setInstapay(e.target.value)}
                placeholder="name@instapay"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'رقم المحفظة الإلكترونية (فودافون كاش)' : 'Vodafone Cash / Wallet Number'}
              </label>
              <input
                type="text"
                value={vodafoneCash}
                onChange={(e) => setVodafoneCash(e.target.value)}
                placeholder="+20 10..."
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-2.5 text-xs shadow-soft transition"
          >
            <Save className="size-4" />
            <span>{isAr ? 'حفظ إعدادات الحساب' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
