import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  ExternalLink,
  Globe,
  Mail,
  Share2,
  CheckCircle2,
  Sparkles,
  Award,
  Mic,
  Briefcase,
  Layers,
} from 'lucide-react';
import { Speaker } from '../../types';
import { SpeakerProfileSkeleton } from '../../components/ui/skeleton';

export const SpeakerProfileView: React.FC = () => {
  const { events, screenParams, go, showToast, isLoading } = useApp();
  const { language, dir } = useI18n();

  if (isLoading) {
    return <SpeakerProfileSkeleton />;
  }

  // Find target speaker across all events or fallback to first speaker
  const targetSpeakerId = screenParams.speakerId || 'sp-1';
  const fromEventId = screenParams.eventId || screenParams.id || 1;

  let foundSpeaker: Speaker | undefined;
  let associatedEvent = events.find((e) => e.id === fromEventId);

  for (const ev of events) {
    const sp = ev.speakers?.find((s) => s.id === targetSpeakerId);
    if (sp) {
      foundSpeaker = sp;
      if (!associatedEvent) associatedEvent = ev;
      break;
    }
  }

  // Fallback speaker if none found
  const speaker: Speaker = foundSpeaker || {
    id: 'sp-1',
    name: 'Eng. Karim Farouk',
    nameAr: 'م. كريم فاروق',
    role: 'Head of Applied AI',
    roleAr: 'رئيس قسم الذكاء الاصطناعي التطبيقي',
    company: 'Fawry Fintech',
    companyAr: 'فوري للتكنولوجيا المالية',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'AI architect and engineering leader with 14+ years building high-throughput machine learning infrastructure and fraud detection systems in fintech across the MENA region. Former ML Tech Lead at Vodafone and keynote speaker at international AI conferences.',
    bioAr: 'مهندس وقائد تقني يتمتع بخبرة تتجاوز 14 عاماً في بناء البنية التحتية لتعلم الآلة ونظم كشف الاحتيال الذكية في التكنولوجيا المالية عبر منطقة الشرق الأوسط وشمال إفريقيا. قاد سابقاً فرق تعلم الآلة في فودافون ومتحدث دائم في المؤتمرات التقنية.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    website: 'https://karimfarouk.dev',
    email: 'karim.farouk@fawry.com',
    expertise: ['Applied AI', 'Fintech Infrastructure', 'LLMs & RAG', 'Fraud Detection', 'MLOps'],
  };

  const speakerName = language === 'ar' && speaker.nameAr ? speaker.nameAr : speaker.name;
  const speakerRole = language === 'ar' && speaker.roleAr ? speaker.roleAr : speaker.role;
  const speakerCompany = language === 'ar' && speaker.companyAr ? speaker.companyAr : speaker.company;
  const speakerBio = language === 'ar' && speaker.bioAr ? speaker.bioAr : speaker.bio;

  // Find agenda sessions for this speaker in the current event
  const currentEventSessions = (associatedEvent?.agenda || []).filter(
    (ag) => ag.speaker && ag.speaker.toLowerCase().includes(speaker.name.toLowerCase().replace('eng. ', '').replace('dr. ', ''))
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(
      language === 'ar' ? 'تم نسخ رابط ملف المتحدث' : 'Speaker profile link copied to clipboard',
      'ok'
    );
  };

  const handleBack = () => {
    if (fromEventId) {
      go('details', { id: fromEventId });
    } else {
      go('landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Header & Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#2563EB] transition-colors"
          >
            {dir === 'rtl' ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
            <span>
              {language === 'ar'
                ? `العودة إلى ${associatedEvent ? (language === 'ar' && associatedEvent.titleAr ? associatedEvent.titleAr : associatedEvent.title) : 'الفعالية'}`
                : `Back to ${associatedEvent ? associatedEvent.title : 'Event'}`}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Share2 className="size-3.5" />
              <span>{language === 'ar' ? 'مشاركة الملف' : 'Share Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Speaker Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <img
                src={speaker.avatar}
                alt={speakerName}
                className="size-28 sm:size-36 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 flex items-center justify-center size-7 rounded-full bg-[#2563EB] text-white shadow-xs">
                <CheckCircle2 className="size-4" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#2563EB]">
                  <Mic className="size-3.5" />
                  {language === 'ar' ? 'متحدث معتمد' : 'Verified Speaker'}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {speakerCompany}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {speakerName}
              </h1>

              <div className="mt-1 flex items-center gap-2 text-sm sm:text-base font-semibold text-[#2563EB]">
                <Briefcase className="size-4 shrink-0" />
                <span>{speakerRole} · {speakerCompany}</span>
              </div>

              {/* Social Channels */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-[#2563EB] transition-colors"
                  >
                    <svg className="size-3.5 fill-[#0077b5]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
                {speaker.twitter && (
                  <a
                    href={speaker.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="size-3.5 fill-slate-800" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Twitter / X</span>
                  </a>
                )}
                {speaker.website && (
                  <a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Globe className="size-3.5 text-slate-500" />
                    <span>Portfolio</span>
                  </a>
                )}
                {speaker.email && (
                  <a
                    href={`mailto:${speaker.email}`}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Mail className="size-3.5 text-slate-500" />
                    <span>Contact</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column (2 Cols): Bio & Sessions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="size-5 text-[#2563EB]" />
                <span>{language === 'ar' ? 'نبذة عن المتحدث' : 'About the Speaker'}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {speakerBio}
              </p>

              {/* Expertise tags */}
              {speaker.expertise && speaker.expertise.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    {language === 'ar' ? 'مجالات الخبرة والتخصص' : 'Areas of Expertise'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {speaker.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Current Event Sessions */}
            {associatedEvent && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Mic className="size-5 text-indigo-600" />
                    <span>
                      {language === 'ar'
                        ? 'الجلسات والكلمات في هذه الفعالية'
                        : 'Sessions at this Event'}
                    </span>
                  </h2>
                  <Badge tone="blue">
                    {language === 'ar' && associatedEvent.titleAr
                      ? associatedEvent.titleAr
                      : associatedEvent.title}
                  </Badge>
                </div>

                {currentEventSessions.length > 0 ? (
                  <div className="space-y-4">
                    {currentEventSessions.map((session) => (
                      <div
                        key={session.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-lg">
                            {session.time}
                          </span>
                          {session.stage && (
                            <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {session.stage}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{session.title}</h3>
                        {session.description && (
                          <p className="text-xs text-slate-500">{session.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {language === 'ar' ? 'كلمة رئيسية وجلسة حوارية' : 'Keynote & Panel Discussion'}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {associatedEvent.date} · {associatedEvent.venue}
                      </div>
                    </div>
                    <Button
                      v="ghost"
                      size="sm"
                      onClick={() => go('details', { id: associatedEvent?.id })}
                    >
                      {language === 'ar' ? 'عرض الفعالية' : 'View Event'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Past Events Archive */}
            {speaker.pastEvents && speaker.pastEvents.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="size-5 text-slate-600" />
                  <span>{language === 'ar' ? 'أرشيف المشاركات والمؤتمرات السابقة' : 'Past Speaking Archive'}</span>
                </h2>

                <div className="space-y-3">
                  {speaker.pastEvents.map((pe) => (
                    <div
                      key={pe.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {language === 'ar' && pe.titleAr ? pe.titleAr : pe.title}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-slate-400" />
                            {pe.date}
                          </span>
                          {pe.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3 text-slate-400" />
                              {pe.venue}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge tone="gray">
                        {language === 'ar' && pe.roleAr ? pe.roleAr : pe.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Upcoming Conferences & Booking CTA */}
          <div className="space-y-6">
            {/* Upcoming Events Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="size-4 text-[#2563EB]" />
                <span>{language === 'ar' ? 'الفعاليات القادمة للمتحدث' : 'Upcoming Appearances'}</span>
              </h2>

              {speaker.upcomingEvents && speaker.upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {speaker.upcomingEvents.map((ue) => (
                    <div
                      key={ue.id}
                      onClick={() => go('details', { id: ue.id })}
                      className="group cursor-pointer rounded-2xl border border-slate-200 p-3.5 hover:border-[#2563EB] hover:bg-blue-50/30 transition-all text-start"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                          {language === 'ar' && ue.titleAr ? ue.titleAr : ue.title}
                        </span>
                        <ExternalLink className="size-3.5 text-slate-400 group-hover:text-[#2563EB] shrink-0 mt-0.5" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{ue.date}</span>
                        <span className="font-semibold text-[#2563EB]">
                          {language === 'ar' && ue.roleAr ? ue.roleAr : ue.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'لا توجد فعاليات معلنة إضافية حالياً.'
                    : 'No additional public appearances announced yet.'}
                </p>
              )}
            </div>

            {/* Invite / Contact CTA */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/40 p-6 space-y-3">
              <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Sparkles className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'ar' ? 'هل تنظم فعالية وتبحث عن متحدث؟' : 'Organizing an Event?'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'ar'
                  ? 'يمكنك التواصل مع المتحدث عبر المنصة لتوجيه دعوة حضور أو تقديم ورشة عمل مخصصة في فعاليتك.'
                  : 'Send an invitation to feature this speaker in your upcoming conference, workshop, or panel.'}
              </p>
              <Button
                v="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  showToast(
                    language === 'ar'
                      ? 'تم تسجيل اهتمامك، سيتم تفعيل التواصل المباشر مع المتحدثين قريباً'
                      : 'Speaker inquiry sent! Organizer messaging will be active soon.',
                    'ok'
                  );
                }}
              >
                {language === 'ar' ? 'توجيه دعوة للمتحدث' : 'Invite Speaker'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
