import React from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardNavItem, AdminTab } from '../../types';

// Admin Screen Views
import { OverviewView } from './OverviewView';
import { UsersListView } from './UsersListView';
import { VendorQueueView } from './VendorQueueView';
import { KycReviewerView } from './KycReviewerView';
import { EventsQueueView } from './EventsQueueView';
import { EventModerationView } from './EventModerationView';
import { TaxonomyView } from './TaxonomyView';
import { DisputesView } from './DisputesView';
import { SystemHealthView } from './SystemHealthView';
import { BroadcastView } from './BroadcastView';
import { SettingsView } from './SettingsView';

import {
  Shield,
  LayoutDashboard,
  Users,
  Building,
  Calendar,
  FileCheck,
  Tag,
  ShieldAlert,
  Activity,
  Radio,
  Settings,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    adminKycQueue,
    adminEventsQueue,
    adminDisputes,
  } = useApp();

  const pendingKycCount = adminKycQueue.filter((k) => k.status === 'PENDING').length;
  const pendingEventsCount = adminEventsQueue.filter((e) => e.status === 'PendingApproval').length;
  const openDisputesCount = adminDisputes.filter((d) => d.status === 'Open').length;

  const navItems: DashboardNavItem[] = [
    {
      id: 'overview',
      labelEn: 'Platform Overview',
      labelAr: 'لوحة القيادة المركزية',
      icon: LayoutDashboard,
      section: 'Core & Governance',
      sectionAr: 'الإدارة المركزية والحوكمة',
    },
    {
      id: 'users',
      labelEn: 'Users & Roles',
      labelAr: 'إدارة المستخدمين والأدوار',
      icon: Users,
      section: 'Core & Governance',
      sectionAr: 'الإدارة المركزية والحوكمة',
    },
    {
      id: 'kyc-queue',
      labelEn: 'Vendor KYC Queue',
      labelAr: 'طابور توثيق الشركات',
      icon: Building,
      badgeCount: pendingKycCount,
      badgeTone: 'amber',
      section: 'Verification & Review',
      sectionAr: 'التوثيق والرقابة',
    },
    {
      id: 'kyc-review',
      labelEn: 'KYC Document Reviewer',
      labelAr: 'فاحص مستندات التوثيق',
      icon: FileCheck,
      section: 'Verification & Review',
      sectionAr: 'التوثيق والرقابة',
    },
    {
      id: 'events-queue',
      labelEn: 'Events Moderation Queue',
      labelAr: 'طابور مراجعة الفعاليات',
      icon: Calendar,
      badgeCount: pendingEventsCount,
      badgeTone: 'blue',
      section: 'Verification & Review',
      sectionAr: 'التوثيق والرقابة',
    },
    {
      id: 'event-review',
      labelEn: 'Event Moderation & Audit',
      labelAr: 'فحص واعتماد الفعالية',
      icon: Shield,
      section: 'Verification & Review',
      sectionAr: 'التوثيق والرقابة',
    },
    {
      id: 'categories',
      labelEn: 'Categories & Taxonomy',
      labelAr: 'التصنيفات والهيكل الدلالي',
      icon: Tag,
      section: 'Platform Operations',
      sectionAr: 'عمليات المنصة',
    },
    {
      id: 'disputes',
      labelEn: 'Disputes & Complaints',
      labelAr: 'النزاعات والشكاوى',
      icon: ShieldAlert,
      badgeCount: openDisputesCount,
      badgeTone: 'red',
      section: 'Platform Operations',
      sectionAr: 'عمليات المنصة',
    },
    {
      id: 'system-health',
      labelEn: 'System Telemetry & Health',
      labelAr: 'الأداء وصحة المنظومة',
      icon: Activity,
      section: 'Infrastructure & Config',
      sectionAr: 'البنية التحتية والإعدادات',
    },
    {
      id: 'broadcast',
      labelEn: 'Broadcast Center',
      labelAr: 'بث الإشعارات النظامية',
      icon: Radio,
      section: 'Infrastructure & Config',
      sectionAr: 'البنية التحتية والإعدادات',
    },
    {
      id: 'settings',
      labelEn: 'Platform Settings',
      labelAr: 'الإعدادات والسياسات',
      icon: Settings,
      section: 'Infrastructure & Config',
      sectionAr: 'البنية التحتية والإعدادات',
    },
  ];

  return (
    <DashboardLayout
      role="admin"
      portalTitleEn="Eviq Governance"
      portalTitleAr="بوابة الحوكمة"
      portalSubtitleEn="Super Admin Suite"
      portalSubtitleAr="لوحة تحكم المشرف العام"
      roleBadgeText="PRO"
      navItems={navItems}
      activeTab={activeAdminTab}
      onTabChange={(tabId) => setActiveAdminTab(tabId as AdminTab)}
    >
      {activeAdminTab === 'overview' && <OverviewView />}
      {activeAdminTab === 'users' && <UsersListView />}
      {activeAdminTab === 'kyc-queue' && <VendorQueueView />}
      {activeAdminTab === 'kyc-review' && <KycReviewerView />}
      {activeAdminTab === 'events-queue' && <EventsQueueView />}
      {activeAdminTab === 'event-review' && <EventModerationView />}
      {activeAdminTab === 'categories' && <TaxonomyView />}
      {activeAdminTab === 'disputes' && <DisputesView />}
      {activeAdminTab === 'system-health' && <SystemHealthView />}
      {activeAdminTab === 'broadcast' && <BroadcastView />}
      {activeAdminTab === 'settings' && <SettingsView />}
    </DashboardLayout>
  );
};
