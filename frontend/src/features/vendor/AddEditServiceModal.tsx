import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorServiceItem, PricingModel } from '../../types';
import { X, Plus, Check, Image as ImageIcon, UploadCloud } from 'lucide-react';

interface AddEditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: VendorServiceItem | null;
}

const AVAILABLE_CATEGORIES = [
  { en: 'Sound & Acoustics', ar: 'هندسة الصوتيات' },
  { en: 'Stage Lighting', ar: 'الإضاءة المسرحية' },
  { en: 'LED Screens', ar: 'شاشات العرض LED' },
  { en: 'Stage Construction', ar: 'بناء وتجهيز المسارح' },
  { en: 'Live Video Production', ar: 'البث المباشر والتصوير' },
  { en: 'Event Security', ar: 'الأمن وتنظيم الحشود' },
  { en: 'Hospitality & Catering', ar: 'الضيافة والإعاشة' },
];

export const PRESET_SERVICE_IMAGES = [
  {
    id: 'sound_line_array',
    titleEn: 'Concert Line-Array Audio Rig',
    titleAr: 'منظومة صوتية احترافية للمسارح (Line Array)',
    category: 'Sound & Acoustics',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'stage_lighting',
    titleEn: 'Intelligent Beam & Wash Lighting',
    titleAr: 'إضاءة مسرحية ذكية ومتحركة (Beam & Wash)',
    category: 'Stage Lighting',
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'led_screens',
    titleEn: 'UHD 4K LED Screen Wall (P2.6)',
    titleAr: 'شاشات عرض LED داخلية فائقة الدقة (P2.6 UHD)',
    category: 'LED Screens',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'stage_construction',
    titleEn: 'Aluminum Modular Stage & Truss Structure',
    titleAr: 'بناء وتجهيز مسارح وهياكل ترَس ألومنيوم',
    category: 'Stage Construction',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'live_production',
    titleEn: 'Multi-Camera Live Video Broadcast',
    titleAr: 'بث مباشر وتصوير تلفزيوني متعدد الكاميرات',
    category: 'Live Video Production',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'sound_dj',
    titleEn: 'DJ Console & Modern Audio Equipment',
    titleAr: 'وحدة دي جي وهندسة صوت احتفالية',
    category: 'Sound & Acoustics',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'event_security',
    titleEn: 'Crowd Control Barriers & Security Gates',
    titleAr: 'بوابات وحواجز أمنية وتنظيم الحشود',
    category: 'Event Security',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'hospitality',
    titleEn: 'VIP Hospitality & Banquet Catering',
    titleAr: 'بوفيه وضيافة كبار الزوار والفنادق',
    category: 'Hospitality & Catering',
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80',
  },
];

