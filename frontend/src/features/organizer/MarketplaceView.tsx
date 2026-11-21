import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { CreateRfqModal } from './modals/CreateRfqModal';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Send,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);

  const vendors = [
    {
      id: 'ven-1',
      name: 'SoundWave Egypt',
      nameAr: 'ساوند ويف مصر للأنظمة الصوتية',
      category: 'Sound & Audio',
      categoryAr: 'الصوتيات والأنظمة الصوتية',
      logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviewsCount: 38,
      completedOrders: 54,
      city: 'Cairo',
      cityAr: 'القاهرة',
      verifiedKyc: true,
      aiMatchScore: 96,
      bio: 'Leading live sound production company in Egypt specializing in summits, concerts, and tech arena audio engineering with JBL & d&b systems.',
      bioAr: 'الشركة الرائدة في هندسة الصوت المباشر بمصر المتخصصة في القمم والمؤتمرات التقنية مع أحدث أنظمة JBL و d&b.',
      tags: ['Line Array', 'Digital Mixers', 'Wireless Mics', 'FOH Engineering'],
    },
    {
      id: 'ven-2',
      name: 'Cairo Stage Craft & Audio',
      nameAr: 'كايرو ستيج كرافت للمسارح والأنظمة الصوتية',
      category: 'Stage & Lighting',
      categoryAr: 'المسارح والإضاءة الاحترافية',
      logo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviewsCount: 29,
      completedOrders: 42,
      city: 'Giza',
      cityAr: 'الجيزة',
      verifiedKyc: true,
      aiMatchScore: 92,
      bio: 'Modular aluminum stages, heavy-duty trussing, automated moving head beams, and architectural ambient lighting.',
      bioAr: 'مسارح ألمنيوم معيارية، هياكل ترس ثقيلة، إضاءات بيم متحركة، وإضاءات معمارية متناسقة مع الهوية.',
      tags: ['Truss Rigs', 'Moving Heads', 'Modular Stages', 'DMX Lighting'],
    },
    {
      id: 'ven-4',
      name: 'Nile Vision LED Displays',
      nameAr: 'نايل فيجن لحلول الشاشات التفاعلية',
      category: 'Visual & LED Screens',
      categoryAr: 'الشاشات والعرض المرئي',
      logo: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
      rating: 4.95,
      reviewsCount: 52,
      completedOrders: 68,
      city: 'Cairo',
      cityAr: 'القاهرة',
      verifiedKyc: true,
      aiMatchScore: 97,
      bio: 'Ultra-high refresh rate indoor & outdoor P2.6 curveable LED video walls, Novastar 4K processors, and live camera feed broadcasting.',
      bioAr: 'شاشات ليد P2.6 منحنية فائقة الوضوح ومعدل التحديث العالي، معالجات نوفاستار 4K وبث حي مباشر.',
      tags: ['P2.6 LED Wall', '4K Processors', 'Confidence Monitors'],
    },
    {
      id: 'ven-5',
      name: 'Cairo Badge & Print Solutions',
      nameAr: 'كايرو بادج لحلول التسجيل والطباعة الفورية',
      category: 'Badges & Gate Registration',
      categoryAr: 'البطاقات ومكاتب التسجيل',
      logo: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      rating: 4.75,
      reviewsCount: 22,
      completedOrders: 31,
      city: 'Cairo',
      cityAr: 'القاهرة',
      verifiedKyc: true,
      aiMatchScore: 89,
      bio: 'On-site high speed thermal badge printers, customized branded lanyards, RFID credentials, and hostess registration desks.',
      bioAr: 'طابعات بطاقات حرارية فورية عالية السرعة، شرائط مطبوعة بهوية المؤتمر، ومكاتب استقبال وتسجيل مجهزة.',
      tags: ['Thermal Badges', 'Lanyards', 'Hostess Desks'],
    },
  ];

  const categories = [
    'All',
    'Sound & Audio',
    'Stage & Lighting',
    'Visual & LED Screens',
    'Badges & Gate Registration',
  ];

  const filteredVendors = vendors.filter((v) => {
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameAr.includes(searchQuery) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'سوق شركات التنفيذ والتجهيزات (B2B Marketplace O15)' : 'B2B Vendor & Logistics Marketplace'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'تصفح شركات التنفيذ المعتمدة والموثقة بـ KYC واطلب عروض أسعار تنافسية بضمان المنصة'
              : 'Browse verified event production vendors with KYC verification and guaranteed contract delivery'}
          </p>
        </div>

        <button
          onClick={() => {
            setRfqModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition shrink-0"
        >
          <Send className="size-4" />
          <span>{isAr ? 'طرح طلب عرض أسعار عام (RFQ)' : 'Post RFQ Tender'}</span>
        </button>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
        <div className="relative flex-1 w-full">
          <Search className="absolute start-3.5 top-3 size-4 text-slate-400" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث باسم الشركة، الخدمة، أو الوسم...' : 'Search vendors, audio, stage, LED...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 ps-10 pe-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-hidden"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? (isAr ? 'كل المجالات اللوجستية' : 'All Categories') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Vendors Cards Grid (O15 & O16) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Cover & Logo Header */}
              <div className="relative h-32 bg-slate-100">
                <img src={vendor.cover} alt={vendor.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-indigo-600/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white font-mono">
                  <Sparkles className="size-3" />
                  <span>{vendor.aiMatchScore}% Match</span>
                </span>
              </div>

              <div className="p-5 pt-0 relative space-y-3">
                <div className="flex items-end justify-between -mt-8">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="size-16 rounded-2xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                  />
                  {vendor.verifiedKyc && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      <ShieldCheck className="size-3.5 text-emerald-600" />
                      <span>KYC Verified</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {isAr ? vendor.nameAr : vendor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="size-3.5 fill-amber-400" />
                      <span>{vendor.rating}</span>
                    </span>
                    <span>({vendor.reviewsCount} {isAr ? 'تقييم' : 'reviews'})</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="size-3" />
                      <span>{isAr ? vendor.cityAr : vendor.city}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {isAr ? vendor.bioAr : vendor.bio}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {vendor.tags.map((tag, idx) => (
                    <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 font-medium">
                {vendor.completedOrders} {isAr ? 'مشروع مكتمل' : 'jobs done'}
              </span>

              <button
                onClick={() => {
                  setRfqModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                <Send className="size-3" />
                <span>{isAr ? 'طلب عرض سعر' : 'Invite to RFQ'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultCategory="Sound & Audio"
      />
    </div>
  );
};
