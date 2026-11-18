import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AdminTab } from '../../types';

// Admin Screen Views
import { AD01_OverviewView } from './AD01_OverviewView';
import { AD02_UsersListView } from './AD02_UsersListView';
import { AD04_VendorQueueView } from './AD04_VendorQueueView';
import { AD05_KycReviewerView } from './AD05_KycReviewerView';
import { AD06_EventsQueueView } from './AD06_EventsQueueView';
import { AD07_EventModerationView } from './AD07_EventModerationView';
import { AD08_TaxonomyView } from './AD08_TaxonomyView';
import { AD09_DisputesView } from './AD09_DisputesView';
import { AD10_SystemHealthView } from './AD10_SystemHealthView';
import { AD11_BroadcastView } from './AD11_BroadcastView';
import { AD12_SettingsView } from './AD12_SettingsView';

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
  Menu,
  X,
  Globe,
  ArrowLeft,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  id: AdminTab;
  code: string;
  labelEn: string;
  labelAr: string;
  icon: React.FC<{ className?: string }>;
  badgeCount?: number;
  badgeTone?: 'red' | 'amber' | 'blue';
}

export const AdminLayout: React.FC = () => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    adminKycQueue,
    adminEventsQueue,
    adminDisputes,
    go,
  } = useApp();
  const { language, toggleLanguage } = useI18n();
  const isAr = language === 'ar';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingKycCount = adminKycQueue.filter((k) => k.status === 'PENDING').length;
  const pendingEventsCount = adminEventsQueue.filter((e) => e.status === 'PendingApproval').length;
  const openDisputesCount = adminDisputes.filter((d) => d.status === 'Open').length;

  const navItems: NavItem[] = [
    {
      id: 'overview',
      code: 'AD01',
      labelEn: 'Platform Overview',
      labelAr: 'لوحة القيادة المركزية',
      icon: LayoutDashboard,
    },
    {
      id: 'users',
      code: 'AD02',
      labelEn: 'Users & Roles',
      labelAr: 'إدارة المستخدمين والأدوار',
      icon: Users,
    },
    {
      id: 'kyc-queue',
      code: 'AD04',
      labelEn: 'Vendor KYC Queue',
      labelAr: 'طابور توثيق الشركات',
      icon: Building,
      badgeCount: pendingKycCount,
      badgeTone: 'amber',
    },
    {
      id: 'kyc-review',
      code: 'AD05',
      labelEn: 'KYC Document Reviewer',
      labelAr: 'فاحص مستندات الـ KYC',
      icon: FileCheck,
    },
    {
      id: 'events-queue',
      code: 'AD06',
      labelEn: 'Events Queue',
      labelAr: 'طابور اعتماد الفعاليات',
      icon: Calendar,
      badgeCount: pendingEventsCount,
      badgeTone: 'blue',
    },
    {
      id: 'event-review',
      code: 'AD07',
      labelEn: 'Event Moderation',
      labelAr: 'فحص واعتماد الفعالية',
      icon: Shield,
    },
    {
      id: 'categories',
      code: 'AD08',
      labelEn: 'Categories & Taxonomy',
      labelAr: 'التصنيفات والهيكل الدلالي',
      icon: Tag,
    },
    {
      id: 'disputes',
      code: 'AD09',
      labelEn: 'Disputes & Claims',
      labelAr: 'النزاعات والشكاوى',
      icon: ShieldAlert,
      badgeCount: openDisputesCount,
      badgeTone: 'red',
    },
    {
      id: 'system-health',
      code: 'AD10',
      labelEn: 'System Telemetry & Health',
      labelAr: 'الأداء وصحة المنظومة',
      icon: Activity,
    },
    {
      id: 'broadcast',
      code: 'AD11',
      labelEn: 'Broadcast Center',
      labelAr: 'بث الإشعارات النظامية',
      icon: Radio,
    },
    {
      id: 'settings',
      code: 'AD12',
      labelEn: 'Platform Settings',
      labelAr: 'الإعدادات والسياسات',
      icon: Settings,
    },
  ];

  const currentNav = navItems.find((n) => n.id === activeAdminTab) || navItems[0];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#090D16] text-slate-300 border-e border-white/5 shrink-0 z-30">
        {/* Brand & Badge */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white font-black text-sm shadow-md">
              E
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                <span>Eviq Governance</span>
                <span className="rounded bg-blue-500/20 px-1 text-[9px] font-mono text-blue-400 font-bold">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {isAr ? 'حوكمة المنظومة الشاملة' : 'Super Admin Suite'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
            {isAr ? 'وحدات الحوكمة (AD01 - AD12)' : 'Governance Screens'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAdminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveAdminTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition text-left group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon
                  className={clsx(
                    'size-4 shrink-0 transition',
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                  )}
                />

                <span className="flex-1 truncate">
                  {isAr ? item.labelAr : item.labelEn}
                </span>

                <span
                  className={clsx(
                    'font-mono text-[9px] rounded px-1.5 py-0.5',
                    isActive ? 'bg-white/20 text-white' : 'text-slate-600'
                  )}
                >
                  {item.code}
                </span>

                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={clsx(
                      'size-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white',
                      item.badgeTone === 'red' && 'bg-red-500',
                      item.badgeTone === 'amber' && 'bg-amber-500',
                      item.badgeTone === 'blue' && 'bg-blue-500'
                    )}
                  >
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile Bar */}
        <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Super Admin</div>
              <div className="text-[10px] text-slate-500 font-mono">Full Authority</div>
            </div>
          </div>

          <button
            onClick={() => go('landing')}
            title="Exit Admin to Attendee Flow"
            className="size-8 rounded-lg border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Governance Portal</span>
                <span>/</span>
                <span className="font-bold text-blue-600">{currentNav.code}</span>
              </div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                {isAr ? currentNav.labelAr : currentNav.labelEn}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <Globe className="size-3.5 text-slate-500" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Quick exit to attendee button */}
            <button
              onClick={() => go('landing')}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <span>{isAr ? 'عرض الموقع كزائر' : 'Attendee View'}</span>
              {isAr ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex">
            <div className="w-72 bg-[#090D16] text-slate-300 flex flex-col h-full p-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-bold text-white text-sm">Governance Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-1 mt-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAdminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveAdminTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={clsx(
                        'w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition text-left',
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1">{isAr ? item.labelAr : item.labelEn}</span>
                      <span className="font-mono text-[9px] text-slate-500">{item.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Routed View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeAdminTab === 'overview' && <AD01_OverviewView />}
          {activeAdminTab === 'users' && <AD02_UsersListView />}
          {activeAdminTab === 'kyc-queue' && <AD04_VendorQueueView />}
          {activeAdminTab === 'kyc-review' && <AD05_KycReviewerView />}
          {activeAdminTab === 'events-queue' && <AD06_EventsQueueView />}
          {activeAdminTab === 'event-review' && <AD07_EventModerationView />}
          {activeAdminTab === 'categories' && <AD08_TaxonomyView />}
          {activeAdminTab === 'disputes' && <AD09_DisputesView />}
          {activeAdminTab === 'system-health' && <AD10_SystemHealthView />}
          {activeAdminTab === 'broadcast' && <AD11_BroadcastView />}
          {activeAdminTab === 'settings' && <AD12_SettingsView />}
        </main>
      </div>
    </div>
  );
};
