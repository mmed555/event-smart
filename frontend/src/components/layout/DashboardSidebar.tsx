import React from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { DashboardNavItem, DashboardRole } from '../../types';
import { LogOut, X, Shield, Calendar, Store } from 'lucide-react';
import clsx from 'clsx';

interface DashboardSidebarProps {
  role: DashboardRole;
  portalTitleEn: string;
  portalTitleAr: string;
  portalSubtitleEn?: string;
  portalSubtitleAr?: string;
  roleBadgeText?: string;
  navItems: DashboardNavItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onCloseMobile?: () => void;
  isMobileDrawer?: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  role,
  portalTitleEn,
  portalTitleAr,
  portalSubtitleEn,
  portalSubtitleAr,
  roleBadgeText,
  navItems,
  activeTab,
  onTabChange,
  onCloseMobile,
  isMobileDrawer = false,
}) => {
  const { language } = useI18n();
  const { currentUser, go } = useApp();
  const isAr = language === 'ar';

  const roleMeta = {
    admin: {
      badgeBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      activeItemBg: 'bg-blue-600 text-white shadow-sm font-semibold',
      activeIconColor: 'text-white',
      avatarBg: 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
      defaultBadge: 'SUPER ADMIN',
      icon: Shield,
    },
    organizer: {
      badgeBg: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
      activeItemBg: 'bg-indigo-600 text-white shadow-sm font-semibold',
      activeIconColor: 'text-white',
      avatarBg: 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30',
      defaultBadge: 'ORGANIZER',
      icon: Calendar,
    },
    vendor: {
      badgeBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      activeItemBg: 'bg-emerald-600 text-white shadow-sm font-semibold',
      activeIconColor: 'text-white',
      avatarBg: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30',
      defaultBadge: 'VENDOR',
      icon: Store,
    },
  }[role];

  const RoleIcon = roleMeta.icon;

  // Group items by section if provided
  const groupedItems: { sectionTitle: string; items: DashboardNavItem[] }[] = [];
  const ungroupedItems: DashboardNavItem[] = [];

  navItems.forEach((item) => {
    const sectionName = isAr ? item.sectionAr || item.section : item.section;
    if (sectionName) {
      let group = groupedItems.find((g) => g.sectionTitle === sectionName);
      if (!group) {
        group = { sectionTitle: sectionName, items: [] };
        groupedItems.push(group);
      }
      group.items.push(item);
    } else {
      ungroupedItems.push(item);
    }
  });

  return (
    <div
      className={clsx(
        'flex flex-col h-full bg-[#090D16] text-slate-300 select-none overflow-hidden',
        isMobileDrawer ? 'w-64' : 'w-56 xl:w-60'
      )}
    >
      {/* Brand Header */}
      <div className="px-3.5 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white font-black text-xs shadow-md shrink-0">
            <RoleIcon className="size-3.5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-white text-xs tracking-tight flex items-center gap-1.5 truncate">
              <span className="truncate">{isAr ? portalTitleAr : portalTitleEn}</span>
              <span className={clsx('rounded px-1 py-0.5 text-[8px] font-mono font-bold uppercase shrink-0', roleMeta.badgeBg)}>
                {roleBadgeText || roleMeta.defaultBadge}
              </span>
            </div>
            <div className="text-[9px] text-slate-500 font-mono truncate mt-0.5">
              {isAr ? portalSubtitleAr || 'منظومة إدارة الفعاليات' : portalSubtitleEn || 'Smart Event Platform'}
            </div>
          </div>
        </div>

        {isMobileDrawer && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition shrink-0 ms-1"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation Links with custom dark scrollbar */}
      <nav className="flex-1 overflow-y-auto min-h-0 p-2 space-y-0.5 sidebar-scrollbar">
        {ungroupedItems.length > 0 && (
          <div className="space-y-0.5">
            {ungroupedItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={clsx(
                    'w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition text-start group',
                    isActive
                      ? roleMeta.activeItemBg
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon
                    className={clsx(
                      'size-3.5 shrink-0 transition',
                      isActive ? roleMeta.activeIconColor : 'text-slate-500 group-hover:text-slate-300'
                    )}
                  />

                  <span className="flex-1 truncate text-[11.5px]">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={clsx(
                        'h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-white shrink-0',
                        item.badgeTone === 'red' && 'bg-red-500',
                        item.badgeTone === 'amber' && 'bg-amber-500',
                        item.badgeTone === 'emerald' && 'bg-emerald-500',
                        (!item.badgeTone || item.badgeTone === 'blue') && 'bg-blue-500'
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {groupedItems.map((group, idx) => (
          <div key={idx} className="pt-1.5 first:pt-0 space-y-0.5">
            <div className="px-2 pt-1 pb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">
              {group.sectionTitle}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={clsx(
                    'w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition text-start group',
                    isActive
                      ? roleMeta.activeItemBg
                      : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'
                  )}
                >
                  <Icon
                    className={clsx(
                      'size-3.5 shrink-0 transition',
                      isActive ? roleMeta.activeIconColor : 'text-slate-500 group-hover:text-slate-300'
                    )}
                  />

                  <span className="flex-1 truncate text-[11.5px]">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={clsx(
                        'h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-white shrink-0',
                        item.badgeTone === 'red' && 'bg-red-500',
                        item.badgeTone === 'amber' && 'bg-amber-500',
                        item.badgeTone === 'emerald' && 'bg-emerald-500',
                        (!item.badgeTone || item.badgeTone === 'blue') && 'bg-blue-500'
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Profile & Logout Bar */}
      <div className="p-2.5 border-t border-white/5 bg-black/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className={clsx('size-7 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0', roleMeta.avatarBg)}>
            {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'EQ'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-white leading-tight truncate">
              {currentUser?.name || 'Administrator'}
            </div>
            <div className="text-[9px] text-slate-500 font-mono truncate">
              {currentUser?.email || (isAr ? 'حساب النظام' : 'System Account')}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            go('landing');
          }}
          title={isAr ? 'الخروج إلى واجهة الزائر' : 'Exit to Attendee Portal'}
          className="size-7 rounded-md border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition shrink-0 ms-1"
        >
          <LogOut className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
