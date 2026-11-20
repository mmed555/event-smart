import React from 'react';
import { useI18n } from '../../i18n';
import { VendorRFQItem } from '../../types';
import {
  X,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  Mail,
  Phone,
} from 'lucide-react';
import clsx from 'clsx';

interface RfqDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: VendorRFQItem | null;
  onOpenSubmitQuote: () => void;
}

export const RfqDetailsDrawer: React.FC<RfqDetailsDrawerProps> = ({
  isOpen,
  onClose,
  rfq,
  onOpenSubmitQuote,
}) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  if (!isOpen || !rfq) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex ps-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-blue-100 text-[#2563EB] px-2.5 py-0.5 rounded-full">
                  {rfq.rfqCode}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <Sparkles className="size-3" />
                  <span>{rfq.aiMatchScore}% {isAr ? 'توافق ذكي' : 'AI Match'}</span>
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-2">
                {isAr ? rfq.eventTitleAr : rfq.eventTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  <span>{isAr ? 'موعد الفعالية:' : 'Event Date:'}</span>
                </span>
                <p className="font-bold text-slate-800">
                  {new Date(rfq.eventDate).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  <span>{isAr ? 'المكان والمدينة:' : 'Venue & City:'}</span>
                </span>
                <p className="font-bold text-slate-800">{rfq.eventLocation}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <DollarSign className="size-3.5 text-emerald-600" />
                  <span>{isAr ? 'الميزانية التقديرية:' : 'Max Budget:'}</span>
                </span>
                <p className="font-bold text-emerald-600 font-mono text-sm">
                  {rfq.estimatedBudgetMax.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="size-3.5 text-blue-600" />
                  <span>{isAr ? 'الجمهور المتوقع:' : 'Attendees:'}</span>
                </span>
                <p className="font-bold text-slate-800 font-mono">
                  {rfq.expectedAttendees.toLocaleString()} {isAr ? 'حاضر' : 'people'}
                </p>
              </div>
            </div>

            {/* AI Recommendation Engine Analysis */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50/60 to-blue-50/60 p-4 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#2563EB]" />
                <h4 className="text-xs font-bold text-slate-900">
                  {isAr ? 'تحليل محرك المطابقة الذكي (AI Match Analysis)' : 'AI Match Factors'}
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {(isAr ? rfq.matchReasonsAr : rfq.matchReasons).map((reason, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope of Work */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'نطاق العمل المطلوب من المنظم' : 'Required Scope of Work'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {isAr ? rfq.scopeDescriptionAr : rfq.scopeDescription}
              </p>
            </div>

            {/* Specifications Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'البنود الفنية والاشتراطات' : 'Technical Requirements Checklist'}
              </h4>
              <div className="space-y-1.5">
                {(isAr ? rfq.requirementsListAr : rfq.requirementsList).map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs"
                  >
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Contact Info */}
            <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-900">
                {isAr ? 'جهة التنظيم والاتصال' : 'Organizer Contact'}
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={rfq.organizerAvatar}
                  alt={rfq.organizerName}
                  className="size-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{rfq.organizerName}</span>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="size-3" />
                      <span>{rfq.organizerEmail}</span>
                    </span>
                    {rfq.organizerPhone && (
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="size-3" />
                        <span>{rfq.organizerPhone}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              <Clock className="size-3.5 inline me-1 text-amber-500" />
              <span>{isAr ? 'الموعد النهائي لتقديم العروض ساري' : 'Deadline open for bids'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenSubmitQuote();
                }}
                className={clsx(
                  'rounded-xl px-5 py-2 text-xs font-bold transition shadow-soft flex items-center gap-1.5',
                  rfq.hasQuoted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-[#2563EB] text-white hover:bg-blue-700'
                )}
              >
                <FileText className="size-4" />
                <span>
                  {rfq.hasQuoted
                    ? isAr
                      ? 'تم تقديم عرض (تعديل)'
                      : 'Quoted (Edit Proposal)'
                    : isAr
                    ? 'تقديم عرض سعر'
                    : 'Submit Quotation'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
