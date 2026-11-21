import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import clsx from 'clsx';

export const BookingsListView: React.FC = () => {
  const { tickets } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredTickets = tickets.filter((tk) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Used' && tk.status === 'Used') ||
      (statusFilter === 'Confirmed' && tk.status !== 'Used');

    const matchesSearch =
      searchQuery.trim() === '' ||
      tk.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tk.qrToken && tk.qrToken.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tk.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'سجل الحجوزات والحضور العام (Attendee Bookings O10)' : 'Attendee Bookings & Attendance List'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'قائمة الحضور المسجلين لكافة الفعاليات، أكواد التذاكر الرقمية وحالة التحقق عند البوابات'
              : 'Search registered attendees, digital ticket QR tokens, seat allocations, and gate verification states'}
          </p>
        </div>

        <button
          onClick={() => alert(isAr ? 'تم تصدير سجل الحضور بصيغة CSV' : 'Exported attendance records to CSV')}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-slate-800 transition shrink-0"
        >
          <Download className="size-4" />
          <span>{isAr ? 'تصدير القائمة (CSV)' : 'Export CSV'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
        <div className="relative flex-1 w-full">
          <Search className="absolute start-3.5 top-3 size-4 text-slate-400" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث باسم الحاضر، كود التذكرة، أو اسم الفعالية...' : 'Search by attendee name, ticket code, or event...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 ps-10 pe-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-hidden"
          >
            <option value="All">{isAr ? 'كل حالات الحضور' : 'All Attendance States'}</option>
            <option value="Used">{isAr ? 'حضر بالفعل (Checked In)' : 'Checked In'}</option>
            <option value="Confirmed">{isAr ? 'مؤكد (لم يحضر بعد)' : 'Awaiting Arrival'}</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4 text-start">{isAr ? 'اسم الحاضر' : 'Attendee Name'}</th>
                <th className="p-4 text-start">{isAr ? 'الفعالية المستهدفة' : 'Event'}</th>
                <th className="p-4 text-start">{isAr ? 'فئة التذكرة' : 'Ticket Tier'}</th>
                <th className="p-4 text-start">{isAr ? 'رمز التذكرة' : 'Ticket QR Token'}</th>
                <th className="p-4 text-start">{isAr ? 'المقعد / القاعة' : 'Seat / Hall'}</th>
                <th className="p-4 text-start">{isAr ? 'حالة الدخول' : 'Gate Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">{t.attendeeName}</td>
                  <td className="p-4 text-slate-700 font-medium">{t.eventTitle}</td>
                  <td className="p-4">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {t.tierName}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-600">{t.qrToken || t.id}</td>
                  <td className="p-4 text-slate-500">{t.seat || 'General Access'}</td>
                  <td className="p-4">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border',
                        t.status === 'Used'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      )}
                    >
                      {t.status === 'Used' ? (
                        <>
                          <CheckCircle2 className="size-3" />
                          <span>{isAr ? 'حضر (Used)' : 'Admitted'}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="size-3" />
                          <span>{isAr ? 'مؤكد (غير مستخدم)' : 'Confirmed'}</span>
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
