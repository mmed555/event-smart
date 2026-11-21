import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Star, MessageSquare } from 'lucide-react';

export const OrganizerReviewsView: React.FC = () => {
  const { vendorReviews } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          {isAr ? 'تقييمات شركات التنفيذ (Dual Ratings O24)' : 'Vendor Reviews & Performance Ratings'}
        </h1>
        <p className="text-xs text-slate-500">
          {isAr
            ? 'سجل التقييمات المتبادلة لشركات التنفيذ والموردين المتعاقد معهم بعد اكتمال الفعاليات'
            : 'Track service quality, punctuality, and post-event vendor satisfaction feedback'}
        </p>
      </div>

      <div className="space-y-4">
        {vendorReviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Star className="mx-auto size-10 text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد تقييمات منشورة حتى الآن' : 'No submitted vendor reviews yet'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'ستتمكن من تقييم الشركات فور استلام التجهيزات في أوامر التنفيذ' : 'Reviews can be submitted upon confirming service order milestones'}
            </p>
          </div>
        ) : (
          vendorReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-soft space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {rev.eventTitle}
                  </h3>
                  <p className="text-xs text-slate-500">{isAr ? 'المنظم:' : 'Organizer:'} {rev.organizerName}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`size-4 ${
                          s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{rev.rating} / 5</span>
                  <span className="text-xs text-slate-400 font-mono">({rev.date})</span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                "{rev.comment}"
              </div>

              {rev.vendorReply && (
                <div className="ms-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
                    <MessageSquare className="size-3.5" />
                    <span>{isAr ? 'رد شركة التنفيذ:' : 'Vendor Response:'}</span>
                  </div>
                  <p>{rev.vendorReply.text}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
