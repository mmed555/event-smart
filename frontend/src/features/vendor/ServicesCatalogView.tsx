import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorServiceItem } from '../../types';
import { AddEditServiceModal } from './AddEditServiceModal';
import {
  Layers,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import clsx from 'clsx';

export const ServicesCatalogView: React.FC = () => {
  const { vendorServices, toggleVendorServiceActive, deleteVendorService } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<VendorServiceItem | null>(null);

  const categories = ['ALL', ...Array.from(new Set(vendorServices.map((s) => s.category)))];

  const filteredServices = vendorServices.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: VendorServiceItem) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="size-6 text-[#2563EB]" />
            <span>{isAr ? 'كتالوج باقات وخدمات الشركة' : 'Services & Equipment Catalog'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'إدارة باقات التنفيذ والأسعار الاسترشادية المعروضة لمنظمي الفعاليات (V06 / V07)'
              : 'Manage your active service capabilities, pricing formulas, and equipment catalog'}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-4 py-2.5 text-xs shadow-soft transition"
        >
          <Plus className="size-4" />
          <span>{isAr ? 'إضافة باقة خدمة جديدة' : 'Add New Service'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'البحث في الخدمات والمعدات...' : 'Search services or equipment...'}
            className="w-full rounded-xl bg-slate-50 ps-9 pe-4 py-2 text-xs border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {cat === 'ALL' ? (isAr ? 'جميع الفئات' : 'All Categories') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card Top: Image + Tag & Active Toggle */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {service.imageUrl && (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="size-14 rounded-xl object-cover shrink-0 border border-slate-100 shadow-xs"
                    />
                  )}
                  <div>
                    <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB] border border-blue-100 mb-1">
                      {isAr ? service.categoryAr : service.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAr ? service.titleAr : service.title}
                    </h3>
                  </div>
                </div>

                {/* Status Toggle */}
                <button
                  onClick={() => toggleVendorServiceActive(service.id)}
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition border',
                    service.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                  )}
                >
                  {service.isActive ? (
                    <>
                      <CheckCircle2 className="size-3" />
                      <span>{isAr ? 'مفعّل' : 'Active'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3" />
                      <span>{isAr ? 'معطل' : 'Inactive'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {isAr ? service.descriptionAr : service.description}
              </p>

              {/* Features List */}
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {service.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-100"
                    >
                      ✓ {f}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{service.features.length - 3} {isAr ? 'المزيد' : 'more'}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'السعر الاسترشادي' : 'Reference Pricing'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black text-slate-900 font-mono">
                    {service.basePrice.toLocaleString()}
                  </span>
                  {service.maxPrice && (
                    <span className="text-xs font-mono text-slate-400">
                      - {service.maxPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-600">
                    {isAr ? 'ج.م' : 'EGP'} {isAr ? service.unitLabelAr : service.unitLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEditModal(service)}
                  className="rounded-lg p-2 text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 transition"
                  title={isAr ? 'تعديل الخدمة' : 'Edit Service'}
                >
                  <Edit2 className="size-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(isAr ? 'هل أنت متأكد من حذف هذه الخدمة؟' : 'Delete this service?')) {
                      deleteVendorService(service.id);
                    }
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title={isAr ? 'حذف' : 'Delete'}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
            <Layers className="size-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد خدمات مطابقة لبحثك' : 'No matching services found'}
            </h4>
            <p className="text-xs text-slate-400">
              {isAr ? 'جرب البحث بكلمات أخرى أو أضف خدمة جديدة' : 'Try adjusting your filters or add a new service'}
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <AddEditServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={editingService}
      />
    </div>
  );
};
