import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { CreateRfqModal } from './modals/CreateRfqModal';
import {
  Briefcase,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import clsx from 'clsx';

export const RfqManagementView: React.FC = () => {
  const { organizerRfqs, setActiveOrganizerTab } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'إدارة طلبات عروض الأسعار (RFQ & Procurement O17–O18)' : 'RFQ Tender Management & Tendering'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'متابعة المناقصات المطروحة، عروض الأسعار الواردة من الموردين، ومواعيد الإغلاق'
              : 'Track active RFQs, incoming vendor bids, submission deadlines, and quotation matrices'}
          </p>
        </div>

        <button
          onClick={() => setRfqModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition shrink-0"
        >
          <Plus className="size-4" />
          <span>{isAr ? 'طرح طلب RFQ جديد' : 'New RFQ Tender'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {organizerRfqs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Briefcase className="mx-auto size-10 text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد طلبات RFQ نشطة حالياً' : 'No active RFQs'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'اطرح أول طلب تجهيزات لوجستية لفعاليتك الآن' : 'Publish your first procurement tender today'}
            </p>
          </div>
        ) : (
          organizerRfqs.map((rfq) => (
            <div
              key={rfq.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-soft hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600">
                      {rfq.rfqCode}
                    </span>
                    <span
                      className={clsx(
                        'rounded-md px-2 py-0.5 text-[10px] font-bold border',
                        rfq.status === 'QUOTED'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : rfq.status === 'AWARDED'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      )}
                    >
                      {rfq.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {rfq.createdAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{rfq.eventTitle}</h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'تصنيف الخدمة:' : 'Category:'} <b>{isAr ? rfq.categoryAr : rfq.category}</b>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveOrganizerTab('quotes', { rfqId: rfq.id })}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                  >
                    <SlidersHorizontal className="size-3.5" />
                    <span>{isAr ? 'مقارنة عروض الأسعار' : 'Compare Quotations'}</span>
                  </button>
                </div>
              </div>

              {/* Items Summary */}
              <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-700 space-y-1.5">
                <span className="font-bold text-slate-500 block text-[11px]">
                  {isAr ? 'البنود والتجهيزات المطلوبة:' : 'Requested Line Items:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rfq.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{it.name} ({it.qty} {it.unit})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">{isAr ? 'الحد الأقصى للميزانية:' : 'Max Budget:'}</span>
                  <span className="font-bold font-mono text-slate-900">{rfq.budgetMax.toLocaleString()} ج.م</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isAr ? 'آخر موعد للتقديم:' : 'Deadline:'}</span>
                  <span className="font-bold font-mono text-slate-700">{rfq.deadline}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isAr ? 'الشركات المدعوة:' : 'Invited Vendors:'}</span>
                  <span className="font-bold text-slate-800">{rfq.invitedVendors.length} {isAr ? 'شركات' : 'vendors'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isAr ? 'العروض المستلمة:' : 'Quotes Received:'}</span>
                  <span className="font-bold text-emerald-600 font-mono">
                    {rfq.quotationsReceivedCount} {isAr ? 'عروض جاهزة' : 'quotes ready'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultCategory="Sound & Audio"
      />
    </div>
  );
};
