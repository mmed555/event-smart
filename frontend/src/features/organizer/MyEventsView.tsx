import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import clsx from 'clsx';

export const MyEventsView: React.FC = () => {
  const {
    events,
    organizerProfile,
    setActiveOrganizerTab,
    setSelectedCommandCenterEventId,
    publishOrganizerEvent,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeStatusTab, setActiveStatusTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const myEvents = events.filter(
    (e) => e.organizer === organizerProfile.organization || e.id === 1 || e.id === 2
  );

  const filteredEvents = myEvents.filter((ev) => {
    const matchesStatus =
      activeStatusTab === 'All' ||
      (activeStatusTab === 'Published' && (ev.status === 'Published' || !ev.status)) ||
      ev.status === activeStatusTab;

    const matchesSearch =
      searchQuery.trim() === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || ev.cat === selectedCategory;

    return matchesStatus && matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Technology', 'Business', 'Design', 'Music', 'Education'];

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'قائمة الفعاليات الخاصة بي (My Events)' : 'My Events & Command Hub'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'متابعة وإدارة فعالياتك، تحديث التذاكر والأجندة، ومراقبة حالة المراجعة والنشر'
              : 'Manage your event portfolio, ticket sales, speakers, agenda, and approval status'}
          </p>
        </div>

        <button
          onClick={() => setActiveOrganizerTab('wizard')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition shrink-0"
        >
          <Plus className="size-4" />
          <span>{isAr ? 'إنشاء فعالية جديدة' : 'Create New Event'}</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'All', labelEn: 'All Events', labelAr: 'كل الفعاليات', count: myEvents.length },
          { id: 'Published', labelEn: 'Published', labelAr: 'المنشورة', count: myEvents.filter((e) => e.status === 'Published' || !e.status).length },
          { id: 'PendingApproval', labelEn: 'In Review', labelAr: 'قيد الاعتماد', count: myEvents.filter((e) => e.status === 'PendingApproval').length },
          { id: 'Draft', labelEn: 'Drafts', labelAr: 'المسودات', count: myEvents.filter((e) => e.status === 'Draft').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatusTab(tab.id)}
            className={clsx(
              'inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition shrink-0',
              activeStatusTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            <span
              className={clsx(
                'rounded-md px-1.5 py-0.2 text-[10px]',
                activeStatusTab === tab.id ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
        <div className="relative flex-1 w-full">
          <Search className="absolute start-3.5 top-3 size-4 text-slate-400" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث باسم الفعالية، المدينة، أو القاعة...' : 'Search events by title, venue, city...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 ps-10 pe-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-44 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-hidden"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? (isAr ? 'كل التصنيفات' : 'All Categories') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Cards / Table */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Calendar className="mx-auto size-10 text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد فعاليات مطابقة لبحثك' : 'No events match your criteria'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'جرب تغيير فلاتر البحث أو أنشئ فعالية جديدة الآن' : 'Try adjusting filters or create a new event'}
            </p>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const occupancy = Math.round(((ev.sold || 0) / (ev.capacity || 500)) * 100);
            return (
              <div
                key={ev.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="size-20 rounded-2xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={clsx(
                            'rounded-md px-2 py-0.5 text-[10px] font-bold border',
                            ev.status === 'Published' || !ev.status
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : ev.status === 'PendingApproval'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          )}
                        >
                          {ev.status || 'Published'}
                        </span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {ev.cat}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {ev.date}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">{ev.title}</h3>
                      <p className="text-xs text-slate-500">
                        {ev.venue} · {ev.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedCommandCenterEventId(ev.id);
                        setActiveOrganizerTab('command-center', { eventId: ev.id });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                    >
                      <SlidersHorizontal className="size-3.5" />
                      <span>{isAr ? 'مركز قيادة الفعالية' : 'Command Center'}</span>
                    </button>

                    {ev.status === 'Draft' && (
                      <button
                        onClick={() => publishOrganizerEvent(ev.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                      >
                        <CheckCircle2 className="size-3.5" />
                        <span>{isAr ? 'نشر الآن' : 'Publish'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedCommandCenterEventId(ev.id);
                        setActiveOrganizerTab('wizard', { editEventId: ev.id });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Edit className="size-3.5" />
                      <span>{isAr ? 'تعديل' : 'Edit'}</span>
                    </button>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isAr ? 'سعر التذكرة:' : 'Starting Price:'}</span>
                    <span className="font-bold text-slate-800 font-mono">{ev.price} ج.م</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isAr ? 'التذاكر المباعة:' : 'Tickets Sold:'}</span>
                    <span className="font-bold text-slate-800 font-mono">{ev.sold || 0} / {ev.capacity || 500}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isAr ? 'نسبة الإشغال:' : 'Occupancy Rate:'}</span>
                    <span className="font-bold text-blue-600 font-mono">{occupancy}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isAr ? 'الإيرادات المحققة:' : 'Gross Revenue:'}</span>
                    <span className="font-bold text-emerald-600 font-mono">
                      {((ev.sold || 0) * ev.price).toLocaleString()} ج.م
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
