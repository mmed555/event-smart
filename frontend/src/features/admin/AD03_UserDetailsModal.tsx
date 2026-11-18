import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Modal } from '../../components/ui/Modal';
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  Ticket,
} from 'lucide-react';
import clsx from 'clsx';

interface AD03_UserDetailsModalProps {
  userId: string | null;
  onClose: () => void;
}

export const AD03_UserDetailsModal: React.FC<AD03_UserDetailsModalProps> = ({
  userId,
  onClose,
}) => {
  const { adminUsers, toggleUserStatus } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const user = adminUsers.find((u) => u.id === userId);

  const [showSuspendInput, setShowSuspendInput] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');

  if (!user) return null;

  const handleToggleStatus = () => {
    if (user.active) {
      if (!showSuspendInput) {
        setShowSuspendInput(true);
        return;
      }
      if (!suspendReason.trim()) return;
      toggleUserStatus(user.id, suspendReason);
      setShowSuspendInput(false);
      setSuspendReason('');
    } else {
      toggleUserStatus(user.id);
    }
  };

  return (
    <Modal
      open={!!userId}
      onClose={onClose}
      title={
        isAr
          ? `AD03 — الملف الإداري وسجل التدقيق (${user.nameAr || user.name})`
          : `AD03 — User Profile & Audit Dossier (${user.name})`
      }
      w="max-w-3xl"
    >
      <div className="space-y-6">
        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="size-16 rounded-2xl object-cover ring-2 ring-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  {isAr ? user.nameAr || user.name : user.name}
                </h3>
                <span
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider',
                    user.role === 'organizer' && 'bg-blue-100 text-blue-700',
                    user.role === 'vendor' && 'bg-purple-100 text-purple-700',
                    user.role === 'attendee' && 'bg-emerald-100 text-emerald-700',
                    user.role === 'admin' && 'bg-slate-900 text-white'
                  )}
                >
                  <Shield className="size-3" />
                  {user.role}
                </span>
                <span
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold',
                    user.active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  )}
                >
                  {user.active ? (
                    <>
                      <CheckCircle className="size-3" /> {isAr ? 'نشط' : 'Active'}
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3" /> {isAr ? 'مجمّد' : 'Suspended'}
                    </>
                  )}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="size-3 text-slate-400" /> {user.email}
                </span>
                {user.phone && (
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="size-3 text-slate-400" /> {user.phone}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'معرف الحساب' : 'User ID'}
            </span>
            <span className="font-mono text-xs font-bold text-slate-700">{user.id}</span>
          </div>
        </div>

        {/* Suspended Reason Banner if suspended */}
        {!user.active && user.suspendedReason && (
          <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 border border-red-200 text-red-800 text-xs">
            <AlertTriangle className="size-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold">{isAr ? 'سبب التجميد الإداري:' : 'Administrative Suspension Reason:'}</p>
              <p className="mt-1 leading-relaxed text-red-700">{user.suspendedReason}</p>
            </div>
          </div>
        )}

        {/* Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Calendar className="size-3.5" />
              <span>{isAr ? 'تاريخ الانضمام' : 'Joined'}</span>
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-slate-800">{user.joinedDate}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Clock className="size-3.5" />
              <span>{isAr ? 'آخر ظهور' : 'Last Active'}</span>
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-slate-800">{user.lastLogin || 'N/A'}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              {user.role === 'organizer' ? <Briefcase className="size-3.5" /> : <Ticket className="size-3.5" />}
              <span>
                {user.role === 'organizer'
                  ? isAr ? 'الفعاليات' : 'Events'
                  : user.role === 'vendor'
                  ? isAr ? 'عروض الـ RFQ' : 'Quotes'
                  : isAr ? 'التذاكر' : 'Tickets'}
              </span>
            </div>
            <p className="mt-1 font-mono text-sm font-black text-slate-900">
              {user.eventsCount ?? user.rfqsCount ?? user.bookingsCount ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Activity className="size-3.5" />
              <span>{isAr ? 'حجم التعاملات' : 'Volume'}</span>
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-blue-600">
              {user.spentOrEarned || 'EGP 0'}
            </p>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Activity className="size-4 text-blue-600" />
              {isAr ? 'سجل العمليات والتدقيق الإداري (Audit Log)' : 'Audit & Security Trail'}
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              {user.auditLog.length} {isAr ? 'عمليات مسجلة' : 'records'}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {user.auditLog.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3 text-xs border border-slate-100"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Clock className="size-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {isAr ? log.actionAr || log.action : log.action}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-slate-600">
                    {isAr ? log.detailsAr || log.details : log.details}
                  </p>
                  <span className="mt-1 inline-block text-[10px] font-bold text-slate-400">
                    {isAr ? 'بواسطة:' : 'By:'} {log.actor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suspension Action Box */}
        {showSuspendInput && (
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 space-y-3">
            <label className="block text-xs font-bold text-red-900">
              {isAr
                ? 'سبب تجميد الحساب (إلزامي لمراجعة الشكاوى والتدقيق القانوني):'
                : 'Suspension Reason (Mandatory for audit and legal compliance):'}
            </label>
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب سبب التجميد بالتفصيل (مثل: مخالفة شروط الخدمة، عدم الالتزام بطلبات الـ RFQ...)'
                  : 'Specify reason (e.g. Terms violation, SLA breach, suspicious activity...)'
              }
              rows={2}
              className="w-full rounded-xl border border-red-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>

          <button
            onClick={handleToggleStatus}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs',
              user.active
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            )}
          >
            {user.active ? (
              <>
                <XCircle className="size-4" />
                {showSuspendInput
                  ? isAr ? 'تأكيد تجميد الحساب' : 'Confirm Suspension'
                  : isAr ? 'تجميد الحساب' : 'Suspend Account'}
              </>
            ) : (
              <>
                <CheckCircle className="size-4" />
                {isAr ? 'إعادة تفعيل الحساب' : 'Reactivate Account'}
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
