import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  Image as ImageIcon,
  Edit2,
  ShieldCheck,
} from 'lucide-react';

export const VendorProfileView: React.FC = () => {
  const { vendorProfile, updateVendorProfile } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(vendorProfile.bio);
  const [bioAr, setBioAr] = useState(vendorProfile.bioAr);
  const [phone, setPhone] = useState(vendorProfile.phone);
  const [email, setEmail] = useState(vendorProfile.email);
  const [website, setWebsite] = useState(vendorProfile.website || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendorProfile({
      bio,
      bioAr,
      phone,
      email,
      website,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="size-6 text-[#2563EB]" />
            <span>{isAr ? 'الملف التعريفي للشركة وسابقة الأعمال' : 'Company Profile & Portfolio'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'الملف التعريفي العام المعروض لمنظمي الفعاليات ومعرض الأعمال السابقة (V05)'
              : 'Public vendor showcase, media portfolio, and company biography'}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 text-xs transition shadow-soft"
        >
          <Edit2 className="size-3.5" />
          <span>{isEditing ? (isAr ? 'إلغاء التعديل' : 'Cancel') : isAr ? 'تعديل البيانات' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Cover and Profile Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft">
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={vendorProfile.coverImage}
            alt="Company Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={vendorProfile.logo}
                alt={vendorProfile.name}
                className="size-24 sm:size-28 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0"
              />
              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {isAr ? vendorProfile.nameAr : vendorProfile.name}
                  </h2>
                  <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
                </div>
                <p className="text-xs text-slate-500">
                  {isAr ? vendorProfile.taglineAr : vendorProfile.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold mb-2">
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="size-4 fill-current" />
                <span className="text-slate-900 font-bold font-mono">{vendorProfile.averageRating}</span>
                <span className="text-slate-400 font-normal">({vendorProfile.totalReviews})</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-600">
                {vendorProfile.completedOrdersCount} {isAr ? 'مشروع منجز' : 'completed events'}
              </span>
            </div>
          </div>

          {/* Edit Form or Read View */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'نبذة عن الشركة (بالعربية)' : 'Bio (Arabic)'}
                  </label>
                  <textarea
                    rows={3}
                    value={bioAr}
                    onChange={(e) => setBioAr(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'نبذة عن الشركة (بالإنجليزية)' : 'Bio (English)'}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'الموقع الإلكتروني' : 'Website'}
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2563EB] text-white px-5 py-2 text-xs font-bold hover:bg-blue-700 transition"
                >
                  {isAr ? 'حفظ التعديلات' : 'Save Profile'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                {isAr ? vendorProfile.bioAr : vendorProfile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-slate-400" />
                  <span>{isAr ? vendorProfile.addressAr : vendorProfile.address}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-4 text-slate-400" />
                  <span className="font-mono">{vendorProfile.phone}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="size-4 text-slate-400" />
                  <span>{vendorProfile.email}</span>
                </span>
                {vendorProfile.website && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="size-4 text-slate-400" />
                    <span>{vendorProfile.website}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gallery of Past Work (Portfolio) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="size-5 text-[#2563EB]" />
            <span>{isAr ? 'معرض صور سابقة الأعمال والتجهيزات' : 'Past Events Showcase & Portfolio'}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vendorProfile.gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:shadow-lg"
            >
              <div className="h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {isAr ? item.titleAr : item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
