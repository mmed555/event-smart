import React from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Layers,
  User,
  Calendar,
  Briefcase,
  Shield,
  Smartphone,
  Globe,
  RotateCcw,
} from 'lucide-react';
import clsx from 'clsx';

export const PrototypeBar: React.FC = () => {
  const { screen, go, setRole, resetDemoData } = useApp();
  const { language, toggleLanguage } = useI18n();

  const prototypeRoles = [
    { id: 'system', label: 'Design System', labelAr: 'نظام التصميم', icon: Layers, screen: 'system' as ScreenId },
    { id: 'attendee', label: 'Attendee', labelAr: 'حاضر', icon: User, screen: 'landing' as ScreenId },
    { id: 'organizer', label: 'Organizer', labelAr: 'منظم', icon: Calendar, screen: 'org' as ScreenId },
    { id: 'vendor', label: 'Vendor', labelAr: 'مورّد', icon: Briefcase, screen: 'vendor' as ScreenId },
    { id: 'admin', label: 'Super Admin', labelAr: 'المشرف العام', icon: Shield, screen: 'admin' as ScreenId },
    { id: 'mobile', label: 'Mobile App', labelAr: 'تطبيق الموبايل', icon: Smartphone, screen: 'mobile' as ScreenId },
  ];

  const attendeeScreens: { id: ScreenId; label: string; labelAr: string; code: string }[] = [
    { id: 'landing', label: 'Landing', labelAr: 'الرئيسية', code: '01' },
    { id: 'auth', label: 'Authentication', labelAr: 'تسجيل الدخول', code: '02' },
    { id: 'ai', label: 'AI Assistant', labelAr: 'المساعد الذكي', code: '03' },
    { id: 'search', label: 'Search & Favorites', labelAr: 'البحث والمفضلة', code: '04' },
    { id: 'details', label: 'Event & Checkout', labelAr: 'الفعالية والدفع', code: '05' },
    { id: 'tickets', label: 'My Tickets', labelAr: 'تذاكري', code: '06' },
  ];

  const currentRoleMatch = prototypeRoles.find(
    (r) =>
      r.id === screen ||
      (r.id === 'attendee' && ['landing', 'auth', 'ai', 'search', 'details', 'tickets'].includes(screen)) ||
      (r.id === 'organizer' && ['org', 'wizard', 'planner', 'checkin', 'market', 'quotes'].includes(screen)) ||
      (r.id === 'vendor' && screen === 'vendor') ||
      (r.id === 'admin' && screen === 'admin') ||
      (r.id === 'mobile' && screen === 'mobile')
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 py-2 text-xs">
        {/* Left: Brand & Role Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <div className="flex items-center gap-2 pe-3 me-1 border-e border-slate-200 shrink-0">
            <span className="flex size-6 items-center justify-center rounded-lg bg-[#2563EB] text-[11px] font-black text-white">
              E
            </span>
            <span className="font-extrabold tracking-tight text-slate-900 hidden sm:inline">
              Eviq <span className="font-normal text-slate-400">Prototype</span>
            </span>
          </div>

          {prototypeRoles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRoleMatch?.id === r.id;

            return (
              <button
                key={r.id}
                onClick={() => {
                  if (r.id === 'attendee' || r.id === 'organizer' || r.id === 'vendor' || r.id === 'admin') {
                    setRole(r.id);
                  }
                  go(r.screen, r.id === 'attendee' ? { id: 1 } : {});
                }}
                className={clsx(
                  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold transition-all shrink-0',
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <Icon className="size-3.5" />
                <span>{language === 'ar' ? r.labelAr : r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick actions (Language toggle, Reset) */}
        <div className="flex items-center gap-2 shrink-0 ps-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700 shadow-soft hover:bg-slate-50 transition-colors"
            title="Switch Language (AR / EN)"
          >
            <Globe className="size-3.5 text-[#2563EB]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemoData}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset Demo Data"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Secondary Bar for Screen Jump inside Attendee Flow */}
      {currentRoleMatch?.id === 'attendee' && (
        <div className="border-t border-slate-100 bg-[#F8FAFC] px-3 py-1.5">
          <div className="mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-bold uppercase tracking-wider pe-2 shrink-0">
              {language === 'ar' ? 'شاشات الحضور:' : 'Attendee Screens:'}
            </span>
            {attendeeScreens.map((s) => {
              const isSelected = screen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id, s.id === 'details' ? { id: 1 } : {})}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-md px-2 py-1 font-medium transition-all shrink-0',
                    isSelected
                      ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  )}
                >
                  <span
                    className={clsx(
                      'font-mono text-[10px] px-1 rounded',
                      isSelected ? 'bg-blue-700/80 text-white' : 'bg-slate-200/70 text-slate-500'
                    )}
                  >
                    {s.code}
                  </span>
                  <span>{language === 'ar' ? s.labelAr : s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
