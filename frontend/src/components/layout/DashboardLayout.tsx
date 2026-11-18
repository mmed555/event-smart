import React, { useState } from 'react';
import { DashboardLayoutProps } from '../../types';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardNav } from './DashboardNav';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  portalTitleEn,
  portalTitleAr,
  portalSubtitleEn,
  portalSubtitleAr,
  roleBadgeText,
  navItems,
  activeTab,
  onTabChange,
  children,
  headerActions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentNav = navItems.find((n) => n.id === activeTab) || navItems[0];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex shrink-0 z-30 sticky top-[45px] h-[calc(100vh-45px)] border-e border-slate-200/80 bg-white overflow-hidden">
        <DashboardSidebar
          role={role}
          portalTitleEn={portalTitleEn}
          portalTitleAr={portalTitleAr}
          portalSubtitleEn={portalSubtitleEn}
          portalSubtitleAr={portalSubtitleAr}
          roleBadgeText={roleBadgeText}
          navItems={navItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </aside>

      {/* Mobile Sliding Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <div className="relative z-10 flex h-full shadow-2xl">
            <DashboardSidebar
              role={role}
              portalTitleEn={portalTitleEn}
              portalTitleAr={portalTitleAr}
              portalSubtitleEn={portalSubtitleEn}
              portalSubtitleAr={portalSubtitleAr}
              roleBadgeText={roleBadgeText}
              navItems={navItems}
              activeTab={activeTab}
              onTabChange={onTabChange}
              onCloseMobile={() => setMobileMenuOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Unified Dashboard Top Navigation Bar */}
        <DashboardNav
          role={role}
          portalTitleEn={portalTitleEn}
          portalTitleAr={portalTitleAr}
          currentNav={currentNav}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          headerActions={headerActions}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
