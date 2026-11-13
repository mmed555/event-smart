import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { MOCK_CATEGORIES } from '../../mock/data';
import { EventCard } from '../../components/ui/EventCard';
import { Button } from '../../components/ui/Button';
import {
  Search,
  Sparkles,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Zap,
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
  const { events, favs, toggleFav, go } = useApp();
  const { t, language } = useI18n();

  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Any');

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

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,#DBEAFE,transparent_55%),radial-gradient(ellipse_at_bottom_left,#EEF2FF,transparent_55%)] pb-16 pt-12 lg:pt-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* Left Column: Hero Text & Search */}
            <div>
              {/* AI Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#4F46E5] shadow-soft backdrop-blur-md">
                <Sparkles className="size-3.5 text-[#4F46E5]" />
                <span>Now with bilingual AI Assistant · English & العربية</span>
              </div>

              {/* Headline */}
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl xl:text-[54px]">
                {t('Discover, Plan & Experience')}{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">
                  {t('Extraordinary Events')}
                </span>{' '}
                {t('with AI')}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                {t(
                  'Book conferences, workshops and festivals across Egypt — or plan your own with AI logistics and verified B2B vendors.'
                )}
              </p>

              {/* Interactive Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-200/70 sm:flex-row sm:items-center"
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

                {/* City Select */}
                <div className="flex items-center gap-2 px-3">
                  <MapPin className="size-4 shrink-0 text-slate-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="All">{t('Any city')}</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                  </select>
                </div>

                <div className="hidden h-7 w-px bg-slate-200 sm:block" />

                {/* Date Select */}
                <div className="flex items-center gap-2 px-3">
                  <Calendar className="size-4 shrink-0 text-slate-400" />
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Any">{t('Any date')}</option>
                    <option value="weekend">{t('This weekend')}</option>
                    <option value="month">{t('This month')}</option>
                  </select>
                </div>

                {/* Submit Button */}
                <Button type="submit" v="primary" size="md" className="shrink-0">
                  {t('Explore')}
                </Button>
              </form>

              {/* Trending Quick Tags */}
              <div className="mt-5 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-semibold text-slate-400 flex items-center gap-1">
                  <TrendingUp className="size-3.5" /> Trending:
                </span>
                {['Technology', 'AI & ML', 'Design', 'Startup'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => go('search', { q: tag })}
                    className="rounded-lg bg-white/80 px-2.5 py-1 font-medium text-slate-600 shadow-soft hover:bg-white hover:text-[#2563EB] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Featured Highlight Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-3 shadow-2xl shadow-indigo-100">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                    <img
                      src={featuredEvents[0]?.img}
                      alt="Featured summit"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 inset-x-4 text-white">
                      <span className="inline-block rounded-md bg-[#2563EB] px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                        Featured Summit
                      </span>
                      <h3 className="mt-2 text-xl font-bold leading-tight">
                        {featuredEvents[0]?.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300">
                        {featuredEvents[0]?.date} · {featuredEvents[0]?.venue}
                      </p>
                    </div>
                  </div>

                  {/* AI Match Floating Badge */}
                  <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                        <Sparkles className="size-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">97% Match for you</div>
                        <div className="text-[11px] text-slate-400">Based on Technology interests</div>
                      </div>
                    </div>
                    <Button
                      v="outline"
                      size="sm"
                      onClick={() => go('details', { id: featuredEvents[0]?.id || 1 })}
                    >
                      {t('View Details')}
                    </Button>
                  </div>
                </div>

                {/* Secondary Floating Card */}
                <div className="absolute -bottom-6 -start-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Instant QR Check-in</div>
                    <div className="text-[11px] text-slate-500">&lt; 1s Gate Anti-Replay Verification</div>
                  </div>
                </div>
              </div>
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
