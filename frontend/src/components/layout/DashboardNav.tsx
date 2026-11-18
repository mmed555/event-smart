import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { DashboardNavItem, DashboardRole } from '../../types';
import {
  Menu,
  Globe,
  Bell,
  CheckCheck,
  ChevronDown,
  User as UserIcon,
  LogOut,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import clsx from 'clsx';

interface DashboardNavProps {
  role: DashboardRole;
  portalTitleEn: string;
  portalTitleAr: string;
  currentNav?: DashboardNavItem;
  onOpenMobileMenu: () => void;
  headerActions?: React.ReactNode;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({
  role,
  portalTitleEn,
  portalTitleAr,
  currentNav,
  onOpenMobileMenu,
  headerActions,
}) => {
  const { language, toggleLanguage } = useI18n();
  const { currentUser, notifications, markAllNotificationsRead, go, logout } = useApp();
  const isAr = language === 'ar';

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleDisplay = {
    admin: { en: 'Super Admin', ar: 'المشرف العام', tone: 'text-blue-600 bg-blue-50 border-blue-200' },
    organizer: { en: 'Event Organizer', ar: 'منظم الفعالية', tone: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    vendor: { en: 'Registered Vendor', ar: 'مزود خدمات معتمد', tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  }[role];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left / Start: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono truncate">
            <span>{isAr ? portalTitleAr : portalTitleEn}</span>
            <span>/</span>
            <span className="font-bold text-blue-600 truncate">
              {currentNav ? (isAr ? currentNav.labelAr : currentNav.labelEn) : ''}
            </span>
          </div>
          <h1 className="text-base font-black text-slate-900 leading-tight truncate">
            {currentNav ? (isAr ? currentNav.labelAr : currentNav.labelEn) : ''}
          </h1>
        </div>
      </div>

      {/* Right / End: Custom Actions, Language, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {headerActions && <div className="hidden md:flex items-center">{headerActions}</div>}

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
          title={isAr ? 'التحويل إلى الإنجليزية' : 'Switch to Arabic'}
        >
          <Globe className="size-3.5 text-slate-500" />
          <span className="font-semibold">{isAr ? 'English' : 'عربي'}</span>
        </button>

        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative size-9 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition shadow-2xs"
            title={isAr ? 'الإشعارات' : 'Notifications'}
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -end-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white ring-2 ring-white animate-pulse shadow-xs pointer-events-none leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute end-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    {isAr ? 'الإشعارات والتنبيهات' : 'Notifications'}
                  </span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5">
                      {unreadCount} {isAr ? 'جديد' : 'new'}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                  >
                    <CheckCheck className="size-3.5" />
                    <span>{isAr ? 'تحديد الكل كمقروء' : 'Mark all read'}</span>
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    {isAr ? 'لا توجد إشعارات حالياً' : 'No notifications'}
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setShowNotifications(false);
                        if (n.link) {
                          go(n.link.screen as any, n.link.params || {});
                        }
                      }}
                      className={clsx(
                        'py-3 px-2 rounded-xl transition-colors cursor-pointer text-start',
                        n.read ? 'hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {n.body}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick exit to attendee portal button */}
        <button
          onClick={() => go('landing')}
          className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          title={isAr ? 'الانتقال إلى واجهة الحضور والزوار' : 'Switch to Attendee Portal'}
        >
          <span>{isAr ? 'عرض كزائر' : 'Attendee View'}</span>
          {isAr ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
        </button>

        {/* User Profile Menu Dropdown */}
        <div ref={userMenuRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={clsx(
              'h-9 flex items-center gap-2 rounded-xl p-1 sm:pe-2.5 transition-all border',
              showUserMenu
                ? 'bg-slate-100 border-slate-300 shadow-inner'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
            )}
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="relative size-7 rounded-full overflow-hidden ring-1 ring-blue-500/30 shrink-0 bg-slate-100">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-700">
                  {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
                </div>
              )}
              <span className="absolute bottom-0 end-0 size-2 rounded-full bg-emerald-500 ring-1 ring-white" />
            </div>

            <div className="hidden sm:flex flex-col text-start leading-none max-w-[110px] truncate">
              <span className="text-[11px] font-bold text-slate-900 truncate">
                {currentUser?.name?.split(' ')[0] || (isAr ? 'المسؤول' : 'Admin')}
              </span>
              <span className="text-[9px] font-medium text-slate-500 mt-0.5 truncate">
                {isAr ? roleDisplay.ar : roleDisplay.en}
              </span>
            </div>

            <ChevronDown
              className={clsx(
                'size-3 text-slate-400 transition-transform duration-200',
                showUserMenu ? 'rotate-180 text-slate-700' : ''
              )}
            />
          </button>

          {showUserMenu && (
            <div className="absolute end-0 mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl z-50">
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-blue-500/20 shrink-0 bg-white">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-700">
                      {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-start">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {currentUser?.name || 'Platform Administrator'}
                    </span>
                    <ShieldCheck className="size-3.5 text-blue-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {currentUser?.email || 'admin@eviq.internal'}
                  </p>
                  <div className="mt-1">
                    <span
                      className={clsx(
                        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold border',
                        roleDisplay.tone
                      )}
                    >
                      {isAr ? roleDisplay.ar : roleDisplay.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1 mt-1 space-y-0.5 text-xs font-medium text-slate-700">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    go('profile');
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-start hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <UserIcon className="size-4 text-slate-400" />
                  <span>{isAr ? 'الملف الشخصي والحساب' : 'Account Settings'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    go('landing');
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-start hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="size-4 text-slate-400" />
                  <span>{isAr ? 'عرض الموقع كزائر' : 'Attendee Portal View'}</span>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    go('auth');
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-start text-red-600 hover:bg-red-50 transition-colors font-semibold"
                >
                  <LogOut className="size-4 text-red-500" />
                  <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
