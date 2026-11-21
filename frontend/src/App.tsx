import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { SpeakerProfileView } from './features/attendee/SpeakerProfileView';
import { TicketsWalletView } from './features/attendee/TicketsWalletView';
import { ProfileView as AttendeeProfileView } from './features/attendee/ProfileView';
import { DesignSystemView } from './features/system/DesignSystemView';
import { AdminLayout } from './features/admin/AdminLayout';
import { VendorLayout } from './features/vendor/VendorLayout';
import { FloatingAIAssistant } from './components/layout/FloatingAIAssistant';

// Icons for toast
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export const App: React.FC = () => {
  const { screen, toast, go } = useApp();
  const location = useLocation();

  const isAttendeeScreen = [
    'landing',
    'ai',
    'search',
    'details',
    'tickets',
    'speaker',
    'profile',
  ].includes(screen) &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/vendor') &&
    location.pathname !== '/auth' &&
    location.pathname !== '/design-system';

  return (
    <div
      className={clsx(
        'flex flex-col bg-[#F8FAFC]',
        location.pathname === '/auth' || screen === 'auth' ? 'h-screen overflow-hidden' : 'min-h-screen'
      )}
    >
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

      {/* Main Content Area with React Router */}
      <main className={clsx('anim-page flex-1', location.pathname === '/auth' || screen === 'auth' ? 'min-h-0 overflow-hidden' : '')}>
        <Routes>
          {/* Attendee Screens */}
          <Route path="/" element={<LandingView />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/auth" element={<AuthView />} />
          <Route path="/ai" element={<AIAssistantView />} />
          <Route path="/search" element={<SearchDiscoveryView />} />
          <Route path="/events/:id" element={<EventDetailsView />} />
          <Route path="/details" element={<EventDetailsView />} />
          <Route path="/speaker" element={<SpeakerProfileView />} />
          <Route path="/speaker/:id" element={<SpeakerProfileView />} />
          <Route path="/tickets" element={<TicketsWalletView />} />
          <Route path="/profile" element={<AttendeeProfileView />} />

          {/* Design System */}
          <Route path="/design-system" element={<DesignSystemView />} />

          {/* Super Admin Governance Routes */}
          <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/admin/:tab" element={<AdminLayout />} />

          {/* Placeholders for upcoming modules */}
          <Route
            path="/organizer"
            element={
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
                  className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Back to Attendee Flow
                </button>
              </div>
            }
          />
          <Route path="/org" element={<Navigate to="/organizer" replace />} />

          {/* Vendor B2B Marketplace & Operations Routes */}
          <Route path="/vendor" element={<Navigate to="/vendor/overview" replace />} />
          <Route path="/vendor/:tab" element={<VendorLayout />} />

          <Route
            path="/mobile"
            element={
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
                  className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Back to Attendee Flow
                </button>
              </div>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      {isAttendeeScreen && <Footer />}

      {/* 3D Robot Floating AI Assistant Widget */}
      <FloatingAIAssistant />
    </div>
  );
};