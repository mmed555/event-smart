import React, { useState } from 'react';
import { useI18n } from '../../../i18n';
import { X, Star, Send } from 'lucide-react';

interface VendorReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  vendorId: string;
  vendorName: string;
  onSubmit: (orderId: string, vendorId: string, rating: number, comment: string) => void;
}

export const VendorReviewModal: React.FC<VendorReviewModalProps> = ({
  isOpen,
  onClose,
  orderId,
  vendorId,
  vendorName,
  onSubmit,
}) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(orderId, vendorId, rating, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Star className="size-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'تقييم شركة التنفيذ (Dual Rating)' : 'Review Execution Vendor'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? `تقييم جودة الخدمة لشركة ${vendorName}` : `Rate service quality for ${vendorName}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 transition">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2 text-center">
            <label className="block text-xs font-bold text-slate-700">
              {isAr ? 'التقييم العام للخدمة' : 'Overall Service Rating'}
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition"
                >
                  <Star
                    className={`size-8 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'تفاصيل التجربة وملاحظات الجودة والالتزام' : 'Review Details & Execution Feedback'}
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                isAr
                  ? 'اذكر رأيك في الالتزام بالمواعيد، كفاءة المعدات، ومهنية الفريق الميداني...'
                  : 'Describe punctuality, equipment performance, team communication, and overall execution...'
              }
              className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden resize-none"
            />
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
              <span>{isAr ? 'إرسال التقييم' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
