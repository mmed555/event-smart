import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useI18n } from '../../../i18n';
import { AILogisticsItem } from '../../../types';
import { X, Sparkles, Plus, Trash2, Calendar, DollarSign, Send } from 'lucide-react';

interface CreateRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItems?: AILogisticsItem[];
  defaultCategory?: string;
}

export const CreateRfqModal: React.FC<CreateRfqModalProps> = ({
  isOpen,
  onClose,
  initialItems = [],
  defaultCategory = 'Sound & Audio',
}) => {
  const { events, createOrganizerRFQ } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [selectedEventId, setSelectedEventId] = useState<number>(events[0]?.id || 1);
  const [category, setCategory] = useState<string>(defaultCategory);
  const [budgetMax, setBudgetMax] = useState<number>(50000);
  const [deadline, setDeadline] = useState<string>('2026-05-01');
  const [items, setItems] = useState<Array<{ name: string; qty: number; unit: string; specs: string }>>(() => {
    if (initialItems.length > 0) {
      return initialItems.map((item) => ({
        name: isAr ? item.nameAr : item.name,
        qty: item.suggestedQty,
        unit: isAr ? item.unitAr : item.unit,
        specs: isAr ? item.specsAr : item.specs,
      }));
    }
    return [
      { name: 'Line Array PA Sound System (500 pax)', qty: 2, unit: 'Sets', specs: 'Main hall coverage, 6 wireless microphones' },
      { name: 'Sound Engineer & Console', qty: 1, unit: 'Setup', specs: '32-channel digital mixer' },
    ];
  });

  if (!isOpen) return null;

  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleAddItem = () => {
    setItems((prev) => [...prev, { name: '', qty: 1, unit: isAr ? 'وحدة' : 'Unit', specs: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: string, val: string | number) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !items[0].name.trim()) return;

    createOrganizerRFQ({
      eventId: selectedEventId,
      eventTitle: isAr && currentEvent.titleAr ? currentEvent.titleAr : currentEvent.title,
      eventDate: currentEvent.date,
      category,
      categoryAr: category === 'Sound & Audio' ? 'الصوتيات والأنظمة الصوتية' : category,
      items,
      budgetMax,
      deadline,
      invitedVendors: ['SoundWave Egypt', 'Cairo Stage Craft', 'Acoustic Pro'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'طرح طلب عرض أسعار جديد (RFQ)' : 'Create New Request for Quotation (RFQ)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'حدد مواصفات الخدمة والبنود المطلوبة ودع الذكاء الاصطناعي يطابق أفضل الموردين' : 'Specify service items and let AI match top qualified vendors'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'الفعالية المستهدفة' : 'Target Event'}
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {isAr && ev.titleAr ? ev.titleAr : ev.title} ({ev.date})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'تصنيف الخدمة' : 'Service Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="Sound & Audio">{isAr ? 'الصوتيات والأنظمة الصوتية' : 'Sound & Audio'}</option>
                <option value="Stage & Lighting">{isAr ? 'المسارح والإضاءة الاحترافية' : 'Stage & Lighting'}</option>
                <option value="Visual & LED Screens">{isAr ? 'الشاشات والعرض المرئي' : 'Visual & LED Screens'}</option>
                <option value="Photography & Live Stream">{isAr ? 'التصوير والبث المباشر' : 'Photography & Live Stream'}</option>
                <option value="Badges & Gate Registration">{isAr ? 'البطاقات ومكاتب التسجيل' : 'Badges & Gate Registration'}</option>
                <option value="Catering & Hospitality">{isAr ? 'الضيافة والبوفيه' : 'Catering & Hospitality'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'الميزانية القصوى التقديرية (ج.م)' : 'Maximum Estimated Budget (EGP)'}
              </label>
              <div className="relative">
                <DollarSign className="absolute start-3 top-3 size-4 text-slate-400" />
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 ps-9 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'الموعد النهائي لتقديم العروض' : 'Quotation Submission Deadline'}
              </label>
              <div className="relative">
                <Calendar className="absolute start-3 top-3 size-4 text-slate-400" />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 ps-9 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                {isAr ? 'بنود التجهيزات والمواصفات المطلوبة' : 'Required Equipment & Service Line Items'}
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
              >
                <Plus className="size-3.5" />
                <span>{isAr ? 'إضافة بند' : 'Add Item'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <input
                    type="text"
                    placeholder={isAr ? 'اسم البند / التجهيز' : 'Item name / equipment'}
                    value={item.name}
                    onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                    className="flex-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder={isAr ? 'الكمية' : 'Qty'}
                    value={item.qty}
                    onChange={(e) => handleUpdateItem(idx, 'qty', Number(e.target.value))}
                    className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    placeholder={isAr ? 'الوحدة' : 'Unit'}
                    value={item.unit}
                    onChange={(e) => handleUpdateItem(idx, 'unit', e.target.value)}
                    className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder={isAr ? 'المواصفات الفنية' : 'Technical specifications'}
                    value={item.specs}
                    onChange={(e) => handleUpdateItem(idx, 'specs', e.target.value)}
                    className="flex-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-700 transition"
            >
              <Send className="size-3.5" />
              <span>{isAr ? 'نشر طلب الـ RFQ وتنبيه الموردين' : 'Publish RFQ & Notify Vendors'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
