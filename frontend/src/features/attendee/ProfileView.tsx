import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { PRESET_AVATARS, DEFAULT_ATTENDEE_USER, MOCK_CATEGORIES } from '../../mock/data';
import { Select, SelectOption } from '../../components/ui/Select';
import {
  Camera,
  Check,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Sparkles,
  Ticket,
  Save,
  RotateCcw,
  Upload,
  Lock,
  Eye,
  EyeOff,
  Bell,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import clsx from 'clsx';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    showToast,
    tickets,
    bookings,
    favs,
    go,
  } = useApp();
  const { t, language } = useI18n();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'info' | 'interests' | 'security' | 'tickets'>('info');

  // Form states initialized with currentUser data
  const [name, setName] = useState(currentUser?.name || DEFAULT_ATTENDEE_USER.name);
  const [jobTitle, setJobTitle] = useState(currentUser?.jobTitle || DEFAULT_ATTENDEE_USER.jobTitle || '');
  const [company, setCompany] = useState(currentUser?.company || DEFAULT_ATTENDEE_USER.company || '');
  const [email, setEmail] = useState(currentUser?.email || DEFAULT_ATTENDEE_USER.email);
  const [phone, setPhone] = useState(currentUser?.phone || DEFAULT_ATTENDEE_USER.phone || '');
  const [city, setCity] = useState(currentUser?.city || DEFAULT_ATTENDEE_USER.city || 'Cairo');
  const [country, setCountry] = useState(currentUser?.country || DEFAULT_ATTENDEE_USER.country || 'Egypt');
  const [bio, setBio] = useState(currentUser?.bio || DEFAULT_ATTENDEE_USER.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || DEFAULT_ATTENDEE_USER.avatar);
  const [interests, setInterests] = useState<string[]>(
    currentUser?.interests || DEFAULT_ATTENDEE_USER.interests
  );

  // Notification & Preference toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    currentUser?.notificationsEnabled ?? true
  );
  const [emailUpdates, setEmailUpdates] = useState(currentUser?.emailUpdates ?? true);
  const [smsTickets, setSmsTickets] = useState(currentUser?.smsTickets ?? false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    currentUser?.twoFactorEnabled ?? true
  );

  // Preferred format
  const [preferredFormat, setPreferredFormat] = useState<'All' | 'In-Person' | 'Online' | 'Hybrid'>('All');

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Avatar picker modal/drawer state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available Egyptian Cities
  const EGYPTIAN_CITIES: SelectOption[] = [
    { value: 'Cairo', label: 'Cairo', labelAr: 'القاهرة' },
    { value: 'Alexandria', label: 'Alexandria', labelAr: 'الإسكندرية' },
    { value: 'Giza', label: 'Giza', labelAr: 'الجيزة' },
    { value: 'New Cairo', label: 'New Cairo', labelAr: 'القاهرة الجديدة' },
    { value: 'Sheikh Zayed', label: 'Sheikh Zayed', labelAr: 'الشيخ زايد' },
    { value: 'Mansoura', label: 'Mansoura', labelAr: 'المنصورة' },
    { value: 'Assiut', label: 'Assiut', labelAr: 'أسيوط' },
    { value: 'Sharm El Sheikh', label: 'Sharm El Sheikh', labelAr: 'شرم الشيخ' },
    { value: 'Hurghada', label: 'Hurghada', labelAr: 'الغردقة' },
  ];

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let score = 0;
    if (name.trim()) score += 20;
    if (email.trim()) score += 20;
    if (avatar) score += 15;
    if (phone.trim()) score += 15;
    if (jobTitle.trim() && company.trim()) score += 15;
    if (bio.trim()) score += 10;
    if (interests.length >= 2) score += 5;
    return Math.min(score, 100);
  };

  const completionScore = calculateCompletion();

  // Toggle category interest
  const toggleInterest = (categoryName: string) => {
    setInterests((prev) =>
      prev.includes(categoryName)
        ? prev.filter((item) => item !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Handle local file upload for custom avatar
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast(
          language === 'ar'
            ? 'حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت'
            : 'Image is too large. Please select a file under 5MB.',
          'err'
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          setShowAvatarPicker(false);
          showToast(
            language === 'ar'
              ? 'تم رفع الصورة الجديدة بنجاح!'
              : 'Photo uploaded successfully!',
            'ok'
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to default photo
  const handleResetAvatar = () => {
    setAvatar(DEFAULT_ATTENDEE_USER.avatar);
    setShowAvatarPicker(false);
    showToast(
      language === 'ar' ? 'تم استعادة الصورة الافتراضية' : 'Reset to default avatar',
      'info'
    );
  };

  // Save all profile changes
  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateUserProfile({
        name,
        jobTitle,
        company,
        email,
        phone,
        city,
        country,
        bio,
        avatar,
        interests,
        notificationsEnabled,
        emailUpdates,
        smsTickets,
        twoFactorEnabled,
      });
      setIsSaving(false);
      showToast(
        language === 'ar'
          ? 'تم حفظ بيانات الملف الشخصي بنجاح!'
          : 'Profile and preferences updated successfully!',
        'ok'
      );
    }, 450);
  };

  // Discard changes
  const handleDiscard = () => {
    if (currentUser) {
      setName(currentUser.name);
      setJobTitle(currentUser.jobTitle || '');
      setCompany(currentUser.company || '');
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      setCity(currentUser.city || 'Cairo');
      setCountry(currentUser.country || 'Egypt');
      setBio(currentUser.bio || '');
      setAvatar(currentUser.avatar);
      setInterests(currentUser.interests);
      setNotificationsEnabled(currentUser.notificationsEnabled);
      setEmailUpdates(currentUser.emailUpdates);
      setSmsTickets(currentUser.smsTickets);
      setTwoFactorEnabled(currentUser.twoFactorEnabled);
      showToast(
        language === 'ar' ? 'تم إلغاء التعديلات غير المحفوظة' : 'Changes discarded',
        'info'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* Top Hero Banner & Profile Identity Card                   */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-soft">
          {/* Header Cover Graphic Banner */}
          <div className="relative h-44 sm:h-52 w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 overflow-hidden">
            {/* Subtle background glow & geometric circles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="absolute -top-12 -end-12 size-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-16 start-1/3 size-64 rounded-full bg-indigo-500/20 blur-3xl" />

            {/* Quick Status Tag on Banner */}
            <div className="absolute top-4 end-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm border border-white/20">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === 'ar' ? 'حساب نشط' : 'Active Account'}</span>
              </span>
            </div>
          </div>

          {/* Profile Identity Details Bar */}
          <div className="relative px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
              {/* Avatar with Camera Overlay Trigger */}
              <div className="relative inline-block self-start">
                <div className="relative size-28 sm:size-36 rounded-3xl overflow-hidden ring-4 ring-white bg-slate-100 shadow-xl group">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Hover upload trigger */}
                  <button
                    type="button"
                    onClick={() => setShowAvatarPicker(true)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold gap-1"
                    title={language === 'ar' ? 'تغيير الصورة' : 'Change Avatar'}
                  >
                    <Camera className="size-6 text-white" />
                    <span>{t('Change Photo')}</span>
                  </button>
                </div>

                {/* Edit Photo Icon Pill */}
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(true)}
                  className="absolute -bottom-2 -end-2 flex size-9 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md hover:bg-blue-700 transition-transform active:scale-90 ring-3 ring-white"
                  title={t('Change Photo')}
                >
                  <Camera className="size-4" />
                </button>
              </div>

              {/* Action Buttons in Hero */}
              <div className="flex items-center gap-2.5 flex-wrap sm:mb-2">
                <button
                  onClick={() => go('tickets')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <Ticket className="size-3.5 text-[#2563EB]" />
                  <span>{t('My Tickets')}</span>
                  <span className="rounded-full bg-blue-100 text-[#2563EB] px-1.5 py-0.5 text-[10px] font-black leading-none">
                    {tickets.length}
                  </span>
                </button>

                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-95 transition-all"
                >
                  <Save className="size-3.5" />
                  <span>{isSaving ? t('Saving…') : t('Save Changes')}</span>
                </button>
              </div>
            </div>

            {/* Name, Headline, Verified Badges */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">
                    <ShieldCheck className="size-3.5 text-[#2563EB]" />
                    <span>{t('Verified Attendee')}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600 flex-wrap">
                  {jobTitle && company && (
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Briefcase className="size-3.5 text-slate-400" />
                      <span>{jobTitle} · {company}</span>
                    </span>
                  )}
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{city}, {country}</span>
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-slate-500">
                    {t('Member Since')}: {currentUser?.joinedDate || '2025'}
                  </span>
                </div>
              </div>

              {/* Profile Completion Meter Pill */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200/70 p-3 shrink-0">
                <div className="flex flex-col text-start">
                  <span className="text-[11px] font-bold text-slate-700">
                    {t('Profile completion')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {completionScore === 100
                      ? language === 'ar' ? 'مكتمل بنسبة ممتازة!' : 'All fields completed!'
                      : language === 'ar' ? 'أكمل بياناتك لتوصيات أدق' : 'Complete details for smart AI'}
                  </span>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white shadow-2xs border border-blue-200 font-extrabold text-xs text-[#2563EB]">
                    {completionScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100 bg-slate-50/60 divide-x divide-y sm:divide-y-0 divide-slate-200/60 text-center">
            <button
              onClick={() => go('tickets')}
              className="p-3.5 hover:bg-white transition-colors text-center group"
            >
              <div className="text-lg font-black text-slate-900 group-hover:text-[#2563EB] transition-colors">
                {tickets.length}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                {t('Active Tickets')}
              </div>
            </button>

            <button
              onClick={() => go('tickets')}
              className="p-3.5 hover:bg-white transition-colors text-center group"
            >
              <div className="text-lg font-black text-slate-900 group-hover:text-[#2563EB] transition-colors">
                {bookings.length}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                {t('Events Booked')}
              </div>
            </button>

            <button
              onClick={() => go('search', { cat: 'Favorites' })}
              className="p-3.5 hover:bg-white transition-colors text-center group"
            >
              <div className="text-lg font-black text-rose-600 transition-colors">
                {favs.length}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                {t('Saved Favorites')}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('interests')}
              className="p-3.5 hover:bg-white transition-colors text-center group"
            >
              <div className="text-lg font-black text-[#4F46E5] transition-colors">
                {interests.length}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                {language === 'ar' ? 'مجالات اهتمام' : 'AI Topics'}
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Navigation Tabs Bar                                       */}
        {/* ========================================================= */}
        <div className="mt-6 flex items-center gap-1 overflow-x-auto border-b border-slate-200/90 pb-2">
          <button
            onClick={() => setActiveTab('info')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0',
              activeTab === 'info'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <Briefcase className="size-3.5" />
            <span>{t('Personal & Professional Info')}</span>
          </button>

          <button
            onClick={() => setActiveTab('interests')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0',
              activeTab === 'interests'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-600 hover:bg-blue-50 hover:text-[#2563EB]'
            )}
          >
            <Sparkles className="size-3.5 text-amber-300" />
            <span>{t('Interests & AI Matching')}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0',
              activeTab === 'security'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <Lock className="size-3.5" />
            <span>{t('Notifications & Security')}</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0',
              activeTab === 'tickets'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <Ticket className="size-3.5" />
            <span>{t('Quick Tickets Overview')}</span>
            <span className="rounded-full bg-slate-200 text-slate-700 px-1.5 py-0.5 text-[10px] font-bold">
              {tickets.length}
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* Tab 1: Personal & Professional Information                */}
        {/* ========================================================= */}
        {activeTab === 'info' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 anim-page">
            {/* Left 2 Cols: Main Personal Details Form */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="size-4 text-[#2563EB]" />
                <span>{t('Personal & Professional Info')}</span>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'ar'
                  ? 'هذه البيانات تظهر على تذاكر حضورك وتساعد المنظمين في طباعة بطاقة الدخول (Badge).'
                  : 'This information appears on your badges and helps organizers verify attendance.'}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Full Name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد حسن"
                    className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Job Title')}
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="مثال: مصمم واجهات وتجربة مستخدم"
                    className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                {/* Company / Organization */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Company / Organization')}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="مثال: شركة إينوفيت إيجيبت"
                    className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Email Address')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all pe-10"
                    />
                    <Mail className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Phone Number')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all pe-10"
                    />
                    <Phone className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="profile-city" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('City')}
                  </label>
                  <Select
                    id="profile-city"
                    className="w-full"
                    menuClassName="w-full"
                    variant="default"
                    size="md"
                    icon={MapPin}
                    value={city}
                    onChange={setCity}
                    options={EGYPTIAN_CITIES}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Country')}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs text-slate-900 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                {/* Bio / About */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Bio')}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={
                      language === 'ar'
                        ? 'اكتب نبذة مختصرة عن خبراتك ومجالات اهتمامك المهنية...'
                        : 'Write a brief description of your background and professional interests...'
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all leading-relaxed"
                  />
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                  <span>{t('Discard')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all active:scale-95"
                >
                  <Save className="size-4" />
                  <span>{isSaving ? t('Saving…') : t('Save Changes')}</span>
                </button>
              </div>
            </div>

            {/* Right 1 Col: Quick Card & Avatar Management */}
            <div className="space-y-6">
              {/* Avatar Selector Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft text-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">
                  {t('Change Photo')}
                </h3>

                <div className="relative mx-auto size-28 rounded-3xl overflow-hidden ring-4 ring-blue-100 shadow-md bg-slate-100 mb-4">
                  <img src={avatar} alt="Current avatar" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAvatarPicker(true)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 text-[#2563EB] hover:bg-blue-100 py-2 text-xs font-bold transition-colors"
                  >
                    <Camera className="size-3.5" />
                    <span>{t('Choose an Avatar')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <Upload className="size-3.5 text-slate-500" />
                    <span>{t('Upload Photo')}</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Digital Badge Preview */}
              <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="flex size-5 items-center justify-center rounded-md bg-[#2563EB] text-[10px] font-black text-white">
                      EQ
                    </span>
                    <span className="text-xs font-black tracking-tight">Eviq Pass</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 border border-emerald-500/30">
                    {t('Attendee')}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={name}
                    className="size-12 rounded-2xl object-cover ring-2 ring-white/30"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm">{name}</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {jobTitle || 'Event Enthusiast'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      ID: {currentUser?.id || 'usr_attendee_001'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                  <span>{city}, Egypt</span>
                  <span className="text-emerald-400 font-bold">● Active Attendee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Tab 2: Interests & AI Recommendations                      */}
        {/* ========================================================= */}
        {activeTab === 'interests' && (
          <div className="mt-6 space-y-6 anim-page">
            {/* AI Advisor Banner */}
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 p-6 sm:p-8 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#4F46E5] text-white shadow-md">
                  <Sparkles className="size-6 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {language === 'ar'
                      ? 'محرك الاهتمامات الذكي (Eviq AI Matching Engine)'
                      : 'AI Personalized Event Matching'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {language === 'ar'
                      ? 'حدد التصنيفات والمجالات التي تهتم بها في الفعاليات. يستخدم المساعد الذكي Eviq هذه التفضيلات لترشيح ورش العمل والمؤتمرات الأكثر صلة بك، وتنبيهك فور فتح باب التسجيل.'
                      : 'Select topics that matter to you. Eviq AI uses these preferences to rank events and recommend high-match sessions.'}
                  </p>
                </div>
              </div>

              {/* Category Pills Grid */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  {language === 'ar' ? 'اختر مجالات اهتمامك المفضلة:' : 'Select Your Core Interests:'}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {MOCK_CATEGORIES.map((cat) => {
                    const isSelected = interests.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => toggleInterest(cat.name)}
                        className={clsx(
                          'flex items-center justify-between rounded-2xl p-3 text-start border transition-all active:scale-98',
                          isSelected
                            ? 'border-[#2563EB] bg-blue-50/80 text-[#2563EB] shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        )}
                      >
                        <span className="text-xs font-bold truncate">
                          {language === 'ar' ? cat.nameAr : cat.name}
                        </span>
                        <div
                          className={clsx(
                            'flex size-5 shrink-0 items-center justify-center rounded-full transition-colors',
                            isSelected
                              ? 'bg-[#2563EB] text-white'
                              : 'bg-slate-100 text-transparent'
                          )}
                        >
                          <Check className="size-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Format */}
              <div className="mt-8 pt-6 border-t border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  {t('Preferred Event Formats')}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {(['All', 'In-Person', 'Online', 'Hybrid'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setPreferredFormat(fmt)}
                      className={clsx(
                        'rounded-xl px-4 py-2 text-xs font-bold transition-all border',
                        preferredFormat === fmt
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      )}
                    >
                      {fmt === 'All'
                        ? t('All Formats')
                        : fmt === 'In-Person'
                        ? t('In-Person')
                        : fmt === 'Online'
                        ? t('Online')
                        : t('Hybrid')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all active:scale-95"
                >
                  <Save className="size-4" />
                  <span>{isSaving ? t('Saving…') : t('Save Changes')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Tab 3: Notifications & Security                           */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 anim-page">
            {/* Notifications Preferences Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Bell className="size-4 text-[#2563EB]" />
                <span>{language === 'ar' ? 'تفضيلات الإشعارات والتنبيهات' : 'Notification Preferences'}</span>
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'ar'
                  ? 'تحكم في كيفية استلام تذاكرك والتنبيهات وتحديثات الفعاليات.'
                  : 'Manage how and when you receive tickets, updates, and event reminders.'}
              </p>

              <div className="mt-6 space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('Email Notifications')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'ar'
                          ? 'إرسال تأكيد الحجز والتذاكر الرقمية فوراً'
                          : 'Receive booking confirmations & digital tickets'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailUpdates}
                      onChange={(e) => setEmailUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>

                {/* SMS & WhatsApp Ticket Alerts */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <Smartphone className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('SMS & WhatsApp Ticket Alerts')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'ar'
                          ? 'تذكير بموعد الدخول وموقع البوابة عبر رسالة نصية'
                          : 'SMS & WhatsApp gate entry reminders'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsTickets}
                      onChange={(e) => setSmsTickets(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>

                {/* Weekly AI Recommendations */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-100 text-[#4F46E5]">
                      <Sparkles className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('Weekly AI Recommendations Digest')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'ar'
                          ? 'ملخص أسبوعي بالفعاليات المطابقة لاهتماماتك'
                          : 'Curated weekly AI event recommendations'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all"
                >
                  <Save className="size-3.5" />
                  <span>{isSaving ? t('Saving…') : t('Save Changes')}</span>
                </button>
              </div>
            </div>

            {/* Account Security & Password Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Lock className="size-4 text-[#2563EB]" />
                <span>{t('Security & Password')}</span>
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'ar'
                  ? 'حماية حسابك وتفعيل التحقق بخطوتين وتغيير كلمة السر.'
                  : 'Manage password, two-factor authentication, and account security.'}
              </p>

              {/* 2FA Status Toggle */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {t('Two-Factor Authentication (2FA)')}
                    </span>
                    <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[9px] font-extrabold">
                      {twoFactorEnabled ? (language === 'ar' ? 'مفعّل' : 'Active') : (language === 'ar' ? 'معطّل' : 'Disabled')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {language === 'ar'
                      ? 'حماية تذاكرك من التكرار والقرصنة برمز تحقق عبر SMS/Authenticator.'
                      : 'Protects your QR tickets with one-time verification tokens.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    showToast(
                      twoFactorEnabled
                        ? (language === 'ar' ? 'تم تعطيل التحقق بخطوتين' : '2FA disabled')
                        : (language === 'ar' ? 'تم تفعيل التحقق بخطوتين بنجاح' : '2FA activated'),
                      'info'
                    );
                  }}
                  className={clsx(
                    'rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0',
                    twoFactorEnabled
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-[#2563EB] text-white hover:bg-blue-700'
                  )}
                >
                  {twoFactorEnabled
                    ? (language === 'ar' ? 'تعطيل' : 'Disable')
                    : (language === 'ar' ? 'تفعيل' : 'Enable')}
                </button>
              </div>

              {/* Change Password Fields */}
              <div className="mt-5 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Current Password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs text-slate-900 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all pe-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('New Password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs text-slate-900 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all pe-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Confirm New Password')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs text-slate-900 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!currentPassword) {
                        showToast(
                          language === 'ar' ? 'يرجى إدخال كلمة المرور الحالية' : 'Please enter current password',
                          'err'
                        );
                        return;
                      }
                      if (!newPassword || newPassword.length < 6) {
                        showToast(
                          language === 'ar' ? 'يجب أن لا تقل كلمة المرور الجديدة عن 6 خانات' : 'Password must be at least 6 characters',
                          'err'
                        );
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        showToast(
                          language === 'ar' ? 'كلمات المرور الجديدة غير متطابقة' : 'Passwords do not match',
                          'err'
                        );
                        return;
                      }
                      showToast(
                        language === 'ar' ? 'تم تحديث كلمة المرور بنجاح!' : 'Password updated successfully!',
                        'ok'
                      );
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="rounded-xl bg-slate-900 text-white px-3.5 py-1.5 text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {t('Update Password')}
                  </button>
                </div>
              </div>

              {/* Active Sessions info */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">
                  {t('Active Devices & Sessions')}
                </span>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Laptop className="size-4 text-slate-500" />
                    <div>
                      <span className="font-semibold text-slate-800">Chrome on Windows 11</span>
                      <span className="text-[10px] text-slate-400 block">Cairo, Egypt · Online</span>
                    </div>
                  </div>
                  <span className="text-[10px] rounded-md bg-emerald-100 text-emerald-700 px-2 py-0.5 font-bold">
                    {language === 'ar' ? 'هذا الجهاز' : 'Current'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Tab 4: Quick Tickets & Bookings Overview                  */}
        {/* ========================================================= */}
        {activeTab === 'tickets' && (
          <div className="mt-6 space-y-4 anim-page">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {t('My Bookings & Tickets')}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'قائمة التذاكر الرقمية المحجوزة لحسابك.'
                    : 'List of verified tickets booked under your account.'}
                </p>
              </div>
              <button
                onClick={() => go('tickets')}
                className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] text-white px-3.5 py-2 text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
              >
                <span>{t('View My Tickets')}</span>
                <ExternalLink className="size-3" />
              </button>
            </div>

            {tickets.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/90 bg-white p-12 text-center shadow-soft">
                <Ticket className="mx-auto size-12 text-slate-300" />
                <h4 className="mt-3 text-sm font-bold text-slate-800">{t('No tickets yet')}</h4>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  {t('Browse events and reserve your first pass.')}
                </p>
                <button
                  onClick={() => go('search')}
                  className="mt-4 rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold"
                >
                  {t('Explore Events')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.slice(0, 4).map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-soft hover:border-blue-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full bg-blue-100 text-[#2563EB] px-2.5 py-0.5 text-[10px] font-black">
                          {ticket.tierName}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {ticket.id}
                        </span>
                      </div>

                      <h4 className="mt-3 text-sm font-black text-slate-900 line-clamp-1">
                        {ticket.eventTitle}
                      </h4>

                      <div className="mt-2 text-xs text-slate-500 space-y-1">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{ticket.venue}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Ticket className="size-3.5 text-slate-400 shrink-0" />
                          <span>{ticket.seat}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="size-3.5" />
                        <span>{ticket.status}</span>
                      </span>

                      <button
                        onClick={() => go('tickets')}
                        className="text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        {t('View QR Code')} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* Preset Avatar Modal / Picker Popover                      */}
      {/* ========================================================= */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 anim-page">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {t('Choose an Avatar')}
              </h3>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {language === 'ar'
                ? 'اختر إحدى الصور المعتمدة أو ارفع صورة خاصة من جهازك:'
                : 'Select one of the curated avatars or upload your custom photo:'}
            </p>

            {/* Presets Grid */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {PRESET_AVATARS.map((item) => {
                const isCurrent = avatar === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAvatar(item.url);
                      setShowAvatarPicker(false);
                      showToast(
                        language === 'ar' ? 'تم اختيار الصورة الرمزية' : 'Avatar selected',
                        'ok'
                      );
                    }}
                    className={clsx(
                      'group relative rounded-2xl overflow-hidden border-2 p-1 transition-all',
                      isCurrent
                        ? 'border-[#2563EB] ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-blue-300'
                    )}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="block mt-1 text-[10px] font-bold text-slate-700 truncate">
                      {item.label}
                    </span>
                    {isCurrent && (
                      <span className="absolute top-2 end-2 flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-white text-[9px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons in Modal */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-white py-2.5 text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
              >
                <Upload className="size-3.5" />
                <span>{t('Upload Photo')}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAvatar}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="size-3.5" />
                <span>{t('Reset to Default')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
