import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorRFQItem, VendorRFQStatus } from '../../types';
import { RfqDetailsDrawer } from './RfqDetailsDrawer';
import { SubmitQuotationModal } from './SubmitQuotationModal';
import {
  Briefcase,
  Search,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export const RfqInboxView: React.FC = () => {
  const { vendorRfqs, selectedVendorRfqId, setSelectedVendorRfqId } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeFilter, setActiveFilter] = useState<'ALL' | VendorRFQStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSubmitQuoteOpen, setIsSubmitQuoteOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState<VendorRFQItem | null>(null);

  // If selectedVendorRfqId is set from Overview, auto-select it
  React.useEffect(() => {
    if (selectedVendorRfqId) {
      const found = vendorRfqs.find((r) => r.id === selectedVendorRfqId);
      if (found) {
        setSelectedRfq(found);
        setIsDetailsOpen(true);
      }
    }
  }, [selectedVendorRfqId, vendorRfqs]);

  const filteredRfqs = vendorRfqs.filter((rfq) => {
    const matchesFilter = activeFilter === 'ALL' || rfq.status === activeFilter;
    const matchesSearch =
      rfq.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.eventTitleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.rfqCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.organizerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.eventCity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenDetails = (rfq: VendorRFQItem) => {
    setSelectedRfq(rfq);
    setSelectedVendorRfqId(rfq.id);
    setIsDetailsOpen(true);
  };

  const handleOpenSubmit = (rfq: VendorRFQItem) => {
    setSelectedRfq(rfq);
    setIsSubmitQuoteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="size-6 text-[#2563EB]" />
            <span>{isAr ? 'صندوق طلبات عروض الأسعار (RFQ Inbox)' : 'RFQ Opportunities Inbox'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'تصفح وتقديم عروض الأسعار للفعاليات والمؤتمرات مع مؤشرات التوافق الذكي (V08 / V09)'
              : 'Discover and bid on organizer RFQ opportunities with AI-driven match scores'}
          </p>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'البحث بكود الطلب، اسم الفعالية، المدينة...' : 'Search by RFQ code, event title, city...'}
            className="w-full rounded-xl bg-slate-50 ps-9 pe-4 py-2 text-xs border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {(
            [
              { id: 'ALL', labelEn: 'All Opportunities', labelAr: 'جميع الفرص' },
              { id: 'NEW', labelEn: 'New', labelAr: 'جديد' },
              { id: 'VIEWED', labelEn: 'Viewed', labelAr: 'تمت المعاينة' },
              { id: 'QUOTED', labelEn: 'Quoted', labelAr: 'تم تقديم عرض' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* RFQ Cards List */}
      <div className="space-y-3">
        {filteredRfqs.map((rfq) => (
          <div
            key={rfq.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {rfq.rfqCode}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#2563EB] border border-blue-100">
                  <Sparkles className="size-3" />
                  <span>{rfq.aiMatchScore}% {isAr ? 'توافق ذكي' : 'Match'}</span>
                </span>
                {rfq.hasQuoted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="size-3" />
                    <span>{isAr ? 'تم تقديم عرضك' : 'Quote Submitted'}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="size-3.5 text-amber-500" />
                <span>{isAr ? 'ينتهي التقديم:' : 'Deadline:'} 28 نوفمبر</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 space-y-1.5">
                <h3
                  onClick={() => handleOpenDetails(rfq)}
                  className="text-base font-bold text-slate-900 hover:text-[#2563EB] cursor-pointer transition"
                >
                  {isAr ? rfq.eventTitleAr : rfq.eventTitle}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {isAr ? rfq.scopeDescriptionAr : rfq.scopeDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-slate-400" />
                    <span>{new Date(rfq.eventDate).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{rfq.eventLocation}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <DollarSign className="size-3.5 text-emerald-600" />
                    <span>{isAr ? 'ميزانية المنظم:' : 'Budget:'} {rfq.estimatedBudgetMax.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                <button
                  onClick={() => handleOpenSubmit(rfq)}
                  className={clsx(
                    'flex items-center justify-center gap-1.5 rounded-xl font-bold px-4 py-2 text-xs shadow-soft transition',
                    rfq.hasQuoted
                      ? 'bg-slate-900 hover:bg-slate-800 text-white'
                      : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                  )}
                >
                  <FileText className="size-4" />
                  <span>
                    {rfq.hasQuoted
                      ? isAr
                        ? 'تعديل عرض السعر'
                        : 'Update Quotation'
                      : isAr
                      ? 'تقديم عرض سعر'
                      : 'Submit Quotation'}
                  </span>
                </button>

                <button
                  onClick={() => handleOpenDetails(rfq)}
                  className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 text-xs transition"
                >
                  <span>{isAr ? 'معاينة كراسة الشروط' : 'View Specifications'}</span>
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredRfqs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
            <Briefcase className="size-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد طلبات عروض أسعار مطابقة' : 'No matching RFQs found'}
            </h4>
            <p className="text-xs text-slate-400">
              {isAr ? 'حاول تغيير الفلاتر أو البحث بكلمات أخرى' : 'Try adjusting your filters or search terms'}
            </p>
          </div>
        )}
      </div>

      {/* Details Slide-over Drawer */}
      <RfqDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedVendorRfqId(null);
        }}
        rfq={selectedRfq}
        onOpenSubmitQuote={() => {
          setIsDetailsOpen(false);
          setIsSubmitQuoteOpen(true);
        }}
      />

      {/* Submit Quotation Modal */}
      <SubmitQuotationModal
        isOpen={isSubmitQuoteOpen}
        onClose={() => setIsSubmitQuoteOpen(false)}
        rfq={selectedRfq}
      />
    </div>
  );
};
