import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorReviewModal } from './modals/VendorReviewModal';
import {
  CheckCircle2,
  Phone,
  Mail,
  Star,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';

export const ServiceOrdersHubView: React.FC = () => {
  const {
    organizerOrders,
    toggleOrganizerOrderMilestone,
    confirmOrderDeliverables,
    submitOrganizerVendorReview,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<{
    orderId: string;
    vendorId: string;
    vendorName: string;
  } | null>(null);

  const handleOpenReviewModal = (orderId: string, vendorId: string, vendorName: string) => {
    setSelectedOrderForReview({ orderId, vendorId, vendorName });
    setReviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          {isAr ? 'أوامر التنفيذ ومتابعة التجهيزات (Service Orders O22–O23)' : 'Service Orders & Logistics Execution'}
        </h1>
        <p className="text-xs text-slate-500">
          {isAr
            ? 'متابعة مراحل توريد وتركيب وتشغيل المعدات في الموقع، تأكيد الاستلام، وتقييم الموردين'
            : 'Track milestone progress, warehouse staging, on-site setup, sign-offs, and dual review feedback'}
        </p>
      </div>

      <div className="space-y-5">
        {organizerOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Truck className="mx-auto size-10 text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد أوامر تنفيذ جارية حالياً' : 'No active service orders'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'ستظهر هنا العقود المعتمدة بمجرد ترسية عروض الـ RFQ' : 'Awarded tenders will generate trackable service orders here'}
            </p>
          </div>
        ) : (
          organizerOrders.map((order) => {
            const isCompleted = order.status === 'COMPLETED';

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft space-y-5"
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600">
                        {order.orderCode}
                      </span>
                      <span
                        className={clsx(
                          'rounded-md px-2 py-0.5 text-[10px] font-bold border',
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        )}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {order.startDate} → {order.completionDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{order.eventTitle}</h3>
                    <p className="text-xs text-slate-500">
                      {isAr ? 'شركة التنفيذ:' : 'Execution Vendor:'}{' '}
                      <b className="text-slate-800">{order.vendorName}</b> ({isAr ? order.categoryAr : order.category})
                    </p>
                  </div>

                  <div className="text-end">
                    <span className="text-xs text-slate-400 block">{isAr ? 'قيمة العقد:' : 'Contract Value:'}</span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      {order.totalAmount.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Milestone Status */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {isAr ? 'المرحلة اللوجستية الحالية:' : 'Current Milestone:'}{' '}
                      <span className="text-blue-600">{isAr ? order.currentMilestoneAr : order.currentMilestone}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900">{order.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                      style={{ width: `${order.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Milestones Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    {isAr ? 'مراحل الإنجاز والتسليم التعاقدية:' : 'Milestones Execution Checklist:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.milestones.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => toggleOrganizerOrderMilestone(order.id, m.id)}
                        className={clsx(
                          'cursor-pointer flex items-center justify-between p-3 rounded-xl border text-xs transition',
                          m.completed
                            ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={clsx('size-4 shrink-0', m.completed ? 'text-emerald-600' : 'text-slate-300')}
                          />
                          <span className={clsx(m.completed && 'line-through text-slate-500 font-medium')}>
                            {isAr ? m.titleAr : m.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">{m.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Deliverables Sign-off & Review */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="size-3.5" />
                    <span>{order.vendorPhone}</span>
                    <span>·</span>
                    <Mail className="size-3.5" />
                    <span>{order.vendorEmail}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!order.deliverablesAccepted ? (
                      <button
                        onClick={() => confirmOrderDeliverables(order.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-soft hover:bg-emerald-700 transition"
                      >
                        <CheckCircle2 className="size-3.5" />
                        <span>{isAr ? 'اعتماد الاستلام النهائي للمعدات' : 'Confirm Equipment Handover'}</span>
                      </button>
                    ) : !order.reviewed ? (
                      <button
                        onClick={() => handleOpenReviewModal(order.id, order.vendorId, order.vendorName)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-soft hover:bg-amber-600 transition"
                      >
                        <Star className="size-3.5" />
                        <span>{isAr ? 'تقييم شركة التنفيذ (Dual Rating)' : 'Review Vendor'}</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                        ✓ {isAr ? 'تم تقييم الشركة' : 'Reviewed'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <VendorReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        orderId={selectedOrderForReview?.orderId || ''}
        vendorId={selectedOrderForReview?.vendorId || ''}
        vendorName={selectedOrderForReview?.vendorName || ''}
        onSubmit={submitOrganizerVendorReview}
      />
    </div>
  );
};
