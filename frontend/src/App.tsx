import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { PrototypeBar } from './components/layout/PrototypeBar';
import { TopNav } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';
import { FloatingAIAssistant } from './components/layout/FloatingAIAssistant';

// Skeleton fallbacks for code-splitting suspense
import {
  LandingViewFullSkeleton,
  AdminOverviewSkeleton,
  OrganizerOverviewSkeleton,
  VendorOverviewSkeleton,
} from './components/ui/skeleton';

// Attendee Feature Views - Lazy Loaded
const LandingView = React.lazy(() =>
  import('./features/attendee/LandingView').then((m) => ({ default: m.LandingView }))
);
const AuthView = React.lazy(() =>
  import('./features/attendee/AuthView').then((m) => ({ default: m.AuthView }))
);
const AIAssistantView = React.lazy(() =>
  import('./features/attendee/AIAssistantView').then((m) => ({ default: m.AIAssistantView }))
);
const SearchDiscoveryView = React.lazy(() =>
  import('./features/attendee/SearchDiscoveryView').then((m) => ({ default: m.SearchDiscoveryView }))
);
const EventDetailsView = React.lazy(() =>
  import('./features/attendee/EventDetailsView').then((m) => ({ default: m.EventDetailsView }))
);
const SpeakerProfileView = React.lazy(() =>
  import('./features/attendee/SpeakerProfileView').then((m) => ({ default: m.SpeakerProfileView }))
);
const TicketsWalletView = React.lazy(() =>
  import('./features/attendee/TicketsWalletView').then((m) => ({ default: m.TicketsWalletView }))
);
const AttendeeProfileView = React.lazy(() =>
  import('./features/attendee/ProfileView').then((m) => ({ default: m.ProfileView }))
);

// Portal Views - Lazy Loaded
const DesignSystemView = React.lazy(() =>
  import('./features/system/DesignSystemView').then((m) => ({ default: m.DesignSystemView }))
);
const AdminLayout = React.lazy(() =>
  import('./features/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);
const VendorLayout = React.lazy(() =>
  import('./features/vendor/VendorLayout').then((m) => ({ default: m.VendorLayout }))
);
const OrganizerLayout = React.lazy(() =>
  import('./features/organizer/OrganizerLayout').then((m) => ({ default: m.OrganizerLayout }))
);

// Shared / System Feature Views (S03 - S10) - Lazy Loaded
const ForgotPasswordView = React.lazy(() =>
  import('./features/shared/ForgotPasswordView').then((m) => ({ default: m.ForgotPasswordView }))
);
const ResetPasswordView = React.lazy(() =>
  import('./features/shared/ResetPasswordView').then((m) => ({ default: m.ResetPasswordView }))
);
const EmailVerificationView = React.lazy(() =>
  import('./features/shared/EmailVerificationView').then((m) => ({ default: m.EmailVerificationView }))
);
const HelpCenterView = React.lazy(() =>
  import('./features/shared/HelpCenterView').then((m) => ({ default: m.HelpCenterView }))
);
const NotFoundView = React.lazy(() =>
  import('./features/shared/NotFoundView').then((m) => ({ default: m.NotFoundView }))
);
const ForbiddenView = React.lazy(() =>
  import('./features/shared/ForbiddenView').then((m) => ({ default: m.ForbiddenView }))
);
const ServerErrorView = React.lazy(() =>
  import('./features/shared/ServerErrorView').then((m) => ({ default: m.ServerErrorView }))
);
const TermsPrivacyView = React.lazy(() =>
  import('./features/shared/TermsPrivacyView').then((m) => ({ default: m.TermsPrivacyView }))
);

// Icons for toast
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export const App: React.FC = () => {
  const { screen, toast, go } = useApp();
  const location = useLocation();

  const isAuthScreen = [
    '/auth',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
  ].includes(location.pathname);

  const isPublicDocScreen = [
    '/help',
    '/terms',
    '/privacy',
  ].includes(location.pathname);

  const isAttendeeScreen =
    (isPublicDocScreen ||
      ['landing', 'ai', 'search', 'details', 'tickets', 'speaker', 'profile'].includes(screen)) &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/vendor') &&
    !location.pathname.startsWith('/organizer') &&
    !location.pathname.startsWith('/org') &&
    !isAuthScreen &&
    location.pathname !== '/design-system' &&
    location.pathname !== '/forbidden' &&
    location.pathname !== '/server-error' &&
    location.pathname !== '/404';

  return (
    <div
      className={clsx(
        'flex flex-col bg-[#F8FAFC]',
        isAuthScreen || screen === 'auth' ? 'h-screen overflow-hidden' : 'min-h-screen'
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

      {/* Main Content Area with React Router & Lazy Loading Suspense */}
      <main className={clsx('anim-page flex-1', isAuthScreen || screen === 'auth' ? 'min-h-0 overflow-hidden' : '')}>
        <Suspense fallback={<LandingViewFullSkeleton />}>
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

            {/* Shared / System Screens (S01 - S10) */}
            <Route path="/forgot-password" element={<ForgotPasswordView />} />
            <Route path="/reset-password" element={<ResetPasswordView />} />
            <Route path="/verify-email" element={<EmailVerificationView />} />
            <Route path="/help" element={<HelpCenterView />} />
            <Route path="/terms" element={<TermsPrivacyView />} />
            <Route path="/privacy" element={<TermsPrivacyView />} />
            <Route path="/forbidden" element={<ForbiddenView />} />
            <Route path="/server-error" element={<ServerErrorView />} />
            <Route path="/404" element={<NotFoundView />} />

            {/* Design System */}
            <Route path="/design-system" element={<DesignSystemView />} />

            {/* Super Admin Governance Routes */}
            <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
            <Route
              path="/admin/:tab"
              element={
                <Suspense fallback={<AdminOverviewSkeleton />}>
                  <AdminLayout />
                </Suspense>
              }
            />

            {/* Organizer Portal Routes (O01 - O25) */}
            <Route path="/organizer" element={<Navigate to="/organizer/overview" replace />} />
            <Route
              path="/organizer/:tab"
              element={
                <Suspense fallback={<OrganizerOverviewSkeleton />}>
                  <OrganizerLayout />
                </Suspense>
              }
            />
            <Route path="/org" element={<Navigate to="/organizer/overview" replace />} />

            {/* Vendor B2B Marketplace & Operations Routes */}
            <Route path="/vendor" element={<Navigate to="/vendor/overview" replace />} />
            <Route
              path="/vendor/:tab"
              element={
                <Suspense fallback={<VendorOverviewSkeleton />}>
                  <VendorLayout />
                </Suspense>
              }
            />

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
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      {isAttendeeScreen && <Footer />}

      {/* 3D Robot Floating AI Assistant Widget */}
      <FloatingAIAssistant />
    </div>
  );
};