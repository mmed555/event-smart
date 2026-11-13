import React from 'react';
import { Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';
import { Badge } from './Badge';
import { useI18n } from '../../i18n';
import clsx from 'clsx';

export interface EventCardProps {
  event: EventItem;
  fav?: boolean;
  onFav?: (e: React.MouseEvent) => void;
  onOpen?: () => void;
  matchScore?: number;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  fav = false,
  onFav,
  onOpen,
  matchScore,
}) => {
  const { t, language } = useI18n();

  const title = language === 'ar' && event.titleAr ? event.titleAr : event.title;
  const score = matchScore ?? event.match;

  return (
    <div
      onClick={onOpen}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={event.img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              {event.cat}
            </span>
            {score && (
              <span className="flex items-center gap-1 rounded-lg bg-[#4F46E5]/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md">
                <Sparkles className="size-3" />
                {score}% {t('Match')}
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFav?.(e);
            }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className={clsx(
              'pointer-events-auto flex size-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-md transition-all duration-150 hover:scale-110 active:scale-90',
              fav ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            <Heart className={clsx('size-4', fav && 'fill-current')} />
          </button>
        </div>

        {event.featured && (
          <div className="absolute bottom-3 start-3">
            <Badge tone="amber" className="bg-amber-500/90 text-white border-transparent backdrop-blur-md">
              {t('Featured')}
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Calendar className="size-3.5 text-[#2563EB]" />
          <span>{event.date}</span>
        </div>

        <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-1">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="size-3.5 shrink-0 text-slate-400" />
          <span className="truncate">
            {event.venue}, {event.city}
          </span>
        </div>

        {/* Footer / Pricing */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div>
            <span className="font-mono text-base font-bold text-slate-900">
              {event.price === 0 ? t('Free') : `${event.price.toLocaleString()} ${t('EGP')}`}
            </span>
          </div>
          <div className="text-end">
            <span
              className={clsx(
                'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold',
                event.left <= 20
                  ? 'bg-red-50 text-red-600 font-bold'
                  : 'bg-slate-100 text-slate-600'
              )}
            >
              {event.left} {t('left')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
