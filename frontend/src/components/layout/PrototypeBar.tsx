import React from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import { VendorTab } from '../../types';
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
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

/**
تفعيل او تعطيل ( true - false )
*/
const SHOW_PROTOTYPE_BAR = true;

export const PrototypeBar: React.FC = () => {
  const {
    screen,
    go,
    setRole,
    resetDemoData,
    isLoading,
    toggleLoading,
    activeVendorTab,
    setActiveVendorTab,
  } = useApp();
  const { language, toggleLanguage } = useI18n();

  // إخفاء الشريط عند تعطيل المفتاح
  if (!SHOW_PROTOTYPE_BAR) {
    return null;
  }

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
    { id: 'profile', label: 'Profile & Settings', labelAr: 'الملف الشخصي', code: '07' },
  ];

  const vendorScreens: { id: VendorTab; label: string; labelAr: string; code: string }[] = [
    { id: 'overview', label: 'Overview', labelAr: 'لوحة القيادة', code: 'V04' },
    { id: 'services', label: 'Services', labelAr: 'كتالوج الخدمات', code: 'V06' },
    { id: 'rfq-inbox', label: 'RFQ Inbox', labelAr: 'صندوق الفرص', code: 'V08' },
    { id: 'my-quotes', label: 'My Quotes', labelAr: 'عروضي', code: 'V11' },
    { id: 'orders', label: 'Orders', labelAr: 'أوامر التنفيذ', code: 'V12' },
    { id: 'reviews', label: 'Reviews', labelAr: 'التقييمات', code: 'V14' },
    { id: 'kyc', label: 'KYC', labelAr: 'التوثيق', code: 'V03' },
    { id: 'profile', label: 'Profile', labelAr: 'بروفايل الشركة', code: 'V05' },
    { id: 'settings', label: 'Settings', labelAr: 'الإعدادات', code: 'V16' },
  ];

  const currentRoleMatch = prototypeRoles.find(
    (r) =>
      r.id === screen ||
      (r.id === 'attendee' && ['landing', 'auth', 'ai', 'search', 'details', 'tickets', 'speaker', 'profile'].includes(screen)) ||
      (r.id === 'organizer' && ['org', 'wizard', 'planner', 'checkin', 'market', 'quotes'].includes(screen)) ||
      (r.id === 'vendor' && screen === 'vendor') ||
      (r.id === 'admin' && screen === 'admin') ||
      (r.id === 'mobile' && screen === 'mobile')
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between py-2 text-xs">
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

        {/* Right: Quick actions (Skeleton toggle, Language toggle, Reset) */}
        <div className="flex items-center gap-2 shrink-0 ps-2">
          {/* Skeleton Preview Toggle */}
          <button
            onClick={toggleLoading}
            className={clsx(
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-semibold text-xs transition-all shadow-xs',
              isLoading
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            )}
            title="Toggle Skeleton Loading Preview"
          >
            <Sparkles className={clsx('size-3.5', isLoading ? 'text-amber-300 animate-pulse' : 'text-indigo-600')} />
            <span>
              {language === 'ar'
                ? (isLoading ? 'إيقاف التحميل' : 'معاينة التحميل ⚡')
                : (isLoading ? 'Exit Skeleton' : 'Skeleton Preview ⚡')}
            </span>
          </button>

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
        <div className="border-t border-slate-100 bg-[#F8FAFC]">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center gap-2 overflow-x-auto py-1.5 text-[11px]">
            <span className="text-slate-400 font-bold uppercase tracking-wider pe-1 shrink-0">
              {language === 'ar' ? 'شاشات الحضور:' : 'Attendee Screens:'}
            </span>
            {attendeeScreens.map((s) => {
              const isSelected = screen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id, s.id === 'details' ? { id: 1 } : {})}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-all shrink-0',
                    isSelected
                      ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  )}
                >
                  <span
                    className={clsx(
                      'font-mono text-[10px] px-1.5 py-0.5 rounded leading-none',
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

      {/* Secondary Bar for Screen Jump inside Vendor Flow */}
      {currentRoleMatch?.id === 'vendor' && (
        <div className="border-t border-slate-100 bg-[#F8FAFC]">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center gap-2 overflow-x-auto py-1.5 text-[11px]">
            <span className="text-slate-400 font-bold uppercase tracking-wider pe-1 shrink-0">
              {language === 'ar' ? 'شاشات الشركة (V01-V16):' : 'Vendor Screens (V01-V16):'}
            </span>
            {vendorScreens.map((s) => {
              const isSelected = activeVendorTab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveVendorTab(s.id)}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-all shrink-0',
                    isSelected
                      ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  )}
                >
                  <span
                    className={clsx(
                      'font-mono text-[10px] px-1.5 py-0.5 rounded leading-none',
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