export const AddEditServiceModal: React.FC<AddEditServiceModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const { addVendorService, updateVendorService } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const isEditing = Boolean(service);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState(AVAILABLE_CATEGORIES[0].en);
  const [categoryAr, setCategoryAr] = useState(AVAILABLE_CATEGORIES[0].ar);
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [pricingModel, setPricingModel] = useState<PricingModel>('daily');
  const [basePrice, setBasePrice] = useState<number>(10000);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [unitLabel, setUnitLabel] = useState('per day');
  const [unitLabelAr, setUnitLabelAr] = useState('لكل يوم فعاليات');
  const [turnaroundDays, setTurnaroundDays] = useState<number>(2);
  const [imageUrl, setImageUrl] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setTitleAr(service.titleAr);
      setCategory(service.category);
      setCategoryAr(service.categoryAr);
      setDescription(service.description);
      setDescriptionAr(service.descriptionAr);
      setPricingModel(service.pricingModel);
      setBasePrice(service.basePrice);
      setMaxPrice(service.maxPrice || service.basePrice * 1.5);
      setUnitLabel(service.unitLabel || 'per day');
      setUnitLabelAr(service.unitLabelAr || 'لكل يوم فعاليات');
      setTurnaroundDays(service.turnaroundDays);
      setImageUrl(service.imageUrl || '');
      setFeatures(service.features || []);
    } else {
      setTitle('');
      setTitleAr('');
      setCategory(AVAILABLE_CATEGORIES[0].en);
      setCategoryAr(AVAILABLE_CATEGORIES[0].ar);
      setDescription('');
      setDescriptionAr('');
      setPricingModel('daily');
      setBasePrice(15000);
      setMaxPrice(30000);
      setUnitLabel('per day');
      setUnitLabelAr('لكل يوم فعاليات');
      setTurnaroundDays(2);
      setImageUrl('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80');
      setFeatures(['High Performance Rig', 'Dedicated Onsite Technician', 'Certified Safety Inspection']);
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures((prev) => [...prev, newFeature.trim()]);
    setNewFeature('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCategoryChange = (catEn: string) => {
    setCategory(catEn);
    const found = AVAILABLE_CATEGORIES.find((c) => c.en === catEn);
    if (found) setCategoryAr(found.ar);

    // Auto-select the matching preset image when category changes if creating or using a preset
    const matchingPreset = PRESET_SERVICE_IMAGES.find((p) => p.category === catEn);
    if (matchingPreset && (!service || PRESET_SERVICE_IMAGES.some((p) => p.url === imageUrl))) {
      setImageUrl(matchingPreset.url);
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && service) {
      updateVendorService(service.id, {
        title,
        titleAr: titleAr || title,
        category,
        categoryAr,
        description,
        descriptionAr: descriptionAr || description,
        pricingModel,
        basePrice,
        maxPrice,
        unitLabel,
        unitLabelAr,
        turnaroundDays,
        imageUrl,
        features,
        featuresAr: features,
      });
    } else {
      addVendorService({
        title,
        titleAr: titleAr || title,
        category,
        categoryAr,
        description,
        descriptionAr: descriptionAr || description,
        pricingModel,
        basePrice,
        maxPrice,
        unitLabel,
        unitLabelAr,
        turnaroundDays,
        isActive: true,
        imageUrl,
        features,
        featuresAr: features,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing
                ? isAr
                  ? 'تعديل بيانات الخدمة'
                  : 'Edit Service Package'
                : isAr
                ? 'إضافة خدمة جديدة للكتالوج'
                : 'Add New Service Package'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'تظهر هذه الخدمة في سوق الخدمات المتاحة للمنظمين (V06 / V07)'
                : 'This service will be visible to organizers in the B2B marketplace'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Titles EN / AR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'اسم الخدمة (بالعربية)' : 'Service Title (Arabic)'} *
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: منظومة صوت لاين أراي معلقة"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'اسم الخدمة (بالإنجليزية)' : 'Service Title (English)'} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Line-Array Concert Sound Rig"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Category & Pricing Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'تصنيف الخدمة' : 'Service Category'} *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              >
                {AVAILABLE_CATEGORIES.map((c) => (
                  <option key={c.en} value={c.en}>
                    {isAr ? c.ar : c.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'نموذج التسعير' : 'Pricing Model'} *
              </label>
              <select
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              >
                <option value="daily">{isAr ? 'سعر يومي (Daily Rate)' : 'Daily Rate'}</option>
                <option value="fixed">{isAr ? 'سعر ثابت للفعالية (Fixed Event Rate)' : 'Fixed Event Rate'}</option>
                <option value="per_unit">{isAr ? 'سعر للمتر المربع / الوحدة (Per Unit / SQM)' : 'Per Unit / SQM'}</option>
                <option value="hourly">{isAr ? 'سعر بالساعة (Hourly)' : 'Hourly Rate'}</option>
                <option value="custom">{isAr ? 'حسب متطلبات العرض (Custom Quote)' : 'Custom Quote'}</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'السعر الأدنى (ج.م)' : 'Base Price (EGP)'} *
              </label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'السعر الأعلى التقديري' : 'Max Price (EGP)'}
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'مدة التجهيز (أيام)' : 'Turnaround (Days)'}
              </label>
              <input
                type="number"
                value={turnaroundDays}
                onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                min={1}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isAr ? 'وصف تفصيلي للخدمة والمعدات' : 'Detailed Equipment & Service Description'} *
            </label>
            <textarea
              required
              rows={3}
              value={descriptionAr || description}
              onChange={(e) => {
                setDescriptionAr(e.target.value);
                setDescription(e.target.value);
              }}
              placeholder={
                isAr
                  ? 'اكتب مواصفات المعدات، الماركات، وطاقة التشغيل...'
                  : 'Write specifications, equipment models, and power capacity...'
              }
              className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#2563EB] focus:outline-hidden"
            />
          </div>

          {/* Features / Inclusions List */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isAr ? 'البنود المشمولة في الباقة (Features / Inclusions)' : 'Features & Inclusions'}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder={isAr ? 'أضف ميزة (مثل: طاقم فني متفرغ)...' : 'Add feature (e.g. Dedicated technician)...'}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs focus:border-[#2563EB] focus:outline-hidden"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="rounded-xl bg-slate-900 text-white px-3 py-1.5 text-xs font-bold hover:bg-slate-800 transition"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 font-medium"
                >
                  <Check className="size-3 text-emerald-600" />
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-400 hover:text-red-500 ms-1"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Service Image Selection Field */}
          <div className="space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="size-4 text-[#2563EB]" />
                <span>{isAr ? 'صورة توضيحية للخدمة (اختر من القائمة)' : 'Service Image (Select from list)'} *</span>
              </label>

              {/* Upload from device shortcut */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs hover:bg-blue-50/50 transition">
                <UploadCloud className="size-3.5" />
                <span>{isAr ? 'رفع صورة من الجهاز' : 'Upload from Device'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Select Dropdown for Images */}
            <div>
              <select
                value={PRESET_SERVICE_IMAGES.some((p) => p.url === imageUrl) ? imageUrl : 'custom'}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== 'custom') {
                    setImageUrl(val);
                  }
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#2563EB] focus:outline-hidden shadow-2xs"
              >
                <optgroup label={isAr ? 'معرض صور الفعاليات الجاهزة (صور شائعة)' : 'Curated Preset Gallery'}>
                  {PRESET_SERVICE_IMAGES.map((preset) => (
                    <option key={preset.id} value={preset.url}>
                      {isAr ? preset.titleAr : preset.titleEn}
                    </option>
                  ))}
                </optgroup>
                <option value="custom">
                  {isAr ? '⚙️ رابط صورة مخصص أو تم رفعه من جهازك...' : '⚙️ Custom Image URL / Uploaded File...'}
                </option>
              </select>
            </div>

            {/* If custom is selected or if imageUrl is not in preset, display custom URL input */}
            {(!PRESET_SERVICE_IMAGES.some((p) => p.url === imageUrl) || !imageUrl) && (
              <div className="pt-1">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={isAr ? 'أدخل رابط الصورة (https://...)' : 'Enter custom image URL (https://...)'}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
                />
              </div>
            )}

            {/* Live Visual Preview Card */}
            {imageUrl && (
              <div className="flex items-center gap-3 pt-1 bg-white p-2.5 rounded-xl border border-slate-200/70">
                <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden border border-slate-200 shadow-2xs shrink-0 bg-slate-900">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_SERVICE_IMAGES[0].url;
                    }}
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold border border-emerald-200">
                    <Check className="size-3" />
                    <span>{isAr ? 'تم تحديد الصورة' : 'Image Selected'}</span>
                  </span>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {PRESET_SERVICE_IMAGES.find((p) => p.url === imageUrl)
                      ? isAr
                        ? PRESET_SERVICE_IMAGES.find((p) => p.url === imageUrl)?.titleAr
                        : PRESET_SERVICE_IMAGES.find((p) => p.url === imageUrl)?.titleEn
                      : isAr
                      ? 'صورة مخصصة مرفوعة من الجهاز'
                      : 'Custom Uploaded Image'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2 text-xs font-bold transition shadow-soft"
            >
              {isEditing
                ? isAr
                  ? 'حفظ التغييرات'
                  : 'Save Changes'
                : isAr
                ? 'إضافة الخدمة للكتالوج'
                : 'Publish Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
