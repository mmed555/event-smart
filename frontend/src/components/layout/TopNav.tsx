import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { TopNavSkeleton } from '../ui/Skeleton';
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
} from 'lucide-react';
import clsx from 'clsx';

export const TopNav: React.FC = () => {
  const { screen, go, favs, tickets, notifications, markAllNotificationsRead, isLoading, events } = useApp();
  const { t, language, toggleLanguage } = useI18n();

  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchNavRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        searchNavRef.current &&
        !searchNavRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
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
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4 py-3">
        {/* Left / Start: Brand Logo & Main Nav */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <button
            onClick={() => go('landing')}
            className="flex items-center gap-2.5 text-start group focus:outline-none shrink-0"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-base tracking-tighter">EQ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">Eviq</span>
                <span className="rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[10px] font-extrabold text-[#4F46E5]">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 -mt-0.5 hidden sm:block">
                Smart Event Platform
              </p>
            </div>
          </button>

          {/* Divider between Brand and Nav Links */}
          <div className="h-6 w-px bg-slate-200 hidden lg:block shrink-0" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 text-sm font-semibold">
            <button
              onClick={() => go('search')}
              className={clsx(
                'h-10 rounded-xl px-3.5 flex items-center transition-colors',
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
                'h-10 flex items-center gap-1.5 rounded-xl px-3.5 transition-colors',
                screen === 'ai'
                  ? 'bg-[#EEF2FF] text-[#4F46E5]'
                  : 'text-slate-600 hover:bg-[#EEF2FF]/60 hover:text-[#4F46E5]'
              )}
            >
              <Sparkles className="size-4 text-[#4F46E5]" />
              <span>{t('AI Assistant')}</span>
            </button>
            <button
              onClick={() => go('tickets')}
              className={clsx(
                'h-10 flex items-center gap-1.5 rounded-xl px-3.5 transition-colors',
                screen === 'tickets'
                  ? 'bg-slate-100 text-[#2563EB]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Ticket className="size-4" />
              <span>{t('My Tickets')}</span>
              {tickets.length > 0 && (
                <span className="ms-1.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 leading-none">
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
            'hidden lg:block relative flex-1 max-w-md xl:max-w-xl mx-4 lg:mx-8',
            isSearchOpen ? 'z-50' : 'z-10'
          )}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
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
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 py-2 ps-10 pe-9 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all shadow-2xs"
            />
            {searchVal && (
              <button
                type="button"
                onClick={() => {
                  setSearchVal('');
                  setIsSearchOpen(false);
                }}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full hover:bg-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
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
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="h-10 flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95 shadow-2xs"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="size-4 text-slate-500" />
            <span className="font-semibold">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Favorites shortcut */}
          <button
            onClick={() => go('search', { cat: 'Favorites' })}
            className="relative size-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-red-500 transition-colors"
            title={t('Favorites')}
          >
            <Heart className="size-5" />
            {favs.length > 0 && (
              <span className="absolute -top-1 -end-1 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white shadow-xs">
                {favs.length}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative size-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#2563EB] transition-colors focus:outline-none"
              title={t('Notifications')}
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -end-1 flex size-4.5 items-center justify-center rounded-full bg-[#2563EB] text-[10px] font-bold text-white border-2 border-white animate-pulse shadow-xs">
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

          {/* Divider before Sign In button */}
          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block shrink-0" />

          {/* User Sign In / Register / Account */}
          <button
            onClick={() => go('auth')}
            className="h-10 flex items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 hover:shadow-md transition-all active:scale-95 shrink-0"
          >
            <UserIcon className="size-4" />
            <span className="hidden sm:inline">{t('Sign In')}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
