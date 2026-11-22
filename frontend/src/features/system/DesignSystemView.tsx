import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select, SelectOption } from '../../components/ui/Select';
import { SearchDropdown } from '../../components/ui/SearchDropdown';
import { Skeleton, EventCardSkeleton } from '../../components/ui/skeleton';
import {
  Sparkles,
  RotateCcw,
  MapPin,
  Calendar,
  SlidersHorizontal,
  Layers,
  Search,
  X,
  KeyRound,
  ShieldCheck,
  MailCheck,
  HelpCircle,
  Compass,
  ShieldAlert,
  ServerCrash,
  Scale,
  LogIn,
  UserPlus,
  ArrowUpRight,
} from 'lucide-react';
import clsx from 'clsx';

export const DesignSystemView: React.FC = () => {
  const { resetDemoData, isLoading, toggleLoading, events, go } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeMainTab, setActiveMainTab] = useState<'screens' | 'tokens'>('screens');
  const [demoCity, setDemoCity] = useState('Cairo');
  const [demoSort, setDemoSort] = useState('match');
  const [demoSearchQuery, setDemoSearchQuery] = useState('tech');
  const [isDemoSearchOpen, setIsDemoSearchOpen] = useState(false);

  const demoCityOptions: SelectOption[] = [
    { value: 'Cairo', label: 'Cairo', labelAr: 'القاهرة', icon: MapPin },
    { value: 'Giza', label: 'Giza', labelAr: 'الجيزة', icon: MapPin },
    { value: 'Alexandria', label: 'Alexandria', labelAr: 'الإسكندرية', icon: MapPin },
    { value: 'Aswan', label: 'Aswan', labelAr: 'أسوان', icon: MapPin },
  ];

  const demoSortOptions: SelectOption[] = [
    { value: 'match', label: 'AI Match Score', labelAr: 'توافق الذكاء الاصطناعي', description: 'Ranked by interest embedding similarity' },
    { value: 'date', label: 'Soonest Date', labelAr: 'الأقرب موعداً', description: 'Chronological event timeline' },
    { value: 'price', label: 'Lowest Price', labelAr: 'الأقل سعراً', description: 'Budget friendly first' },
  ];

  const brandColors = [
    { name: 'Royal Blue', hex: '#2563EB', role: 'Primary brand & action' },
    { name: 'AI Indigo', hex: '#4F46E5', role: 'AI surfaces & intelligence' },
    { name: 'Canvas', hex: '#F8FAFC', role: 'Page background' },
    { name: 'Surface', hex: '#FFFFFF', role: 'Cards & modals' },
    { name: 'Sidebar', hex: '#0F172A', role: 'Dark navigation' },
    { name: 'Header', hex: '#1E293B', role: 'Dark active states' },
    { name: 'Text Primary', hex: '#0F172A', role: 'High contrast text' },
    { name: 'Text Secondary', hex: '#475569', role: 'Muted descriptions' },
    { name: 'Text Muted', hex: '#94A3B8', role: 'Placeholders & borders' },
  ];

  const statusColors = [
    { name: 'Success', hex: '#10B981', bg: '#DCFCE7' },
    { name: 'Pending', hex: '#F59E0B', bg: '#FEF3C7' },
    { name: 'Error / Danger', hex: '#EF4444', bg: '#FEE2E2' },
    { name: 'AI Match', hex: '#4F46E5', bg: '#EEF2FF' },
  ];

  const stateMachines = [
    {
      entity: 'Event Lifecycle',
      states: ['Draft', 'PendingApproval', 'Approved', 'Rejected', 'Published', 'Active', 'Completed', 'Cancelled'],
    },
    {
      entity: 'Booking Lifecycle',
      states: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    },
    {
      entity: 'Ticket QR Verification',
      states: ['Reserved', 'Confirmed', 'Used', 'Cancelled'],
    },
    {
      entity: 'Vendor KYC Verification',
      states: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
    },
    {
      entity: 'B2B RFQ & Quotation',
      states: ['OPEN', 'QUOTED', 'PENDING', 'ACCEPTED', 'REJECTED', 'DECLINED', 'FULFILLED'],
    },
  ];

  const sharedScreensList = [
    {
      code: 'S01',
      screenId: 'auth' as const,
      title: 'Unified Login',
      titleAr: 'تسجيل الدخول الموحد',
      desc: 'Role-based sign in with demo accounts for Attendee, Organizer, Vendor, and Admin.',
      descAr: 'نموذج دخول موحد يدعم الأدوار الأربعة مع الحسابات التجريبية وحفظ الجلسة.',
      icon: LogIn,
      url: '/auth',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      code: 'S02',
      screenId: 'auth' as const,
      title: 'Role Selection Register',
      titleAr: 'تسجيل حساب جديد واختيار الدور',
      desc: 'Interactive role cards selector: Attendee, Event Organizer, or Logistics Vendor.',
      descAr: 'بطاقات تفاعلية لاختيار الدور: حاضر، منظم فعاليات، أو شركة تنفيذ.',
      icon: UserPlus,
      url: '/auth?tab=register',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      code: 'S03',
      screenId: 'forgot-password' as const,
      title: 'Forgot Password',
      titleAr: 'استعادة كلمة المرور',
      desc: 'Email recovery request with instant regex validation and 6-digit OTP dispatch.',
      descAr: 'طلب استعادة الحساب بالبريد مع التحقق الفوري وإرسال رمز التحقق.',
      icon: KeyRound,
      url: '/forgot-password',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      code: 'S04',
      screenId: 'reset-password' as const,
      title: 'Reset Password',
      titleAr: 'تعيين كلمة المرور الجديدة',
      desc: 'Password strength meter with real-time criteria checks (length, casing, symbols).',
      descAr: 'مؤشر قوة متدرج مع قائمة معايير أمان حية وتحقق من التطابق.',
      icon: ShieldCheck,
      url: '/reset-password',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      code: 'S05',
      screenId: 'verify-email' as const,
      title: 'Email Verification & OTP',
      titleAr: 'تفعيل البريد الإلكتروني ورمز OTP',
      desc: '6-digit PIN input with auto-focus, paste support, and 60-second resend countdown.',
      descAr: 'إدخال رمز التحقق من 6 خانات مع الانتقال التلقائي ومؤقت العد التنازلي.',
      icon: MailCheck,
      url: '/verify-email',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      code: 'S06',
      screenId: 'help' as const,
      title: 'Help Center & FAQs',
      titleAr: 'مركز المساعدة والأسئلة الشائعة',
      desc: 'Searchable knowledge base with role tabs, smooth accordions, and 24/7 support desk.',
      descAr: 'قاعدة معرفية قابلة للبحث الفوري، تصنيفات للأدوار، وقنوات تواصل الدعم.',
      icon: HelpCircle,
      url: '/help',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      code: 'S07',
      screenId: 'not-found' as const,
      title: '404 Page Not Found',
      titleAr: 'صفحة 404 - صفحة غير موجودة',
      desc: 'Modern technical illustration with smart navigation back to home or search.',
      descAr: 'تصميم إبداعي حديث مع أزرار ذكية للعودة واستكشاف الفعاليات.',
      icon: Compass,
      url: '/404',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
    },
    {
      code: 'S08',
      screenId: 'forbidden' as const,
      title: '403 Forbidden Access (RBAC)',
      titleAr: 'صفحة 403 - وصول محظور',
      desc: 'RBAC security check failure showing active account role and switch options.',
      descAr: 'حظر الوصول الأمني مع عرض تفاصيل الحساب الحالي وخيار التبديل.',
      icon: ShieldAlert,
      url: '/forbidden',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      code: 'S09',
      screenId: 'server-error' as const,
      title: '500 Internal Server Error',
      titleAr: 'صفحة 500 - عطل تقني بالخادم',
      desc: 'Server incident fallback with Incident ID tracking, reconnect retry, and logs.',
      descAr: 'تدارك أعطال السيرفر مع معرّف تتبع البلاغ وإعادة الاتصال وسجل التشخيص.',
      icon: ServerCrash,
      url: '/server-error',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
    },
    {
      code: 'S10',
      screenId: 'terms' as const,
      title: 'Terms of Service & Privacy',
      titleAr: 'شروط الخدمة وسياسة الخصوصية',
      desc: 'Document layout with sticky table of contents, Egyptian Law 151, and escrow rules.',
      descAr: 'وثيقة قانونية متكاملة مع فهرس عائم، والقانون المصري 151، وقواعد الضمان.',
      icon: Scale,
      url: '/terms',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563EB]">
            Foundations & Shared Hub · v1.0
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {isAr ? 'منظومة النظام والشاشات المشتركة' : 'Eviq System & Shared Hub'}
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-500">
            {isAr
              ? 'دليل الشاشات المشتركة لجميع المستخدمين (S01–S10) ومكتبة عناصر ومكونات نظام التصميم.'
              : 'Directory of all platform shared screens (S01–S10) and comprehensive enterprise design tokens.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setActiveMainTab('screens')}
            className={clsx(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs',
              activeMainTab === 'screens'
                ? 'bg-white text-slate-900 shadow-soft'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <Layers className="size-4 text-blue-600" />
            <span>{isAr ? 'الشاشات المشتركة (S01-S10)' : 'Shared Screens (S01-S10)'}</span>
          </button>
          <button
            onClick={() => setActiveMainTab('tokens')}
            className={clsx(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs',
              activeMainTab === 'tokens'
                ? 'bg-white text-slate-900 shadow-soft'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <Sparkles className="size-4 text-indigo-600" />
            <span>{isAr ? 'عناصر التصميم والألوان' : 'Design Tokens & UI'}</span>
          </button>
        </div>
      </div>

      {activeMainTab === 'screens' ? (
        /* Shared Screens Directory (S01 - S10) */
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isAr ? 'فهرس الشاشات المشتركة والروابط الحية' : 'Shared Screens Live Directory'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'اضغط على أي شاشة للانتقال المباشر وتجربتها بكامل وظائفها التفاعلية' : 'Click on any screen card to launch its live, interactive prototype view'}
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-mono font-bold text-blue-700">
              10 Screens Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedScreensList.map((screenItem) => {
              const Icon = screenItem.icon;
              return (
                <div
                  key={screenItem.code}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={clsx('flex size-11 items-center justify-center rounded-2xl', screenItem.bg, screenItem.color)}>
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-700">
                        {screenItem.code}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {isAr ? screenItem.titleAr : screenItem.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5" dir="ltr">
                        {screenItem.url}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {isAr ? screenItem.descAr : screenItem.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {screenItem.code.startsWith('S01') || screenItem.code.startsWith('S02') || screenItem.code.startsWith('S03') || screenItem.code.startsWith('S04') || screenItem.code.startsWith('S05')
                        ? (isAr ? 'مصادقة وأمان' : 'Auth & Security')
                        : screenItem.code.startsWith('S06') || screenItem.code.startsWith('S10')
                        ? (isAr ? 'دعم وقانوني' : 'Support & Legal')
                        : (isAr ? 'معالجة أخطاء' : 'Error Handling')}
                    </span>
                    <button
                      onClick={() => go(screenItem.screenId)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-600 active:scale-[0.98] transition-all"
                    >
                      <span>{isAr ? 'معاينة الشاشة' : 'Open Screen'}</span>
                      <ArrowUpRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Design Tokens & Components */
        <>

      {/* Colors Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Color Palette Tokens</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-9">
          {brandColors.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
              <div
                className="h-16 rounded-xl ring-1 ring-inset ring-slate-200"
                style={{ backgroundColor: c.hex }}
              />
              <div className="mt-2.5 text-xs font-bold text-slate-900 truncate">{c.name}</div>
              <div className="font-mono text-[10px] text-slate-500">{c.hex}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{c.role}</div>
            </div>
          ))}
        </div>

        {/* Status colors */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statusColors.map((st) => (
            <div
              key={st.name}
              className="flex items-center gap-3 rounded-2xl p-4 border border-slate-200"
              style={{ backgroundColor: st.bg }}
            >
              <span className="size-8 rounded-xl shrink-0" style={{ backgroundColor: st.hex }} />
              <div>
                <div className="text-sm font-bold" style={{ color: st.hex }}>
                  {st.name}
                </div>
                <div className="font-mono text-[11px] text-slate-600">
                  {st.hex} on {st.bg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Typography & Hierarchies</h2>
        <div className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Plus Jakarta Sans & IBM Plex Sans Arabic — UI & Headings
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-slate-900">
              Display 48 — Large Hero
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              Heading 30 — Page Titles
            </div>
            <div className="text-lg font-semibold text-slate-900">
              Title 20 — Section Titles & Cards
            </div>
            <div className="text-[15px] leading-relaxed text-slate-600">
              Body 15 — Discover conferences, workshops, and festivals across Cairo, Giza, and Alexandria.
            </div>
            <div className="text-xs text-slate-400">
              Caption 12 — Secondary metadata, timestamps, and badges
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              JetBrains Mono — IDs, Prices & Cryptographic Tokens
            </div>
            <div className="font-mono text-3xl font-extrabold text-slate-900">
              284,500 EGP
            </div>
            <div className="font-mono text-lg font-semibold text-slate-800">
              EVQ-2026-TCS-00742
            </div>
            <div className="font-mono text-xs text-slate-600 bg-slate-100 p-2 rounded-lg">
              TKN e7f2·9a1c·44b0·d3e8
            </div>
            <div className="font-mono text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
              POST /api/v1/checkins/verify
            </div>
          </div>
        </div>
      </div>

      {/* Buttons & Badges */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Buttons & Badges Kit</h2>
        <div className="flex flex-wrap items-center gap-3 p-6 rounded-3xl border border-slate-200 bg-white shadow-soft">
          <Button v="primary">Primary</Button>
          <Button v="ai" icon={Sparkles}>AI Action</Button>
          <Button v="outline">Secondary</Button>
          <Button v="ghost">Ghost</Button>
          <Button v="success">Approve</Button>
          <Button v="danger">Reject</Button>
          <Button disabled>Disabled</Button>

          <span className="mx-2 h-8 w-px bg-slate-200" />

          <Badge tone="ai">98% Match</Badge>
          <Badge tone="green" dot>Verified KYC</Badge>
          <Badge tone="amber">Featured</Badge>
          <Badge tone="blue">Multi-day</Badge>
          <Badge tone="dark">Admin</Badge>
        </div>
      </div>

      {/* Custom Dropdowns & Select Kit */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Custom Dropdowns & Select Kit</h2>
        <p className="text-xs text-slate-500 mb-4">
          Accessible, keyboard-navigable custom select component replacing native browser selects across the entire platform
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl border border-slate-200 bg-white shadow-soft">
          {/* Default Form Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Default Select (Forms)</label>
            <Select
              className="w-full"
              variant="default"
              size="md"
              icon={MapPin}
              value={demoCity}
              onChange={setDemoCity}
              options={demoCityOptions}
            />
            <p className="text-[11px] text-slate-400">Selected: <span className="font-semibold text-slate-700">{demoCity}</span></p>
          </div>

          {/* Minimal Ghost Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Minimal / Ghost (Search Bars)</label>
            <div className="rounded-xl border border-dashed border-slate-200 p-2.5 bg-slate-50 flex items-center">
              <Select
                variant="minimal"
                size="sm"
                icon={Calendar}
                value={demoCity}
                onChange={setDemoCity}
                options={demoCityOptions}
              />
            </div>
            <p className="text-[11px] text-slate-400">Embedded within search capsule</p>
          </div>

          {/* With Descriptions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Rich Descriptions (Sort/Filters)</label>
            <Select
              className="w-full"
              variant="default"
              size="md"
              icon={SlidersHorizontal}
              value={demoSort}
              onChange={setDemoSort}
              options={demoSortOptions}
            />
            <p className="text-[11px] text-slate-400">Selected: <span className="font-semibold text-slate-700">{demoSort}</span></p>
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Disabled State</label>
            <Select
              className="w-full"
              disabled
              variant="default"
              size="md"
              icon={Layers}
              value="Cairo"
              onChange={() => { }}
              options={demoCityOptions}
            />
            <p className="text-[11px] text-slate-400">Readonly or unpermitted access</p>
          </div>
        </div>

        {/* Live Search Autocomplete Dropdown Showcase */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Live Search Autocomplete Dropdown (`SearchDropdown.tsx`)
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Instant event matching popover matching the same floating popover style as `Select.tsx` with thumbnails, category tags, price, and keyboard navigation.
          </p>
          <div className="relative max-w-lg">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-2 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15">
              <Search className="size-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={demoSearchQuery}
                onChange={(e) => {
                  setDemoSearchQuery(e.target.value);
                  setIsDemoSearchOpen(e.target.value.trim().length > 0);
                }}
                onFocus={() => {
                  if (demoSearchQuery.trim().length > 0) {
                    setIsDemoSearchOpen(true);
                  }
                }}
                placeholder="Type 'tech', 'ai', 'cairo' to test live results…"
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {demoSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setDemoSearchQuery('');
                    setIsDemoSearchOpen(false);
                  }}
                  className="size-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <SearchDropdown
              query={demoSearchQuery}
              events={events}
              isOpen={isDemoSearchOpen}
              onClose={() => setIsDemoSearchOpen(false)}
              onSelectEvent={(event) => {
                setIsDemoSearchOpen(false);
                go('details', { id: event.id });
              }}
              onViewAll={(q) => {
                setIsDemoSearchOpen(false);
                go('search', { q });
              }}
            />
          </div>
        </div>
      </div>

      {/* Skeleton Loading States Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Skeleton Loading System</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero-CLS shimmer pulse animations designed to match production cards and surfaces 1:1
            </p>
          </div>
          <Button
            v={isLoading ? 'ai' : 'outline'}
            size="sm"
            icon={Sparkles}
            onClick={toggleLoading}
          >
            {isLoading ? 'Active Loading Preview' : 'Test Skeleton Mode'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primitives Panel */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Primitive Shapes</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="size-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton variant="text" className="w-3/4 h-3.5" />
                  <Skeleton variant="text" className="w-1/2 h-3" />
                </div>
              </div>
              <Skeleton variant="text" className="w-full h-4" />
              <Skeleton variant="text" className="w-4/5 h-4" />
              <div className="flex gap-2 pt-1">
                <Skeleton variant="badge" className="w-16 h-6" />
                <Skeleton variant="badge" className="w-20 h-6" />
                <Skeleton variant="button" className="w-24 h-8" />
              </div>
            </div>
          </div>

          {/* Dark Surface Panel */}
          <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 shadow-card space-y-4 text-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dark Surface Tone</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" tone="dark" className="size-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton variant="text" tone="dark" className="w-3/4 h-3.5" />
                  <Skeleton variant="text" tone="dark" className="w-1/2 h-3" />
                </div>
              </div>
              <Skeleton variant="text" tone="dark" className="w-full h-4" />
              <div className="flex gap-2 pt-1">
                <Skeleton variant="badge" tone="dark" className="w-16 h-6" />
                <Skeleton variant="badge" tone="dark" className="w-20 h-6" />
              </div>
            </div>
          </div>

          {/* Compound Card Preview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">EventCard Compound</h3>
            <EventCardSkeleton />
          </div>
        </div>
      </div>

      {/* State Machine Pills */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Domain State Machines</h2>
        <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white shadow-soft">
          {stateMachines.map((sm) => (
            <div key={sm.entity} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-bold text-sm text-slate-900 w-48 shrink-0">{sm.entity}</span>
              <div className="flex flex-wrap gap-1.5">
                {sm.states.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Demo Data Button */}
      <div className="mt-12 text-center">
        <Button v="outline" size="md" icon={RotateCcw} onClick={resetDemoData}>
          Reset Prototype Demo State
        </Button>
      </div>
        </>
      )}
    </div>
  );
};
