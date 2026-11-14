import React, { useState } from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Role } from '../../types';
import { Button } from '../../components/ui/Button';
import { MOCK_IMAGES } from '../../mock/data';
import {
  Ticket,
  Calendar,
  Store,



  Eye,
  EyeOff,
  Sparkles,
  QrCode,
  Cpu,
  Quote,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import clsx from 'clsx';

interface DemoAccount {
  email: string;
  role: Role;
  name: string;
  target: ScreenId;
  destAr: string;
  destEn: string;
}

const DEMO_ACCOUNTS: Record<Role, DemoAccount> = {
  attendee: {
    email: 'ahmed@attendee.eg',
    role: 'attendee',
    name: 'أحمد حسن',
    target: 'search',
    destAr: 'صفحة الفعاليات بعد تسجيل الدخول',
    destEn: 'Events discovery page after sign-in',
  },
  organizer: {
    email: 'mona@techevents.eg',
    role: 'organizer',
    name: 'منى عادل',
    target: 'org',
    destAr: 'لوحة تحكم المنظم بعد تسجيل الدخول',
    destEn: 'Organizer dashboard after sign-in',
  },
  vendor: {
    email: 'karim@soundwave.eg',
    role: 'vendor',
    name: 'كريم عباس',
    target: 'vendor',
    destAr: 'سوق الموردين وعروض الأسعار بعد تسجيل الدخول',
    destEn: 'Vendor marketplace & RFQ after sign-in',
  },
  admin: {
    email: 'admin@eviq.eg',
    role: 'admin',
    name: 'المشرف العام',
    target: 'admin',
    destAr: 'لوحة المشرف العام بعد تسجيل الدخول',
    destEn: 'Super admin console after sign-in',
  },
};

// Only the 3 public roles for user registration
const PUBLIC_REGISTRATION_ROLES: { role: Role; labelAr: string; labelEn: string; descAr: string; descEn: string; icon: typeof Ticket }[] = [
  {
    role: 'attendee',
    labelAr: 'حاضر',
    labelEn: 'Attendee',
    descAr: 'اكتشف الفعاليات واحجز تذاكرك',
    descEn: 'Discover & book event tickets',
    icon: Ticket,
  },
  {
    role: 'organizer',
    labelAr: 'منظم',
    labelEn: 'Organizer',
    descAr: 'أنشئ الفعاليات وأتمت مبيعاتك',
    descEn: 'Create & manage event ticket sales',
    icon: Calendar,
  },
  {
    role: 'vendor',
    labelAr: 'مورّد',
    labelEn: 'Vendor',
    descAr: 'قدّم خدمات الفعاليات للشركات',
    descEn: 'Offer event logistics & services',
    icon: Store,
  },
];

export const AuthView: React.FC = () => {
  const { setRole, go, showToast } = useApp();
  const { t, language } = useI18n();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<Role>('attendee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Identify role from email credentials automatically
  const detectRoleFromEmail = (inputEmail: string): Role => {
    const trimmed = inputEmail.trim().toLowerCase();
    if (trimmed.includes('organizer') || trimmed.includes('techevents') || trimmed.includes('mona')) return 'organizer';
    if (trimmed.includes('vendor') || trimmed.includes('soundwave') || trimmed.includes('karim')) return 'vendor';
    if (trimmed.includes('admin')) return 'admin';
    if (trimmed.includes('attendee') || trimmed.includes('ahmed')) return 'attendee';
    return mode === 'signup' ? selectedRole : 'attendee';
  };

  const fillDemoData = (targetRole: Role = 'attendee') => {
    const demo = DEMO_ACCOUNTS[targetRole];
    setEmail(demo.email);
    setPassword('DemoPass2026!');
    setSelectedRole(targetRole);
    showToast(
      language === 'ar'
        ? `تم ملء بيانات حساب التجربة (${t(targetRole === 'attendee' ? 'Attendee' : targetRole === 'organizer' ? 'Organizer' : targetRole === 'vendor' ? 'Vendor' : 'Super Admin')})`
        : `Autofilled demo credentials for ${targetRole}`,
      'info'
    );
  };

  const performSignIn = (roleToSign: Role, method: string = 'email') => {
    setLoading(true);
    const demo = DEMO_ACCOUNTS[roleToSign];

    setTimeout(() => {
      setLoading(false);
      setRole(roleToSign);

      const roleLabels: Record<Role, { ar: string; en: string }> = {
        attendee: { ar: 'حاضر', en: 'Attendee' },
        organizer: { ar: 'منظم', en: 'Organizer' },
        vendor: { ar: 'مورّد', en: 'Vendor' },
        admin: { ar: 'المشرف العام', en: 'Super Admin' },
      };

      const msg =
        language === 'ar'
          ? `مرحبًا بك! تم تسجيل الدخول بنجاح كـ (${roleLabels[roleToSign].ar}) عبر ${method === 'google' ? 'Google' : method === 'linkedin' ? 'LinkedIn' : 'البريد الإلكتروني'}`
          : `Welcome! Successfully signed in as (${roleLabels[roleToSign].en}) via ${method === 'google' ? 'Google' : method === 'linkedin' ? 'LinkedIn' : 'Email'}`;

      showToast(msg, 'ok');
      go(demo.target);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please provide an email address', 'err');
      return;
    }
    const detectedRole = detectRoleFromEmail(email);
    performSignIn(detectedRole, 'email');
  };

  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    const roleForSocial = mode === 'signup' ? selectedRole : 'attendee';
    performSignIn(roleForSocial, provider);
  };

  const currentDestination =
    language === 'ar'
      ? DEMO_ACCOUNTS[selectedRole].destAr
      : DEMO_ACCOUNTS[selectedRole].destEn;

  return (
    <div className="min-h-[calc(100vh-53px)] lg:h-[calc(100vh-53px)] lg:max-h-[calc(100vh-53px)] flex flex-col lg:flex-row bg-white lg:overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* Form Side (White Background)                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-4 sm:px-10 lg:px-12 order-2 lg:order-1 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-[440px] my-auto py-2">
          {/* Top Pill Switcher: Sign In / Create Account */}
          <div className="flex rounded-full bg-[#F1F5F9] p-1 mb-5 max-w-[300px] mx-auto border border-slate-200/60 shadow-xs">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={clsx(
                'flex-1 rounded-full py-1.5 text-xs font-bold transition-all duration-200',
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={clsx(
                'flex-1 rounded-full py-1.5 text-xs font-bold transition-all duration-200',
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {mode === 'signin'
                ? (language === 'ar' ? 'مرحبًا بعودتك' : 'Welcome back')
                : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create your account')}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              {mode === 'signin'
                ? (language === 'ar' ? 'سجّل الدخول للمتابعة إلى إيفيك.' : 'Sign in to continue to Eviq.')
                : (language === 'ar' ? 'انضم إلى منصة إيفيك وابدأ رحلتك في الفعاليات الذكية.' : 'Join Eviq and discover extraordinary events across Egypt.')}
            </p>
          </div>

          {/* Role Picker Section (Appears ONLY in Create Account / Sign Up mode) */}
          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-2 text-start">
                {language === 'ar' ? 'أنشئ حسابك كـ:' : 'Create account as:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PUBLIC_REGISTRATION_ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={clsx(
                        'group flex flex-col justify-between rounded-xl p-2.5 text-start transition-all duration-200 border text-xs',
                        isSelected
                          ? 'border-[#2563EB] bg-[#EFF6FF] ring-1 ring-[#2563EB] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span
                          className={clsx(
                            'inline-flex size-3.5 items-center justify-center rounded-full border transition-colors',
                            isSelected
                              ? 'border-[#2563EB] bg-white'
                              : 'border-slate-300 bg-white'
                          )}
                        >
                          {isSelected && <span className="size-1.5 rounded-full bg-[#2563EB]" />}
                        </span>
                        <Icon
                          className={clsx(
                            'size-3.5 transition-colors',
                            isSelected ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-slate-600'
                          )}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {language === 'ar' ? r.labelAr : r.labelEn}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-snug truncate">
                          {language === 'ar' ? r.descAr : r.descEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-start">
                  {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'ar' ? 'أحمد حسن' : 'Ahmed Hassan'}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                />
              </div>
            )}

            {mode === 'signup' && selectedRole !== 'attendee' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-start">
                  {language === 'ar' ? 'اسم الشركة أو المؤسسة *' : 'Company or Organization Name *'}
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder={
                    selectedRole === 'organizer'
                      ? (language === 'ar' ? 'مثال: تك إيفنتس مصر' : 'e.g. TechEvents Egypt')
                      : (language === 'ar' ? 'مثال: ساوند ويف للخدمات الصوتية' : 'e.g. SoundWave Pro Egypt')
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                />
              </div>
            )}

            {/* Email Address Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 text-start">
                <span>{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
                <span className="text-red-500 ms-1">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.eg"
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
              />
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  <span>{language === 'ar' ? 'كلمة المرور' : 'Password'}</span>
                  <span className="text-red-500 ms-1">*</span>
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        language === 'ar'
                          ? 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني'
                          : 'Password reset link sent to your email',
                        'info'
                      )
                    }
                    className="text-[11px] text-[#2563EB] hover:underline font-medium"
                  >
                    {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pe-9 text-xs focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              v="primary"
              size="md"
              disabled={loading}
              className="w-full rounded-xl py-2.5 text-xs font-bold shadow-sm shadow-blue-500/20 mt-1"
            >
              {loading
                ? (language === 'ar' ? 'جاري التحقق…' : 'Signing in…')
                : mode === 'signin'
                ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
            </Button>
          </form>

          {/* Social Logins: Google & LinkedIn */}
          <div className="mt-3.5">
            <div className="relative my-2.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="bg-white px-2.5 text-slate-400 font-medium">
                  {language === 'ar' ? 'أو تابع عبر' : 'Or continue with'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <svg className="size-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* LinkedIn Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('linkedin')}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <svg className="size-3.5 shrink-0 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Autofill Shortcuts */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-400 me-1">
              {language === 'ar' ? 'تجربة سريعة:' : 'Demo Fill:'}
            </span>
            <button
              type="button"
              onClick={() => fillDemoData('attendee')}
              className="text-[10px] font-semibold text-slate-600 hover:text-[#2563EB] bg-slate-50 hover:bg-blue-50/70 px-2 py-1 rounded-md border border-slate-200 transition-colors"
            >
              {language === 'ar' ? 'حاضر' : 'Attendee'}
            </button>
            <button
              type="button"
              onClick={() => fillDemoData('organizer')}
              className="text-[10px] font-semibold text-slate-600 hover:text-[#2563EB] bg-slate-50 hover:bg-blue-50/70 px-2 py-1 rounded-md border border-slate-200 transition-colors"
            >
              {language === 'ar' ? 'منظم' : 'Organizer'}
            </button>
            <button
              type="button"
              onClick={() => fillDemoData('vendor')}
              className="text-[10px] font-semibold text-slate-600 hover:text-[#2563EB] bg-slate-50 hover:bg-blue-50/70 px-2 py-1 rounded-md border border-slate-200 transition-colors"
            >
              {language === 'ar' ? 'مورّد' : 'Vendor'}
            </button>
          </div>

          {/* Destination Banner */}
          {mode === 'signup' && (
            <div className="mt-2 text-center">
              <p className="text-[10px] text-slate-400">
                {language === 'ar' ? 'ستنتقل إلى: ' : 'You will be redirected to: '}
                <span className="font-semibold text-slate-600">{currentDestination}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Visual Brand Side (Dark #0F172A with Event Crowd Background)   */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 bg-[#090D16] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between order-1 lg:order-2 relative overflow-hidden h-full">
        {/* Real Event Crowd Atmosphere Image with High Visibility */}
        <img
          src={MOCK_IMAGES.summit}
          alt="Event Crowd Atmosphere"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none scale-105 opacity-45 brightness-[0.7] contrast-[1.2]"
        />

        {/* Multi-stop Dark Gradient Overlay to guarantee high contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#0F172A]/80 to-[#0B0F19]/60 backdrop-blur-[0.5px] pointer-events-none" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 end-0 -mt-16 -me-16 size-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 -mb-16 -ms-16 size-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center shadow-md shadow-blue-500/30">
            <Sparkles className="size-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white">
              {language === 'ar' ? 'إيفيك' : 'Eviq'}
            </span>
            <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 text-[9px] font-bold text-blue-300">
              AI
            </span>
          </div>
        </div>

        {/* Dynamic Center Section: Headlines & Feature Badges based on mode */}
        <div className="my-auto py-6 relative z-10 max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            {mode === 'signin'
              ? (language === 'ar'
                  ? 'مرحبًا بعودتك إلى إيفيك.'
                  : 'Welcome back to Eviq.')
              : (language === 'ar'
                  ? 'منصة واحدة للحضور والمنظمين وموردي الفعاليات.'
                  : 'One platform for attendees, organizers, and event vendors.')}
          </h2>

          <p className="text-xs text-slate-300/90 leading-relaxed mb-6 font-medium">
            {mode === 'signin'
              ? (language === 'ar'
                  ? 'الوصول السريع لتذاكرك وفعالياتك وإدارة طلبات الخدمات وعروض الأسعار في مكان واحد.'
                  : 'Instant access to your digital passes, event dashboards, and verified vendor quotes in one seamless hub.')
              : (language === 'ar'
                  ? 'انضم إلى أسرع منصات الفعاليات نمواً في مصر بدعم الذكاء الاصطناعي وشبكة خدمات معتمدة بالكامل.'
                  : 'Join Egypt’s premier AI-powered event management network with unforgeable QR check-ins and vetted vendor procurement.')}
          </p>

          {/* 3 Translucent Feature Cards (Dynamic based on Mode) */}
          <div className="space-y-2.5">
            {mode === 'signin' ? (
              <>
                {/* Sign-in Benefit 1: Fast QR Wallet Access */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <QrCode className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'وصول فوري لتذاكرك المشفرة مع تسجيل دخول آمن بالبوابة'
                      : 'Instant access to your encrypted gate tickets and check-in history'}
                  </div>
                </div>

                {/* Sign-in Benefit 2: Active Management */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <TrendingUp className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'متابعة مبيعات التذاكر، الحضور، وتحديثات الفعاليات الحية'
                      : 'Live sales analytics, attendee tracking, and event operations'}
                  </div>
                </div>

                {/* Sign-in Benefit 3: RFQ & Direct Contracting */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'متابعة عروض الأسعار والتعاقدات المباشرة بين الشركات'
                      : 'Direct B2B RFQ procurement and verified vendor contracts'}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Signup Benefit 1 */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <QrCode className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'تذاكر QR فورية مع تسجيل دخول آمن غير قابل للتزوير'
                      : 'Instant unforgeable QR tickets with sub-second gate check-in'}
                  </div>
                </div>

                {/* Signup Benefit 2 */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <Cpu className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'توصيات ذكية مخصصة بالعربية والإنجليزية بالذكاء الاصطناعي'
                      : 'Bilingual AI event discovery and personalized recommendations'}
                  </div>
                </div>

                {/* Signup Benefit 3 */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm shadow-xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Store className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {language === 'ar'
                      ? 'سوق موردين معتمدين بالتعاقد وطلبات عروض أسعار (RFQ)'
                      : 'Verified B2B vendor marketplace and automated RFQ procurement'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section: Customer Testimonial Card */}
        <div className="relative z-10 rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 backdrop-blur-md shadow-lg max-w-lg">
          <div className="flex items-start gap-2.5">
            <Quote className="size-4 text-blue-400 shrink-0 mt-0.5 opacity-80" />
            <div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {language === 'ar'
                  ? '«وفّرنا الصوت والإضاءة والضيافة لقمّة تضم 500 شخص في ظهيرة واحدة!»'
                  : '"We sourced sound, lighting and catering for a 500-person summit in a single afternoon!"'}
              </p>
              <div className="mt-1 text-[10px] font-bold text-slate-400">
                {language === 'ar' ? 'منى عادل · TechEvents Egypt' : 'Mona Adel · TechEvents Egypt'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
