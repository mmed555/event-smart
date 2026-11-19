import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardNavItem, AdminTab } from '../../types';

// Admin Screen Views
import { OverviewView } from './OverviewView';
import { UsersListView } from './UsersListView';
import { VendorQueueView } from './VendorQueueView';
import { EventsQueueView } from './EventsQueueView';
import { TaxonomyView } from './TaxonomyView';
import { DisputesView } from './DisputesView';
import { SystemHealthView } from './SystemHealthView';
import { BroadcastView } from './BroadcastView';
import { SettingsView } from './SettingsView';

import {
  LayoutDashboard,
  Users,
  Building,
  Calendar,
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

  const { tab } = useParams<{ tab?: string }>();
  const currentTab: AdminTab = (tab as AdminTab) || activeAdminTab || 'overview';

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
      activeTab={currentTab}
      onTabChange={(tabId) => setActiveAdminTab(tabId as AdminTab)}
    >
      {currentTab === 'overview' && <OverviewView />}
      {currentTab === 'users' && <UsersListView />}
      {(currentTab === 'kyc-queue' || currentTab === 'kyc-review') && (
        <VendorQueueView initialTab={currentTab === 'kyc-review' ? 'reviewer' : 'queue'} />
      )}
      {(currentTab === 'events-queue' || currentTab === 'event-review') && (
        <EventsQueueView initialTab={currentTab === 'event-review' ? 'moderation' : 'queue'} />
      )}
      {currentTab === 'categories' && <TaxonomyView />}
      {currentTab === 'disputes' && <DisputesView />}
      {currentTab === 'system-health' && <SystemHealthView />}
      {currentTab === 'broadcast' && <BroadcastView />}
      {currentTab === 'settings' && <SettingsView />}
    </DashboardLayout>
  );
};
