import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, RotateCcw } from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  const { resetDemoData } = useApp();

  const brandColors = [
    { name: 'Royal Blue', hex: '#2563EB', role: 'Primary brand & action' },
    { name: 'AI Indigo', hex: '#4F46E5', role: 'AI surfaces & intelligence' },
    { name: 'Canvas', hex: '#F8FAFC', role: 'Page background' },
    { name: 'Surface', hex: '#FFFFFF', role: 'Cards & modals' },
    { name: 'Sidebar', hex: '#0F172A', role: 'Dark navigation' },
    { name: 'Header', hex: '#1E293B', role: 'Dark active states' },
    { name: 'Text Primary', hex: '#0F172A', role: 'High contrast text' },
    { name: 'Text Secondary', hex: '#475569', role: 'Muted descriptions' },
    { name: 'Text Muted', hex: '#94A3B8', role: 'Placeholders & borders' },
  ];

  const statusColors = [
    { name: 'Success', hex: '#10B981', bg: '#DCFCE7' },
    { name: 'Pending', hex: '#F59E0B', bg: '#FEF3C7' },
    { name: 'Error / Danger', hex: '#EF4444', bg: '#FEE2E2' },
    { name: 'AI Match', hex: '#4F46E5', bg: '#EEF2FF' },
  ];

  const stateMachines = [
    {
      entity: 'Event Lifecycle',
      states: ['Draft', 'PendingApproval', 'Approved', 'Rejected', 'Published', 'Active', 'Completed', 'Cancelled'],
    },
    {
      entity: 'Booking Lifecycle',
      states: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    },
    {
      entity: 'Ticket QR Verification',
      states: ['Reserved', 'Confirmed', 'Used', 'Cancelled'],
    },
    {
      entity: 'Vendor KYC Verification',
      states: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
    },
    {
      entity: 'B2B RFQ & Quotation',
      states: ['OPEN', 'QUOTED', 'PENDING', 'ACCEPTED', 'REJECTED', 'DECLINED', 'FULFILLED'],
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8">
      {/* Title */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563EB]">
          Foundations · v1.0
        </div>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">
          Eviq Design System
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Clean enterprise SaaS language — generous whitespace, calm neutrals, Royal Blue for action, and Indigo reserved exclusively for AI.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-soft">
          <Sparkles className="size-3.5 text-[#4F46E5]" />
          <span>Designed by <strong className="text-slate-900 font-bold">Karim Abbas</strong></span>
        </div>
      </div>

      {/* Colors Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Color Palette Tokens</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-9">
          {brandColors.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
              <div
                className="h-16 rounded-xl ring-1 ring-inset ring-slate-200"
                style={{ backgroundColor: c.hex }}
              />
              <div className="mt-2.5 text-xs font-bold text-slate-900 truncate">{c.name}</div>
              <div className="font-mono text-[10px] text-slate-500">{c.hex}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{c.role}</div>
            </div>
          ))}
        </div>

        {/* Status colors */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statusColors.map((st) => (
            <div
              key={st.name}
              className="flex items-center gap-3 rounded-2xl p-4 border border-slate-200"
              style={{ backgroundColor: st.bg }}
            >
              <span className="size-8 rounded-xl shrink-0" style={{ backgroundColor: st.hex }} />
              <div>
                <div className="text-sm font-bold" style={{ color: st.hex }}>
                  {st.name}
                </div>
                <div className="font-mono text-[11px] text-slate-600">
                  {st.hex} on {st.bg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Typography & Hierarchies</h2>
        <div className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Plus Jakarta Sans & IBM Plex Sans Arabic — UI & Headings
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-slate-900">
              Display 48 — Large Hero
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              Heading 30 — Page Titles
            </div>
            <div className="text-lg font-semibold text-slate-900">
              Title 20 — Section Titles & Cards
            </div>
            <div className="text-[15px] leading-relaxed text-slate-600">
              Body 15 — Discover conferences, workshops, and festivals across Cairo, Giza, and Alexandria.
            </div>
            <div className="text-xs text-slate-400">
              Caption 12 — Secondary metadata, timestamps, and badges
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              JetBrains Mono — IDs, Prices & Cryptographic Tokens
            </div>
            <div className="font-mono text-3xl font-extrabold text-slate-900">
              284,500 EGP
            </div>
            <div className="font-mono text-lg font-semibold text-slate-800">
              EVQ-2026-TCS-00742
            </div>
            <div className="font-mono text-xs text-slate-600 bg-slate-100 p-2 rounded-lg">
              TKN e7f2·9a1c·44b0·d3e8
            </div>
            <div className="font-mono text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
              POST /api/v1/checkins/verify
            </div>
          </div>
        </div>
      </div>

      {/* Buttons & Badges */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Buttons & Badges Kit</h2>
        <div className="flex flex-wrap items-center gap-3 p-6 rounded-3xl border border-slate-200 bg-white shadow-soft">
          <Button v="primary">Primary</Button>
          <Button v="ai" icon={Sparkles}>AI Action</Button>
          <Button v="outline">Secondary</Button>
          <Button v="ghost">Ghost</Button>
          <Button v="success">Approve</Button>
          <Button v="danger">Reject</Button>
          <Button disabled>Disabled</Button>

          <span className="mx-2 h-8 w-px bg-slate-200" />

          <Badge tone="ai">98% Match</Badge>
          <Badge tone="green" dot>Verified KYC</Badge>
          <Badge tone="amber">Featured</Badge>
          <Badge tone="blue">Multi-day</Badge>
          <Badge tone="dark">Admin</Badge>
        </div>
      </div>

      {/* State Machine Pills */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Domain State Machines</h2>
        <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white shadow-soft">
          {stateMachines.map((sm) => (
            <div key={sm.entity} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-bold text-sm text-slate-900 w-48 shrink-0">{sm.entity}</span>
              <div className="flex flex-wrap gap-1.5">
                {sm.states.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Demo Data Button */}
      <div className="mt-12 text-center">
        <Button v="outline" size="md" icon={RotateCcw} onClick={resetDemoData}>
          Reset Prototype Demo State
        </Button>
      </div>
    </div>
  );
};
