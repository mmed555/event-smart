import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Modal } from '../../components/ui/Modal';
import {
  Tag,
  Plus,
  Cpu,
  Briefcase,
  Music,
  Palette,
  GraduationCap,
  Heart,
  Volume2,
  Sun,
  Monitor,
  Layers,
  ShieldCheck,
  Coffee,
} from 'lucide-react';
import clsx from 'clsx';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Briefcase,
  Music,
  Palette,
  GraduationCap,
  Heart,
  Volume2,
  Sun,
  Monitor,
  Layers,
  ShieldCheck,
  Coffee,
};

export const AD08_TaxonomyView: React.FC = () => {
  const { adminCategories, addCategory, toggleCategoryActive } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'event' | 'service'>('event');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#2563EB');
  const [iconName, setIconName] = useState('Tag');

  const categories = adminCategories.filter((c) => c.type === activeTab);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() || !nameAr.trim()) return;
    addCategory({
      name: nameEn,
      nameAr,
      type: activeTab,
      slug: slug || nameEn.toLowerCase().replace(/\s+/g, '-'),
      iconName: iconName || 'Tag',
      color,
      count: 0,
      active: true,
    });
    setNameEn('');
    setNameAr('');
    setSlug('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Tag className="size-6 text-blue-600" />
            {isAr ? 'AD08 — إدارة التصنيفات والهيكل الدلالي' : 'AD08 — Categories & Taxonomy'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'إدارة تصنيفات الفعاليات وتصنيفات خدمات شركات التنفيذ B2B والمفردات الدلالية لمحرك البحث والذكاء الاصطناعي'
              : 'Configure platform taxonomies, search tags, and domain categories for events and B2B vendor services'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
        >
          <Plus className="size-4" />
          <span>{isAr ? 'إضافة تصنيف جديد' : 'Add New Category'}</span>
        </button>
      </div>

      {/* Type Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('event')}
          className={clsx(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition',
            activeTab === 'event'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          <Tag className="size-4" />
          <span>{isAr ? 'تصنيفات الفعاليات (Event Categories)' : 'Event Categories'}</span>
          <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
            {adminCategories.filter((c) => c.type === 'event').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('service')}
          className={clsx(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition',
            activeTab === 'service'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          <Briefcase className="size-4" />
          <span>{isAr ? 'خدمات الشركات B2B (Service Categories)' : 'B2B Service Domains'}</span>
          <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
            {adminCategories.filter((c) => c.type === 'service').length}
          </span>
        </button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const IconComp = ICON_MAP[cat.iconName] || Tag;

          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    className="flex size-10 items-center justify-center rounded-xl font-bold"
                  >
                    <IconComp className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isAr ? cat.nameAr : cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">/{cat.slug}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCategoryActive(cat.id)}
                  title={cat.active ? 'Disable category' : 'Enable category'}
                  className={clsx(
                    'rounded-lg px-2 py-1 text-[10px] font-bold transition',
                    cat.active
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                >
                  {cat.active ? (isAr ? 'مفعّل' : 'Active') : (isAr ? 'معطّل' : 'Disabled')}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400">
                  {activeTab === 'event'
                    ? isAr ? 'الفعاليات المسجلة' : 'Events Linked'
                    : isAr ? 'الموردين المسجلين' : 'Vendors Linked'}
                </span>
                <span className="font-mono font-bold text-slate-900">{cat.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={isAr ? 'إضافة تصنيف جديد للمنظومة' : 'Create New Category'}
        w="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700">
              {isAr ? 'الاسم بالإنجليزية:' : 'Category Name (English):'}
            </label>
            <input
              type="text"
              required
              value={nameEn}
              onChange={(e) => {
                setNameEn(e.target.value);
                if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              placeholder="e.g. Artificial Intelligence"
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">
              {isAr ? 'الاسم بالعربية:' : 'Category Name (Arabic):'}
            </label>
            <input
              type="text"
              required
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: الذكاء الاصطناعي"
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Slug:</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. artificial-intelligence"
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700">
                {isAr ? 'اللون الدلالي:' : 'Color Accent:'}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="size-8 rounded-lg cursor-pointer border-0"
                />
                <span className="font-mono text-xs text-slate-600">{color}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                {isAr ? 'رمز الأيقونة:' : 'Icon Identifier:'}
              </label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Cpu">Cpu / Tech</option>
                <option value="Briefcase">Briefcase / Business</option>
                <option value="Music">Music / Sound</option>
                <option value="Palette">Palette / Design</option>
                <option value="Monitor">Monitor / AV</option>
                <option value="Sun">Sun / Lighting</option>
                <option value="Layers">Layers / Staging</option>
                <option value="ShieldCheck">Shield / Security</option>
                <option value="Coffee">Coffee / Catering</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              {isAr ? 'حفظ التصنيف' : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
