import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  Image as ImageIcon,
  Edit2,
  ShieldCheck,
  Award,
  Layers,
  X,
  ExternalLink,
  Check,
} from 'lucide-react';

export const VendorProfileView: React.FC = () => {
  const { vendorProfile, updateVendorProfile } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Edit Form State
  const [name, setName] = useState(vendorProfile.name);
  const [nameAr, setNameAr] = useState(vendorProfile.nameAr);
  const [tagline, setTagline] = useState(vendorProfile.tagline);
  const [taglineAr, setTaglineAr] = useState(vendorProfile.taglineAr);
  const [bio, setBio] = useState(vendorProfile.bio);
  const [bioAr, setBioAr] = useState(vendorProfile.bioAr);
  const [phone, setPhone] = useState(vendorProfile.phone);
  const [email, setEmail] = useState(vendorProfile.email);
  const [website, setWebsite] = useState(vendorProfile.website || '');
  const [address, setAddress] = useState(vendorProfile.address);
  const [addressAr, setAddressAr] = useState(vendorProfile.addressAr);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendorProfile({
      name,
      nameAr,
      tagline,
      taglineAr,
      bio,
      bioAr,
      phone,
      email,
      website,
      address,
      addressAr,
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full">
      {/* 1. Profile Header Showcase Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-soft">
        {/* Cover Banner with Subtle Gradient and Overlay Action */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={vendorProfile.coverImage}
            alt="Company Cover"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />

          {/* Edit Profile Button positioned neatly over cover */}
          <div className="absolute top-4 end-4 z-10">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-3.5 py-2 text-xs font-bold border border-white/20 transition shadow-md"
            >
              <Edit2 className="size-3.5" />
              <span>{isAr ? 'تعديل الملف العام' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Info Container (Below Cover, NO text overlap!) */}
        <div className="px-6 pb-6 pt-3 relative">
          {/* Logo & Headline Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex items-end gap-4">
              {/* Logo with high-contrast frame */}
              <div className="size-24 sm:size-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0 z-10">
                <img
                  src={vendorProfile.logo}
                  alt={vendorProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Company Title & Verification */}
              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {isAr ? vendorProfile.nameAr : vendorProfile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold border border-emerald-200">
                    <ShieldCheck className="size-3.5" />
                    <span>{isAr ? 'شركة معتمدة' : 'Verified Vendor'}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
                  {isAr ? vendorProfile.taglineAr : vendorProfile.tagline}
                </p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-3 shrink-0 mb-1">
              <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 border border-amber-200">
                <Star className="size-4 text-amber-500 fill-current" />
                <span className="text-xs font-black text-slate-900 font-mono">
                  {vendorProfile.averageRating}
                </span>
                <span className="text-[11px] text-slate-400">({vendorProfile.totalReviews})</span>
              </div>

              <div className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 border border-blue-200">
                <Award className="size-4 text-[#2563EB]" />
                <span className="text-xs font-bold text-[#2563EB]">
                  {vendorProfile.completedOrdersCount} {isAr ? 'مشروع منجز' : 'Delivered'}
                </span>
              </div>
            </div>
          </div>

          {/* Categories Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-4 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 me-1">
              {isAr ? 'مجالات التخصص:' : 'Specialties:'}
            </span>
            {(isAr ? vendorProfile.categoriesAr : vendorProfile.categories).map((cat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-semibold"
              >
                <Layers className="size-3 text-[#2563EB]" />
                <span>{cat}</span>
              </span>
            ))}
          </div>

          {/* Company Bio */}
          <div className="pt-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'عن الشركة والخبرات المتراكمة' : 'About SoundWave Pro'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              {isAr ? vendorProfile.bioAr : vendorProfile.bio}
            </p>
          </div>

          {/* Contact Details Grid (with clean LTR for phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-5 mt-4 border-t border-slate-100 text-xs">
            {/* Location */}
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="size-3.5 text-slate-500" />
                <span>{isAr ? 'المقر الرئيسي:' : 'Headquarters:'}</span>
              </span>
              <p className="font-semibold text-slate-800 line-clamp-1">
                {isAr ? vendorProfile.addressAr : vendorProfile.address}
              </p>
            </div>

            {/* Phone Number (Explicit dir="ltr" to prevent Arabic bidi flip) */}
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Phone className="size-3.5 text-slate-500" />
                <span>{isAr ? 'الهاتف التجاري:' : 'Commercial Phone:'}</span>
              </span>
              <p className="font-mono font-bold text-slate-800" dir="ltr">
                {vendorProfile.phone}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Mail className="size-3.5 text-slate-500" />
                <span>{isAr ? 'البريد الإلكتروني:' : 'Official Email:'}</span>
              </span>
              <p className="font-semibold text-slate-800 truncate">
                {vendorProfile.email}
              </p>
            </div>

            {/* Website */}
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Globe className="size-3.5 text-slate-500" />
                <span>{isAr ? 'الموقع الإلكتروني:' : 'Website:'}</span>
              </span>
              <a
                href={vendorProfile.website}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#2563EB] hover:underline flex items-center gap-1 truncate"
              >
                <span>{vendorProfile.website ? vendorProfile.website.replace('https://', '') : '—'}</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Media Portfolio / Gallery (معرض سابقة الأعمال) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="size-5 text-[#2563EB]" />
              <span>{isAr ? 'معرض صور سابقة الأعمال والتجهيزات' : 'Past Events Showcase & Portfolio'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'نماذج من الفعاليات والمؤتمرات الكبرى التي قامت الشركة بتجهيزها بنجاح'
                : 'Selected turnkey production highlights delivered for major expos and festivals'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vendorProfile.gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.imageUrl)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:shadow-xl hover:border-blue-300"
            >
              <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-bold">
                    {isAr ? 'معاينة الصورة المكبرة ↗' : 'View Full Image ↗'}
                  </span>
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
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

      {/* Lightbox Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 end-3 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 transition z-10"
            >
              <X className="size-5" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isAr ? 'تعديل الملف العام للشركة' : 'Edit Company Public Profile'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr ? 'تحديث النبذة، الشعار، وأرقام الاتصال المعروضة للمنظمين' : 'Update public credentials, bio, and contact channels'}
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'الشعار التسويقي (Tagline)' : 'Tagline'}
                </label>
                <input
                  type="text"
                  value={isAr ? taglineAr : tagline}
                  onChange={(e) => {
                    setTaglineAr(e.target.value);
                    setTagline(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'النبذة التعريفية (عربي)' : 'Bio (Arabic)'} *
                  </label>
                  <textarea
                    rows={3}
                    value={bioAr}
                    onChange={(e) => setBioAr(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'النبذة التعريفية (إنجليزي)' : 'Bio (English)'}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'الهاتف التجاري' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
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
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'العنوان / المقر (عربي)' : 'Address (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={addressAr}
                    onChange={(e) => setAddressAr(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'العنوان / المقر (إنجليزي)' : 'Address (English)'}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-5 py-2 text-xs transition shadow-soft flex items-center gap-1.5"
                >
                  <Check className="size-4" />
                  <span>{isAr ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
