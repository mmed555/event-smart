import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { TicketTier, AgendaItem } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Send,
} from 'lucide-react';
import clsx from 'clsx';

export const CreateEventWizardView: React.FC = () => {
  const { submitEventForApproval, setActiveOrganizerTab } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Info
  const [title, setTitle] = useState<string>('قمة القاهرة للذكاء الاصطناعي والحوسبة السحابية 2026');
  const [category, setCategory] = useState<string>('Technology');
  const [description, setDescription] = useState<string>(
    'أكبر قمة تقنية متخصصة تجمع قادة الذكاء الاصطناعي والمهندسين والشركات الناشئة في الشرق الأوسط لمناقشة أحدث النماذج اللغوية والتطبيقات العملية.'
  );
  const [coverImage, setCoverImage] = useState<string>(
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  );

  // Step 2: Format & Location
  const [format, setFormat] = useState<'In-Person' | 'Online' | 'Hybrid'>('In-Person');
  const [venue, setVenue] = useState<string>('مركز القاهرة الدولي للمؤتمرات (CICC)');
  const [address, setAddress] = useState<string>('طريق النصر، مدينة نصر، محافظة القاهرة');
  const [city, setCity] = useState<string>('Cairo');

  // Step 3: Dates & Times
  const [date, setDate] = useState<string>('2026-08-15');
  const [time, setTime] = useState<string>('09:00 AM – 06:00 PM');
  const [capacity, setCapacity] = useState<number>(800);

  // Step 4: Ticket Tiers
  const [tiers, setTiers] = useState<TicketTier[]>([
    {
      id: 't-1',
      name: 'VIP Pass',
      price: 650,
      capacity: 150,
      remaining: 150,
      perks: ['مقعد أمامي محجوز', 'دخول صالة كبار الزوار (VIP Lounge)', 'بوفيه غداء فاخر', 'شهادة حضور معتمدة'],
    },
    {
      id: 't-2',
      name: 'Regular Pass',
      price: 250,
      capacity: 650,
      remaining: 650,
      perks: ['دخول كافة الجلسات العامة', 'حقيبة المؤتمر', 'استراحات القهوة'],
    },
  ]);

  // Step 5: Agenda & Speakers
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { id: 'ag-1', time: '09:00 AM', title: 'التسجيل واستقبال الحضور والقهوة الصباحية', speaker: 'فريق التنظيم' },
    { id: 'ag-2', time: '10:00 AM', title: 'الكلمة الافتتاحية: مستقبل وكلاء الذكاء الاصطناعي', speaker: 'د. كريم فاروق' },
    { id: 'ag-3', time: '11:30 AM', title: 'جلسة حوارية: البنية التحتية للحوسبة السحابية في مصر', speaker: 'نخبة من الخبراء' },
  ]);

  const handleAddTier = () => {
    setTiers((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        name: isAr ? 'فئة جديدة' : 'New Tier',
        price: 200,
        capacity: 100,
        remaining: 100,
        perks: [isAr ? 'دخول الجلسات' : 'Session entry'],
      },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAgenda = () => {
    setAgenda((prev) => [
      ...prev,
      {
        id: `ag-${Date.now()}`,
        time: '12:00 PM',
        title: isAr ? 'جلسة جديدة' : 'New Session',
        speaker: isAr ? 'متحدث رئيسي' : 'Keynote Speaker',
      },
    ]);
  };

  const handleRemoveAgenda = (index: number) => {
    setAgenda((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    submitEventForApproval({
      title,
      cat: category,
      description,
      img: coverImage,
      venue,
      address,
      city,
      date,
      time,
      capacity,
      price: tiers[0]?.price || 250,
      tiers,
      agenda,
    });

    setActiveOrganizerTab('events');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
          <Sparkles className="size-3.5" />
          <span>{isAr ? 'معالج إنشاء الفعاليات (5 خطوات)' : 'Event Creation Wizard (5 Steps)'}</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isAr ? 'إنشاء ونشر فعالية جديدة' : 'Create & Publish New Event'}
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          {isAr
            ? 'أدخل بيانات الفعالية وصيغتها وتذاكرها وبرنامجها، وسيتم إرسالها لمركز المراجعة والاعتماد مباشرة'
            : 'Fill event specifications, tickets, and program schedule to submit for central approval'}
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {[
          { num: 1, title: isAr ? 'البيانات' : 'Details' },
          { num: 2, title: isAr ? 'المكان' : 'Venue' },
          { num: 3, title: isAr ? 'المواعيد' : 'Schedule' },
          { num: 4, title: isAr ? 'التذاكر' : 'Tickets' },
          { num: 5, title: isAr ? 'المراجعة' : 'Review' },
        ].map((s) => (
          <div key={s.num} className="space-y-1.5">
            <div
              className={clsx(
                'h-2 w-full rounded-full transition-all duration-300',
                step >= s.num ? 'bg-[#2563EB]' : 'bg-slate-200'
              )}
            />
            <div
              className={clsx(
                'text-[11px] font-bold text-center',
                step >= s.num ? 'text-blue-600' : 'text-slate-400'
              )}
            >
              {s.num}. {s.title}
            </div>
          </div>
        ))}
      </div>

      {/* Step Form Container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6">
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isAr ? 'الخطوة 1: البيانات الأساسية للفعالية' : 'Step 1: Event Basic Information'}
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'عنوان الفعالية' : 'Event Title'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'التصنيف' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="Technology">Technology (تكنولوجيا)</option>
                <option value="Business">Business (أعمال واقتصاد)</option>
                <option value="Design">Design (تصميم وفنون)</option>
                <option value="Music">Music (موسيقى وحفلات)</option>
                <option value="Education">Education (تعليم وتدريب)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'وصف الفعالية' : 'Event Description'}
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'رابط صورة الغلاف' : 'Cover Image URL'}
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Preview"
                  className="mt-2 h-36 w-full rounded-xl object-cover border border-slate-100"
                />
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Format & Location */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isAr ? 'الخطوة 2: صيغة الفعالية والموقع' : 'Step 2: Event Format & Location'}
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isAr ? 'صيغة الحضور' : 'Attendance Format'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'In-Person', labelEn: 'In-Person', labelAr: 'حضوري' },
                  { id: 'Online', labelEn: 'Online', labelAr: 'عبر الإنترنت' },
                  { id: 'Hybrid', labelEn: 'Hybrid', labelAr: 'هجين (حضوري + أونلاين)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id as any)}
                    className={clsx(
                      'p-3 rounded-2xl border text-xs font-bold text-center transition',
                      format === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {isAr ? f.labelAr : f.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'اسم القاعة أو المكان' : 'Venue Name'}
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? 'المدينة' : 'City'}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="Cairo">Cairo (القاهرة)</option>
                  <option value="Giza">Giza (الجيزة)</option>
                  <option value="Alexandria">Alexandria (الإسكندرية)</option>
                  <option value="Sharm El-Sheikh">Sharm El-Sheikh (شرم الشيخ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? 'العنوان التفصيلي' : 'Street Address'}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Dates & Schedule */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isAr ? 'الخطوة 3: التواريخ ومواعيد التشغيل' : 'Step 3: Dates & Capacity'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? 'تاريخ الفعالية' : 'Event Date'}
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? 'التوقيت اليومي' : 'Daily Time Window'}
                </label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 09:00 AM – 06:00 PM"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'السعة الاستيعابية القصوى (عدد الحضور)' : 'Total Event Capacity'}
              </label>
              <input
                type="number"
                min="10"
                step="50"
                required
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Ticket Tiers */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {isAr ? 'الخطوة 4: فئات وأسعار التذاكر' : 'Step 4: Ticket Tiers & Pricing'}
              </h2>
              <button
                type="button"
                onClick={handleAddTier}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
              >
                <Plus className="size-3.5" />
                <span>{isAr ? 'إضافة فئة' : 'Add Tier'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {tiers.map((t, idx) => (
                <div key={t.id || idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Tier Name (e.g. VIP Pass)"
                      value={t.name}
                      onChange={(e) => {
                        const nextName = e.target.value;
                        setTiers((prev) =>
                          prev.map((tier, i) => (i === idx ? { ...tier, name: nextName } : tier))
                        );
                      }}
                      className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900"
                    />

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">{isAr ? 'السعر:' : 'Price:'}</span>
                        <input
                          type="number"
                          min="0"
                          value={t.price}
                          onChange={(e) => {
                            const p = Number(e.target.value);
                            setTiers((prev) =>
                              prev.map((tier, i) => (i === idx ? { ...tier, price: p } : tier))
                            );
                          }}
                          className="w-24 rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900"
                        />
                        <span className="text-xs text-slate-400">ج.م</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">{isAr ? 'السعة:' : 'Cap:'}</span>
                        <input
                          type="number"
                          min="1"
                          value={t.capacity}
                          onChange={(e) => {
                            const cap = Number(e.target.value);
                            setTiers((prev) =>
                              prev.map((tier, i) => (i === idx ? { ...tier, capacity: cap, remaining: cap } : tier))
                            );
                          }}
                          className="w-20 rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900"
                        />
                      </div>

                      {tiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTier(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Program & Review */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isAr ? 'الخطوة 5: برنامج الفعالية والمراجعة النهائية' : 'Step 5: Agenda & Submission'}
            </h2>

            {/* Agenda Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {isAr ? 'فقرات وجلسات الأجندة' : 'Agenda Sessions'}
                </label>
                <button
                  type="button"
                  onClick={handleAddAgenda}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
                >
                  <Plus className="size-3.5" />
                  <span>{isAr ? 'إضافة جلسة' : 'Add Session'}</span>
                </button>
              </div>

              {agenda.map((ag, idx) => (
                <div key={ag.id || idx} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                  <input
                    type="text"
                    value={ag.time}
                    onChange={(e) => {
                      const t = e.target.value;
                      setAgenda((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, time: t } : item))
                      );
                    }}
                    className="w-28 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono font-semibold"
                  />
                  <input
                    type="text"
                    value={ag.title}
                    onChange={(e) => {
                      const tit = e.target.value;
                      setAgenda((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, title: tit } : item))
                      );
                    }}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={ag.speaker || ''}
                    placeholder="Speaker"
                    onChange={(e) => {
                      const spk = e.target.value;
                      setAgenda((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, speaker: spk } : item))
                      );
                    }}
                    className="w-40 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium"
                  />
                  {agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAgenda(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 space-y-2 mt-4">
              <h3 className="text-xs font-bold text-blue-900">{isAr ? 'ملخص الفعالية للإرسال:' : 'Event Summary:'}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div><b>{title}</b></div>
                <div>{venue} · {city}</div>
                <div>{date} ({time})</div>
                <div>{tiers.length} {isAr ? 'فئات تذاكر' : 'Ticket Tiers'} · {capacity} {isAr ? 'مقعد' : 'Seats'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>{isAr ? 'السابق' : 'Previous'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
            >
              <span>{isAr ? 'التالي' : 'Next Step'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-emerald-700 transition"
            >
              <Send className="size-4" />
              <span>{isAr ? 'إرسال الفعالية للمراجعة والاعتماد' : 'Submit Event for Moderation'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
