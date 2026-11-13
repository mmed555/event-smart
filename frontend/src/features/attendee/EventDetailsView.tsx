import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Ticket,
} from 'lucide-react';
import clsx from 'clsx';

export const EventDetailsView: React.FC = () => {
  const { events, screenParams, favs, toggleFav, bookTickets, go, showToast } = useApp();
  const { t, language } = useI18n();

  // Selected event (default to first event if not specified)
  const eventId = screenParams.id || 1;
  const event = events.find((e) => e.id === eventId) || events[0];

  // Ticket selection state
  const [selectedTierId, setSelectedTierId] = useState<string>(
    event.tiers?.[0]?.id || 'tier-default'
  );
  const [quantity, setQuantity] = useState(1);

  // Booking Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [attendeeName, setAttendeeName] = useState('Ahmed Hassan');
  const [attendeeEmail, setAttendeeEmail] = useState('ahmed.hassan@example.com');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'fawry'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedTier = event.tiers?.find((t) => t.id === selectedTierId) || {
    id: 'tier-default',
    name: 'Standard Ticket',
    price: event.price,
    remaining: event.left,
    perks: ['Full Event Access', 'Digital Certificate'],
  };

  const totalPrice = selectedTier.price * quantity;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Event link copied to clipboard', 'ok');
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    // Simulate gateway roundtrip
    await new Promise((resolve) => setTimeout(resolve, 900));
    await bookTickets(event.id, selectedTier.id, quantity, attendeeName, attendeeEmail);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const title = language === 'ar' && event.titleAr ? event.titleAr : event.title;
  const description = language === 'ar' && event.descriptionAr ? event.descriptionAr : event.description;

  return (
    <div className="bg-[#F8FAFC] pb-16">
      {/* Top Banner Cover */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={event.img}
          alt={title}
          className="h-full w-full object-cover opacity-60 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-lg bg-[#2563EB] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              {event.cat}
            </span>
            {event.match && (
              <span className="flex items-center gap-1 rounded-lg bg-[#4F46E5] px-3 py-1 text-xs font-bold text-white">
                <Sparkles className="size-3.5" />
                {event.match}% {t('Match')}
              </span>
            )}
            {event.multi && (
              <Badge tone="blue" className="bg-white/20 text-white border-transparent">
                Multi-Day Conference
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-[#2563EB]" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-slate-400" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-red-400" />
              <span>{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column: Details, Schedule, Speakers, Sponsors */}
          <div className="space-y-8">
            {/* Quick Actions (Organizer info, Share, Fav) */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-sm text-[#2563EB]">
                  {event.organizer.charAt(0)}
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">{t('Organized by')}</div>
                  <div className="text-sm font-bold text-slate-900">{event.organizer}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="size-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => toggleFav(event.id)}
                  className={clsx(
                    'flex size-9 items-center justify-center rounded-xl border transition-colors',
                    favs.includes(event.id)
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  )}
                >
                  <Heart className={clsx('size-4', favs.includes(event.id) && 'fill-current')} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-lg font-bold text-slate-900">{t('About this event')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>

            {/* Agenda Timeline */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('Event Schedule')}</h2>
                <div className="space-y-4">
                  {event.agenda.map((ag) => (
                    <div
                      key={ag.id}
                      className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div className="font-mono text-xs font-bold text-[#2563EB] shrink-0 w-28">
                        {ag.time}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{ag.title}</div>
                        {ag.speaker && (
                          <div className="text-xs text-slate-500 mt-0.5">Speaker: {ag.speaker}</div>
                        )}
                        {ag.stage && (
                          <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            {ag.stage}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('Speakers')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.speakers.map((sp) => (
                    <div
                      key={sp.id}
                      className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-100 bg-slate-50/50"
                    >
                      <img
                        src={sp.avatar}
                        alt={sp.name}
                        className="size-16 rounded-full object-cover shadow-sm mb-3"
                      />
                      <div className="text-xs font-bold text-slate-900">{sp.name}</div>
                      <div className="text-[11px] text-[#2563EB] font-medium">{sp.role}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{sp.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue & Maps Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900">{t('Venue & Location')}</h2>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  <ExternalLink className="size-3.5" />
                  <span>{t('Open in Maps')}</span>
                </a>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 flex items-center gap-3">
                <MapPin className="size-6 text-[#2563EB] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{event.venue}</div>
                  <div className="text-xs text-slate-500">{event.address || event.city}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Box (Sticky) */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">{t('Ticket Tiers')}</span>
                  <div className="font-mono text-2xl font-black text-slate-900">
                    {selectedTier.price === 0 ? t('Free') : `${selectedTier.price.toLocaleString()} ${t('EGP')}`}
                  </div>
                </div>
                <Badge tone={selectedTier.remaining <= 20 ? 'red' : 'green'}>
                  {selectedTier.remaining} {t('left')}
                </Badge>
              </div>

              {/* Tiers List */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">{t('Select Tickets')}</label>
                {(event.tiers || [selectedTier]).map((tr) => (
                  <div
                    key={tr.id}
                    onClick={() => setSelectedTierId(tr.id)}
                    className={clsx(
                      'p-3.5 rounded-xl border transition-all cursor-pointer text-start',
                      selectedTierId === tr.id
                        ? 'border-[#2563EB] bg-blue-50/50 ring-1 ring-[#2563EB]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{tr.name}</span>
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {tr.price === 0 ? t('Free') : `${tr.price} ${t('EGP')}`}
                      </span>
                    </div>
                    {tr.perks && (
                      <ul className="mt-2 space-y-1 text-[11px] text-slate-500">
                        {tr.perks.slice(0, 2).map((p, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <Check className="size-3 text-emerald-600 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Quantity</label>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-2">
                  <span className="text-xs font-medium text-slate-600 px-2">Number of attendees</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="size-7 rounded-lg bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm w-4 text-center">{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= 5}
                      onClick={() => setQuantity(Math.min(5, quantity + 1))}
                      className="size-7 rounded-lg bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{t('Total')}</span>
                <span className="font-mono text-xl font-black text-slate-900">
                  {totalPrice === 0 ? t('Free') : `${totalPrice.toLocaleString()} ${t('EGP')}`}
                </span>
              </div>

              {/* Booking CTA */}
              <Button
                v="primary"
                size="lg"
                className="w-full"
                onClick={() => setIsCheckoutOpen(true)}
              >
                {t('Book Tickets')}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>Instant QR ticket with atomic gate check-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        open={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setIsSuccess(false);
        }}
        title={isSuccess ? t('Booking Confirmed!') : t('Checkout')}
        sub={isSuccess ? undefined : `${event.title} · ${selectedTier.name}`}
      >
        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Check className="size-8 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">{t('Booking Confirmed!')}</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
                {t('Your digital QR tickets are ready in your wallet.')}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-start space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Pass Type:</span>
                <span className="font-bold text-slate-800">{selectedTier.name} (x{quantity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-emerald-600">{totalPrice} EGP</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                v="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  go('tickets');
                }}
              >
                {t('View My Tickets')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Attendee Name</label>
              <input
                type="text"
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email for QR Ticket</label>
              <input
                type="email"
                value={attendeeEmail}
                onChange={(e) => setAttendeeEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Payment Sandbox</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={clsx(
                    'flex items-center gap-2 rounded-xl border p-3 text-start transition-all',
                    paymentMethod === 'card'
                      ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB] ring-1 ring-[#2563EB]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <CreditCard className="size-4" />
                  <span className="text-xs font-bold">Credit / Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('fawry')}
                  className={clsx(
                    'flex items-center gap-2 rounded-xl border p-3 text-start transition-all',
                    paymentMethod === 'fawry'
                      ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB] ring-1 ring-[#2563EB]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Ticket className="size-4" />
                  <span className="text-xs font-bold">Fawry Pay</span>
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">{t('Total')}</div>
                <div className="font-mono text-lg font-black text-slate-900">
                  {totalPrice === 0 ? t('Free') : `${totalPrice.toLocaleString()} ${t('EGP')}`}
                </div>
              </div>
              <Badge tone="green">Sandbox Mode</Badge>
            </div>

            <Button
              v="primary"
              size="lg"
              className="w-full"
              loading={isProcessing}
              onClick={handleConfirmPayment}
            >
              {isProcessing ? t('Processing Payment…') : t('Pay & Confirm')}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
