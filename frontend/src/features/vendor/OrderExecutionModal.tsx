import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorServiceOrderItem } from '../../types';
import {
  X,
  CheckCircle2,
  MessageSquare,
  Send,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

interface OrderExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: VendorServiceOrderItem | null;
}

export const OrderExecutionModal: React.FC<OrderExecutionModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const { toggleOrderMilestone, addOrderNote, updateServiceOrderStatus } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [noteText, setNoteText] = useState('');

  if (!isOpen || !order) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addOrderNote(order.id, noteText.trim());
    setNoteText('');
  };

  const handleCompleteAll = () => {
    updateServiceOrderStatus(order.id, 'COMPLETED');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                {order.orderNumber}
              </span>
              <span
                className={clsx(
                  'text-[11px] font-bold px-2 py-0.5 rounded-full border',
                  order.status === 'COMPLETED'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                )}
              >
                {isAr
                  ? order.status === 'COMPLETED'
                    ? 'تم التسليم والاعتماد'
                    : 'جاري العمل والتنفيذ'
                  : order.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {isAr ? order.eventTitleAr : order.eventTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Progress Overview Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-5 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {isAr ? 'مؤشر تقدم تنفيذ العقد:' : 'Contract Execution Progress:'}
              </span>
              <span className="text-lg font-black font-mono text-emerald-400">
                {order.progressPercent}%
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2.5 rounded-full transition-all"
                style={{ width: `${order.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>📍 {order.venueName}, {order.venueCity}</span>
              <span className="text-white font-mono font-bold">
                💰 {order.contractValue.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
              </span>
            </div>
          </div>

          {/* Milestones Checklist (V13) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="size-4 text-[#2563EB]" />
                <span>{isAr ? 'قائمة مراحل التسليم المعتمدة (Milestones)' : 'Execution Milestones'}</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                {isAr ? 'اضغط لتحديث حالة الإنجاز' : 'Click to toggle status'}
              </span>
            </div>

            <div className="space-y-2">
              {order.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleOrderMilestone(order.id, m.id)}
                  className={clsx(
                    'cursor-pointer flex items-center justify-between p-3 rounded-xl border transition',
                    m.isCompleted
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        'size-5 rounded-lg flex items-center justify-center border transition',
                        m.isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      )}
                    >
                      {m.isCompleted && <CheckCircle2 className="size-4" />}
                    </div>
                    <div>
                      <h4
                        className={clsx(
                          'text-xs font-bold',
                          m.isCompleted ? 'text-emerald-900 line-through' : 'text-slate-800'
                        )}
                      >
                        {isAr ? m.titleAr : m.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {isAr ? 'تاريخ الاستحقاق:' : 'Due:'} {new Date(m.dueDate).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {m.isCompleted && m.completedAt && (
                    <span className="text-[10px] text-emerald-700 font-semibold bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                      {isAr ? 'تم الإنجاز' : 'Completed'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Notes & Updates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="size-4 text-slate-600" />
              <span>{isAr ? 'سجل الملاحظات والتحديثات التشغيلية' : 'Operational Activity & Notes'}</span>
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {order.notes.map((n) => (
                <div key={n.id} className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-700">{n.author}</span>
                    <span>
                      {new Date(n.timestamp).toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-slate-700">{n.text}</p>
                </div>
              ))}
            </div>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={isAr ? 'أضف ملاحظة أو تحديث للمنظم...' : 'Add progress note for organizer...'}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 text-white px-3.5 py-2 text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1"
              >
                <Send className="size-3.5" />
                <span>{isAr ? 'إرسال' : 'Send'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/50">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>

          {order.progressPercent === 100 && order.status !== 'COMPLETED' ? (
            <button
              onClick={handleCompleteAll}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-bold transition shadow-soft flex items-center gap-1.5"
            >
              <ShieldCheck className="size-4" />
              <span>{isAr ? 'تأكيد التسليم النهائي وإغلاق العقد' : 'Sign Off & Complete Order'}</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">
              {isAr ? 'اكتمال 100% يتيح زر التسليم النهائي' : '100% progress unlocks final sign-off'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
