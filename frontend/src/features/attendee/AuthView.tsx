import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Role } from '../../types';
import { Button } from '../../components/ui/Button';
import {
  User,
  Calendar,
  Briefcase,
  Shield,
  Lock,
  Mail,
} from 'lucide-react';
import clsx from 'clsx';

export const AuthView: React.FC = () => {
  const { setRole, showToast } = useApp();
  const { t } = useI18n();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<Role>('attendee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please provide an email address', 'err');
      return;
    }
    setRole(selectedRole);
    showToast(`Signed in successfully as ${selectedRole}`, 'ok');
  };

  const quickSignInAs = (r: Role) => {
    setRole(r);
    showToast(`Signed in as demo ${r}`, 'ok');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/60">
        {/* Header Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-8">
          <button
            onClick={() => setMode('signin')}
            className={clsx(
              'flex-1 rounded-lg py-2 text-xs font-bold transition-all',
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-soft'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            {t('Sign In')}
          </button>
          <button
            onClick={() => setMode('signup')}
            className={clsx(
              'flex-1 rounded-lg py-2 text-xs font-bold transition-all',
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-soft'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            {t('Create Account')}
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {mode === 'signin' ? 'Welcome back to Eviq' : 'Join Eviq Platform'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {mode === 'signin'
              ? 'Access your tickets, manage events or offer services'
              : 'Select your role and start your event experience'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                I am registering as:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('attendee')}
                  className={clsx(
                    'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                    selectedRole === 'attendee'
                      ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB] ring-1 ring-[#2563EB]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <User className="size-4" />
                  <span className="text-[11px] font-bold">{t('Attendee')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={clsx(
                    'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                    selectedRole === 'organizer'
                      ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB] ring-1 ring-[#2563EB]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Calendar className="size-4" />
                  <span className="text-[11px] font-bold">{t('Organizer')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('vendor')}
                  className={clsx(
                    'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                    selectedRole === 'vendor'
                      ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB] ring-1 ring-[#2563EB]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Briefcase className="size-4" />
                  <span className="text-[11px] font-bold">{t('Vendor')}</span>
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmed Hassan"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}

          {mode === 'signup' && selectedRole !== 'attendee' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={selectedRole === 'organizer' ? 'e.g. TechEvents Egypt' : 'e.g. SoundWave Pro Egypt'}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="size-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full rounded-xl border border-slate-200 ps-9 pe-3.5 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to email', 'info')}
                  className="text-[11px] text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="size-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-200 ps-9 pe-3.5 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password Strength Indicator */}
            {mode === 'signup' && password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Password strength:</span>
                  <span className="font-bold text-slate-700">{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full transition-all duration-300', strength.color)}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <Button type="submit" v="primary" size="lg" className="w-full mt-2">
            {mode === 'signin' ? t('Sign In') : t('Create Account')}
          </Button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Quick Demo Role Access
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => quickSignInAs('attendee')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <User className="size-3.5 text-[#2563EB]" />
              <span>Attendee</span>
            </button>
            <button
              onClick={() => quickSignInAs('organizer')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Calendar className="size-3.5 text-indigo-600" />
              <span>Organizer</span>
            </button>
            <button
              onClick={() => quickSignInAs('vendor')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Briefcase className="size-3.5 text-emerald-600" />
              <span>Vendor</span>
            </button>
            <button
              onClick={() => quickSignInAs('admin')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Shield className="size-3.5 text-slate-800" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
