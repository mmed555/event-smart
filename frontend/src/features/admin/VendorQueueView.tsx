import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { KYCStatus } from '../../types';
import { AdminTableSkeleton } from '../../components/ui/Skeleton';
import { KycReviewerView } from './KycReviewerView';
import {
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  RotateCcw,
  Search,
  Building,
  FileCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

interface VendorQueueViewProps {
  initialTab?: 'queue' | 'reviewer';
}

export const VendorQueueView: React.FC<VendorQueueViewProps> = ({ initialTab = 'queue' }) => {
  const { adminKycQueue, selectedAdminKycId, setSelectedAdminKycId, isLoading } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'queue' | 'reviewer'>(initialTab);
  const [filterStatus, setFilterStatus] = useState<'ALL' | KYCStatus | 'REVISION_REQUESTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <AdminTableSkeleton rows={6} filterPillsCount={3} hasTabs={true} />;
  }

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const filteredItems = useMemo(() => {
    return adminKycQueue.filter((item) => {
      if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName =
          item.companyName.toLowerCase().includes(q) ||
          (item.companyNameAr && item.companyNameAr.includes(q));
        const matchContact = item.contactPerson.toLowerCase().includes(q);
        const matchEmail = item.email.toLowerCase().includes(q);
        if (!matchName && !matchContact && !matchEmail) return false;
      }
      return true;
    });
  }, [adminKycQueue, filterStatus, searchQuery]);

  const pendingCount = adminKycQueue.filter((k) => k.status === 'PENDING').length;
  const verifiedCount = adminKycQueue.filter((k) => k.status === 'VERIFIED').length;
  const revisionCount = adminKycQueue.filter((k) => k.status === 'REVISION_REQUESTED').length;

  const currentSelectedKyc = adminKycQueue.find((k) => k.id === selectedAdminKycId);

  const handleOpenReview = (kycId: string) => {
    setSelectedAdminKycId(kycId);
    setActiveTab('reviewer');
  };

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Tabs: Queue vs In-Page Reviewer */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={clsx(
              'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs',
              activeTab === 'queue'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            <Building className="size-4" />
            <span>{isAr ? 'طابور توثيق الشركات' : 'Vendor KYC Queue'}</span>
            <span
              className={clsx(
                'rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold',
                activeTab === 'queue' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'
              )}
            >
              {pendingCount} {isAr ? 'معلق' : 'pending'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reviewer')}
            className={clsx(
              'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs',
              activeTab === 'reviewer'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            <FileCheck className="size-4" />
            <span>{isAr ? 'فاحص مستندات التوثيق' : 'Document Reviewer & Audit'}</span>
            {currentSelectedKyc && (
              <span
                className={clsx(
                  'rounded-md px-1.5 py-0.5 text-[10px] font-bold truncate max-w-[120px]',
                  activeTab === 'reviewer' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                )}
              >
                {isAr ? currentSelectedKyc.companyNameAr || currentSelectedKyc.companyName : currentSelectedKyc.companyName}
              </span>
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="size-4 text-emerald-600" />
          <span>{isAr ? 'الحوكمة والتحقق من السجل التجاري والبطاقة الضريبية' : 'KYC Vault Verification'}</span>
        </div>
      </div>

      {/* Tab 1: Queue Table */}
      {activeTab === 'queue' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'البحث باسم الشركة أو المسؤول...' : 'Search by company name or contact...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 ps-10 pe-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setFilterStatus('PENDING')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    filterStatus === 'PENDING'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                  )}
                >
                  <Clock className="size-3.5" />
                  <span>{isAr ? 'قيد الانتظار' : 'Pending'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{pendingCount}</span>
                </button>

                <button
                  onClick={() => setFilterStatus('REVISION_REQUESTED')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    filterStatus === 'REVISION_REQUESTED'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-800 bg-blue-50 hover:bg-blue-100'
                  )}
                >
                  <RotateCcw className="size-3.5" />
                  <span>{isAr ? 'مطلوب تعديل' : 'Revision Req.'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{revisionCount}</span>
                </button>

                <button
                  onClick={() => setFilterStatus('VERIFIED')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    filterStatus === 'VERIFIED'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  )}
                >
                  <CheckCircle className="size-3.5" />
                  <span>{isAr ? 'معتمدة' : 'Verified'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{verifiedCount}</span>
                </button>

                <button
                  onClick={() => setFilterStatus('ALL')}
                  className={clsx(
                    'rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    filterStatus === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
              </div>
            </div>
          </div>

          {/* Verification Queue Table */}
          <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3.5">{isAr ? 'الشركة' : 'Company'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'مجال الخدمة' : 'Service Domain'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'المستندات' : 'Documents'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'تاريخ التقديم' : 'Submitted'}</th>
                    <th className="px-5 py-3.5 text-end">{isAr ? 'فحص المستندات' : 'Audit'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                        {isAr ? 'لا توجد طلبات توثيق مطابقة' : 'No KYC verification items in this filter'}
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              {isAr ? item.companyNameAr || item.companyName : item.companyName}
                              <span className="font-mono text-[10px] text-slate-400">({item.id})</span>
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {item.contactPerson} · {item.city}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-100">
                            {isAr ? item.categoryAr || item.category : item.category}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={clsx(
                              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                              item.status === 'VERIFIED' && 'bg-emerald-100 text-emerald-800',
                              item.status === 'PENDING' && 'bg-amber-100 text-amber-800',
                              item.status === 'REJECTED' && 'bg-red-100 text-red-800',
                              item.status === 'REVISION_REQUESTED' && 'bg-blue-100 text-blue-800'
                            )}
                          >
                            <span className="size-1.5 rounded-full bg-current" />
                            {item.status}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2 text-[11px] text-slate-600">
                            <span className="font-semibold">CR: {item.documents.commercialRegister.docNumber}</span>
                            <span className="text-slate-300">·</span>
                            <span className="font-semibold">Tax: {item.documents.taxCard.docNumber}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                            <Calendar className="size-3 text-slate-400" />
                            {item.submittedAt}
                          </div>
                        </td>

                        <td className="px-5 py-3.5 text-end">
                          <button
                            onClick={() => handleOpenReview(item.id)}
                            className={clsx(
                              'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs',
                              item.status === 'PENDING'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            )}
                          >
                            <Eye className="size-3.5" />
                            <span>
                              {item.status === 'PENDING'
                                ? isAr
                                  ? 'فحص المستندات'
                                  : 'Review Docs'
                                : isAr
                                  ? 'عرض المستندات'
                                  : 'View Docs'}
                            </span>
                            <ChevronRight className="size-3 text-current opacity-70" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Document Inspector / Reviewer */}
      {activeTab === 'reviewer' && (
        <KycReviewerView onBackToQueue={() => setActiveTab('queue')} />
      )}
    </div>
  );
};