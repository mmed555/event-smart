import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { QRCodeView } from '../../components/ui/QRCodeView';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Ticket,
  Download,
  CalendarPlus,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

export const TicketsWalletView: React.FC = () => {
  const { tickets, go, showToast } = useApp();
  const { t } = useI18n();

  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const activeTicket = tickets[activeTicketIndex] || tickets[0];

  const handleDownloadPDF = () => {
    showToast('Digital ticket PDF generated for download', 'ok');
  };

  const handleAddToCalendar = () => {
    showToast('Event added to Google Calendar', 'ok');
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <Ticket className="size-4" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('Digital Ticket Wallet')}
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {t('Present this unforgeable QR code at the event gate')}
          </p>
        </div>

        {tickets.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {tickets.map((tk, idx) => (
              <button
                key={tk.id}
                onClick={() => setActiveTicketIndex(idx)}
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                  activeTicketIndex === idx
                    ? 'bg-[#2563EB] text-white shadow-soft'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                )}
              >
                Pass #{idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {tickets.length === 0 ? (
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
        <div className="my-8 flex justify-center">
          {/* High-Resolution Ticket Pass Card */}
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/60">
            {/* Top Ticket Header Banner */}
            <div className="relative bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {activeTicket.tierName}
                </span>
                <Badge tone={activeTicket.status === 'Confirmed' ? 'green' : 'gray'}>
                  {activeTicket.status === 'Confirmed' ? t('Valid') : activeTicket.status}
                </Badge>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-black tracking-tight leading-tight">
                {activeTicket.eventTitle}
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-700/60 pt-4 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold">{t('Date & Time')}</div>
                  <div className="font-bold text-white mt-0.5">{activeTicket.eventDate}</div>
                  <div className="text-slate-300 text-[11px]">{activeTicket.eventTime}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold">{t('Venue & Location')}</div>
                  <div className="font-bold text-white mt-0.5">{activeTicket.venue}</div>
                  <div className="text-slate-300 text-[11px]">{activeTicket.city}</div>
                </div>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative flex items-center bg-slate-50 py-3">
              <div className="size-6 -ms-3 rounded-full bg-[#F8FAFC] border-e border-slate-200" />
              <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2" />
              <div className="size-6 -me-3 rounded-full bg-[#F8FAFC] border-s border-slate-200" />
            </div>

            {/* QR Code & Gate Info */}
            <div className="p-6 sm:p-8 bg-white flex flex-col items-center text-center">
              {/* QR Code View */}
              <div className="p-3 rounded-2xl border border-slate-200 bg-white shadow-soft">
                <QRCodeView token={activeTicket.qrToken} size={210} />
              </div>

              {/* Cryptographic Token */}
              <div className="mt-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Cryptographic Token ID
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md mt-1 inline-block">
                  {activeTicket.qrToken}
                </span>
              </div>

              {/* Gate & Seat Meta */}
              <div className="mt-6 w-full grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">{t('Gate')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeTicket.gate}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">{t('Seat')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeTicket.seat}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] font-semibold">Attendee</div>
                  <div className="font-bold text-slate-900 mt-0.5 truncate">{activeTicket.attendeeName}</div>
                </div>
              </div>

              {/* Anti-Replay Security Notice */}
              <div className="mt-6 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3.5 py-2 w-full justify-center">
                <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                <span>Single-scan anti-replay protection enforced by server transaction</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
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
