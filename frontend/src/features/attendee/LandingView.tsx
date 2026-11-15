import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { MOCK_CATEGORIES, MOCK_ORGANIZERS } from '../../mock/data';
import { EventCard } from '../../components/ui/EventCard';
import { LandingViewFullSkeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { Select, SelectOption } from '../../components/ui/Select';
import { SearchDropdown } from '../../components/ui/SearchDropdown';
import {
  Search,
  Sparkles,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  X,
  Users,
  Cpu,
  Briefcase,
  Palette,
  Atom,
  Music,
  Heart,
  GraduationCap,
  Star,
  Flame,
  Bot,
  Check,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { events, favs, toggleFav, go, isLoading, showToast } = useApp();
  const { t, language } = useI18n();

  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Any');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Following organizers state
  const [followedOrganizers, setFollowedOrganizers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eviq-followed-orgs');
      return saved ? JSON.parse(saved) : ['TechEvents Egypt'];
    } catch {
      return ['TechEvents Egypt'];
    }
  });

  const handleToggleFollow = (orgName: string) => {
    setFollowedOrganizers((prev) => {
      const isFollowing = prev.includes(orgName);
      const updated = isFollowing
        ? prev.filter((name) => name !== orgName)
        : [...prev, orgName];
      try {
        localStorage.setItem('eviq-followed-orgs', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      showToast?.(
        isFollowing ? t('Unfollowed') : `${t('Following')} ${orgName}`,
        'info'
      );
      return updated;
    });
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
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

  const cityOptions: SelectOption[] = [
    { value: 'All', label: 'Any city', labelAr: 'كل المدن' },
    { value: 'Cairo', label: 'Cairo', labelAr: 'القاهرة' },
    { value: 'Giza', label: 'Giza', labelAr: 'الجيزة' },
    { value: 'Alexandria', label: 'Alexandria', labelAr: 'الإسكندرية' },
  ];

  const dateOptions: SelectOption[] = [
    { value: 'Any', label: 'Any date', labelAr: 'أي موعد' },
    { value: 'weekend', label: 'This weekend', labelAr: 'عطلة نهاية الأسبوع' },
    { value: 'month', label: 'This month', labelAr: 'هذا الشهر' },
  ];

  // 1. Recommended events sorted by AI match percentage
  const recommendedEvents = [...events]
    .sort((a, b) => (b.match ?? 0) - (a.match ?? 0))
    .slice(0, 4);

  // 2. Featured events: 2 large hero banners
  const featuredList = events.filter((e) => e.featured);
  const bigFeaturedEvents = featuredList.length >= 2 ? featuredList.slice(0, 2) : events.slice(0, 2);

  // 3. Trending this week events
  const trendingEvents = events.slice(2, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    go('search', {
      q: query,
      city: selectedCity === 'All' ? undefined : selectedCity,
      date: selectedDate === 'Any' ? undefined : selectedDate,
    });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'Briefcase':
        return Briefcase;
      case 'Palette':
        return Palette;
      case 'Atom':
        return Atom;
      case 'Music':
        return Music;
      case 'Heart':
        return Heart;
      case 'GraduationCap':
        return GraduationCap;
      default:
        return Users;
    }
  };

  if (isLoading) {
    return <LandingViewFullSkeleton />;
  }

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. Hero Section */}
      <section className="relative z-20 bg-slate-950 pb-20 pt-16 lg:pb-28 lg:pt-24 text-white">
        {/* Background Cinematic Event Image with Layered Gradient Overlays */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic event auditorium"
            className="animate-hero-bg h-full w-full object-cover object-center opacity-30"
          />
          {/* Layered Cinematic Gradients for Depth & Impeccable Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
          <div className="animate-ambient-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* AI Pill */}
            <div className="animate-hero-pill inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/70 px-4 py-1.5 text-xs font-semibold text-blue-200 shadow-lg shadow-blue-950/40 backdrop-blur-md hover:border-blue-400/60 hover:bg-blue-900/60 transition-all duration-300">
              <Sparkles className="size-3.5 text-blue-400" />
              <span>{t('Now with bilingual AI Assistant · English & العربية')}</span>
            </div>

            {/* Headline */}
            <h1 className="animate-hero-title mt-6 text-4xl font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl lg:text-[56px] max-w-3xl">
              {t('Discover, Plan & Experience')}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                {t('Extraordinary Events')}
              </span>{' '}
              {t('with AI')}
            </h1>

            {/* Subtitle */}
            <p className="animate-hero-subtitle mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
              {t(
                'Book conferences, workshops and festivals across Egypt — or plan your own with AI logistics and verified B2B vendors.'
              )}
            </p>

            {/* Interactive Search Bar Capsule with Live Dropdown */}
            <div
              ref={searchRef}
              className={clsx(
                'animate-hero-search relative mt-9 w-full max-w-3xl',
                isSearchOpen ? 'z-50' : 'z-20'
              )}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-white p-2.5 shadow-2xl shadow-black/40 sm:flex-row sm:items-center text-slate-900 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400/50 hover:shadow-blue-950/20"
              >
                {/* Search Text */}
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="size-4 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setIsSearchOpen(e.target.value.trim().length > 0);
                    }}
                    onFocus={() => {
                      if (query.trim().length > 0) {
                        setIsSearchOpen(true);
                      }
                    }}
                    placeholder={t('Search events, venues…')}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="size-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="Clear search query"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                <div className="hidden h-7 w-px bg-slate-200 sm:block" />

                {/* City Custom Select */}
                <div className="px-2">
                  <Select
                    icon={MapPin}
                    variant="minimal"
                    size="sm"
                    value={selectedCity}
                    onChange={setSelectedCity}
                    options={cityOptions}
                  />
                </div>

                <div className="hidden h-7 w-px bg-slate-200 sm:block" />

                {/* Date Custom Select */}
                <div className="px-2">
                  <Select
                    icon={Calendar}
                    variant="minimal"
                    size="sm"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    options={dateOptions}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" v="primary" size="md" className="shrink-0 shadow-md shadow-blue-600/30 active:scale-95 transition-transform">
                  {t('Explore')}
                </Button>
              </form>

              {/* Live Search Results Dropdown Popover */}
              <SearchDropdown
                query={query}
                events={events}
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelectEvent={(event) => {
                  setIsSearchOpen(false);
                  go('details', { id: event.id });
                }}
                onViewAll={(q) => {
                  setIsSearchOpen(false);
                  go('search', {
                    q,
                    city: selectedCity === 'All' ? undefined : selectedCity,
                    date: selectedDate === 'Any' ? undefined : selectedDate,
                  });
                }}
              />
            </div>

            {/* Trending Quick Tags */}
            <div className="animate-hero-tags relative z-0 mt-6 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
              <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-blue-400" /> {t('Trending:')}
              </span>
              {['Technology', 'AI & ML', 'Design', 'Startup'].map((tag, idx) => (
                <button
                  key={tag}
                  onClick={() => go('search', { q: tag })}
                  style={{ animationDelay: `${0.45 + idx * 0.05}s` }}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium text-slate-200 backdrop-blur-md hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Categories Section */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-slate-900">
              {t('Popular Categories')}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t("Explore what's happening across Egypt")}
            </p>
          </div>
          <Button
            v="ghost"
            size="sm"
            onClick={() => go('search')}
            className="text-slate-600 hover:text-slate-900 font-medium group"
          >
            <span>{t('View all')}</span>
            <ArrowRight className="size-4 ms-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {MOCK_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const count = events.filter((e) => e.cat === cat.name).length;
            return (
              <button
                key={cat.name}
                onClick={() => go('search', { cat: cat.name })}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-start shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card"
              >
                <div
                  className="grid size-12 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <Icon className="size-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                    {language === 'ar' ? cat.nameAr : cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {count} {t('upcoming events')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Recommended For You Section (مقترح لك) */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-transparent p-5 sm:p-8 shadow-xs">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                <Sparkles className="size-3.5" />
                <span>{t('AI Recommended')}</span>
              </div>
              <h2 className="mt-1 text-[22px] sm:text-2xl font-bold tracking-tight text-slate-900">
                {t('Recommended For You')}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {t('Ranked by your AI preference profile — refine it any time with the AI Assistant.')}
              </p>
            </div>
            <Button
              v="outline"
              size="sm"
              icon={Sparkles}
              onClick={() => go('ai')}
              className="border-indigo-200 text-[#4F46E5] hover:bg-indigo-50 font-semibold"
            >
              {t('Refine with AI')}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {recommendedEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                matchScore={ev.match}
                fav={favs.includes(ev.id)}
                onFav={() => toggleFav(ev.id)}
                onOpen={() => go('details', { id: ev.id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Events (فعاليات مميزة) & Trending This Week (الأكثر رواجًا هذا الأسبوع) */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Events Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-slate-900">
              {t('Featured Events')}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t('Hand-picked highlights with high attendee satisfaction across Egypt')}
            </p>
          </div>
          <Button
            v="ghost"
            size="sm"
            onClick={() => go('search')}
            className="text-slate-600 hover:text-slate-900 font-medium group"
          >
            <span>{t('Browse all')}</span>
            <ArrowRight className="size-4 ms-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
          </Button>
        </div>

        {/* 2 Big Featured Hero Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {bigFeaturedEvents.map((ev) => {
            const title = language === 'ar' && ev.titleAr ? ev.titleAr : ev.title;
            return (
              <button
                key={ev.id}
                onClick={() => go('details', { id: ev.id })}
                className="group relative h-72 sm:h-80 w-full overflow-hidden rounded-3xl text-start shadow-md transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <img
                  src={ev.img}
                  alt={title}
                  className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur">
                      <Star className="size-3 fill-current" />
                      {t('Featured')}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {ev.cat}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white line-clamp-1 group-hover:text-blue-200 transition-colors">
                    {title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-white/90">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="size-3.5 text-blue-300" />
                      {ev.date} · {ev.venue}, {ev.city}
                    </span>
                    <span className="rounded-lg bg-white px-3 py-1.5 font-bold text-slate-900 shadow-sm">
                      {ev.price === 0 ? t('Free') : `${ev.price} ${t('EGP')}`}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Trending This Week Subheader */}
        <div className="mb-6 mt-14 flex items-center gap-2.5">
          <h3 className="text-[22px] sm:text-2xl font-bold tracking-tight text-slate-900">
            {t('Trending This Week')}
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">
            <Flame className="size-3.5 fill-current text-red-500" />
            <span>{t('Hot')}</span>
          </span>
        </div>

        {/* 4 Cards for Trending This Week */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {trendingEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              fav={favs.includes(ev.id)}
              onFav={() => toggleFav(ev.id)}
              onOpen={() => go('details', { id: ev.id })}
            />
          ))}
        </div>
      </section>

      {/* 5. Just Tell Us What You're Into Section (فقط أخبرنا بما يهمك.) */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#312E81] via-[#4F46E5] to-[#2563EB] p-8 text-white sm:p-12 shadow-xl">
          <div className="absolute -end-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Column */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="size-3" />
                <span>{t('Conversational AI')}</span>
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                {t("Just tell us what you're into.")}
              </h2>
              <p className="mt-3 text-lg text-indigo-100 leading-relaxed">
                {t(
                  '"عايز ورشة ذكاء اصطناعي في القاهرة تحت ٥٠٠ جنيه" — our assistant understands English & Arabic, extracts your preferences, and finds your perfect match.'
                )}
              </p>
              <div className="mt-6">
                <Button
                  v="outline"
                  size="lg"
                  onClick={() => go('ai')}
                  icon={Bot}
                  className="!bg-white !text-[#4F46E5] !border-transparent hover:!bg-indigo-50 shadow-md font-bold"
                >
                  {t('Launch AI Assistant')}
                </Button>
              </div>
            </div>

            {/* Right Column: AI Extraction Slot Previews */}
            <div className="w-full space-y-2.5 sm:max-w-md lg:w-80 shrink-0">
              {[
                t('Domain · AI & Technology'),
                t('City · Cairo'),
                t('Budget · Max 500 EGP'),
                t('Date · March 2026'),
              ].map((slot) => (
                <div
                  key={slot}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white backdrop-blur border border-white/10"
                >
                  <Check className="size-4 text-emerald-300 shrink-0" />
                  <span className="font-medium">{slot}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/30 px-4 py-3 text-sm text-indigo-100">
                <span className="size-2 rounded-full bg-indigo-300 animate-pulse shrink-0" />
                <span>{t('Format · listening…')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Top Organizers Section (أفضل المنظمين) */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-slate-900">
              {t('Top Organizers')}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t('Trusted by thousands of attendees')}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {MOCK_ORGANIZERS.map((org) => {
            const isFollowing = followedOrganizers.includes(org.name);
            return (
              <div
                key={org.name}
                className="flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-soft transition-all duration-200 hover:shadow-card hover:border-slate-300"
              >
                <button
                  onClick={() => go('search', { q: org.name })}
                  className="flex min-w-0 flex-1 items-center gap-3 text-start group"
                >
                  <div
                    className="grid size-12 shrink-0 place-items-center rounded-2xl text-base font-bold text-white transition-transform group-hover:scale-105"
                    style={{ backgroundColor: org.color }}
                  >
                    {org.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors text-sm sm:text-base leading-snug"
                      dir="ltr"
                      title={org.name}
                    >
                      {org.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                      <span>{org.eventsCount} {t('events')}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {org.rating}
                      </span>
                    </div>
                  </div>
                </button>

                <Button
                  v={isFollowing ? 'dark' : 'outline'}
                  size="sm"
                  icon={isFollowing ? Check : undefined}
                  onClick={() => handleToggleFollow(org.name)}
                  className="shrink-0 text-xs px-3 py-1.5 font-medium min-w-[76px]"
                >
                  {isFollowing ? t('Following') : t('Follow')}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Metrics Banner */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center sm:text-start">
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white" dir="ltr">
                  24,500+
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-slate-400">{t('Tickets Reserved')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#2563EB]" dir="ltr">
                  180+
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-slate-400">{t('Verified B2B Vendors')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#818CF8]" dir="ltr">
                  12,000+
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-slate-400">{t('AI Recommendations / Day')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400" dir="ltr">
                  &lt; 0.8s
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-slate-400">{t('Gate Check-in Speed')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials & Community Section */}
      <section className="py-16 bg-white border-b border-slate-200/70">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('What Community Leaders Say')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Smart Event transformed how we manage Tech Summit Cairo. Gate check-in was instantaneous with zero duplicate scans across 1,500 attendees."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-[#2563EB]">
                  MA
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Mona Adel</div>
                  <div className="text-[11px] text-slate-400">Organizer · TechEvents Egypt</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "The conversational AI Assistant accurately parsed my query in Egyptian Arabic and recommended workshops that fit my budget exactly."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-xs text-[#4F46E5]">
                  KS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Karim Samir</div>
                  <div className="text-[11px] text-slate-400">Software Engineer · Attendee</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "As an AV and acoustics vendor, receiving structured RFQs with clear venue specs cut quotation turnaround time down to under 2 hours."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-600">
                  SN
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sara Nabil</div>
                  <div className="text-[11px] text-slate-400">Operations Lead · SoundWave Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Organizer / B2B Call to Action */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-blue-50/50">
        <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t('Ready to plan your next event?')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-600">
            {t(
              'Launch your conference, automate ticket sales, and procure verified sound, lighting and venue equipment with AI assistance.'
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button v="primary" size="lg" onClick={() => go('org')}>
              {t('Create an Event')}
            </Button>
            <Button v="outline" size="lg" onClick={() => go('vendor')}>
              {t('Become a Verified Vendor')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
