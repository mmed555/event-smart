import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { MOCK_CATEGORIES } from '../../mock/data';
import { Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { go } = useApp();
  const { t, language } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB] text-white font-extrabold text-base">
                EQ
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Eviq <span className="text-xs font-bold text-[#4F46E5] uppercase bg-[#EEF2FF] px-2 py-0.5 rounded-full">AI Platform</span>
              </span>
            </div>
            <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
              AI-Powered Multi-Sided Event Management, Recommendation & Logistics Marketplace. Built for Egypt's growing ecosystem of attendees, organizers, and verified B2B vendors.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#4F46E5]" /> Advisory AI Engine
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-[#10B981]" /> Signed QR Anti-Replay
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              {t('Category')}
            </h4>
            <ul className="space-y-2 text-xs">
              {MOCK_CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => go('search', { cat: c.name })}
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    {language === 'ar' ? c.nameAr : c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => go('search')} className="hover:text-[#2563EB] transition-colors">
                  {t('Explore Events')}
                </button>
              </li>
              <li>
                <button onClick={() => go('ai')} className="hover:text-[#2563EB] transition-colors">
                  {t('AI Assistant')}
                </button>
              </li>
              <li>
                <button onClick={() => go('tickets')} className="hover:text-[#2563EB] transition-colors">
                  {t('My Tickets')}
                </button>
              </li>
              <li>
                <button onClick={() => go('system')} className="hover:text-[#2563EB] transition-colors">
                  {t('Design System')}
                </button>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              B2B Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => go('org')} className="hover:text-[#2563EB] transition-colors">
                  Organizer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => go('wizard')} className="hover:text-[#2563EB] transition-colors">
                  Create Event Wizard
                </button>
              </li>
              <li>
                <button onClick={() => go('vendor')} className="hover:text-[#2563EB] transition-colors">
                  Vendor Marketplace & KYC
                </button>
              </li>
              <li>
                <button onClick={() => go('admin')} className="hover:text-[#2563EB] transition-colors">
                  Platform Governance
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 Eviq (Smart Event). Designed with precision according to Figma specs.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="size-3.5 fill-red-500 text-red-500" />
            <span>for graduation project presentation.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
