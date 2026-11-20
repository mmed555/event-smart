import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardNavItem, VendorTab, KYCStatus } from '../../types';

// Vendor Views
import { OverviewView } from './OverviewView';
import { ServicesCatalogView } from './ServicesCatalogView';
import { RfqInboxView } from './RfqInboxView';
import { MyQuotationsView } from './MyQuotationsView';
import { ServiceOrdersView } from './ServiceOrdersView';
import { VendorReviewsView } from './VendorReviewsView';
import { VendorKycView } from './VendorKycView';
import { VendorProfileView } from './VendorProfileView';
import { VendorSettingsView } from './VendorSettingsView';
import { VendorOnboardingGate } from './VendorOnboardingGate';

import {
  LayoutDashboard,
  Layers,
  Building2,
  Briefcase,
  FileText,
  TrendingUp,
  Star,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';

export const VendorLayout: React.FC = () => {
  const {
    activeVendorTab,
    setActiveVendorTab,
    vendorProfile,
    setVendorKycStatus,
    vendorRfqs,
    vendorQuotations,
    vendorOrders,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const { tab } = useParams<{ tab?: string }>();
  const currentTab: VendorTab = (tab as VendorTab) || activeVendorTab || 'overview';

  const newRfqsCount = vendorRfqs.filter((r) => r.status === 'NEW').length;
  const pendingQuotesCount = vendorQuotations.filter((q) => q.status === 'PENDING').length;
  const activeOrdersCount = vendorOrders.filter((o) => o.status === 'IN_PROGRESS').length;

  const navItems: DashboardNavItem[] = [
    {
      id: 'overview',
      labelEn: 'Platform Overview',
      labelAr: 'لوحة القيادة المركزية',
      icon: LayoutDashboard,
      section: 'Core & Profile',
      sectionAr: 'العمليات والملف التعريفي',
    },
    {
      id: 'services',
      labelEn: 'Services Catalog',
      labelAr: 'كتالوج الخدمات والأسعار',
      icon: Layers,
      section: 'Core & Profile',
      sectionAr: 'العمليات والملف التعريفي',
    },
    {
      id: 'profile',
      labelEn: 'Company Profile & Portfolio',
      labelAr: 'بروفايل وسابقة أعمال الشركة',
      icon: Building2,
      section: 'Core & Profile',
      sectionAr: 'العمليات والملف التعريفي',
    },
    {
      id: 'rfq-inbox',
      labelEn: 'RFQ Opportunities',
      labelAr: 'صندوق فرص الـ RFQ',
      icon: Briefcase,
      badgeCount: newRfqsCount,
      badgeTone: 'blue',
      section: 'RFQ & Quotations',
      sectionAr: 'عروض الأسعار والمناقصات',
    },
    {
      id: 'my-quotes',
      labelEn: 'My Quotations',
      labelAr: 'عروضي المقدمة',
      icon: FileText,
      badgeCount: pendingQuotesCount,
      badgeTone: 'amber',
      section: 'RFQ & Quotations',
      sectionAr: 'عروض الأسعار والمناقصات',
    },
    {
      id: 'orders',
      labelEn: 'Service Orders',
      labelAr: 'أوامر وعقود التنفيذ',
      icon: TrendingUp,
      badgeCount: activeOrdersCount,
      badgeTone: 'emerald',
      section: 'Execution & Reputation',
      sectionAr: 'التنفيذ والتقييمات',
    },
    {
      id: 'reviews',
      labelEn: 'Reviews & Feedback',
      labelAr: 'التقييمات والآراء',
      icon: Star,
      section: 'Execution & Reputation',
      sectionAr: 'التنفيذ والتقييمات',
    },
    {
      id: 'kyc',
      labelEn: 'KYC & Legal Documents',
      labelAr: 'التوثيق والمستندات الرسمية',
      icon: ShieldCheck,
      badgeTone: vendorProfile.kycStatus === 'VERIFIED' ? 'emerald' : 'red',
      section: 'Governance & Settings',
      sectionAr: 'الحوكمة والإعدادات',
    },
    {
      id: 'settings',
      labelEn: 'Account & Payout',
      labelAr: 'الحساب والمدفوعات',
      icon: Settings,
      section: 'Governance & Settings',
      sectionAr: 'الحوكمة والإعدادات',
    },
  ];

  // Prototype KYC Simulator Pill in Top Header
  const headerActions = (
    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-xs text-xs">
      <span className="text-[10px] font-bold text-slate-400 ps-2 pe-1 font-mono uppercase">
        {isAr ? 'محاكي التوثيق:' : 'KYC Sim:'}
      </span>
      {(['VERIFIED', 'PENDING', 'UNVERIFIED'] as KYCStatus[]).map((status) => {
        const isCurrent = vendorProfile.kycStatus === status;
        return (
          <button
            key={status}
            onClick={() => setVendorKycStatus(status)}
            className={clsx(
              'rounded-lg px-2 py-0.5 text-[10px] font-bold transition',
              isCurrent
                ? status === 'VERIFIED'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : status === 'PENDING'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            )}
            title={`Switch simulated state to ${status}`}
          >
            {status === 'VERIFIED'
              ? isAr
                ? 'معتمد ✓'
                : 'Verified'
              : status === 'PENDING'
              ? isAr
                ? 'قيد المراجعة ⌛'
                : 'Pending'
              : isAr
              ? 'غير موثق ✕'
              : 'Unverified'}
          </button>
        );
      })}
    </div>
  );

  const renderActiveTab = () => {
    // If account is unverified/pending and user is NOT specifically inspecting the KYC screen,
    // enforce the Onboarding Gate agreed upon during the grilling alignment.
    if (vendorProfile.kycStatus !== 'VERIFIED' && currentTab !== 'kyc') {
      return <VendorOnboardingGate />;
    }

    switch (currentTab) {
      case 'overview':
        return <OverviewView />;
      case 'services':
        return <ServicesCatalogView />;
      case 'profile':
        return <VendorProfileView />;
      case 'rfq-inbox':
        return <RfqInboxView />;
      case 'my-quotes':
        return <MyQuotationsView />;
      case 'orders':
        return <ServiceOrdersView />;
      case 'reviews':
        return <VendorReviewsView />;
      case 'kyc':
        return <VendorKycView />;
      case 'settings':
        return <VendorSettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <DashboardLayout
      role="vendor"
      portalTitleEn="Vendor & Execution Company Portal"
      portalTitleAr="بوابة شركات التنفيذ والخدمات"
      portalSubtitleEn="B2B Marketplace & Service Operations"
      portalSubtitleAr="سوق الخدمات وعمليات التنفيذ"
      roleBadgeText={isAr ? 'شركة تنفيذ معتمدة' : 'Verified Vendor'}
      navItems={navItems}
      activeTab={currentTab}
      onTabChange={(newTab) => setActiveVendorTab(newTab as VendorTab)}
      headerActions={headerActions}
    >
      {renderActiveTab()}
    </DashboardLayout>
  );
};
