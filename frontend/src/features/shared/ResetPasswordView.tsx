import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AuthCardSkeleton } from '../../components/ui/skeleton';
import { Lock, Eye, EyeOff, Check, X, ShieldCheck, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export const ResetPasswordView: React.FC = () => {
  const { isLoading: isSkeletonPreview, showToast } = useApp();
  const { language } = useI18n();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isSkeletonPreview) {
    return <AuthCardSkeleton />;
  }

  // Criteria validation
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteriaCount = [hasMinLen, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthTier =
    criteriaCount <= 2 ? 'weak' : criteriaCount <= 4 ? 'medium' : 'strong';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (criteriaCount < 4) {
      setError(isAr ? 'يرجى استيفاء شروط قوة كلمة المرور' : 'Password does not meet required strength');
      return;
    }

    if (password !== confirmPassword) {
      setError(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(
        isAr ? 'تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول' : 'Password reset successfully! You can now sign in',
        'ok'
      );
      navigate('/auth');
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5] shadow-xs">
          <ShieldCheck className="size-7" />
        </div>

        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-[#4F46E5]">
            <Sparkles className="size-3" />
            <span>S04 · {isAr ? 'تأمين الحساب' : 'Security Reset'}</span>
          </span>
          <h1 className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {isAr ? 'تعيين كلمة المرور الجديدة' : 'Set New Password'}
          </h1>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isAr
              ? 'اختر كلمة مرور قوية وفريدة لحماية بيانات فعالياتك وتذاكرك.'
              : 'Choose a strong and unique password to protect your events and tickets data.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
            </label>
            <div className="relative">
              <Lock className="absolute start-3.5 top-3.5 size-4 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 ps-10 pe-10 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute end-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Strength Meter Bar */}
          {password.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{isAr ? 'قوة كلمة المرور:' : 'Password strength:'}</span>
                <span
                  className={clsx(
                    'font-bold',
                    strengthTier === 'weak' && 'text-red-500',
                    strengthTier === 'medium' && 'text-amber-500',
                    strengthTier === 'strong' && 'text-emerald-500'
                  )}
                >
                  {strengthTier === 'weak' && (isAr ? 'ضعيفة' : 'Weak')}
                  {strengthTier === 'medium' && (isAr ? 'متوسطة' : 'Medium')}
                  {strengthTier === 'strong' && (isAr ? 'قوية وممتازة' : 'Strong')}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden flex gap-1">
                <div
                  className={clsx(
                    'h-full rounded-full transition-all duration-300',
                    strengthTier === 'weak' && 'w-1/3 bg-red-500',
                    strengthTier === 'medium' && 'w-2/3 bg-amber-500',
                    strengthTier === 'strong' && 'w-full bg-emerald-500'
                  )}
                />
              </div>
            </div>
          )}

          {/* Criteria Checklist */}
          <div className="rounded-2xl bg-slate-50 p-3 space-y-1.5 text-[11px] border border-slate-100">
            {[
              { label: isAr ? '8 أحرف على الأقل' : 'At least 8 characters', met: hasMinLen },
              { label: isAr ? 'أحرف كبيرة وصغيرة (A-z)' : 'Upper & lowercase letters', met: hasUpper && hasLower },
              { label: isAr ? 'أرقام (0-9)' : 'Numbers (0-9)', met: hasNumber },
              { label: isAr ? 'رموز خاصة (!@#$%^&*)' : 'Special character (!@#$%^&*)', met: hasSpecial },
            ].map((crit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {crit.met ? (
                  <Check className="size-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <X className="size-3.5 text-slate-300 shrink-0" />
                )}
                <span className={clsx('transition', crit.met ? 'font-bold text-slate-700' : 'text-slate-400')}>
                  {crit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </label>
            <div className="relative">
              <Lock className="absolute start-3.5 top-3.5 size-4 text-slate-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 ps-10 pe-10 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute end-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">
                {isAr ? 'كلمة المرور غير متطابقة' : 'Passwords do not match'}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-2.5 text-[11px] text-red-700 font-semibold border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || criteriaCount < 4 || password !== confirmPassword}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-soft hover:bg-indigo-700 active:scale-[0.99] transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>{isAr ? 'حفظ وتحديث كلمة المرور' : 'Save & Update Password'}</span>
                {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
          >
            {isAr ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
            <span>{isAr ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
