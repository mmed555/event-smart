import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { AuthCardSkeleton } from '../../components/ui/skeleton';
import { MailCheck, RefreshCw, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export const EmailVerificationView: React.FC = () => {
  const { isLoading: isSkeletonPreview, showToast } = useApp();
  const { language } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAr = language === 'ar';

  const emailParam = searchParams.get('email') || 'user@example.com';
  const purpose = searchParams.get('purpose') || 'verify';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  if (isSkeletonPreview) {
    return <AuthCardSkeleton />;
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const chars = pasted.split('');
      const newOtp = [...otp];
      chars.forEach((c, i) => {
        if (i < 6) newOtp[i] = c;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(chars.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    showToast(isAr ? 'تم إرسال رمز تحقق جديد إلى بريدك' : 'New verification code sent to your email', 'ok');
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      showToast(isAr ? 'تم التحقق من الحساب بنجاح!' : 'Verification successful!', 'ok');

      setTimeout(() => {
        if (purpose === 'reset') {
          navigate('/reset-password');
        } else {
          navigate('/auth');
        }
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs">
          <MailCheck className="size-7" />
        </div>

        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
            <Sparkles className="size-3" />
            <span>S05 · {isAr ? 'تفعيل البريد الإلكتروني' : 'Email OTP Verification'}</span>
          </span>
          <h1 className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {isAr ? 'تحقق من بريدك الإلكتروني' : 'Verify Your Email'}
          </h1>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isAr ? 'أدخل رمز التحقق المكون من 6 أرقام المرسل إلى' : 'Enter the 6-digit code sent to'}
          </p>
          <p className="mt-1 text-xs font-bold text-slate-800 font-mono" dir="ltr">
            {emailParam}
          </p>
        </div>

        {!isSuccess ? (
          <div className="mt-8 space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5" dir="ltr" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={clsx(
                    'size-11 sm:size-12 text-center text-lg font-black rounded-xl border bg-slate-50/50 text-slate-900 transition focus:bg-white focus:outline-hidden',
                    digit
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10'
                      : 'border-slate-200 focus:border-emerald-500'
                  )}
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying || otp.join('').length < 6}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-soft hover:bg-emerald-700 active:scale-[0.99] transition disabled:opacity-50"
            >
              {isVerifying ? (
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>{isAr ? 'تأكيد الرمز وتفعيل الحساب' : 'Verify & Continue'}</span>
                  {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
                </>
              )}
            </button>

            {/* Resend Timer */}
            <div className="text-center pt-2">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                >
                  <RefreshCw className="size-3.5" />
                  <span>{isAr ? 'إعادة إرسال الرمز الآن' : 'Resend Code Now'}</span>
                </button>
              ) : (
                <p className="text-xs text-slate-400">
                  {isAr ? 'إعادة الإرسال متاحة بعد' : 'Resend code available in'}{' '}
                  <span className="font-bold text-slate-600 font-mono">00:{timer < 10 ? `0${timer}` : timer}</span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 className="size-8" />
            </div>
            <p className="text-sm font-bold text-slate-900">
              {isAr ? 'تم التحقق بنجاح! جاري تحويلك...' : 'Verified Successfully! Redirecting...'}
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition"
          >
            {isAr ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
            <span>{isAr ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
