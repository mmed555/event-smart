import React from 'react';
import { useI18n } from '../../i18n';
import { DashboardNavItem, DashboardRole } from '../../types';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface DashboardSidebarProps {
  role: DashboardRole;
  portalTitleEn?: string;
  portalTitleAr?: string;
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
  roleBadgeText,
  navItems,
  activeTab,
  onTabChange,
  onCloseMobile,
  isMobileDrawer = false,
}) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const roleMeta = {
    admin: {
      badgeBg: 'bg-blue-50 text-blue-700 border border-blue-200/70',
      activeItemBg: 'bg-blue-50 text-blue-700 font-bold border border-blue-100 shadow-2xs',
      activeIconColor: 'text-blue-600',
      defaultBadge: isAr ? 'المشرف العام' : 'SUPER ADMIN',
    },
    organizer: {
      badgeBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200/70',
      activeItemBg: 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 shadow-2xs',
      activeIconColor: 'text-indigo-600',
      defaultBadge: isAr ? 'منظم' : 'ORGANIZER',
    },
    vendor: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
      activeItemBg: 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 shadow-2xs',
      activeIconColor: 'text-emerald-600',
      defaultBadge: isAr ? 'مورد' : 'VENDOR',
    },
  }[role];

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
        'flex flex-col h-full bg-white text-slate-700 select-none overflow-hidden border-e border-slate-200/80 shadow-2xs',
        isMobileDrawer ? 'w-64' : 'w-56 xl:w-60'
      )}
    >
      {/* Brand Header: Official System Logo & Name */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] text-white shadow-xs shrink-0">
            <span className="font-extrabold text-xs tracking-tighter">EQ</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-black tracking-tight text-slate-900">Eviq</span>
              <span className="rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[9px] font-extrabold text-[#4F46E5] leading-none">
                AI
              </span>
              <span
                className={clsx(
                  'rounded px-1.5 py-0.5 text-[8.5px] font-mono font-bold uppercase truncate ms-auto',
                  roleMeta.badgeBg
                )}
              >
                {roleBadgeText || roleMeta.defaultBadge}
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 mt-1 truncate leading-none">
              {isAr ? 'منظومة الفعاليات الذكية' : 'Smart Event Platform'}
            </p>
          </div>
        </div>

        {isMobileDrawer && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition shrink-0 ms-1"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation Links with Clean Light Scrollbar */}
      <nav className="flex-1 overflow-y-auto min-h-0 p-2 space-y-0.5">
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
                    'w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition text-start group',
                    isActive
                      ? roleMeta.activeItemBg
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon
                    className={clsx(
                      'size-4 shrink-0 transition',
                      isActive ? roleMeta.activeIconColor : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />

                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <span
                      className={clsx(
                        'truncate text-[12.5px] sm:text-[13px]',
                        isActive ? 'font-bold text-blue-700' : 'font-medium text-slate-700 group-hover:text-slate-900'
                      )}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </span>

                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span
                        className={clsx(
                          'h-4.5 min-w-[18px] px-1.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0 shadow-2xs',
                          item.badgeTone === 'red' && 'bg-red-500',
                          item.badgeTone === 'amber' && 'bg-amber-500',
                          item.badgeTone === 'emerald' && 'bg-emerald-500',
                          (!item.badgeTone || item.badgeTone === 'blue') && 'bg-blue-600'
                        )}
                      >
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {groupedItems.map((group, idx) => (
          <div key={idx} className="pt-2 first:pt-0 space-y-0.5">
            <div className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
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
                    'w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition text-start group',
                    isActive
                      ? roleMeta.activeItemBg
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon
                    className={clsx(
                      'size-4 shrink-0 transition',
                      isActive ? roleMeta.activeIconColor : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />

                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <span
                      className={clsx(
                        'truncate text-[12.5px] sm:text-[13px]',
                        isActive ? 'font-bold text-blue-700' : 'font-medium text-slate-700 group-hover:text-slate-900'
                      )}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </span>

                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span
                        className={clsx(
                          'h-4.5 min-w-[18px] px-1.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0 shadow-2xs',
                          item.badgeTone === 'red' && 'bg-red-500',
                          item.badgeTone === 'amber' && 'bg-amber-500',
                          item.badgeTone === 'emerald' && 'bg-emerald-500',
                          (!item.badgeTone || item.badgeTone === 'blue') && 'bg-blue-600'
                        )}
                      >
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};
