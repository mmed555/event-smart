import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { VenueMapModal } from '../../components/ui/VenueMapModal';
import { EventDetailsSkeleton } from '../../components/ui/Skeleton';
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
  Plus,
  Minus,
  Navigation,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import { AttendeeInputItem } from '../../context/AppContext';

export const EventDetailsView: React.FC = () => {
  const {
    events,
    screenParams,
    favs,
    toggleFav,
    bookMultiTickets,
    go,
    showToast,
    isLoading,
  } = useApp();
  const { t, language, dir } = useI18n();

  // Selected event (default to first event if not specified)
  const eventId = screenParams.id || 1;
  const event = events.find((e) => e.id === eventId) || events[0];

  // Multi-tier selection state: maps tierId -> quantity
  const initialTiersState: Record<string, number> = {};
  if (event.tiers && event.tiers.length > 0) {
    event.tiers.forEach((tier, index) => {
      initialTiersState[tier.id] = index === 0 ? 1 : 0;
    });
  } else {
    initialTiersState['tier-default'] = 1;
  }

  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>(initialTiersState);

  // Venue Map Modal state
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Booking Checkout Modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('Ahmed Hassan');
  const [buyerEmail, setBuyerEmail] = useState('ahmed.hassan@example.com');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'fawry'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Per-attendee details (optional)
  const [showAttendeeInputs, setShowAttendeeInputs] = useState(false);
  const [attendeeDetails, setAttendeeDetails] = useState<Record<string, string>>({});

  // Available tiers list
  const tiersList = event.tiers && event.tiers.length > 0 ? event.tiers : [
    {
      id: 'tier-default',
      name: 'Standard Ticket',
      price: event.price,
      capacity: event.capacity || 500,
      remaining: event.left,
      perks: ['Full Event Access', 'Digital Certificate of Attendance'],
    },
  ];

  // Helper functions for quantities
  const handleIncrement = (tierId: string, maxRemaining: number) => {
    setSelectedTiers((prev) => {
      const current = prev[tierId] || 0;
      if (current >= Math.min(8, maxRemaining)) {
        showToast(
          language === 'ar' ? 'تم الوصول للحد الأقصى للتذاكر في الطلب الواحد' : 'Max tickets limit reached for this tier',
          'info'
        );
        return prev;
      }
      return { ...prev, [tierId]: current + 1 };
    });
  };

  const handleDecrement = (tierId: string) => {
    setSelectedTiers((prev) => {
      const current = prev[tierId] || 0;
      if (current <= 0) return prev;
      return { ...prev, [tierId]: current - 1 };
    });
  };

  // Calculation of summary
  const selectedItemsSummary = tiersList
    .map((tier) => ({
      tier,
      quantity: selectedTiers[tier.id] || 0,
      subtotal: (selectedTiers[tier.id] || 0) * tier.price,
    }))
    .filter((item) => item.quantity > 0);

  const totalTicketsCount = selectedItemsSummary.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotalPrice = selectedItemsSummary.reduce((sum, item) => sum + item.subtotal, 0);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(language === 'ar' ? 'تم نسخ رابط الفعالية' : 'Event link copied to clipboard', 'ok');
  };

  const handleConfirmPayment = async () => {
    if (totalTicketsCount === 0) return;

    setIsProcessing(true);
    // Simulate gateway roundtrip
    await new Promise((resolve) => setTimeout(resolve, 850));

    // Prepare tier items
    const tierItems = selectedItemsSummary.map((item) => ({
      tierId: item.tier.id,
      quantity: item.quantity,
    }));

    // Prepare attendee records
    const attendeesList: AttendeeInputItem[] = [];
    let ticketIndex = 0;
    selectedItemsSummary.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const customName = attendeeDetails[`tkt-${ticketIndex}`];
        attendeesList.push({
          tierId: item.tier.id,
          name: customName && customName.trim() ? customName.trim() : buyerName,
          email: buyerEmail,
        });
        ticketIndex++;
      }
    });

    const result = await bookMultiTickets(
      event.id,
      tierItems,
      buyerName,
      buyerEmail,
      attendeesList
    );

    setIsProcessing(false);
    if (result.success) {
      setConfirmedBookingId(result.bookingId);
      setIsSuccess(true);
    }
  };

  const handleFillAllWithBuyer = () => {
    const updated: Record<string, string> = {};
    for (let i = 0; i < totalTicketsCount; i++) {
      updated[`tkt-${i}`] = buyerName;
    }
    setAttendeeDetails(updated);
    showToast(
      language === 'ar' ? 'تم تعبئة جميع أسماء التذاكر ببيانات المشتري' : 'All attendee names populated with buyer name',
      'info'
    );
  };

  const title = language === 'ar' && event.titleAr ? event.titleAr : event.title;
  const description =
    language === 'ar' && event.descriptionAr ? event.descriptionAr : event.description;

  if (isLoading) {
    return <EventDetailsSkeleton />;
  }

  return (
    <div className="bg-[#F8FAFC] pb-24">
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
                {language === 'ar' ? 'مؤتمر متعدد الأيام' : 'Multi-Day Conference'}
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
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              <MapPin className="size-4 text-red-400" />
              <span>
                {event.venue}, {event.city}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column: Details, Agenda, Speakers, Venue & Map Preview */}
          <div className="space-y-8">
            {/* Quick Actions (Organizer info, Share, Fav) */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-sm text-[#2563EB]">
                  {event.organizer.charAt(0)}
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">
                    {t('Organized by')}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{event.organizer}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="size-3.5" />
                  <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
                </button>
                <button
                  onClick={() => toggleFav(event.id)}
                  className={clsx(
                    'flex size-9 items-center justify-center rounded-xl border transition-colors',
                    favs.includes(event.id)
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  )}
                  title={language === 'ar' ? 'إضافة إلى المفضلة' : 'Save to Favorites'}
                >
                  <Heart className={clsx('size-4', favs.includes(event.id) && 'fill-current')} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
              <h2 className="text-lg font-bold text-slate-900">{t('About this event')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
            </div>

            {/* Agenda Timeline */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                <h2 className="text-lg font-bold text-slate-900 mb-6">{t('Event Schedule')}</h2>
                <div className="space-y-4">
                  {event.agenda.map((ag) => (
                    <div
                      key={ag.id}
                      className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div className="font-mono text-xs font-bold text-[#2563EB] shrink-0 w-28">
                        {ag.time}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900">{ag.title}</div>
                        {ag.speaker && (
                          <div className="text-xs text-slate-500 mt-0.5">
                            {language === 'ar' ? 'المتحدث:' : 'Speaker:'} {ag.speaker}
                          </div>
                        )}
                        {ag.stage && (
                          <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {ag.stage}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speakers - Interactive Clickable Cards */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{t('Speakers')}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'ar'
                        ? 'انقر على أي متحدث لعرض ملفه الشخصي وجلساته وأرشيف مشاركاته'
                        : 'Click any speaker to explore their dedicated profile, bio, and session archive'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.speakers.map((sp) => {
                    const spName = language === 'ar' && sp.nameAr ? sp.nameAr : sp.name;
                    const spRole = language === 'ar' && sp.roleAr ? sp.roleAr : sp.role;
                    const spCompany =
                      language === 'ar' && sp.companyAr ? sp.companyAr : sp.company;

                    return (
                      <div
                        key={sp.id}
                        onClick={() =>
                          go('speaker', { speakerId: sp.id, eventId: event.id })
                        }
                        className="group relative flex flex-col items-center text-center p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="relative mb-3">
                          <img
                            src={sp.avatar}
                            alt={spName}
                            className="size-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-white">
                            <ExternalLink className="size-2.5" />
                          </span>
                        </div>

                        <div className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                          {spName}
                        </div>
                        <div className="text-xs text-[#2563EB] font-medium mt-0.5">{spRole}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{spCompany}</div>

                        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] opacity-90 group-hover:opacity-100">
                          <span>{language === 'ar' ? 'عرض الملف' : 'View Profile'}</span>
                          {dir === 'rtl' ? (
                            <ArrowRight className="size-3 rotate-180" />
                          ) : (
                            <ArrowRight className="size-3" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Venue & Location - Enhanced with interactive Map & GPS trigger */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{t('Venue & Location')}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'ar'
                      ? 'موقع الفعالية وخريطة الوصول وتطبيقات الـ GPS'
                      : 'Venue location, driving directions & GPS apps'}
                  </p>
                </div>

                <Button
                  v="outline"
                  size="sm"
                  onClick={() => setIsMapModalOpen(true)}
                  className="gap-1.5"
                >
                  <Navigation className="size-3.5 text-[#2563EB]" />
                  <span>{language === 'ar' ? 'الخريطة والملاحة' : 'Open Map & GPS'}</span>
                </Button>
              </div>

              {/* Map Preview Banner */}
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-pointer hover:border-[#2563EB] transition-all"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/90 to-indigo-50/70">
                  <div className="flex items-start gap-3">
                    <div className="size-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{event.venue}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {event.address || event.city}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-mono">
                        <span>{language === 'ar' ? 'المدينة:' : 'City:'} {event.city}</span>
                        {event.coordinates && (
                          <span>· GPS: {event.coordinates.lat.toFixed(3)}, {event.coordinates.lng.toFixed(3)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#2563EB] shadow-xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      {language === 'ar' ? 'عرض في الخريطة المكبرة' : 'View on Interactive Map'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Box (Sticky & Multi-Tier Selection) */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 space-y-6">
              {/* Header summary */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    {language === 'ar' ? 'حجز التذاكر' : 'Select Tickets'}
                  </span>
                  <div className="font-mono text-2xl font-black text-slate-900 mt-0.5">
                    {grandTotalPrice === 0
                      ? t('Free')
                      : `${grandTotalPrice.toLocaleString()} ${t('EGP')}`}
                  </div>
                </div>
                <div className="text-end">
                  <Badge tone={totalTicketsCount > 0 ? 'blue' : 'gray'}>
                    {totalTicketsCount}{' '}
                    {language === 'ar'
                      ? totalTicketsCount === 1
                        ? 'تذكرة'
                        : totalTicketsCount === 2
                        ? 'تذكرتان'
                        : 'تذاكر'
                      : totalTicketsCount === 1
                      ? 'ticket'
                      : 'tickets'}
                  </Badge>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    {event.left} {language === 'ar' ? 'مقعد متبقي' : 'seats left'}
                  </div>
                </div>
              </div>

              {/* Tiers List with Counter on Each Tier */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{language === 'ar' ? 'فئات التذاكر المتاحة' : 'Available Ticket Tiers'}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {language === 'ar' ? 'اختر الكمية لكل فئة' : 'Select qty per tier'}
                  </span>
                </div>

                {tiersList.map((tier) => {
                  const qty = selectedTiers[tier.id] || 0;
                  const isSoldOut = tier.remaining <= 0;

                  return (
                    <div
                      key={tier.id}
                      className={clsx(
                        'p-4 rounded-2xl border transition-all text-start',
                        qty > 0
                          ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-[#2563EB]'
                          : 'border-slate-200 hover:border-slate-300 bg-white',
                        isSoldOut && 'opacity-50 pointer-events-none'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{tier.name}</span>
                            {tier.remaining <= 25 && (
                              <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
                                {tier.remaining} {language === 'ar' ? 'متبقي' : 'left'}
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-xs font-black text-[#2563EB] mt-0.5">
                            {tier.price === 0 ? t('Free') : `${tier.price.toLocaleString()} ${t('EGP')}`}
                          </div>
                        </div>

                        {/* Quantity Counter Buttons for this tier */}
                        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200 shrink-0">
                          <button
                            type="button"
                            disabled={qty <= 0}
                            onClick={() => handleDecrement(tier.id)}
                            className="size-7 rounded-lg bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-2xs transition-colors"
                            title={language === 'ar' ? 'إنقاص' : 'Decrease'}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="font-mono font-bold text-sm w-5 text-center text-slate-900">
                            {qty}
                          </span>
                          <button
                            type="button"
                            disabled={qty >= Math.min(8, tier.remaining)}
                            onClick={() => handleIncrement(tier.id, tier.remaining)}
                            className="size-7 rounded-lg bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-2xs transition-colors"
                            title={language === 'ar' ? 'زيادة' : 'Increase'}
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>

                      {/* Perks */}
                      {tier.perks && tier.perks.length > 0 && (
                        <ul className="mt-2.5 pt-2 border-t border-slate-200/50 space-y-1 text-[11px] text-slate-500">
                          {tier.perks.map((p, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <Check className="size-3 text-emerald-600 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-time Order Summary */}
              {totalTicketsCount > 0 && (
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                  <div className="font-bold text-slate-700">
                    {language === 'ar' ? 'ملخص التذاكر المختارة' : 'Selected Tickets Summary'}
                  </div>
                  {selectedItemsSummary.map((item) => (
                    <div key={item.tier.id} className="flex justify-between text-slate-600 font-mono">
                      <span>
                        {item.quantity}x {item.tier.name}
                      </span>
                      <span className="font-bold text-slate-900">
                        {item.subtotal === 0 ? t('Free') : `${item.subtotal.toLocaleString()} EGP`}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>{t('Total')}</span>
                    <span className="font-mono text-base text-[#2563EB]">
                      {grandTotalPrice === 0 ? t('Free') : `${grandTotalPrice.toLocaleString()} EGP`}
                    </span>
                  </div>
                </div>
              )}

              {/* Booking CTA Button */}
              <Button
                v="primary"
                size="lg"
                disabled={totalTicketsCount === 0}
                className="w-full"
                onClick={() => setIsCheckoutOpen(true)}
              >
                {totalTicketsCount === 0
                  ? language === 'ar'
                    ? 'اختر تذكرة للمتابعة'
                    : 'Select Tickets to Proceed'
                  : language === 'ar'
                  ? `متابعة الحجز (${totalTicketsCount} تذاكر)`
                  : `Proceed to Checkout (${totalTicketsCount} tickets)`}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>
                  {language === 'ar'
                    ? 'تذاكر مشفرة فورية مع تسجيل وصول ذكي'
                    : 'Instant QR ticket with atomic gate check-in'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Map & GPS Modal */}
      <VenueMapModal
        open={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        venueName={event.venue}
        address={event.address}
        city={event.city}
        coordinates={event.coordinates}
      />

      {/* Checkout Modal */}
      <Modal
        open={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setIsSuccess(false);
        }}
        title={isSuccess ? t('Booking Confirmed!') : t('Checkout')}
        sub={
          isSuccess
            ? undefined
            : `${title} · ${totalTicketsCount} ${language === 'ar' ? 'تذاكر' : 'tickets'}`
        }
        w="max-w-xl"
      >
        {isSuccess ? (
          <div className="text-center py-4 space-y-5">
            <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm">
              <Check className="size-9 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">{t('Booking Confirmed!')}</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'ar'
                  ? 'تم تأكيد حجزك بنجاح. تذاكرك الرقمية المشفرة جاهزة الآن في محفظة التذاكر الخاصة بك.'
                  : 'Your booking has been confirmed! Individual digital QR tickets have been added to your wallet.'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-start space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-sans">{language === 'ar' ? 'رقم الحجز:' : 'Booking Ref:'}</span>
                <span className="font-bold text-slate-900">{confirmedBookingId}</span>
              </div>
              <div className="space-y-1">
                {selectedItemsSummary.map((item) => (
                  <div key={item.tier.id} className="flex justify-between text-slate-600">
                    <span>
                      {item.quantity}x {item.tier.name}
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.subtotal === 0 ? t('Free') : `${item.subtotal.toLocaleString()} EGP`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-sans">
                <span className="text-slate-500 font-bold">{t('Total')}</span>
                <span className="font-bold text-emerald-600 font-mono text-sm">
                  {grandTotalPrice === 0 ? t('Free') : `${grandTotalPrice.toLocaleString()} EGP`}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                v="primary"
                size="lg"
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
          <div className="space-y-5">
            {/* Order Items Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
              <div className="text-xs font-bold text-slate-700">
                {language === 'ar' ? 'التذاكر المطلوبة' : 'Order Breakdown'}
              </div>
              <div className="space-y-1">
                {selectedItemsSummary.map((item) => (
                  <div key={item.tier.id} className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700">
                      {item.quantity}x {item.tier.name}
                    </span>
                    <span className="font-bold text-slate-900">
                      {item.subtotal === 0 ? t('Free') : `${item.subtotal.toLocaleString()} EGP`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-bold">
                <span>{t('Total')}</span>
                <span className="font-mono text-sm text-[#2563EB]">
                  {grandTotalPrice === 0 ? t('Free') : `${grandTotalPrice.toLocaleString()} EGP`}
                </span>
              </div>
            </div>

            {/* Buyer Contact Information */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'ar' ? 'بيانات المشتري الأساسية' : 'Buyer Information'}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. Ahmed Hassan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني لاستلام التذاكر' : 'Email Address for QR Tickets'}
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-[#2563EB] focus:outline-none"
                  placeholder="e.g. ahmed.hassan@example.com"
                />
              </div>
            </div>

            {/* Optional Attendee Names Accordion */}
            {totalTicketsCount > 1 && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowAttendeeInputs(!showAttendeeInputs)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-[#2563EB]" />
                    <span>
                      {language === 'ar'
                        ? 'تخصيص أسماء الحضور لكل تذكرة (اختياري)'
                        : 'Assign Names per Ticket (Optional)'}
                    </span>
                  </div>
                  {showAttendeeInputs ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>

                {showAttendeeInputs && (
                  <div className="p-4 space-y-3 bg-white border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {language === 'ar'
                          ? 'يمكنك كتابة اسم حامل التذكرة ليظهر على رمز QR الخاص به'
                          : 'Attendee name will be printed on each individual digital badge'}
                      </span>
                      <button
                        type="button"
                        onClick={handleFillAllWithBuyer}
                        className="text-[11px] font-bold text-[#2563EB] hover:underline"
                      >
                        {language === 'ar' ? 'ملء بالاسم نفسه' : 'Fill all as buyer'}
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {(() => {
                        let flatIdx = 0;
                        const inputs: React.ReactNode[] = [];
                        selectedItemsSummary.forEach((item) => {
                          for (let i = 0; i < item.quantity; i++) {
                            const currentIdx = flatIdx;
                            inputs.push(
                              <div key={currentIdx} className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500 w-20 shrink-0">
                                  #{currentIdx + 1} ({item.tier.name.split(' ')[0]})
                                </span>
                                <input
                                  type="text"
                                  placeholder={buyerName}
                                  value={attendeeDetails[`tkt-${currentIdx}`] || ''}
                                  onChange={(e) =>
                                    setAttendeeDetails({
                                      ...attendeeDetails,
                                      [`tkt-${currentIdx}`]: e.target.value,
                                    })
                                  }
                                  className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs focus:border-[#2563EB] focus:outline-none"
                                />
                              </div>
                            );
                            flatIdx++;
                          }
                        });
                        return inputs;
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Sandbox Method Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {language === 'ar' ? 'طريقة الدفع (بيئة تجريبية Sandbox)' : 'Payment Method (Sandbox)'}
              </label>
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
                  <CreditCard className="size-4 shrink-0" />
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
                  <Ticket className="size-4 shrink-0" />
                  <span className="text-xs font-bold">Fawry Pay</span>
                </button>
              </div>
            </div>

            <Button
              v="primary"
              size="lg"
              className="w-full"
              loading={isProcessing}
              onClick={handleConfirmPayment}
            >
              {isProcessing
                ? language === 'ar'
                  ? 'جاري تأكيد الدفع وإصدار التذاكر…'
                  : 'Processing Payment & Issuing Tickets…'
                : language === 'ar'
                ? `تأكيد الدفع (${grandTotalPrice === 0 ? 'مجاناً' : `${grandTotalPrice.toLocaleString()} ج.م`})`
                : `Pay & Confirm (${grandTotalPrice === 0 ? 'Free' : `${grandTotalPrice.toLocaleString()} EGP`})`}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
