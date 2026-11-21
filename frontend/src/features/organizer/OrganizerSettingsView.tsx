import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Save } from 'lucide-react';

export const OrganizerSettingsView: React.FC = () => {
  const { organizerProfile, updateOrganizerProfile } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [orgName, setOrgName] = useState<string>(organizerProfile.organization);
  const [leadName, setLeadName] = useState<string>(organizerProfile.name);
  const [email, setEmail] = useState<string>(organizerProfile.email);
  const [phone, setPhone] = useState<string>(organizerProfile.phone);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganizerProfile({
      organization: orgName,
      name: leadName,
      email,
      phone,
    });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          {isAr ? 'إعدادات المنظمة والملف التعريفي' : 'Organization & Security Settings'}
        </h1>
        <p className="text-xs text-slate-500">
          {isAr
            ? 'تحديث بيانات الكيان المنظم، معلومات التواصل، ومفاتيح توثيق بوابات الدخول'
            : 'Manage organization profile, contact records, bank accounts, and gate scanner security'}
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          {isAr ? 'بيانات الكيان المنظم' : 'Organization Profile'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'اسم المنظمة / الشركة المنظمة' : 'Organization Name'}
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'اسم المفوض بإدارة الفعاليات' : 'Authorized Organizer Lead'}
            </label>
            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'البريد الإلكتروني التجاري' : 'Official Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'رقم الهاتف المعتمد' : 'Contact Phone'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 focus:border-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Security & Gate Tokens */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            {isAr ? 'أمان التذاكر والتحقق عند البوابات (Gate Anti-Replay Tokens)' : 'Gate Cryptographic Security'}
          </h3>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">{isAr ? 'مفتاح توقيع البوابات اللحظي:' : 'Active Gate Secret Salt:'}</span>
              <span className="font-mono text-emerald-600 font-bold">HMAC-SHA256 · ACTIVE</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isAr
                ? 'يتم تشفير كافة تذاكر QR تلقائياً بتوقيع غير قابل للتزييف مع منع فوري لأي محاولة إعادة استخدام التذكرة مرتين.'
                : 'All digital attendee tickets are cryptographically signed with instant atomic transaction anti-replay enforcement.'}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
          >
            <Save className="size-4" />
            <span>{isAr ? 'حفظ التعديلات' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
