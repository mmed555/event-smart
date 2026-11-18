import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AdminDisputeItem } from '../../types';
import { Modal } from '../../components/ui/Modal';
import {
  AlertCircle,
  Clock,
  CheckCircle,
  MessageSquare,
  ShieldAlert,
  Calendar,
} from 'lucide-react';
import clsx from 'clsx';

export const AD09_DisputesView: React.FC = () => {
  const { adminDisputes, updateDisputeStatus } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('Open');
  const [selectedDispute, setSelectedDispute] = useState<AdminDisputeItem | null>(null);
  const [arbitrationNote, setArbitrationNote] = useState('');

  const filtered = adminDisputes.filter((d) => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    return true;
  });

  const openCount = adminDisputes.filter((d) => d.status === 'Open').length;
  const inProgressCount = adminDisputes.filter((d) => d.status === 'In Progress').length;
  const resolvedCount = adminDisputes.filter((d) => d.status === 'Resolved').length;

  const handleSendArbitration = (newStatus?: 'In Progress' | 'Resolved') => {
    if (!selectedDispute) return;
    const targetStatus = newStatus || selectedDispute.status;
    updateDisputeStatus(selectedDispute.id, targetStatus, arbitrationNote || undefined);
    setArbitrationNote('');
    // refresh selected dispute view from updated state
    const updated = adminDisputes.find((d) => d.id === selectedDispute.id);
    if (updated) setSelectedDispute(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldAlert className="size-6 text-red-600" />
            {isAr ? 'AD09 — إدارة النزاعات والشكاوى والتحكيم' : 'AD09 — Disputes & Complaints Resolution'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'غرفة التحكيم الإداري لفض النزاعات بين منظمي الفعاليات وشركات التنفيذ وطلبات استرداد التذاكر'
              : 'Enterprise arbitration desk for SLA disputes between Organizers, Execution Vendors, and Attendees'}
          </p>
        </div>

        {openCount > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 border border-red-200">
            <AlertCircle className="size-3.5 text-red-600" />
            <span>
              {openCount} {isAr ? 'شكاوى مفتوحة تتطلب تحكيم' : 'open disputes'}
            </span>
          </span>
        )}
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setStatusFilter('Open')}
          className={clsx(
            'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0',
            statusFilter === 'Open'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-red-700 bg-red-50 hover:bg-red-100'
          )}
        >
          <AlertCircle className="size-3.5" />
          <span>{isAr ? 'مفتوحة (Open)' : 'Open Disputes'}</span>
          <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{openCount}</span>
        </button>

        <button
          onClick={() => setStatusFilter('In Progress')}
          className={clsx(
            'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0',
            statusFilter === 'In Progress'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
          )}
        >
          <Clock className="size-3.5" />
          <span>{isAr ? 'قيد التحكيم' : 'In Progress'}</span>
          <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{inProgressCount}</span>
        </button>

        <button
          onClick={() => setStatusFilter('Resolved')}
          className={clsx(
            'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0',
            statusFilter === 'Resolved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
          )}
        >
          <CheckCircle className="size-3.5" />
          <span>{isAr ? 'تم الحل' : 'Resolved'}</span>
          <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{resolvedCount}</span>
        </button>

        <button
          onClick={() => setStatusFilter('All')}
          className={clsx(
            'rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0',
            statusFilter === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {isAr ? 'الكل' : 'All'}
        </button>
      </div>

      {/* Disputes List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400">
            {isAr ? 'لا توجد نزاعات أو شكاوى في هذا القسم' : 'No disputes recorded in this category'}
          </div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-slate-400">{d.id}</span>
                  <span
                    className={clsx(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      d.priority === 'Critical' && 'bg-red-100 text-red-800',
                      d.priority === 'High' && 'bg-amber-100 text-amber-800',
                      d.priority === 'Medium' && 'bg-blue-100 text-blue-800',
                      d.priority === 'Low' && 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {d.priority} Priority
                  </span>
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold',
                      d.status === 'Open' && 'bg-red-50 text-red-700 border border-red-200',
                      d.status === 'In Progress' && 'bg-amber-50 text-amber-700 border border-amber-200',
                      d.status === 'Resolved' && 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    )}
                  >
                    {d.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Calendar className="size-3" />
                  <span>{d.createdAt}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {isAr ? d.titleAr || d.title : d.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{d.description}</p>
              </div>

              {/* Parties Comparison Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    {isAr ? 'الطرف الشاكي (Complainant):' : 'Complainant:'}
                  </span>
                  <span className="font-bold text-slate-900">{d.complainant.name}</span>
                  <span className="block text-[11px] font-mono text-slate-500">
                    {d.complainant.role} · {d.complainant.email}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    {isAr ? 'الطرف المشكو في حقه (Respondent):' : 'Respondent:'}
                  </span>
                  <span className="font-bold text-slate-900">{d.respondent.name}</span>
                  <span className="block text-[11px] font-mono text-slate-500">
                    {d.respondent.role} · {d.respondent.email}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MessageSquare className="size-3.5" />
                  <span>{d.timeline.length} {isAr ? 'رسائل ومذكرات مسجلة' : 'case notes'}</span>
                </div>

                <button
                  onClick={() => setSelectedDispute(d)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  <span>{isAr ? 'فتح ملف التحكيم' : 'Open Case Dossier'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Case Dossier Modal */}
      {selectedDispute && (
        <Modal
          open={!!selectedDispute}
          onClose={() => setSelectedDispute(null)}
          title={`Case Dossier: ${selectedDispute.id}`}
          w="max-w-2xl"
        >
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isAr ? selectedDispute.titleAr || selectedDispute.title : selectedDispute.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {selectedDispute.description}
              </p>
            </div>

            {/* Timeline Log */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {isAr ? 'سجل المحادثات والمذكرات الرسمية' : 'Case Timeline & Statements'}
              </h4>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {selectedDispute.timeline.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {entry.author}{' '}
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          ({entry.role})
                        </span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{entry.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{entry.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Arbitration Input Box */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-900">
                {isAr ? 'مذكرة المشرف وقرار التحكيم:' : 'Admin Arbitration Statement / Verdict:'}
              </label>
              <textarea
                value={arbitrationNote}
                onChange={(e) => setArbitrationNote(e.target.value)}
                rows={3}
                placeholder={
                  isAr
                    ? 'اكتب حيثيات القرار الإداري (مثل: الموافقة على الاسترداد المالي، توجيه إنذار، أو تعويض الطرفين...)'
                    : 'Enter official admin arbitration notes or resolution conditions...'
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSendArbitration('In Progress')}
                  className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100"
                >
                  {isAr ? 'تحويل لحالة قيد الإجراء' : 'Mark In Progress'}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendArbitration('Resolved')}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  <CheckCircle className="size-4" />
                  <span>{isAr ? 'اعتماد الحل وإغلاق الشكوى' : 'Resolve & Close Dispute'}</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
