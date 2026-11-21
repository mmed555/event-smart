import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { AILogisticsItem } from '../../types';
import { INITIAL_AI_LOGISTICS_ITEMS } from '../../mock/organizerData';
import { CreateRfqModal } from './modals/CreateRfqModal';
import {
  Sparkles,
  Send,
  DollarSign,
  Users,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import clsx from 'clsx';

export const AiPlannerView: React.FC = () => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [eventType, setEventType] = useState<string>('Tech Conference');
  const [attendees, setAttendees] = useState<number>(500);
  const [budget, setBudget] = useState<number>(120000);
  const [city, setCity] = useState<string>('Cairo');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [equipmentList, setEquipmentList] = useState<AILogisticsItem[]>(
    INITIAL_AI_LOGISTICS_ITEMS['Tech Conference'] || []
  );

  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      // Scale quantities based on attendees
      const base = INITIAL_AI_LOGISTICS_ITEMS['Tech Conference'] || [];
      const multiplier = Math.max(0.8, attendees / 500);
      const scaled = base.map((item) => ({
        ...item,
        suggestedQty: item.unit.includes('Pax') ? attendees : Math.max(1, Math.round(item.suggestedQty * (multiplier > 1.5 ? 1.5 : 1))),
        estimatedCostMin: Math.round(item.estimatedCostMin * multiplier),
        estimatedCostMax: Math.round(item.estimatedCostMax * multiplier),
      }));
      setEquipmentList(scaled);
      setIsGenerating(false);
    }, 600);
  };

  const handleToggleSelectItem = (id: string) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedItems = equipmentList.filter((item) => item.selected);
  const totalMinEst = selectedItems.reduce((acc, item) => acc + item.estimatedCostMin, 0);
  const totalMaxEst = selectedItems.reduce((acc, item) => acc + item.estimatedCostMax, 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-[11px] font-bold text-indigo-300">
              <Sparkles className="size-3.5 text-indigo-400" />
              <span>{isAr ? 'مخطط التجهيزات اللوجستية الذكي (O13–O14)' : 'AI Logistics & Equipment Planner'}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'التخطيط اللوجستي التلقائي للفعاليات' : 'Intelligent Event Logistics Planner'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'أدخل نوع الفعالية وعدد الحضور التقديري ليقوم الذكاء الاصطناعي بحساب احتياجاتك الدقيقة من الصوت، الإضاءة، المسارح، الشاشات، وتحويلها لطلب RFQ بضغطة زر واحدة.'
                : 'Calculate precise PA sound, stage lighting, LED screens, badging, and catering quantities tailored to your capacity, then convert to RFQ instantly.'}
            </p>
          </div>

          {selectedItems.length > 0 && (
            <button
              onClick={() => setRfqModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-600 transition shrink-0"
            >
              <Send className="size-4" />
              <span>{isAr ? `تحويل الخطة (${selectedItems.length} بنود) إلى RFQ` : `Convert to RFQ (${selectedItems.length} items)`}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. AI Input Parameters Form (O13) */}
      <form onSubmit={handleGeneratePlan} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-soft space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {isAr ? 'محددات الفعالية والمتطلبات اللوجستية' : 'Event Parameters & Budget Inputs'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'نوع الفعالية' : 'Event Type'}
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="Tech Conference">Tech Conference (مؤتمر تقني)</option>
              <option value="Workshop">Workshop (ورشة عمل تفاعلية)</option>
              <option value="Music Festival">Music Festival (مهرجان وحفل موسيقي)</option>
              <option value="Corporate Gala">Corporate Gala (حفل تكريمي وتواصل)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'عدد الحضور المتوقع' : 'Expected Attendees'}
            </label>
            <div className="relative">
              <Users className="absolute start-3 top-2.5 size-3.5 text-slate-400" />
              <input
                type="number"
                min="50"
                step="50"
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 ps-8 pe-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'الميزانية التقديرية (ج.م)' : 'Target Budget (EGP)'}
            </label>
            <div className="relative">
              <DollarSign className="absolute start-3 top-2.5 size-3.5 text-slate-400" />
              <input
                type="number"
                min="10000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 ps-8 pe-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'المدينة والمقر' : 'Location / City'}
            </label>
            <div className="relative">
              <MapPin className="absolute start-3 top-2.5 size-3.5 text-slate-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 ps-8 pe-3 py-2 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-indigo-700 transition"
            >
              <Sparkles className="size-3.5" />
              <span>{isGenerating ? (isAr ? 'جارِ التحليل...' : 'Analyzing...') : (isAr ? 'توليد الخطة' : 'Generate Plan')}</span>
            </button>
          </div>
        </div>
      </form>

      {/* 3. AI Generated Equipment Cards Grid (O14) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isAr ? 'قائمة التجهيزات المقترحة من الذكاء الاصطناعي (O14)' : 'AI-Recommended Logistics Package'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'حدد البنود التي ترغب في تضمينها في طلب الـ RFQ الموجه لسوق الموردين'
                : 'Check the line items you wish to export into your procurement RFQ tender'}
            </p>
          </div>

          {/* Budget Estimation Badge */}
          <div className="rounded-xl bg-slate-900 px-3.5 py-2 text-white text-xs font-mono flex items-center gap-2 shrink-0">
            <span className="text-slate-400">{isAr ? 'التكلفة التقديرية:' : 'Est. Total:'}</span>
            <span className="font-bold text-emerald-400">
              {totalMinEst.toLocaleString()} – {totalMaxEst.toLocaleString()} ج.م
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleSelectItem(item.id)}
              className={clsx(
                'cursor-pointer rounded-2xl border p-5 shadow-soft transition-all space-y-3',
                item.selected
                  ? 'border-blue-500 bg-white ring-1 ring-blue-500/20'
                  : 'border-slate-200 bg-slate-50/60 opacity-60'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                    {isAr ? item.categoryAr : item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? item.nameAr : item.name}
                  </h3>
                </div>

                <div
                  className={clsx(
                    'size-5 rounded-md border flex items-center justify-center transition shrink-0',
                    item.selected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 bg-white'
                  )}
                >
                  {item.selected && <CheckCircle2 className="size-3.5" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr ? item.specsAr : item.specs}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-500">
                  {isAr ? 'الكمية المقترحة:' : 'Suggested Qty:'}{' '}
                  <b className="text-slate-900 font-mono">
                    {item.suggestedQty} {isAr ? item.unitAr : item.unit}
                  </b>
                </span>

                <span className="font-mono font-bold text-emerald-600">
                  {item.estimatedCostMin.toLocaleString()} – {item.estimatedCostMax.toLocaleString()} ج.م
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Convert to RFQ Modal */}
      <CreateRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialItems={selectedItems}
        defaultCategory="Sound & Audio"
      />
    </div>
  );
};
