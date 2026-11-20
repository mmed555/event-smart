import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Star, MessageSquare } from 'lucide-react';

export const VendorReviewsView: React.FC = () => {
  const { vendorReviews, vendorProfile, replyToVendorReview } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToVendorReview(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-4">
      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {/* Main Score */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft flex flex-col items-center justify-center text-center sm:col-span-1">
          <span className="text-4xl font-black text-slate-900 font-mono">
            {vendorProfile.averageRating}
          </span>
          <div className="flex items-center gap-1 text-amber-500 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="size-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[11px] text-slate-500">
            {isAr ? `من ${vendorProfile.totalReviews} تقييم معتمد` : `Based on ${vendorProfile.totalReviews} reviews`}
          </span>
        </div>

        {/* 4 Dimension Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAr ? 'جودة التجهيزات' : 'Service Quality'}
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block font-mono">5.0 / 5.0</span>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAr ? 'الالتزام بالمواعيد' : 'Punctuality'}
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block font-mono">4.9 / 5.0</span>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-blue-500 h-1.5 rounded-full w-[98%]" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAr ? 'التواصل والاحترافية' : 'Communication'}
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block font-mono">5.0 / 5.0</span>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-indigo-500 h-1.5 rounded-full w-full" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAr ? 'القيمة مقابل السعر' : 'Value for Money'}
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block font-mono">4.8 / 5.0</span>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-amber-500 h-1.5 rounded-full w-[96%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        {vendorReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.organizerAvatar}
                  alt={rev.organizerName}
                  className="size-11 rounded-full object-cover border border-slate-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.organizerName}</h4>
                  <span className="text-xs text-slate-500">{rev.organizerCompany}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(Math.floor(rev.rating))].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-black text-slate-900 ms-1 font-mono">
                    {rev.rating}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(rev.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Event Name Tag */}
            <div className="inline-block rounded-lg bg-slate-50 px-3 py-1 text-xs text-slate-600 font-semibold border border-slate-100">
              {isAr ? 'الفعالية:' : 'Event:'} {isAr ? rev.eventTitleAr : rev.eventTitle}
            </div>

            {/* Comment */}
            <p className="text-xs text-slate-700 leading-relaxed">
              "{isAr ? rev.commentAr || rev.comment : rev.comment}"
            </p>

            {/* Vendor Reply */}
            {rev.vendorReply ? (
              <div className="rounded-xl bg-blue-50/70 p-3.5 border border-blue-100 space-y-1 text-xs ms-4">
                <div className="flex items-center justify-between font-bold text-[#2563EB]">
                  <span>{isAr ? 'رد الشركة الرسمي:' : 'Official Company Response:'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {new Date(rev.vendorReply.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-slate-700">{rev.vendorReply.text}</p>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100">
                {replyingReviewId === rev.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isAr ? 'اكتب رد الشركة الرسمي...' : 'Write official reply to organizer...'}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setReplyingReviewId(null)}
                        className="rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="rounded-lg bg-slate-900 text-white font-bold px-3 py-1.5 text-xs hover:bg-slate-800 transition"
                      >
                        {isAr ? 'نشر الرد' : 'Post Reply'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setReplyingReviewId(rev.id);
                      setReplyText('');
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-700"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>{isAr ? 'الرد على التقييم' : 'Reply to Review'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
