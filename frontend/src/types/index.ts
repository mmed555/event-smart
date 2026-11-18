export type Role = 'attendee' | 'organizer' | 'vendor' | 'admin';

export type EventCategory =
  | 'Technology'
  | 'Business & Entrepreneurship'
  | 'Design & Creativity'
  | 'Science & Research'
  | 'Music & Entertainment'
  | 'Health & Wellness'
  | 'Education & Training'
  | 'Networking & Community';

export type EventFormat = 'In-Person' | 'Online' | 'Hybrid';

export type EventStatus =
  | 'Draft'
  | 'PendingApproval'
  | 'Approved'
  | 'Rejected'
  | 'Published'
  | 'Active'
  | 'Completed'
  | 'Cancelled';

export type TicketStatus = 'Reserved' | 'Confirmed' | 'Used' | 'Cancelled';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export type KYCStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export type RFQStatus = 'OPEN' | 'QUOTED' | 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DECLINED' | 'FULFILLED';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  remaining: number;
  perks: string[];
}

export interface SpeakerEventRef {
  id: number;
  title: string;
  titleAr?: string;
  date: string;
  role: string;
  roleAr?: string;
  venue?: string;
}

export interface Speaker {
  id: string;
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  company: string;
  companyAr?: string;
  avatar: string;
  bio?: string;
  bioAr?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
  expertise?: string[];
  pastEvents?: SpeakerEventRef[];
  upcomingEvents?: SpeakerEventRef[];
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  logo: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  stage?: string;
  description?: string;
}

export interface EventItem {
  id: number;
  title: string;
  titleAr?: string;
  cat: string;
  date: string;
  time?: string;
  venue: string;
  city: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  price: number;
  left: number;
  capacity?: number;
  img: string;
  featured?: boolean;
  multi?: boolean;
  match?: number;
  status?: EventStatus;
  organizer: string;
  organizerLogo?: string;
  description?: string;
  descriptionAr?: string;
  tiers?: TicketTier[];
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  sponsors?: Sponsor[];
  rating?: number;
  reviewsCount?: number;
}

export interface Booking {
  id: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  venue: string;
  tierName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
  qrToken?: string;
  attendeeName: string;
  attendeeEmail: string;
}

export interface DigitalTicket {
  id: string;
  bookingId: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  seat: string;
  tierName: string;
  status: TicketStatus;
  qrToken: string;
  attendeeName: string;
  gate: string;
}

export interface NotificationItem {
  id: string;
  role: Role;
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
  link?: { screen: string; params?: Record<string, unknown> };
}

export interface AISlots {
  category?: string;
  city?: string;
  dateRange?: string;
  budgetMax?: number;
  format?: EventFormat;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedEventIds?: number[];
  extractedSlots?: AISlots;
}

export interface UserProfile {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  phone?: string;
  avatar: string;
  role: Role;
  jobTitle?: string;
  company?: string;
  city?: string;
  country?: string;
  bio?: string;
  interests: string[];
  notificationsEnabled: boolean;
  emailUpdates: boolean;
  smsTickets: boolean;
  twoFactorEnabled: boolean;
  joinedDate: string;
}

// -------------------------------------------------------------
// Super Admin Domain Types (AD01 - AD12)
// -------------------------------------------------------------

export type AdminTab =
  | 'overview'       // AD01: Platform Overview Dashboard
  | 'users'          // AD02: Users Management
  | 'user-details'   // AD03: User Details & Audit Log
  | 'kyc-queue'      // AD04: Vendor Verification Queue
  | 'kyc-review'     // AD05: KYC Review
  | 'events-queue'   // AD06: Events Moderation Queue
  | 'event-review'   // AD07: Event Moderation & Audit
  | 'categories'     // AD08: Categories & Taxonomy Management
  | 'disputes'       // AD09: Complaints / Disputes Resolution
  | 'system-health'  // AD10: System Health & Platform Analytics
  | 'broadcast'      // AD11: Broadcast Notifications
  | 'settings';      // AD12: Platform System Settings

