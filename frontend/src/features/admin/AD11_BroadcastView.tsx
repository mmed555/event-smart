import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Bell,
  Send,
  Clock,
  Radio,
  Mail,
  Smartphone,
} from 'lucide-react';
import clsx from 'clsx';

export const AD11_BroadcastView: React.FC = () => {
  const { adminBroadcasts, sendBroadcast } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [bodyAr, setBodyAr] = useState('');
  const [targetRole, setTargetRole] = useState<'all' | 'attendee' | 'organizer' | 'vendor'>('all');
  const [priority, setPriority] = useState<'normal' | 'urgent' | 'critical'>('normal');
  const [channels, setChannels] = useState<('in_app' | 'email' | 'push')[]>(['in_app', 'email']);

  const getRecipientEstimate = () => {
    if (targetRole === 'all') return 8240;
    if (targetRole === 'organizer') return 184;
    if (targetRole === 'vendor') return 48;
    return 8008; // attendees
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !bodyEn.trim()) return;

    sendBroadcast({
      title: titleEn,
      titleAr: titleAr || titleEn,
      body: bodyEn,
      bodyAr: bodyAr || bodyEn,
      targetRole,
      priority,
      sentBy: 'Super Admin',
      recipientsCount: getRecipientEstimate(),
      channels,
    });

    setTitleEn('');
    setTitleAr('');
    setBodyEn('');
    setBodyAr('');
  };

  const toggleChannel = (ch: 'in_app' | 'email' | 'push') => {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Radio className="size-6 text-blue-600" />
            {isAr ? 'AD11 — مركز بث الإشعارات النظامية' : 'AD11 — Broadcast Notifications Center'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'إنشاء وبث التنبيهات والإعلانات الرسمية الموجهة لمجموعات المستخدمين عبر القنوات المتعددة'
              : 'Broadcast multi-channel administrative alerts and announcements targeted to platform user groups'}
          </p>
        </div>
      </div>

      {/* Grid: Composer on Left (7 cols), History on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Composer Form */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="size-4 text-blue-600" />
            {isAr ? 'إنشاء إشعار نظامي جديد' : 'Compose System Broadcast'}
          </h3>

          <form onSubmit={handleSend} className="space-y-4">
            {/* Target Audience & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'الفئة المستهدفة:' : 'Target Audience:'}
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                >
                  <option value="all">{isAr ? 'كل المستخدمين (All Users)' : 'All Platform Users'}</option>
                  <option value="organizer">{isAr ? 'منظمو الفعاليات فقط' : 'Organizers Only'}</option>
                  <option value="vendor">{isAr ? 'شركات التنفيذ B2B فقط' : 'Vendors Only'}</option>
                  <option value="attendee">{isAr ? 'حضور الفعاليات فقط' : 'Attendees Only'}</option>
                </select>
                <span className="mt-1 block text-[11px] font-mono text-blue-600">
                  {isAr ? 'الوصول المتوقع:' : 'Estimated reach:'} ~{getRecipientEstimate().toLocaleString()} {isAr ? 'مستلم' : 'users'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'مستوى الأهمية:' : 'Priority Level:'}
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                >
                  <option value="normal">{isAr ? 'عادي (Normal)' : 'Normal Announcement'}</option>
                  <option value="urgent">{isAr ? 'هام وعاجل (Urgent)' : 'Urgent Advisory'}</option>
                  <option value="critical">{isAr ? 'حرج (Critical Alert)' : 'Critical System Notice'}</option>
                </select>
              </div>
            </div>

            {/* Channels Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'قنوات الإرسال المعتمدة:' : 'Dispatch Channels:'}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleChannel('in_app')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition border',
                    channels.includes('in_app')
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-slate-200 text-slate-400'
                  )}
                >
                  <Bell className="size-3.5" />
                  <span>{isAr ? 'داخل المنصة (In-App)' : 'In-App Notifications'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleChannel('email')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition border',
                    channels.includes('email')
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-slate-200 text-slate-400'
                  )}
                >
                  <Mail className="size-3.5" />
                  <span>{isAr ? 'بريد إلكتروني (Email)' : 'Email Digest'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleChannel('push')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition border',
                    channels.includes('push')
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-slate-200 text-slate-400'
                  )}
                >
                  <Smartphone className="size-3.5" />
                  <span>{isAr ? 'إشعارات الموبايل (Push)' : 'Mobile Push'}</span>
                </button>
              </div>
            </div>

            {/* English Title & Body */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'عنوان الإشعار (English):' : 'Title (English):'}
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Scheduled Platform Maintenance this Sunday"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'نص الرسالة (English):' : 'Message Body (English):'}
                </label>
                <textarea
                  required
                  value={bodyEn}
                  onChange={(e) => setBodyEn(e.target.value)}
                  rows={2}
                  placeholder="Provide comprehensive details about the alert..."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Arabic Title & Body */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'عنوان الإشعار (بالعربية):' : 'Title (Arabic):'}
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: تنويه صيانة دورية للمنظومة يوم الأحد"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'نص الرسالة (بالعربية):' : 'Message Body (Arabic):'}
                </label>
                <textarea
                  value={bodyAr}
                  onChange={(e) => setBodyAr(e.target.value)}
                  rows={2}
                  placeholder="اكتب تفاصيل التنويه بدقة للمستخدمين..."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
              >
                <Send className="size-4" />
                <span>{isAr ? 'بث الإشعار فوراً' : 'Broadcast Notification Now'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Broadcast History on Right */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-slate-500" />
              {isAr ? 'سجل الإشعارات المرسلة سابقاً' : 'Broadcast Dispatch History'}
            </span>
            <span className="font-mono text-xs text-slate-400 font-bold">
              {adminBroadcasts.length} sent
            </span>
          </h3>

          <div className="space-y-3">
            {adminBroadcasts.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                      b.priority === 'critical' && 'bg-red-100 text-red-800',
                      b.priority === 'urgent' && 'bg-amber-100 text-amber-800',
                      b.priority === 'normal' && 'bg-blue-100 text-blue-800'
                    )}
                  >
                    {b.priority}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{b.sentAt}</span>
                </div>

                <h4 className="font-bold text-slate-900">
                  {isAr ? b.titleAr : b.title}
                </h4>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {isAr ? b.bodyAr : b.body}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                  <span>Target: <strong className="uppercase">{b.targetRole}</strong></span>
                  <span className="font-mono font-bold text-slate-700">
                    {b.recipientsCount.toLocaleString()} delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
