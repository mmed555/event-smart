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

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio?: string;
  linkedin?: string;
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
