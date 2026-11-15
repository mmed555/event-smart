import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { EventItem } from '../../types';
import { useI18n } from '../../i18n';
import clsx from 'clsx';

export interface SearchDropdownProps {
  query: string;
  events: EventItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: EventItem) => void;
  onViewAll: (query: string) => void;
  className?: string;
  maxResults?: number;
}

/**
 * Impeccable Search Dropdown component
 * Displays live, instant event search results styled with the same floating popover
 * aesthetics as the custom Select component (rounded-2xl, backdrop blur, clean typography).
 */
export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  query,
  events,
  isOpen,
  onClose,
  onSelectEvent,
  onViewAll,
  className,
  maxResults = 5,
}) => {
  const { language } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Normalize query and filter events
  const trimmed = query.trim().toLowerCase();
  const matchingEvents = trimmed
    ? events.filter((e) => {
        const titleEn = e.title.toLowerCase();
        const titleAr = (e.titleAr || '').toLowerCase();
        const cat = e.cat.toLowerCase();
        const city = e.city.toLowerCase();
        const venue = (e.venue || '').toLowerCase();
        return (
          titleEn.includes(trimmed) ||
          titleAr.includes(trimmed) ||
          cat.includes(trimmed) ||
          city.includes(trimmed) ||
          venue.includes(trimmed)
        );
      })
    : [];

  const displayEvents = matchingEvents.slice(0, maxResults);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < displayEvents.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : displayEvents.length - 1
        );
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < displayEvents.length) {
          e.preventDefault();
          onSelectEvent(displayEvents[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, displayEvents, onClose, onSelectEvent]);

  if (!isOpen || !trimmed) {
    return null;
  }

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div
      role="listbox"
      aria-label="Search Results"
      className={clsx(
        'absolute z-50 mt-2 start-0 end-0 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-2 shadow-2xl shadow-slate-900/15 anim-page overflow-hidden',
        className
      )}
    >
      {displayEvents.length > 0 ? (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>
              {language === 'ar' ? 'فعاليات مطابقة' : 'Matching Events'} ({matchingEvents.length})
            </span>
            <span className="text-[10px] text-slate-400 font-normal lowercase">
              {language === 'ar' ? 'استخدم الأسهم للتنقل' : 'use arrows to navigate'}
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto space-y-1 [scrollbar-width:thin] scrollbar-thumb-slate-200 mt-1">
            {displayEvents.map((event, idx) => {
              const isSelected = selectedIndex === idx;
              const title =
                language === 'ar' && event.titleAr ? event.titleAr : event.title;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={clsx(
                    'w-full flex items-center justify-between gap-3 rounded-xl p-2.5 text-start transition-all duration-150 group cursor-pointer',
                    isSelected
                      ? 'bg-blue-50/80 text-[#2563EB] shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-50/80'
                  )}
                >
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={event.img}
                      alt={title}
                      className="size-11 rounded-xl object-cover shrink-0 border border-slate-100 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                        {title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {event.cat}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="size-3 text-slate-400" />
                          {event.date}
                        </span>
                        <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="size-3 text-slate-400" />
                          {event.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* End Badges & Action */}
                  <div className="flex items-center gap-2 shrink-0">
                    {event.match && (
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-bold text-[#4F46E5]">
                        <Sparkles className="size-3" />
                        {event.match}%
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-700">
                      {event.price === 0
                        ? language === 'ar'
                          ? 'مجاني'
                          : 'Free'
                        : `${event.price} ${language === 'ar' ? 'ج.م' : 'EGP'}`}
                    </span>
                    <ArrowIcon className="size-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer View All */}
          <button
            type="button"
            onClick={() => onViewAll(query)}
            className="w-full mt-1.5 pt-2 border-t border-slate-100/90 flex items-center justify-between px-3 py-2 text-xs font-bold text-[#2563EB] hover:bg-blue-50/70 rounded-xl transition-colors cursor-pointer"
          >
            <span>
              {language === 'ar'
                ? `عرض جميع النتائج المطابقة لـ "${query}"`
                : `View all results matching "${query}"`}
            </span>
            <div className="flex items-center gap-1">
              <span>{matchingEvents.length} {language === 'ar' ? 'فعالية' : 'events'}</span>
              <ArrowIcon className="size-3.5" />
            </div>
          </button>
        </div>
      ) : (
        /* Empty State */
        <div className="py-7 px-4 text-center">
          <div className="mx-auto size-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
            <Search className="size-5" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            {language === 'ar'
              ? `لا توجد فعاليات مطابقة لـ "${query}"`
              : `No events found for "${query}"`}
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {language === 'ar'
              ? 'جرّب البحث باسم الفعالية، المدينة، التصنيف أو الموضوع'
              : 'Try searching by event name, city, category or topic'}
          </p>
          <button
            type="button"
            onClick={() => onViewAll(query)}
            className="mt-3.5 text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ar' ? 'استكشف جميع الفعاليات' : 'Explore all events'}</span>
            <ArrowIcon className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
};
