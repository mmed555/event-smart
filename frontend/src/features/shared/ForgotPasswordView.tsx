import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AuthCardSkeleton } from '../../components/ui/skeleton';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export const ForgotPasswordView: React.FC = () => {
  const { isLoading: isSkeletonPreview, showToast } = useApp();
  const { language } = useI18n();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isSkeletonPreview) {
    return <AuthCardSkeleton />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      showToast(
        isAr ? 'تم إرسال رمز استعادة كلمة المرور بنجاح' : 'Reset code sent successfully to your email',
        'ok'
      );
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200">
        {/* Brand Icon */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] shadow-xs">
          <KeyRound className="size-7" />
        </div>

        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
            <Sparkles className="size-3" />
            <span>S03 · {isAr ? 'استعادة الحساب' : 'Account Recovery'}</span>
          </span>
          <h1 className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {isAr ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
          </h1>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isAr
              ? 'أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق من 6 أرقام لإعادة تعيين كلمة المرور فوراً.'
              : 'Enter your registered email address and we will send you a 6-digit verification code to reset your password.'}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute start-3.5 top-3.5 size-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="name@example.com"
                  className={clsx(
                    'w-full rounded-xl border bg-slate-50/50 ps-10 pe-4 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden transition',
                    error
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-blue-500'
                  )}
                  dir="ltr"
                  autoFocus
                />
              </div>
              {error && (
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-red-600 font-medium">
                  <AlertCircle className="size-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-soft hover:bg-blue-600 active:scale-[0.99] transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>{isAr ? 'إرسال رمز التحقق' : 'Send Reset Code'}</span>
                  {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-5 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                {isAr ? 'تم إرسال الرمز بنجاح!' : 'Verification Code Sent!'}
              </p>
              <p className="text-xs text-slate-500 font-mono" dir="ltr">
                {email}
              </p>
            </div>
            <button
              onClick={() => navigate(`/verify-email?email=${encodeURIComponent(email)}&purpose=reset`)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
            >
              <span>{isAr ? 'إدخال رمز التحقق الآن (S05)' : 'Enter 6-Digit Code (S05)'}</span>
              {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
            </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            {isAr ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
            <span>{isAr ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
