import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { TopNavSkeleton } from '../ui/skeleton';
import { SearchDropdown } from '../ui/SearchDropdown';
import {
  Search,
  Sparkles,
  Ticket,
  Heart,
  Bell,
  User as UserIcon,
  CheckCheck,
  Globe,
  X,
  ChevronDown,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

export const TopNav: React.FC = () => {
  const {
    screen,
    go,
    favs,
    tickets,
    notifications,
    markAllNotificationsRead,
    isLoading,
    events,
    currentUser,
    logout,
  } = useApp();
  const { t, language, toggleLanguage } = useI18n();

  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchNavRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close search and user dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (searchNavRef.current && !searchNavRef.current.contains(target)) {
        setIsSearchOpen(false);
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      go('search', { q: searchVal.trim() });
    } else {
      go('search');
    }
  };

  if (isLoading) {
    return <TopNavSkeleton />;
  }

  return (
    <nav className="relative z-30 border-b border-slate-200/80 bg-white shadow-soft">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 py-2 sm:py-2.5">
        {/* Left / Start: Brand Logo & Main Nav */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <button
            onClick={() => go('landing')}
            className="flex items-center gap-2 text-start group focus:outline-none shrink-0"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-sm tracking-tighter">EQ</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base font-black tracking-tight text-slate-900 leading-none">Eviq</span>
                <span className="rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[9px] font-extrabold text-[#4F46E5] leading-none">
                  AI
                </span>
              </div>
              <p className="text-[9px] font-medium text-slate-400 mt-0.5 hidden sm:block leading-none">
                Smart Event Platform
              </p>
            </div>
          </button>

          {/* Divider between Brand and Nav Links */}
          <div className="h-5 w-px bg-slate-200 hidden lg:block shrink-0" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => go('search')}
              className={clsx(
                'h-9 rounded-lg px-3 flex items-center transition-colors',
                screen === 'search'
                  ? 'bg-slate-100 text-[#2563EB]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              {t('Explore')}
            </button>
            <button
              onClick={() => go('ai')}
              className={clsx(
                'h-9 flex items-center gap-1.5 rounded-lg px-3 transition-colors',
                screen === 'ai'
                  ? 'bg-[#EEF2FF] text-[#4F46E5]'
                  : 'text-slate-600 hover:bg-[#EEF2FF]/60 hover:text-[#4F46E5]'
              )}
            >
              <Sparkles className="size-3.5 text-[#4F46E5]" />
              <span>{t('AI Assistant')}</span>
            </button>
            <button
              onClick={() => go('tickets')}
              className={clsx(
                'h-9 flex items-center gap-1.5 rounded-lg px-3 transition-colors',
                screen === 'tickets'
                  ? 'bg-slate-100 text-[#2563EB]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Ticket className="size-3.5" />
              <span>{t('My Tickets')}</span>
              {tickets.length > 0 && (
                <span className="ms-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-700 leading-none">
                  {tickets.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center: Search Input with Live Dropdown */}
        <div
          ref={searchNavRef}
          className={clsx(
            'hidden lg:block relative flex-1 max-w-sm xl:max-w-md mx-3 lg:mx-6',
            isSearchOpen ? 'z-50' : 'z-10'
          )}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                setIsSearchOpen(e.target.value.trim().length > 0);
              }}
              onFocus={() => {
                if (searchVal.trim().length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              placeholder={t('Search events, venues…')}
              className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50/70 py-1.5 ps-9 pe-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
            />
            {searchVal && (
              <button
                type="button"
                onClick={() => {
                  setSearchVal('');
                  setIsSearchOpen(false);
                }}
                className="absolute end-2 top-1/2 -translate-y-1/2 size-4.5 rounded-full hover:bg-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-3" />
              </button>
            )}
          </form>

          {/* Live Search Results Dropdown Popover */}
          <SearchDropdown
            query={searchVal}
            events={events}
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectEvent={(event) => {
              setIsSearchOpen(false);
              go('details', { id: event.id });
            }}
            onViewAll={(q) => {
              setIsSearchOpen(false);
              go('search', { q });
            }}
          />
        </div>

        {/* Right / End: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="h-9 flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/70 px-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95 shadow-2xs"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="size-3.5 text-slate-500" />
            <span className="font-semibold">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Favorites shortcut */}
          <button
            onClick={() => go('search', { cat: 'Favorites' })}
            className="relative size-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-red-500 transition-colors"
            title={t('Favorites')}
          >
            <Heart className="size-4" />
            {favs.length > 0 && (
              <span className="absolute -top-1 -end-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white shadow-xs pointer-events-none leading-none">
                {favs.length}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative size-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#2563EB] transition-colors focus:outline-none"
              title={t('Notifications')}
            >
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -end-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white ring-2 ring-white animate-pulse shadow-xs pointer-events-none leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute end-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 anim-page p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{t('Notifications')}</span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-blue-100 text-[#2563EB] text-[10px] font-bold px-2 py-0.5">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:underline"
                    >
                      <CheckCheck className="size-3.5" />
                      <span>{t('Mark all read')}</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                  {notifications.map((n) => (
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
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider before User Account / Sign In */}
          <div className="h-5 w-px bg-slate-200 mx-0.5 hidden sm:block shrink-0" />

          {/* User Profile Dropdown or Sign In Button */}
          {currentUser ? (
            <div ref={userMenuRef} className="relative shrink-0">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={clsx(
                  'h-9 flex items-center gap-2 rounded-xl p-1 sm:pe-2.5 transition-all active:scale-95 border',
                  showUserMenu
                    ? 'bg-slate-100 border-slate-300 shadow-inner'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                )}
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                title={currentUser.name}
              >
                <div className="relative size-7 rounded-full overflow-hidden ring-1 ring-[#2563EB]/30 shrink-0 bg-slate-100">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 end-0 size-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div className="hidden sm:flex flex-col text-start leading-none max-w-[100px] truncate">
                  <span className="text-[11px] font-bold text-slate-900 truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 mt-0.5">
                    {language === 'ar' ? 'حاضر' : 'Attendee'}
                  </span>
                </div>
                <ChevronDown
                  className={clsx(
                    'size-3 text-slate-400 transition-transform duration-200',
                    showUserMenu ? 'rotate-180 text-slate-700' : ''
                  )}
                />
              </button>

              {/* Profile Popover / Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute end-0 mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl z-50 anim-page">
                  {/* User Profile Card Header */}
                  <div
                    onClick={() => {
                      setShowUserMenu(false);
                      go('profile');
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-100 cursor-pointer hover:bg-blue-50/70 transition-colors"
                  >
                    <div className="relative size-11 rounded-full overflow-hidden ring-2 ring-[#2563EB]/20 shrink-0 bg-white">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-start">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {currentUser.name}
                        </span>
                        <ShieldCheck className="size-3.5 text-blue-600 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {currentUser.email}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-extrabold text-[#2563EB] leading-none">
                          {language === 'ar' ? 'حاضر معتمد' : 'Verified Attendee'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu Items */}
                  <div className="py-1 mt-1 space-y-0.5 text-xs font-medium text-slate-700">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        go('profile');
                      }}
                      className={clsx(
                        'w-full flex items-center justify-between rounded-xl px-3 py-2 text-start transition-colors',
                        screen === 'profile'
                          ? 'bg-blue-50 font-bold text-[#2563EB]'
                          : 'hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Settings className="size-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs leading-none">
                            {t('Profile & Settings')}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal leading-tight">
                            {language === 'ar' ? 'تعديل الصورة والبيانات' : 'Edit photo & details'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] rounded-md bg-slate-100 text-slate-600 px-1.5 py-0.5 font-bold">
                        {language === 'ar' ? 'إعدادات' : 'Settings'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        go('tickets');
                      }}
                      className={clsx(
                        'w-full flex items-center justify-between rounded-xl px-3 py-2 text-start transition-colors',
                        screen === 'tickets'
                          ? 'bg-blue-50 font-bold text-[#2563EB]'
                          : 'hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <Ticket className="size-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs leading-none">
                            {t('My Tickets')}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal leading-tight">
                            {language === 'ar' ? 'التذاكر ورموز الـ QR' : 'Passes & QR codes'}
                          </span>
                        </div>
                      </div>
                      {tickets.length > 0 && (
                        <span className="text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">
                          {tickets.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        go('search', { cat: 'Favorites' });
                      }}
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-start hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                          <Heart className="size-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs leading-none">
                            {t('Favorites')}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal leading-tight">
                            {language === 'ar' ? 'الفعاليات المحفوظة' : 'Saved events'}
                          </span>
                        </div>
                      </div>
                      {favs.length > 0 && (
                        <span className="text-[10px] font-bold rounded-full bg-rose-100 text-rose-600 px-2 py-0.5">
                          {favs.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        go('ai');
                      }}
                      className={clsx(
                        'w-full flex items-center justify-between rounded-xl px-3 py-2 text-start transition-colors',
                        screen === 'ai'
                          ? 'bg-blue-50 font-bold text-[#4F46E5]'
                          : 'hover:bg-indigo-50/50 hover:text-[#4F46E5]'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                          <Sparkles className="size-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs leading-none">
                            {t('AI Assistant')}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal leading-tight">
                            {language === 'ar' ? 'توصيات ذكية مخصصة' : 'Smart recommendations'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] rounded-full bg-indigo-100 text-[#4F46E5] font-extrabold px-1.5 py-0.5">
                        AI
                      </span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="my-1.5 border-t border-slate-100" />

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-start text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <LogOut className="size-3.5" />
                    </div>
                    <span>{t('Sign Out')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => go('auth')}
              className="h-9 flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 hover:shadow transition-all active:scale-95 shrink-0"
            >
              <UserIcon className="size-3.5" />
              <span className="hidden sm:inline">{t('Sign In')}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
