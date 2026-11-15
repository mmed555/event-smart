import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { MOCK_CATEGORIES } from '../../mock/data';
import { EventCard } from '../../components/ui/EventCard';
import { LandingViewFullSkeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { Select, SelectOption } from '../../components/ui/Select';
import {
  Search,
  Sparkles,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Users,
  Cpu,
  Briefcase,
  Palette,
  Atom,
  Music,
  Heart,
  GraduationCap,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { events, favs, toggleFav, go, isLoading } = useApp();
  const { t, language } = useI18n();

  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Any');

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

  const featuredEvents = events.filter((e) => e.featured || e.id <= 4);

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-16 lg:pb-28 lg:pt-24 text-white">
        {/* Background Cinematic Event Image with Layered Gradient Overlays */}
        <div className="absolute inset-0 select-none pointer-events-none">
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

            {/* Interactive Search Bar Capsule */}
            <form
              onSubmit={handleSearchSubmit}
              className="animate-hero-search mt-9 flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/20 bg-white p-2.5 shadow-2xl shadow-black/40 sm:flex-row sm:items-center text-slate-900 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400/50 hover:shadow-blue-950/20"
            >
              {/* Search Text */}
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="size-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('Search events, venues…')}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
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

            {/* Trending Quick Tags */}
            <div className="animate-hero-tags mt-6 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
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

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                <Sparkles className="size-3.5" />
                <span>{t('Featured Events')}</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t('Hand-picked highlights with high attendee satisfaction across Egypt')}
              </h2>
            </div>
            <Button
              v="ghost"
              size="sm"
              icon={ArrowRight}
              onClick={() => go('search')}
              className="text-[#2563EB] font-bold self-start sm:self-auto"
            >
              {t('Explore Events')}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                fav={favs.includes(ev.id)}
                onFav={() => toggleFav(ev.id)}
                onOpen={() => go('details', { id: ev.id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white border-y border-slate-200/70">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('Explore Categories')}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {t('Browse events tailored to your industry, passion and learning goals')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {MOCK_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <button
                  key={cat.name}
                  onClick={() => go('search', { cat: cat.name })}
                  className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5 text-start transition-all hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-card"
                >
                  <div
                    className="flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-sm text-slate-900 group-hover:text-[#2563EB] transition-colors">
                    {language === 'ar' ? cat.nameAr : cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {events.filter((e) => e.cat === cat.name).length} events
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white">24,500+</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{t('Tickets Reserved')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#2563EB]">180+</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{t('Verified B2B Vendors')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#4F46E5]">12,000+</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{t('AI Recommendations / Day')}</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400">&lt; 0.8s</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{t('Gate Check-in Speed')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Community Section */}
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

      {/* Organizer / B2B Call to Action */}
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
