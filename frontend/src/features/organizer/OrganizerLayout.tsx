import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardNavItem, OrganizerTab } from '../../types';
import {
  OrganizerOverviewSkeleton,
  OrganizerEventsSkeleton,
  OrganizerWizardSkeleton,
  OrganizerCommandCenterSkeleton,
  OrganizerCheckinSkeleton,
  OrganizerAiPlannerSkeleton,
  OrganizerMarketplaceSkeleton,
  OrganizerQuotesSkeleton,
  OrganizerOrdersSkeleton,
} from '../../components/ui/skeleton';

// Organizer Screen Views
import { OverviewView } from './OverviewView';
import { MyEventsView } from './MyEventsView';
import { CreateEventWizardView } from './CreateEventWizardView';
import { EventCommandCenterView } from './EventCommandCenterView';
import { CheckinGateView } from './CheckinGateView';
import { BookingsListView } from './BookingsListView';
import { AiPlannerView } from './AiPlannerView';
import { MarketplaceView } from './MarketplaceView';
import { RfqManagementView } from './RfqManagementView';
import { QuotesComparisonView } from './QuotesComparisonView';
import { ServiceOrdersHubView } from './ServiceOrdersHubView';
import { OrganizerReviewsView } from './OrganizerReviewsView';
import { OrganizerSettingsView } from './OrganizerSettingsView';

import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  SlidersHorizontal,
  QrCode,
  Users,
  Sparkles,
  Building2,
  Briefcase,
  Award,
  Truck,
  Star,
  Settings,
  Plus,
} from 'lucide-react';

