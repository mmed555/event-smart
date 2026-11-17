import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Share2,
  Copy,
  Check,
  Compass,
  Building2,
  Car,
} from 'lucide-react';

interface VenueMapModalProps {
  open: boolean;
  onClose: () => void;
  venueName: string;
  address?: string;
  city: string;
  coordinates?: { lat: number; lng: number };
}

export const VenueMapModal: React.FC<VenueMapModalProps> = ({
  open,
  onClose,
  venueName,
  address,
  city,
  coordinates,
}) => {
  const { t, language } = useI18n();
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const fullAddress = address ? `${address}, ${city}` : `${venueName}, ${city}`;
  const queryParam = coordinates
    ? `${coordinates.lat},${coordinates.lng}`
    : encodeURIComponent(fullAddress);

  // Embedded map url
  const mapEmbedUrl = `https://maps.google.com/maps?q=${coordinates ? `${coordinates.lat},${coordinates.lng}` : encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // External GPS URLs
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${queryParam}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${queryParam}`;
  const wazeUrl = `https://waze.com/ul?q=${queryParam}`;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(fullAddress);
    setCopied(true);
    showToast(language === 'ar' ? 'تم نسخ العنوان بنجاح' : 'Address copied to clipboard', 'ok');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venueName,
          text: `${venueName} - ${fullAddress}`,
          url: googleMapsUrl,
        });
        showToast(language === 'ar' ? 'تمت المشاركة' : 'Shared successfully', 'ok');
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard?.writeText(googleMapsUrl);
      showToast(language === 'ar' ? 'تم نسخ رابط الموقع للمشاركة' : 'Location link copied to clipboard', 'ok');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={venueName}
      sub={`${city} · ${language === 'ar' ? 'الموقع وخريطة الوصول' : 'Location & Access Map'}`}
      w="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Interactive Map Frame */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
          <iframe
            title={venueName}
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Compass className="size-3.5 text-[#2563EB] animate-spin-slow" />
            <span>{language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}</span>
          </div>
        </div>

        {/* Venue Information Details */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'ar' ? 'العنوان التفصيلي' : 'Detailed Address'}
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {fullAddress}
              </div>
              {coordinates && (
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  GPS: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                title={language === 'ar' ? 'نسخ العنوان' : 'Copy Address'}
              >
                {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-slate-500" />}
                <span className="hidden sm:inline">{copied ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                title={language === 'ar' ? 'مشاركة الموقع' : 'Share Location'}
              >
                <Share2 className="size-3.5 text-slate-500" />
                <span className="hidden sm:inline">{language === 'ar' ? 'مشاركة' : 'Share'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Car className="size-3.5 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'تتوفر مواقف سيارات مخصصة للزوار' : 'Dedicated visitor parking available'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-blue-600 shrink-0" />
              <span>{language === 'ar' ? 'بالقرب من محطات المواصلات العامة' : 'Near public transit stations'}</span>
            </div>
          </div>
        </div>

        {/* GPS Routing Apps Row */}
        <div>
          <div className="text-xs font-bold text-slate-700 mb-2">
            {language === 'ar' ? 'فتح عبر تطبيقات الملاحة (GPS)' : 'Open in GPS Navigation Apps'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 hover:border-[#2563EB] hover:bg-blue-50/50 hover:text-[#2563EB] transition-all shadow-xs"
            >
              <Navigation className="size-3.5 text-[#2563EB]" />
              <span>Google Maps</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 hover:border-cyan-500 hover:bg-cyan-50/50 hover:text-cyan-700 transition-all shadow-xs"
            >
              <Navigation className="size-3.5 text-cyan-600" />
              <span>Waze</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 hover:border-slate-400 hover:bg-slate-100 transition-all shadow-xs"
            >
              <Navigation className="size-3.5 text-slate-600" />
              <span>Apple Maps</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <Button v="ghost" size="md" onClick={onClose}>
            {t('Close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
