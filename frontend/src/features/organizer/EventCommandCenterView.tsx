import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { TicketTier } from '../../types';
import {
  Calendar,
  Ticket,
  Users,
  Mic,
  Award,
  ListOrdered,
  QrCode,
  Briefcase,
  Plus,
  Trash2,
  Download,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

export const EventCommandCenterView: React.FC = () => {
  const {
    events,
    selectedCommandCenterEventId,
    setSelectedCommandCenterEventId,
    updateEventTiers,
    updateEventAgenda,
    updateEventSpeakers,
    updateEventSponsors,
    setActiveOrganizerTab,
    tickets,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<
    'overview' | 'tiers' | 'agenda' | 'speakers' | 'sponsors' | 'bookings'
  >('overview');

  const currentEvent =
    events.find((e) => e.id === selectedCommandCenterEventId) || events[0] || null;

  if (!currentEvent) {
    return (
      <div className="p-12 text-center text-slate-500">
        {isAr ? 'لم يتم العثور على الفعالية المطلوبة.' : 'No event selected.'}
      </div>
    );
  }

  const occupancy = Math.round(
    ((currentEvent.sold || 0) / (currentEvent.capacity || 500)) * 100
  );
  const totalRevenue = (currentEvent.sold || 0) * currentEvent.price;

  // Bookings list for this event
  const eventBookings = tickets.filter((t) => t.eventId === currentEvent.id);

  // Quick helper to handle tier price/capacity edits
  const handleUpdateTier = (tierId: string, field: string, val: any) => {
    if (!currentEvent.tiers) return;
    const updated = currentEvent.tiers.map((t) =>
      t.id === tierId ? { ...t, [field]: val } : t
    );
    updateEventTiers(currentEvent.id, updated);
  };

  const handleAddTier = () => {
    const existing = currentEvent.tiers || [];
    const newTier: TicketTier = {
      id: `t_${Date.now()}`,
      name: isAr ? 'فئة تذاكر إضافية' : 'Additional Tier',
      price: 300,
      capacity: 100,
      remaining: 100,
      perks: [isAr ? 'دخول القاعة العامة' : 'General hall access'],
    };
    updateEventTiers(currentEvent.id, [...existing, newTier]);
  };

  const handleRemoveTier = (tierId: string) => {
    if (!currentEvent.tiers) return;
    updateEventTiers(
      currentEvent.id,
      currentEvent.tiers.filter((t) => t.id !== tierId)
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Event Switcher */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 px-3 py-1 text-[11px] font-bold text-blue-300">
              <Sparkles className="size-3.5 text-blue-400" />
              <span>{isAr ? 'مركز قيادة الفعالية (Event Command Hub)' : 'Event Command Center'}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">ID #{currentEvent.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{isAr ? 'تبديل الفعالية:' : 'Switch Event:'}</span>
            <select
              value={currentEvent.id}
              onChange={(e) => setSelectedCommandCenterEventId(Number(e.target.value))}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-white focus:outline-hidden"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black">{currentEvent.title}</h1>
            <p className="text-xs text-slate-400">
              {currentEvent.venue} · {currentEvent.city} · {currentEvent.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveOrganizerTab('checkin')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-soft"
            >
              <QrCode className="size-4" />
              <span>{isAr ? 'فتح بوابة المسح' : 'Live Gate Scanner'}</span>
            </button>
            <button
              onClick={() => setActiveOrganizerTab('ai-planner')}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              <Briefcase className="size-4 text-indigo-400" />
              <span>{isAr ? 'مشتريات ولوجستيات' : 'Procure RFQ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'overview', labelEn: 'Overview & KPIs', labelAr: 'نظرة عامة ومؤشرات', icon: Calendar },
          { id: 'tiers', labelEn: 'Ticket Tiers', labelAr: 'فئات وأسعار التذاكر', icon: Ticket },
          { id: 'agenda', labelEn: 'Agenda Builder', labelAr: 'جدول الأعمال والجلسات', icon: ListOrdered },
          { id: 'speakers', labelEn: 'Speakers', labelAr: 'المتحدثون', icon: Mic },
          { id: 'sponsors', labelEn: 'Sponsors', labelAr: 'الرعاة والشركاء', icon: Award },
          { id: 'bookings', labelEn: 'Attendees & Bookings', labelAr: 'الحجوزات وقائمة الحضور', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                'inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition shrink-0',
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="size-3.5" />
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
              <span className="text-xs text-slate-500 font-bold">{isAr ? 'التذاكر المباعة' : 'Tickets Sold'}</span>
              <div className="text-2xl font-black text-slate-900">{currentEvent.sold || 0}</div>
              <p className="text-[10px] text-blue-600 font-bold">{occupancy}% {isAr ? 'نسبة الإشغال' : 'Occupancy'}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
              <span className="text-xs text-slate-500 font-bold">{isAr ? 'السعة الإجمالية' : 'Total Capacity'}</span>
              <div className="text-2xl font-black text-slate-900">{currentEvent.capacity || 500}</div>
              <p className="text-[10px] text-slate-400">{isAr ? 'مقعد محجوز ومتاح' : 'Max seats'}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
              <span className="text-xs text-slate-500 font-bold">{isAr ? 'إجمالي المبيعات' : 'Gross Sales'}</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">
                {totalRevenue.toLocaleString()} <span className="text-xs text-slate-400 font-normal">ج.م</span>
              </div>
              <p className="text-[10px] text-slate-400">{isAr ? 'مدفوعات مؤكدة' : 'Confirmed revenue'}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
              <span className="text-xs text-slate-500 font-bold">{isAr ? 'فئات التذاكر' : 'Tier Count'}</span>
              <div className="text-2xl font-black text-indigo-600">
                {currentEvent.tiers?.length || 2}
              </div>
              <p className="text-[10px] text-slate-400">{isAr ? 'مستويات تسعير' : 'Active ticket tiers'}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-3">
            <h3 className="text-sm font-bold text-slate-900">{isAr ? 'نبذة ووصف الفعالية' : 'Event Description'}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{currentEvent.description}</p>
          </div>
        </div>
      )}

      {/* TAB 2: Ticket Tiers Management (O06) */}
      {activeTab === 'tiers' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'إدارة فئات التذاكر والأسعار (O06)' : 'Ticket Tiers & Pricing Management'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'تحديد أسعار وسعات ومميزات كل فئة تذاكر' : 'Manage capacity, pricing, and perks for each tier'}
              </p>
            </div>
            <button
              onClick={handleAddTier}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
            >
              <Plus className="size-3.5" />
              <span>{isAr ? 'إضافة فئة تذاكر' : 'Add Ticket Tier'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {(currentEvent.tiers || []).map((t) => (
              <div key={t.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{t.name}</span>
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
                      {t.price} ج.م
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'السعة المتاحة:' : 'Capacity:'} <b>{t.capacity}</b> · {isAr ? 'المتبقي:' : 'Remaining:'} <b>{t.remaining}</b>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {t.perks.map((perk, i) => (
                      <span key={i} className="rounded-md bg-blue-50/60 px-2 py-0.5 text-[10px] text-blue-700">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    value={t.price}
                    onChange={(e) => handleUpdateTier(t.id, 'price', Number(e.target.value))}
                    className="w-24 rounded-xl border border-slate-200 px-2.5 py-1 text-xs font-mono font-bold text-slate-800"
                  />
                  <button
                    onClick={() => handleRemoveTier(t.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Agenda Builder (O07) */}
      {activeTab === 'agenda' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'جدول الأعمال والجلسات (Agenda Builder O07)' : 'Event Program & Agenda Builder'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'بناء الجلسات الزمنية والقاعات وتعيين المتحدثين' : 'Schedule session times, stages, and speakers'}
              </p>
            </div>
            <button
              onClick={() => {
                const ag = currentEvent.agenda || [];
                updateEventAgenda(currentEvent.id, [
                  ...ag,
                  {
                    id: `ag_${Date.now()}`,
                    time: '02:00 PM',
                    title: isAr ? 'جلسة تقنية متقدمة' : 'Deep-Dive Technical Session',
                    speaker: isAr ? 'متحدث ضيف' : 'Guest Speaker',
                  },
                ]);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
            >
              <Plus className="size-3.5" />
              <span>{isAr ? 'إضافة جلسة' : 'Add Session'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {(currentEvent.agenda || []).map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-[#2563EB] text-xs font-bold font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">{item.time}</span>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    {item.speaker && (
                      <p className="text-[11px] text-slate-500">
                        {isAr ? 'المتحدث:' : 'Speaker:'} {item.speaker}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const filtered = (currentEvent.agenda || []).filter((_, i) => i !== idx);
                    updateEventAgenda(currentEvent.id, filtered);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Speakers (O08) */}
      {activeTab === 'speakers' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'إدارة المتحدثين (Speakers Management O08)' : 'Speakers & Keynotes'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'السيرة الذاتية والصور والروابط المهنية للمتحدثين' : 'Manage headshots, bios, and LinkedIn profiles'}
              </p>
            </div>
            <button
              onClick={() => {
                const spk = currentEvent.speakers || [];
                updateEventSpeakers(currentEvent.id, [
                  ...spk,
                  {
                    id: String(spk.length + 1),
                    name: isAr ? 'د. سارة المنشاوي' : 'Dr. Sarah El-Menshawy',
                    role: isAr ? 'باحثة ذكاء اصطناعي' : 'Lead AI Researcher',
                    company: 'Cairo University',
                    bio: 'Specialist in multilingual NLP models.',
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
                  },
                ]);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
            >
              <Plus className="size-3.5" />
              <span>{isAr ? 'إضافة متحدث' : 'Add Speaker'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(currentEvent.speakers || []).map((s) => (
              <div key={s.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="size-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{s.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{s.role}</p>
                  <p className="text-[10px] text-slate-400 truncate">{s.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Sponsors (O09) */}
      {activeTab === 'sponsors' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'الرعاة والشركاء (Sponsors O09)' : 'Event Sponsors & Partners'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'فئات الرعاية وشعارات الشركات الراعية' : 'Sponsorship tiers (Platinum, Gold, Silver)'}
              </p>
            </div>
            <button
              onClick={() => {
                const sp = currentEvent.sponsors || [];
                updateEventSponsors(currentEvent.id, [
                  ...sp,
                  {
                    id: String(sp.length + 1),
                    name: 'Vodafone Egypt',
                    tier: 'Platinum',
                    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
                  },
                ]);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
            >
              <Plus className="size-3.5" />
              <span>{isAr ? 'إضافة راعي' : 'Add Sponsor'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(currentEvent.sponsors || []).map((sp) => (
              <div key={sp.id} className="p-4 rounded-2xl border border-slate-200 bg-white text-center space-y-2">
                <img src={sp.logo} alt={sp.name} className="size-10 mx-auto object-contain" />
                <h4 className="text-xs font-bold text-slate-900">{sp.name}</h4>
                <span className="inline-block rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {sp.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Bookings & Attendees (O10) */}
      {activeTab === 'bookings' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'جدول الحجوزات والحضور (Event Bookings O10)' : 'Registered Attendees & Bookings'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'بيانات الحاضرين وأكواد التذاكر وحالة الدخول' : 'Attendee records, ticket hash codes, and check-in state'}
              </p>
            </div>
            <button
              onClick={() => alert(isAr ? 'تم تصدير سجل الحضور بصيغة CSV' : 'Exported attendance log to CSV')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <Download className="size-3.5" />
              <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {eventBookings.map((bk) => (
              <div key={bk.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{bk.attendeeName}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {bk.qrToken || bk.id} · {bk.tierName}
                  </p>
                </div>
                <span
                  className={clsx(
                    'rounded-md px-2 py-0.5 text-[10px] font-bold',
                    bk.status === 'Used'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  )}
                >
                  {bk.status === 'Used' ? (isAr ? 'حضر بالفعل' : 'Checked In') : (isAr ? 'مؤكد (لم يحضر)' : 'Confirmed')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
