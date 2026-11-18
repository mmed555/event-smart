import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { QRCodeView } from '../../components/ui/QRCodeView';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TicketsWalletSkeleton } from '../../components/ui/Skeleton';
import { DigitalTicket } from '../../types';
import { MOCK_IMAGES } from '../../mock/data';
import {
  Ticket,
  QrCode,
  CreditCard,
  ChevronUp,
  ChevronDown,
  Download,
  CalendarPlus,
  ShieldCheck,
  X,
  Lock,
} from 'lucide-react';
import clsx from 'clsx';

type TabType = 'all' | 'past' | 'upcoming';

export const TicketsWalletView: React.FC = () => {
  const { bookings, tickets, events, payBooking, go, showToast, isLoading } = useApp();
  const { t, language } = useI18n();

  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [expandedBookings, setExpandedBookings] = useState<Record<string, boolean>>(() => {
    // By default all bookings are expanded like the Figma design
    const initial: Record<string, boolean> = {};
    bookings.forEach((b) => {
      initial[b.id] = true;
    });
    return initial;
  });

  const [selectedTicketModal, setSelectedTicketModal] = useState<DigitalTicket | null>(null);

  const toggleExpand = (bookingId: string) => {
    setExpandedBookings((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  const handleDownloadPDF = () => {
    showToast(
      language === 'ar'
        ? 'تم تحميل تذكرة الـ PDF الرقمية بنجاح'
        : 'Digital ticket PDF generated for download',
      'ok'
    );
  };

  const handleAddToCalendar = () => {
    showToast(
      language === 'ar'
        ? 'تمت إضافة الفعالية إلى تقويم Google'
        : 'Event added to Google Calendar',
      'ok'
    );
  };

  const handlePayNow = (bookingId: string) => {
    payBooking(bookingId);
  };

  // Close modal on Escape and prevent body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTicketModal(null);
      }
    };

    if (selectedTicketModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedTicketModal]);

  if (isLoading) {
    return <TicketsWalletSkeleton />;
  }

  // Filter bookings based on active tab
  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');
  const pastBookings = bookings.filter((b) => b.status === 'Completed' || b.status === 'Cancelled');

  const filteredBookings =
    activeTab === 'all'
      ? bookings
      : activeTab === 'past'
      ? pastBookings
      : upcomingBookings;

  const hasPendingBookings = bookings.some((b) => b.status === 'Pending');

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 anim-page">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('My Bookings & Tickets')}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            {t('All your bookings, synced with mobile wallet')}
          </p>
        </div>

        {/* Filter Tabs matching Figma Site */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={clsx(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all',
              activeTab === 'all'
                ? 'bg-[#0F172A] text-white shadow-soft'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {t('All')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={clsx(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all',
              activeTab === 'past'
                ? 'bg-[#0F172A] text-white shadow-soft'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {t('Past')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={clsx(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2',
              activeTab === 'upcoming'
                ? 'bg-[#0F172A] text-white shadow-soft'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            <span>{t('Upcoming')}</span>
            <span
              className={clsx(
                'size-5 rounded-full flex items-center justify-center text-[10px] font-black',
                activeTab === 'upcoming'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-700'
              )}
            >
              {upcomingBookings.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pending Payment Alert Banner */}
      {hasPendingBookings && activeTab !== 'past' && (
        <div className="mb-6 rounded-2xl bg-amber-50/90 border border-amber-200/80 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-100/90 text-amber-700 shrink-0">
              <CreditCard className="size-5" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                {t('Payment Pending')}
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/90 mt-0.5">
                {t('Complete payment to activate QR tickets.')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="my-16 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-md mx-auto">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
            <Ticket className="size-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">{t('No tickets yet')}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {t('Browse events and reserve your first pass.')}
          </p>
          <Button v="primary" size="md" onClick={() => go('search')} className="mt-5">
            {t('Explore Events')}
          </Button>
        </div>
      ) : (
        /* Bookings List */
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const eventInfo = events.find((e) => e.id === booking.eventId);
            const bookingTickets = tickets.filter((tkt) => tkt.bookingId === booking.id);
            const isExpanded = expandedBookings[booking.id] ?? true;
            const isPending = booking.status === 'Pending';
            const isConfirmed = booking.status === 'Confirmed';

            return (
              <div
                key={booking.id}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300"
              >
                {/* Booking Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Event Thumbnail & Meta Info */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={eventInfo?.img || MOCK_IMAGES.summit}
                      alt={booking.eventTitle}
                      className="size-16 sm:size-20 rounded-xl object-cover shrink-0 shadow-xs border border-slate-100"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h2
                        onClick={() => go('details', { id: booking.eventId })}
                        className="text-base sm:text-lg font-black text-slate-900 tracking-tight hover:text-[#2563EB] transition-colors cursor-pointer truncate"
                      >
                        {booking.eventTitle}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>{booking.eventDate}</span>
                        <span>•</span>
                        <span className="font-mono">{booking.id}</span>
                        <span>•</span>
                        <span>
                          {booking.quantity} {booking.quantity > 1 ? t('tickets') : t('ticket')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price, Status & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Total Price */}
                    <div className="text-base font-black text-slate-900">
                      {booking.total} {t('EGP')}
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          <span className="size-1.5 rounded-full bg-emerald-600" />
                          {t('Confirmed')}
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
                          <span className="size-1.5 rounded-full bg-amber-500" />
                          {t('Pending')}
                        </span>
                      )}
                      {!isConfirmed && !isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="size-1.5 rounded-full bg-slate-400" />
                          {t(booking.status)}
                        </span>
                      )}
                    </div>

                    {/* Pay Now Button (if pending) */}
                    {isPending && (
                      <button
                        type="button"
                        onClick={() => handlePayNow(booking.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <CreditCard className="size-3.5" />
                        <span>{t('Pay Now')}</span>
                      </button>
                    )}

                    {/* Expand/Collapse Accordion Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(booking.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="size-3.5" />
                          <span>{t('Hide Tickets')}</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-3.5" />
                          <span>{t('Show Tickets')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Individual Tickets Grid */}
                {isExpanded && bookingTickets.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {bookingTickets.map((tkt) => {
                        const isTicketConfirmed = tkt.status === 'Confirmed';

                        return (
                          <div
                            key={tkt.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50/90 p-3 sm:p-3.5 transition-all"
                          >
                            {/* Ticket Details */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={clsx(
                                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
                                    isTicketConfirmed
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                  )}
                                >
                                  <span
                                    className={clsx(
                                      'size-1.5 rounded-full',
                                      isTicketConfirmed ? 'bg-emerald-600' : 'bg-amber-500'
                                    )}
                                  />
                                  {isTicketConfirmed ? t('Confirmed') : t('Reserved')}
                                </span>
                              </div>
                              <div className="font-mono text-xs font-black text-slate-900 tracking-tight mt-1 truncate">
                                {tkt.qrToken || tkt.id}
                              </div>
                              <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                                {tkt.tierName}
                              </div>
                            </div>

                            {/* QR Button */}
                            {isTicketConfirmed ? (
                              <button
                                type="button"
                                onClick={() => setSelectedTicketModal(tkt)}
                                title={t('View QR Code')}
                                className="size-10 sm:size-11 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95"
                              >
                                <QrCode className="size-5" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  showToast(
                                    language === 'ar'
                                      ? 'يرجى إتمام الدفع أولاً لتفعيل رمز الـ QR'
                                      : 'Complete payment to activate QR pass',
                                    'info'
                                  )
                                }
                                title={t('Complete payment to activate QR pass')}
                                className="size-10 sm:size-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shrink-0 cursor-not-allowed"
                              >
                                <Lock className="size-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* High-Resolution QR Ticket Pass Modal */}
      {selectedTicketModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex min-h-full items-center justify-center bg-slate-900/80 backdrop-blur-md anim-page">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedTicketModal(null)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg my-auto overflow-hidden rounded-3xl border border-slate-700/50 bg-white shadow-2xl z-10 transition-all max-h-[92vh] flex flex-col">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTicketModal(null)}
              aria-label={t('Close')}
              className="absolute top-3.5 end-3.5 z-20 flex size-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white transition-all backdrop-blur-md border border-white/25 shadow-xs active:scale-90 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Top Ticket Header Banner */}
            <div className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-5 py-4 sm:px-6 text-white shrink-0">
              <div className="flex items-center justify-between pe-8">
                <span className="rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {selectedTicketModal.tierName}
                </span>
                <Badge tone={selectedTicketModal.status === 'Confirmed' ? 'green' : 'gray'}>
                  {selectedTicketModal.status === 'Confirmed' ? t('Valid') : selectedTicketModal.status}
                </Badge>
              </div>

              <h2 className="mt-2.5 text-lg sm:text-xl font-black tracking-tight leading-snug">
                {selectedTicketModal.eventTitle}
              </h2>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-700/60 pt-2.5 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold text-[11px]">{t('Date & Time')}</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedTicketModal.eventDate}</div>
                  <div className="text-slate-300 text-[11px]">{selectedTicketModal.eventTime}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold text-[11px]">{t('Venue & Location')}</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedTicketModal.venue}</div>
                  <div className="text-slate-300 text-[11px] truncate">{selectedTicketModal.city}</div>
                </div>
              </div>
            </div>

            {/* Perforated Divider with realistic dark punch-hole notches */}
            <div className="relative flex items-center bg-white py-1.5 px-3 shrink-0">
              <div className="size-5 -ms-5 rounded-full bg-[#0F172A] shadow-inner" />
              <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2" />
              <div className="size-5 -me-5 rounded-full bg-[#0F172A] shadow-inner" />
            </div>

            {/* QR Code & Gate Info */}
            <div className="p-4 sm:p-5 bg-white flex flex-col items-center text-center overflow-y-auto">
              {/* QR Code View */}
              <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-soft">
                <QRCodeView token={selectedTicketModal.qrToken} size={170} />
              </div>

              {/* Cryptographic Token */}
              <div className="mt-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Cryptographic Token ID')}
                </span>
                <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-md mt-1 inline-block">
                  {selectedTicketModal.qrToken}
                </span>
              </div>

              {/* Gate & Seat Meta */}
              <div className="mt-3 w-full grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">{t('Gate')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedTicketModal.gate}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">{t('Seat')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedTicketModal.seat}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">{t('Attendee')}</div>
                  <div className="font-bold text-slate-900 mt-0.5 truncate">
                    {selectedTicketModal.attendeeName}
                  </div>
                </div>
              </div>

              {/* Anti-Replay Security Notice */}
              <div className="mt-3 flex items-center gap-2 text-[11px] sm:text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-1.5 w-full justify-center">
                <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                <span>
                  {t('Single-scan anti-replay protection enforced by server transaction')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 w-full">
                <Button
                  v="outline"
                  size="md"
                  icon={Download}
                  onClick={handleDownloadPDF}
                  className="flex-1"
                >
                  {t('Download PDF')}
                </Button>
                <Button
                  v="outline"
                  size="md"
                  icon={CalendarPlus}
                  onClick={handleAddToCalendar}
                  className="flex-1"
                >
                  {t('Add to Calendar')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