export interface AdminAuditLogEntry {
  id: string;
  action: string;
  actionAr?: string;
  timestamp: string;
  ipAddress?: string;
  details: string;
  detailsAr?: string;
  actor: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  active: boolean;
  joinedDate: string;
  lastLogin?: string;
  eventsCount?: number;
  bookingsCount?: number;
  rfqsCount?: number;
  spentOrEarned?: string;
  suspendedReason?: string;
  auditLog: AdminAuditLogEntry[];
}

export interface KYCDocument {
  type: 'commercial_register' | 'tax_card';
  title: string;
  titleAr: string;
  docNumber: string;
  issueDate: string;
  expiryDate: string;
  fileUrl: string;
  fileSize: string;
  verified: boolean;
}

export interface VendorKYCItem {
  id: string;
  companyName: string;
  companyNameAr?: string;
  category: string;
  categoryAr?: string;
  contactPerson: string;
  email: string;
  phone: string;
  submittedAt: string;
  reviewedAt?: string;
  status: KYCStatus | 'REVISION_REQUESTED';
  rejectionReason?: string;
  revisionNotes?: string;
  documents: {
    commercialRegister: KYCDocument;
    taxCard: KYCDocument;
  };
  city: string;
  establishedYear: number;
  taxRegistrationNumber: string;
  commercialRegistrationNumber: string;
}

export interface AdminModerationEvent {
  id: number;
  title: string;
  titleAr?: string;
  category: string;
  categoryAr?: string;
  organizerName: string;
  organizerEmail: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  capacity: number;
  submittedAt: string;
  status: EventStatus;
  rejectionNotes?: string;
  description: string;
  descriptionAr?: string;
  coverImage: string;
  tiers: TicketTier[];
  speakers: Speaker[];
  agenda: AgendaItem[];
  complianceCheck: {
    venueConfirmed: boolean;
    pricingValid: boolean;
    termsAccepted: boolean;
    aiContentClean: boolean;
  };
}

export interface AdminCategoryItem {
  id: string;
  name: string;
  nameAr: string;
  type: 'event' | 'service';
  slug: string;
  iconName: string;
  color: string;
  count: number;
  active: boolean;
}

export interface DisputeTimelineEntry {
  id: string;
  author: string;
  role: Role;
  message: string;
  timestamp: string;
  attachment?: string;
}

export interface AdminDisputeItem {
  id: string;
  title: string;
  titleAr?: string;
  type: 'event' | 'rfq' | 'refund' | 'behavior';
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  complainant: {
    name: string;
    role: Role;
    email: string;
  };
  respondent: {
    name: string;
    role: Role;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  description: string;
  resolutionNotes?: string;
  timeline: DisputeTimelineEntry[];
}

export interface AdminBroadcastItem {
  id: string;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  targetRole: 'all' | 'attendee' | 'organizer' | 'vendor';
  priority: 'normal' | 'urgent' | 'critical';
  sentAt: string;
  sentBy: string;
  recipientsCount: number;
  channels: ('in_app' | 'email' | 'push')[];
}

export interface AdminSystemHealthMetrics {
  apiLatencyMs: number;
  apiSuccessRate: number;
  aiLatencyMs: number;
  aiUptimePercent: number;
  aiExtractionAccuracy: number;
  gateCheckinAvgMs: number;
  gateThroughputPerMin: number;
  activeGateSockets: number;
  totalCheckinsToday: number;
  dbPoolUsagePercent: number;
  memoryUsagePercent: number;
}

export interface AdminSystemSettings {
  mockPaymentEnabled: boolean;
  sandboxGatewayLatencyMs: number;
  maintenanceMode: boolean;
  allowNewVendorRegistrations: boolean;
  requireKYCForRFQs: boolean;
  defaultCommissionPercent: number;
  ticketRefundGraceHours: number;
  aiAutoFlagSuspiciousContent: boolean;
  maxUploadFileSizeMb: number;
}