export const OrganizerLayout: React.FC = () => {
  const {
    activeOrganizerTab,
    setActiveOrganizerTab,
    organizerProfile,
    organizerRfqs,
    organizerOrders,
    gateScans,
    isLoading,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const { tab } = useParams<{ tab?: string }>();
  const currentTab: OrganizerTab = (tab as OrganizerTab) || activeOrganizerTab || 'overview';

  const pendingRfqsCount = organizerRfqs.filter((r) => r.status === 'QUOTED').length;
  const activeOrdersCount = organizerOrders.filter((o) => o.status === 'IN_PROGRESS').length;
  const liveAttendanceCount = gateScans.filter((s) => s.status === 'ADMIT').length;

  const navItems: DashboardNavItem[] = [
    {
      id: 'overview',
      labelEn: 'Platform Overview',
      labelAr: 'لوحة القيادة المركزية',
      icon: LayoutDashboard,
      section: 'Core & Events',
      sectionAr: 'الفعاليات والقيادة',
    },
    {
      id: 'events',
      labelEn: 'My Events',
      labelAr: 'قائمة الفعاليات',
      icon: Calendar,
      section: 'Core & Events',
      sectionAr: 'الفعاليات والقيادة',
    },
    {
      id: 'wizard',
      labelEn: 'Create Event Wizard',
      labelAr: 'معالج إنشاء فعالية',
      icon: PlusCircle,
      section: 'Core & Events',
      sectionAr: 'الفعاليات والقيادة',
    },
    {
      id: 'command-center',
      labelEn: 'Event Command Hub',
      labelAr: 'مركز قيادة الفعالية',
      icon: SlidersHorizontal,
      section: 'Operations & Gate',
      sectionAr: 'إدارة العمليات وبوابات الدخول',
    },
    {
      id: 'checkin',
      labelEn: 'Live Gate QR Scanner',
      labelAr: 'ماسح وبوابات الدخول',
      icon: QrCode,
      badgeCount: liveAttendanceCount,
      badgeTone: 'emerald',
      section: 'Operations & Gate',
      sectionAr: 'إدارة العمليات وبوابات الدخول',
    },
    {
      id: 'bookings',
      labelEn: 'Attendees & Bookings',
      labelAr: 'الحجوزات وقائمة الحضور',
      icon: Users,
      section: 'Operations & Gate',
      sectionAr: 'إدارة العمليات وبوابات الدخول',
    },
    {
      id: 'ai-planner',
      labelEn: 'AI Logistics Planner',
      labelAr: 'المخطط اللوجستي الذكي',
      icon: Sparkles,
      section: 'AI & Procurement',
      sectionAr: 'التخطيط بالذكاء الاصطناعي والمشتريات',
    },
    {
      id: 'marketplace',
      labelEn: 'B2B Vendor Marketplace',
      labelAr: 'سوق شركات التنفيذ',
      icon: Building2,
      section: 'AI & Procurement',
      sectionAr: 'التخطيط بالذكاء الاصطناعي والمشتريات',
    },
    {
      id: 'rfqs',
      labelEn: 'RFQ Tenders',
      labelAr: 'طلبات عروض الأسعار',
      icon: Briefcase,
      badgeCount: pendingRfqsCount,
      badgeTone: 'amber',
      section: 'AI & Procurement',
      sectionAr: 'التخطيط بالذكاء الاصطناعي والمشتريات',
    },
    {
      id: 'quotes',
      labelEn: 'Quotations Matrix',
      labelAr: 'مقارنة وترسية العروض',
      icon: Award,
      section: 'AI & Procurement',
      sectionAr: 'التخطيط بالذكاء الاصطناعي والمشتريات',
    },
    {
      id: 'orders',
      labelEn: 'Service Orders',
      labelAr: 'أوامر التنفيذ اللوجستي',
      icon: Truck,
      badgeCount: activeOrdersCount,
      badgeTone: 'blue',
      section: 'AI & Procurement',
      sectionAr: 'التخطيط بالذكاء الاصطناعي والمشتريات',
    },
    {
      id: 'reviews',
      labelEn: 'Vendor Reviews',
      labelAr: 'تقييمات شركات التنفيذ',
      icon: Star,
      section: 'Feedback & Settings',
      sectionAr: 'التقييمات والإعدادات',
    },
    {
      id: 'settings',
      labelEn: 'Settings & Security',
      labelAr: 'الإعدادات والأمان',
      icon: Settings,
      section: 'Feedback & Settings',
      sectionAr: 'التقييمات والإعدادات',
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      switch (currentTab) {
        case 'overview':
          return <OrganizerOverviewSkeleton />;
        case 'events':
          return <OrganizerEventsSkeleton />;
        case 'wizard':
          return <OrganizerWizardSkeleton />;
        case 'command-center':
          return <OrganizerCommandCenterSkeleton />;
        case 'checkin':
          return <OrganizerCheckinSkeleton />;
        case 'ai-planner':
          return <OrganizerAiPlannerSkeleton />;
        case 'marketplace':
          return <OrganizerMarketplaceSkeleton />;
        case 'quotes':
          return <OrganizerQuotesSkeleton />;
        case 'orders':
          return <OrganizerOrdersSkeleton />;
        default:
          return <OrganizerOverviewSkeleton />;
      }
    }

    switch (currentTab) {
      case 'overview':
        return <OverviewView />;
      case 'events':
        return <MyEventsView />;
      case 'wizard':
        return <CreateEventWizardView />;
      case 'command-center':
        return <EventCommandCenterView />;
      case 'checkin':
        return <CheckinGateView />;
      case 'bookings':
        return <BookingsListView />;
      case 'ai-planner':
        return <AiPlannerView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'rfqs':
        return <RfqManagementView />;
      case 'quotes':
        return <QuotesComparisonView />;
      case 'orders':
        return <ServiceOrdersHubView />;
      case 'reviews':
        return <OrganizerReviewsView />;
      case 'settings':
        return <OrganizerSettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <DashboardLayout
      role="organizer"
      portalTitleEn="Organizer Command Hub"
      portalTitleAr="بوابة منظم الفعاليات"
      portalSubtitleEn="Events, Gates & B2B Procurement"
      portalSubtitleAr="إدارة الفعاليات والبوابات والمشتريات"
      roleBadgeText={organizerProfile.organization}
      navItems={navItems}
      activeTab={currentTab}
      onTabChange={(newTab) => setActiveOrganizerTab(newTab as OrganizerTab)}
      headerActions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveOrganizerTab('wizard')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
          >
            <Plus className="size-3.5" />
            <span className="hidden sm:inline">{isAr ? 'إنشاء فعالية' : 'New Event'}</span>
          </button>
        </div>
      }
    >
      {renderContent()}
    </DashboardLayout>
  );
};
