import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { MOCK_CATEGORIES } from '../../mock/data';
import { EventCard } from '../../components/ui/EventCard';
import { Button } from '../../components/ui/Button';
import {
  Search,
  Filter,
  RotateCcw,
  Heart,
  SlidersHorizontal,
} from 'lucide-react';
import clsx from 'clsx';

export const SearchDiscoveryView: React.FC = () => {
  const { events, favs, toggleFav, screenParams, go } = useApp();
  const { t, language } = useI18n();

  const [query, setQuery] = useState(screenParams.q || '');
  const [selectedCat, setSelectedCat] = useState<string>(screenParams.cat || 'All');
  const [selectedCity, setSelectedCity] = useState<string>(screenParams.city || 'All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'priceAsc' | 'priceDesc'>('match');
  const [showOnlyFavs, setShowOnlyFavs] = useState(screenParams.cat === 'Favorites');
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Query search
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchTitle = ev.title.toLowerCase().includes(q);
          const matchCat = ev.cat.toLowerCase().includes(q);
          const matchVenue = ev.venue.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchVenue) return false;
        }

        // Category filter
        if (selectedCat !== 'All' && selectedCat !== 'Favorites' && ev.cat !== selectedCat) {
          return false;
        }

        // Favorites only
        if (showOnlyFavs || selectedCat === 'Favorites') {
          if (!favs.includes(ev.id)) return false;
        }

        // City filter
        if (selectedCity !== 'All' && ev.city !== selectedCity) {
          return false;
        }

        // Price filter
        if (selectedPrice === 'free' && ev.price > 0) return false;
        if (selectedPrice === 'under200' && ev.price >= 200) return false;
        if (selectedPrice === '200to500' && (ev.price < 200 || ev.price > 500)) return false;
        if (selectedPrice === 'over500' && ev.price <= 500) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return (b.match || 0) - (a.match || 0);
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        return a.id - b.id;
      });
  }, [events, query, selectedCat, selectedCity, selectedPrice, sortBy, showOnlyFavs, favs]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCat('All');
    setSelectedCity('All');
    setSelectedPrice('All');
    setShowOnlyFavs(false);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {showOnlyFavs ? t('Saved events') : t('Explore Events')}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredEvents.length} active events in Egypt
          </p>
        </div>

        {/* Sort & Quick Fav Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={clsx(
              'flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all',
              showOnlyFavs
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            <Heart className={clsx('size-3.5', showOnlyFavs && 'fill-current')} />
            <span>{t('Favorites')} ({favs.length})</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-soft cursor-pointer"
          >
            <option value="match">Sort by: AI Match Score</option>
            <option value="priceAsc">Sort by: Price (Low to High)</option>
            <option value="priceDesc">Sort by: Price (High to Low)</option>
            <option value="date">Sort by: Soonest Date</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
            className="lg:hidden rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Events Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar Filters */}
        <aside className={clsx('space-y-6', showFiltersOnMobile ? 'block' : 'hidden lg:block')}>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="size-4 text-[#2563EB]" />
                {t('Filter Events')}
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-slate-400 hover:text-[#2563EB] flex items-center gap-1"
                title="Reset"
              >
                <RotateCcw className="size-3" /> {t('Reset filters')}
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Search</label>
              <div className="relative">
                <Search className="size-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Title, venue, keyword…"
                  className="w-full rounded-xl border border-slate-200 ps-8 pe-3 py-1.5 text-xs focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t('Category')}
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCat('All')}
                  className={clsx(
                    'w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                    selectedCat === 'All'
                      ? 'bg-blue-50 text-[#2563EB] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {t('All categories')}
                </button>
                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCat(cat.name)}
                    className={clsx(
                      'w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between',
                      selectedCat === cat.name
                        ? 'bg-blue-50 text-[#2563EB] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <span>{language === 'ar' ? cat.nameAr : cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {events.filter((e) => e.cat === cat.name).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* City Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t('Location')}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="All">{t('All cities')}</option>
                <option value="Cairo">Cairo (القاهرة)</option>
                <option value="Giza">Giza (الجيزة)</option>
                <option value="Alexandria">Alexandria (الإسكندرية)</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t('Price Range')}
              </label>
              <div className="space-y-1 text-xs font-medium">
                {[
                  { id: 'All', label: t('All prices') },
                  { id: 'free', label: t('Free events') },
                  { id: 'under200', label: t('Under 200 EGP') },
                  { id: '200to500', label: t('200 - 500 EGP') },
                  { id: 'over500', label: t('500+ EGP') },
                ].map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-2 px-1 py-1 rounded hover:bg-slate-50 cursor-pointer text-slate-600"
                  >
                    <input
                      type="radio"
                      name="priceFilter"
                      checked={selectedPrice === p.id}
                      onChange={() => setSelectedPrice(p.id)}
                      className="text-[#2563EB] focus:ring-blue-400 size-3.5"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Events Grid */}
        <main>
          {filteredEvents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                {t('No events match your criteria')}
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                {t('Try adjusting your filters or search keywords.')}
              </p>
              <Button v="outline" size="sm" onClick={resetFilters} className="mt-4">
                {t('Reset filters')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  fav={favs.includes(ev.id)}
                  onFav={() => toggleFav(ev.id)}
                  onOpen={() => go('details', { id: ev.id })}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
