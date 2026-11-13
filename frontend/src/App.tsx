import React from 'react';
import { useApp } from './context/AppContext';
import { PrototypeBar } from './components/layout/PrototypeBar';
import { TopNav } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';

// Feature Views
import { LandingView } from './features/attendee/LandingView';
import { AuthView } from './features/attendee/AuthView';
import { AIAssistantView } from './features/attendee/AIAssistantView';
import { SearchDiscoveryView } from './features/attendee/SearchDiscoveryView';
import { EventDetailsView } from './features/attendee/EventDetailsView';
import { TicketsWalletView } from './features/attendee/TicketsWalletView';
import { DesignSystemView } from './features/system/DesignSystemView';

// Icons for toast
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export const App: React.FC = () => {
  const { screen, toast, go } = useApp();

  const isAttendeeScreen = [
    'landing',
    'ai',
    'search',
    'details',
    'tickets',
  ].includes(screen);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Prototype Navigation Bar */}
      <PrototypeBar />

      {/* Main App Navbar for Attendee flow */}
      {isAttendeeScreen && <TopNav />}

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={clsx(
            'anim-toast fixed left-1/2 top-20 z-50 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold text-white shadow-xl',
            toast.tone === 'err'
              ? 'bg-red-600'
              : toast.tone === 'info'
              ? 'bg-slate-900'
              : 'bg-emerald-600'
          )}
        >
          {toast.tone === 'err' ? (
            <AlertCircle className="size-4 shrink-0" />
          ) : toast.tone === 'info' ? (
            <Info className="size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="size-4 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 anim-page">
        {screen === 'system' && <DesignSystemView />}
        {screen === 'landing' && <LandingView />}
        {screen === 'auth' && <AuthView />}
        {screen === 'ai' && <AIAssistantView />}
        {screen === 'search' && <SearchDiscoveryView />}
        {screen === 'details' && <EventDetailsView />}
        {screen === 'tickets' && <TicketsWalletView />}

        {/* Placeholders for upcoming steps */}
        {['org', 'wizard', 'planner', 'checkin', 'market', 'quotes'].includes(screen) && (
          <div className="mx-auto max-w-xl my-24 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-soft">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
              <Sparkles className="size-6" />
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">Organizer Dashboard</h2>
            <p className="mt-2 text-xs text-slate-500">
              The Organizer module (Dashboard, Event Wizard, AI Planner, Live QR Check-in, B2B RFQ Marketplace) is scheduled for the next detailed step following the completed Attendee flow.
            </p>
            <button
              onClick={() => go('landing')}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
            >
              Back to Attendee Flow
            </button>
          </div>
        )}

        {screen === 'vendor' && (
          <div className="mx-auto max-w-xl my-24 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-soft">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Sparkles className="size-6" />
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">Vendor B2B Dashboard</h2>
            <p className="mt-2 text-xs text-slate-500">
              The Vendor module (KYC Documents, RFQ Inbox, Quotations, and Services Catalog) will be implemented in the subsequent phase.
            </p>
            <button
              onClick={() => go('landing')}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
            >
              Back to Attendee Flow
            </button>
          </div>
        )}

        {screen === 'admin' && (
          <div className="mx-auto max-w-xl my-24 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-soft">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
              <Sparkles className="size-6" />
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">Super Admin Governance</h2>
            <p className="mt-2 text-xs text-slate-500">
              The Admin Governance module (KYC Verification Queue, Event Moderation, and Analytics) is queued next.
            </p>
            <button
              onClick={() => go('landing')}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
            >
              Back to Attendee Flow
            </button>
          </div>
        )}

        {screen === 'mobile' && (
          <div className="mx-auto max-w-xl my-24 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-soft">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <Sparkles className="size-6" />
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">Mobile Companion App</h2>
            <p className="mt-2 text-xs text-slate-500">
              The Interactive Companion App with device frame preview and camera QR verification is queued next.
            </p>
            <button
              onClick={() => go('landing')}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
            >
              Back to Attendee Flow
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      {isAttendeeScreen && <Footer />}
    </div>
  );
};
