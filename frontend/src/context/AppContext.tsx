import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  EventItem,
  Role,
  Booking,
  DigitalTicket,
  NotificationItem,
  UserProfile,
  AdminTab,
  AdminUserItem,
  VendorKYCItem,
  AdminModerationEvent,
  AdminCategoryItem,
  AdminDisputeItem,
  AdminBroadcastItem,
  AdminSystemHealthMetrics,
  AdminSystemSettings,
  VendorTab,
  VendorCompanyProfile,
  VendorServiceItem,
  VendorRFQItem,
  VendorQuotationItem,
  VendorServiceOrderItem,
  VendorReviewItem,
  VendorPayoutSettings,
  ServiceOrderStatus,
  KYCStatus,
  OrganizerTab,
  OrganizerProfile,
  GateScanRecord,
  OrganizerRFQPayload,
  OrganizerQuotationComparison,
  OrganizerServiceOrder,
  TicketTier,
  Speaker,
  AgendaItem,
  Sponsor,
} from '../types';
import { INITIAL_EVENTS, INITIAL_NOTIFICATIONS, DEFAULT_ATTENDEE_USER } from '../mock/data';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_VENDOR_KYC,
  INITIAL_MODERATION_EVENTS,
  INITIAL_ADMIN_CATEGORIES,
  INITIAL_ADMIN_DISPUTES,
  INITIAL_ADMIN_BROADCASTS,
  INITIAL_ADMIN_SYSTEM_METRICS,
  INITIAL_ADMIN_SETTINGS,
} from '../mock/adminData';
import {
  INITIAL_VENDOR_PROFILE,
  INITIAL_VENDOR_SERVICES,
  INITIAL_VENDOR_RFQS,
  INITIAL_VENDOR_QUOTATIONS,
  INITIAL_VENDOR_ORDERS,
  INITIAL_VENDOR_REVIEWS,
  INITIAL_VENDOR_PAYOUT_SETTINGS,
} from '../mock/vendorData';
import {
  DEFAULT_ORGANIZER_PROFILE,
  INITIAL_GATE_SCANS,
  INITIAL_ORGANIZER_RFQS,
  INITIAL_QUOTATIONS_COMPARISON,
  INITIAL_ORGANIZER_ORDERS,
} from '../mock/organizerData';

export type ScreenId =
  | 'system'
  | 'landing'
  | 'auth'
  | 'ai'
  | 'search'
  | 'details'
  | 'tickets'
  | 'speaker'
  | 'profile'
  | 'org'
  | 'wizard'
  | 'planner'
  | 'checkin'
  | 'market'
  | 'quotes'
  | 'vendor'
  | 'admin'
  | 'mobile';

export interface MultiTicketSelectionItem {
  tierId: string;
  quantity: number;
}

export interface AttendeeInputItem {
  name: string;
  email?: string;
  tierId: string;
}

export interface ScreenParams {
  id?: number;
  speakerId?: string;
  eventId?: number;
  q?: string;
  city?: string;
  date?: string;
  cat?: string;
  role?: Role;
  [key: string]: unknown;
}

export interface ToastState {
  message: string;
  tone: 'ok' | 'err' | 'info';
}

interface AppContextType {
  screen: ScreenId;
  screenParams: ScreenParams;
  role: Role;
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  events: EventItem[];
  favs: number[];
  bookings: Booking[];
  tickets: DigitalTicket[];
  notifications: NotificationItem[];
  toast: ToastState | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  toggleLoading: () => void;
  go: (screen: ScreenId, params?: ScreenParams) => void;
  setRole: (role: Role) => void;
  setCurrentUser: (user: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  login: (role?: Role, email?: string, name?: string) => void;
  logout: () => void;
  toggleFav: (eventId: number) => void;
  bookTickets: (
    eventId: number,
    tierId: string,
    quantity: number,
    attendeeName: string,
    attendeeEmail: string
  ) => Promise<boolean>;
  bookMultiTickets: (
    eventId: number,
    items: MultiTicketSelectionItem[],
    buyerName: string,
    buyerEmail: string,
    attendees?: AttendeeInputItem[]
  ) => Promise<{ success: boolean; bookingId: string }>;
  payBooking: (bookingId: string) => void;
  showToast: (message: string, tone?: 'ok' | 'err' | 'info') => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;

  // Super Admin Domain State & Actions
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab, params?: Record<string, unknown>) => void;
  selectedAdminUserId: string | null;
  setSelectedAdminUserId: (id: string | null) => void;
  selectedAdminKycId: string | null;
  setSelectedAdminKycId: (id: string | null) => void;
  selectedAdminEventId: number | null;
  setSelectedAdminEventId: (id: number | null) => void;
  adminUsers: AdminUserItem[];
  adminKycQueue: VendorKYCItem[];
  adminEventsQueue: AdminModerationEvent[];
  adminCategories: AdminCategoryItem[];
  adminDisputes: AdminDisputeItem[];
  adminBroadcasts: AdminBroadcastItem[];
  adminMetrics: AdminSystemHealthMetrics;
  adminSettings: AdminSystemSettings;
  addAdminUser: (userData: Omit<AdminUserItem, 'id' | 'joinedDate'> & { id?: string }) => void;
  toggleUserStatus: (userId: string, reason?: string) => void;
  reviewKyc: (kycId: string, status: 'VERIFIED' | 'REJECTED' | 'REVISION_REQUESTED', notes?: string) => void;
  moderateEvent: (eventId: number, status: 'Approved' | 'Rejected' | 'Cancelled', notes?: string) => void;
  addCategory: (cat: Omit<AdminCategoryItem, 'id'>) => void;
  toggleCategoryActive: (id: string) => void;
  updateDisputeStatus: (id: string, status: 'Open' | 'In Progress' | 'Resolved', note?: string) => void;
  sendBroadcast: (broadcast: Omit<AdminBroadcastItem, 'id' | 'sentAt'>) => void;
  updateAdminSettings: (settings: Partial<AdminSystemSettings>) => void;

  // Vendor & Execution Company Domain State & Actions (V01 - V16)
  activeVendorTab: VendorTab;
  setActiveVendorTab: (tab: VendorTab, params?: Record<string, unknown>) => void;
  vendorProfile: VendorCompanyProfile;
  updateVendorProfile: (updates: Partial<VendorCompanyProfile>) => void;
  vendorServices: VendorServiceItem[];
  addVendorService: (service: Omit<VendorServiceItem, 'id'>) => void;
  updateVendorService: (id: string, updates: Partial<VendorServiceItem>) => void;
  deleteVendorService: (id: string) => void;
  toggleVendorServiceActive: (id: string) => void;
  vendorRfqs: VendorRFQItem[];
  selectedVendorRfqId: string | null;
  setSelectedVendorRfqId: (id: string | null) => void;
  vendorQuotations: VendorQuotationItem[];
  selectedQuotationId: string | null;
  setSelectedQuotationId: (id: string | null) => void;
  submitQuotation: (quotation: Omit<VendorQuotationItem, 'id' | 'submittedAt' | 'status'>) => void;
  withdrawQuotation: (id: string) => void;
  vendorOrders: VendorServiceOrderItem[];
  selectedVendorOrderId: string | null;
  setSelectedVendorOrderId: (id: string | null) => void;
  updateServiceOrderStatus: (orderId: string, status: ServiceOrderStatus) => void;
  toggleOrderMilestone: (orderId: string, milestoneId: string) => void;
  addOrderNote: (orderId: string, text: string) => void;
  vendorReviews: VendorReviewItem[];
  replyToVendorReview: (reviewId: string, replyText: string) => void;
  vendorPayoutSettings: VendorPayoutSettings;
  updateVendorPayoutSettings: (settings: Partial<VendorPayoutSettings>) => void;
  setVendorKycStatus: (status: KYCStatus) => void;

  // Organizer Domain State & Actions (O01 - O25)
  activeOrganizerTab: OrganizerTab;
  setActiveOrganizerTab: (tab: OrganizerTab, params?: Record<string, unknown>) => void;
  organizerProfile: OrganizerProfile;
  updateOrganizerProfile: (updates: Partial<OrganizerProfile>) => void;
  gateScans: GateScanRecord[];
  gateOpen: boolean;
  toggleGate: () => void;
  verifyGateTicket: (code: string) => { status: 'ADMIT' | 'DUPLICATE' | 'INVALID'; reason?: string; ticket?: DigitalTicket };
  organizerRfqs: OrganizerRFQPayload[];
  createOrganizerRFQ: (rfqData: Omit<OrganizerRFQPayload, 'id' | 'rfqCode' | 'createdAt' | 'quotationsReceivedCount' | 'status'>) => string;
  organizerQuotes: Record<string, OrganizerQuotationComparison[]>;
  awardQuotationContract: (rfqId: string, quoteId: string) => void;
  organizerOrders: OrganizerServiceOrder[];
  toggleOrganizerOrderMilestone: (orderId: string, milestoneId: string) => void;
  confirmOrderDeliverables: (orderId: string) => void;
  submitOrganizerVendorReview: (orderId: string, vendorId: string, rating: number, review: string) => void;
  selectedCommandCenterEventId: number;
  setSelectedCommandCenterEventId: (id: number) => void;
  publishOrganizerEvent: (eventId: number) => void;
  submitEventForApproval: (eventData: Partial<EventItem>) => number;
  updateEventTiers: (eventId: number, tiers: TicketTier[]) => void;
  updateEventAgenda: (eventId: number, agenda: AgendaItem[]) => void;
  updateEventSpeakers: (eventId: number, speakers: Speaker[]) => void;
  updateEventSponsors: (eventId: number, sponsors: Sponsor[]) => void;
}

export const screenToPath = (s: ScreenId, params: ScreenParams = {}): string => {
  switch (s) {
    case 'landing':
      return '/';
    case 'auth':
      return '/auth';
    case 'ai':
      return '/ai';
    case 'search':
      return params.cat
        ? `/search?cat=${encodeURIComponent(String(params.cat))}`
        : params.q
        ? `/search?q=${encodeURIComponent(String(params.q))}`
        : '/search';
    case 'details':
      return params.id ? `/events/${params.id}` : '/details';
    case 'speaker':
      return params.speakerId ? `/speaker/${params.speakerId}` : '/speaker';
    case 'tickets':
      return '/tickets';
    case 'profile':
      return '/profile';
    case 'system':
      return '/design-system';
    case 'admin':
      return '/admin/overview';
    case 'org':
    case 'wizard':
    case 'planner':
    case 'checkin':
    case 'market':
    case 'quotes':
      if (params.orgTab) return `/organizer/${params.orgTab}`;
      if (s === 'wizard') return '/organizer/wizard';
      if (s === 'planner') return '/organizer/ai-planner';
      if (s === 'checkin') return '/organizer/checkin';
      if (s === 'market') return '/organizer/marketplace';
      if (s === 'quotes') return '/organizer/quotes';
      return '/organizer/overview';
    case 'vendor':
      return params.vendorTab ? `/vendor/${params.vendorTab}` : '/vendor/overview';
    case 'mobile':
      return '/mobile';
    default:
      return '/';
  }
};

export const pathToScreen = (
  pathname: string,
  search: string = ''
): { screen: ScreenId; params?: ScreenParams; adminTab?: AdminTab; vendorTab?: VendorTab; orgTab?: OrganizerTab } => {
  if (pathname.startsWith('/admin')) {
    const parts = pathname.split('/').filter(Boolean);
    const tab = (parts[1] as AdminTab) || 'overview';
    return { screen: 'admin', adminTab: tab };
  }
  if (pathname.startsWith('/vendor')) {
    const parts = pathname.split('/').filter(Boolean);
    const tab = (parts[1] as VendorTab) || 'overview';
    return { screen: 'vendor', vendorTab: tab };
  }
  if (pathname.startsWith('/organizer') || pathname === '/org') {
    const parts = pathname.split('/').filter(Boolean);
    const tab = (parts[1] as OrganizerTab) || 'overview';
    return { screen: 'org', orgTab: tab };
  }
  if (pathname === '/auth') return { screen: 'auth' };
  if (pathname === '/ai') return { screen: 'ai' };
  if (pathname.startsWith('/search')) {
    const searchParams = new URLSearchParams(search);
    const q = searchParams.get('q') || undefined;
    const cat = searchParams.get('cat') || undefined;
    return { screen: 'search', params: { q, cat } };
  }
  if (pathname.startsWith('/events/')) {
    const id = Number(pathname.split('/')[2]);
    return { screen: 'details', params: { id: isNaN(id) ? 1 : id } };
  }
  if (pathname === '/details') return { screen: 'details', params: { id: 1 } };
  if (pathname.startsWith('/speaker')) {
    const parts = pathname.split('/').filter(Boolean);
    const speakerId = parts[1] || undefined;
    return { screen: 'speaker', params: { speakerId } };
  }
  if (pathname === '/tickets') return { screen: 'tickets' };
  if (pathname === '/profile') return { screen: 'profile' };
  if (pathname === '/design-system') return { screen: 'system' };
  if (pathname.startsWith('/organizer') || pathname === '/org') return { screen: 'org' };
  if (pathname.startsWith('/vendor')) return { screen: 'vendor' };
  if (pathname.startsWith('/mobile')) return { screen: 'mobile' };
  return { screen: 'landing' };
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialInfo = pathToScreen(location.pathname, location.search);

  const [screen, setScreen] = useState<ScreenId>(initialInfo.screen);
  const [screenParams, setScreenParams] = useState<ScreenParams>(initialInfo.params || {});
  const [role, setRoleState] = useState<Role>(() => {
    if (initialInfo.screen === 'admin') return 'admin';
    if (initialInfo.screen === 'org') return 'organizer';
    if (initialInfo.screen === 'vendor') return 'vendor';
    return 'attendee';
  });

  // Authenticated User State (defaults to Ahmed Hassan unless explicitly logged out)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const authStatus = localStorage.getItem('eviq-auth');
    if (authStatus === 'logged_out') return null;
    const saved = localStorage.getItem('eviq-user-profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_ATTENDEE_USER;
      }
    }
    return DEFAULT_ATTENDEE_USER;
  });

  const isAuthenticated = currentUser !== null;

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('eviq-user-profile', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (roleToSign: Role = 'attendee', userEmail?: string, userName?: string) => {
    localStorage.removeItem('eviq-auth');
    setRoleState(roleToSign);
    const updatedUser: UserProfile = {
      ...DEFAULT_ATTENDEE_USER,
      name: userName || DEFAULT_ATTENDEE_USER.name,
      email: userEmail || DEFAULT_ATTENDEE_USER.email,
      role: roleToSign,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('eviq-user-profile', JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.setItem('eviq-auth', 'logged_out');
    setCurrentUser(null);
    showToast('تم تسجيل الخروج بنجاح', 'info');
    go('landing');
  };

  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [favs, setFavs] = useState<number[]>([1, 2]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  // Initial Bookings & Digital Tickets matching Figma prototype
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK-2026-01942',
      eventId: 1,
      eventTitle: 'قمة القاهرة التقنية 2026',
      eventDate: '14-15 مارس 2026',
      venue: 'CICC (Cairo International Convention Center)',
      tierName: '3 تذاكر',
      quantity: 3,
      unitPrice: 200,
      total: 650,
      status: 'Confirmed',
      createdAt: '2026-03-01',
      qrToken: 'EVQ-2026-TCS-00744',
      attendeeName: 'أحمد حسن',
      attendeeEmail: 'ahmed.hassan@example.com',
    },
    {
      id: 'BK-2026-01811',
      eventId: 2,
      eventTitle: 'مؤتمر تجربة المستخدم والتصميم 2026',
      eventDate: '21 مارس 2026',
      venue: 'The GrEEK Campus, Downtown Cairo',
      tierName: '1 تذكرة',
      quantity: 1,
      unitPrice: 250,
      total: 250,
      status: 'Pending',
      createdAt: '2026-03-05',
      qrToken: 'EVQ-2026-UDC-00311',
      attendeeName: 'أحمد حسن',
      attendeeEmail: 'ahmed.hassan@example.com',
    },
    {
      id: 'BK-2025-00492',
      eventId: 3,
      eventTitle: 'ملتقى الذكاء الاصطناعي السنوي 2025',
      eventDate: '15 ديسمبر 2025',
      venue: 'AUC New Cairo',
      tierName: 'تذكرة حضور',
      quantity: 1,
      unitPrice: 200,
      total: 200,
      status: 'Completed',
      createdAt: '2025-11-20',
      qrToken: 'EVQ-2025-AI-00092',
      attendeeName: 'أحمد حسن',
      attendeeEmail: 'ahmed.hassan@example.com',
    },
  ]);

  const [tickets, setTickets] = useState<DigitalTicket[]>([
    {
      id: 'TKT-00744',
      bookingId: 'BK-2026-01942',
      eventId: 1,
      eventTitle: 'قمة القاهرة التقنية 2026',
      eventDate: '14-15 مارس 2026',
      eventTime: '09:00 – 18:00',
      venue: 'CICC (Cairo International Convention Center)',
      city: 'Cairo',
      seat: 'Hall A · Row G · Seat 14',
      tierName: 'تذكرة عادية',
      status: 'Confirmed',
      qrToken: 'EVQ-2026-TCS-00744',
      attendeeName: 'أحمد حسن',
      gate: 'Gate A',
    },
    {
      id: 'TKT-00743',
      bookingId: 'BK-2026-01942',
      eventId: 1,
      eventTitle: 'قمة القاهرة التقنية 2026',
      eventDate: '14-15 مارس 2026',
      eventTime: '09:00 – 18:00',
      venue: 'CICC (Cairo International Convention Center)',
      city: 'Cairo',
      seat: 'Hall A · Row G · Seat 15',
      tierName: 'تذكرة عادية',
      status: 'Confirmed',
      qrToken: 'EVQ-2026-TCS-00743',
      attendeeName: 'أحمد حسن',
      gate: 'Gate A',
    },
    {
      id: 'TKT-00742',
      bookingId: 'BK-2026-01942',
      eventId: 1,
      eventTitle: 'قمة القاهرة التقنية 2026',
      eventDate: '14-15 مارس 2026',
      eventTime: '09:00 – 18:00',
      venue: 'CICC (Cairo International Convention Center)',
      city: 'Cairo',
      seat: 'VIP Lounge · Row A · Seat 01',
      tierName: 'تذكرة VIP',
      status: 'Confirmed',
      qrToken: 'EVQ-2026-TCS-00742',
      attendeeName: 'أحمد حسن',
      gate: 'VIP Gate',
    },
    {
      id: 'TKT-00311',
      bookingId: 'BK-2026-01811',
      eventId: 2,
      eventTitle: 'مؤتمر تجربة المستخدم والتصميم 2026',
      eventDate: '21 مارس 2026',
      eventTime: '10:00 – 17:00',
      venue: 'The GrEEK Campus, Downtown Cairo',
      city: 'Cairo',
      seat: 'Auditorium B · Row C · Seat 08',
      tierName: 'تذكرة عادية',
      status: 'Reserved',
      qrToken: 'EVQ-2026-UDC-00311',
      attendeeName: 'أحمد حسن',
      gate: 'Gate 2',
    },
    {
      id: 'TKT-00092',
      bookingId: 'BK-2025-00492',
      eventId: 3,
      eventTitle: 'ملتقى الذكاء الاصطناعي السنوي 2025',
      eventDate: '15 ديسمبر 2025',
      eventTime: '10:00 – 16:00',
      venue: 'AUC New Cairo',
      city: 'Cairo',
      seat: 'Hall 1 · Seat 08',
      tierName: 'تذكرة حضور',
      status: 'Used',
      qrToken: 'EVQ-2025-AI-00092',
      attendeeName: 'أحمد حسن',
      gate: 'Gate 3',
    },
  ]);

  const go = (newScreen: ScreenId, params: ScreenParams = {}) => {
    setScreenParams(params);
    setScreen(newScreen);
    sessionStorage.setItem('eviq-screen', newScreen);
    const targetPath = screenToPath(newScreen, params);
    if (location.pathname + location.search !== targetPath) {
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'attendee') {
      go('landing');
    } else if (newRole === 'organizer') {
      go('org');
    } else if (newRole === 'vendor') {
      go('vendor');
    } else if (newRole === 'admin') {
      go('admin');
    }
  };

  const showToast = (message: string, tone: 'ok' | 'err' | 'info' = 'ok') => {
    setToast({ message, tone });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleFav = (eventId: number) => {
    setFavs((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Event removed from saved favorites', 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Event saved to favorites', 'ok');
        return [...prev, eventId];
      }
    });
  };

  const bookTickets = async (
    eventId: number,
    tierId: string,
    quantity: number,
    attendeeName: string,
    attendeeEmail: string
  ): Promise<boolean> => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return false;

    const tier = targetEvent.tiers?.find((t) => t.id === tierId);
    const unitPrice = tier ? tier.price : targetEvent.price;
    const tierName = tier ? tier.name : 'Standard Pass';

    const bookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const qrToken = `EVQ-${targetEvent.id}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7)}`;

    const newBooking: Booking = {
      id: bookingId,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      venue: `${targetEvent.venue}, ${targetEvent.city}`,
      tierName,
      quantity,
      unitPrice,
      total: unitPrice * quantity,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      qrToken,
      attendeeName,
      attendeeEmail,
    };

    const newTicket: DigitalTicket = {
      id: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingId,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      eventTime: targetEvent.time || '09:00 – 17:00',
      venue: targetEvent.venue,
      city: targetEvent.city,
      seat: `Section A · General Access`,
      tierName,
      status: 'Confirmed',
      qrToken,
      attendeeName,
      gate: 'Gate 1',
    };

    // Update remaining count
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              left: Math.max(0, ev.left - quantity),
              tiers: ev.tiers?.map((t) =>
                t.id === tierId ? { ...t, remaining: Math.max(0, t.remaining - quantity) } : t
              ),
            }
          : ev
      )
    );

    setBookings((prev) => [newBooking, ...prev]);
    setTickets((prev) => [newTicket, ...prev]);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        role: 'attendee',
        title: 'Booking Confirmed',
        body: `Your ticket for ${targetEvent.title} is ready.`,
        read: false,
        timestamp: 'Just now',
        link: { screen: 'tickets' },
      },
      ...prev,
    ]);

    showToast('Booking successful! Your QR ticket is ready.', 'ok');
    return true;
  };

  const bookMultiTickets = async (
    eventId: number,
    items: MultiTicketSelectionItem[],
    buyerName: string,
    buyerEmail: string,
    attendees?: AttendeeInputItem[]
  ): Promise<{ success: boolean; bookingId: string }> => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return { success: false, bookingId: '' };

    const activeItems = items.filter((it) => it.quantity > 0);
    if (activeItems.length === 0) return { success: false, bookingId: '' };

    const bookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const qrToken = `EVQ-${targetEvent.id}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7)}`;

    let grandTotal = 0;
    let totalQty = 0;
    const tierSummaries: string[] = [];
    const newTicketsList: DigitalTicket[] = [];

    const attendeePool = [...(attendees || [])];

    activeItems.forEach((item, tierIdx) => {
      const tier = targetEvent.tiers?.find((t) => t.id === item.tierId);
      const unitPrice = tier ? tier.price : targetEvent.price;
      const tierName = tier ? tier.name : 'Standard Pass';
      const lineTotal = unitPrice * item.quantity;

      grandTotal += lineTotal;
      totalQty += item.quantity;
      tierSummaries.push(`${item.quantity}x ${tierName}`);

      for (let i = 0; i < item.quantity; i++) {
        const specificAttendeeIdx = attendeePool.findIndex((a) => a.tierId === item.tierId);
        let assignedName = buyerName;
        if (specificAttendeeIdx !== -1) {
          assignedName = attendeePool[specificAttendeeIdx].name || buyerName;
          attendeePool.splice(specificAttendeeIdx, 1);
        } else if (attendeePool.length > 0) {
          assignedName = attendeePool.shift()?.name || buyerName;
        }

        const ticketToken = `EVQ-${targetEvent.id}-${tier?.id || 'T'}-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
        const isVip = tierName.toLowerCase().includes('vip');
        const seatLabel = isVip
          ? `VIP Hall · Row ${String.fromCharCode(65 + tierIdx)} · Seat ${10 + i}`
          : `Main Hall · Row ${String.fromCharCode(67 + i)} · Seat ${15 + i}`;

        newTicketsList.push({
          id: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
          bookingId,
          eventId: targetEvent.id,
          eventTitle: targetEvent.title,
          eventDate: targetEvent.date,
          eventTime: targetEvent.time || '09:00 – 17:00',
          venue: targetEvent.venue,
          city: targetEvent.city,
          seat: seatLabel,
          tierName,
          status: 'Confirmed',
          qrToken: ticketToken,
          attendeeName: assignedName,
          gate: isVip ? 'VIP Gate A' : 'Gate 2',
        });
      }
    });

    const newBooking: Booking = {
      id: bookingId,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      venue: `${targetEvent.venue}, ${targetEvent.city}`,
      tierName: tierSummaries.join(' + '),
      quantity: totalQty,
      unitPrice: Math.round(grandTotal / totalQty),
      total: grandTotal,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      qrToken,
      attendeeName: buyerName,
      attendeeEmail: buyerEmail,
    };

    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        return {
          ...ev,
          left: Math.max(0, ev.left - totalQty),
          tiers: ev.tiers?.map((t) => {
            const matchItem = activeItems.find((it) => it.tierId === t.id);
            if (matchItem) {
              return { ...t, remaining: Math.max(0, t.remaining - matchItem.quantity) };
            }
            return t;
          }),
        };
      })
    );

    setBookings((prev) => [newBooking, ...prev]);
    setTickets((prev) => [...newTicketsList, ...prev]);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        role: 'attendee',
        title: 'Booking Confirmed',
        body: `You booked ${totalQty} ticket(s) for ${targetEvent.title}.`,
        read: false,
        timestamp: 'Just now',
        link: { screen: 'tickets' },
      },
      ...prev,
    ]);

    showToast(`Confirmed ${totalQty} ticket(s) successfully! Check your tickets wallet.`, 'ok');
    return { success: true, bookingId };
  };

  const payBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed' } : b))
    );
    setTickets((prev) =>
      prev.map((tk) =>
        tk.bookingId === bookingId ? { ...tk, status: 'Confirmed' } : tk
      )
    );
    showToast('Payment confirmed! QR tickets activated.', 'ok');
  };

  // Super Admin Domain States
  const [activeAdminTab, setActiveAdminTabState] = useState<AdminTab>(initialInfo.adminTab || 'overview');
  const [selectedAdminUserId, setSelectedAdminUserId] = useState<string | null>(null);
  const [selectedAdminKycId, setSelectedAdminKycId] = useState<string | null>(null);
  const [selectedAdminEventId, setSelectedAdminEventId] = useState<number | null>(null);

  // Vendor & Execution Company Domain States (V01 - V16)
  const [activeVendorTab, setActiveVendorTabState] = useState<VendorTab>(initialInfo.vendorTab || 'overview');
  const [vendorProfile, setVendorProfile] = useState<VendorCompanyProfile>(INITIAL_VENDOR_PROFILE);
  const [vendorServices, setVendorServices] = useState<VendorServiceItem[]>(INITIAL_VENDOR_SERVICES);
  const [vendorRfqs, setVendorRfqs] = useState<VendorRFQItem[]>(INITIAL_VENDOR_RFQS);
  const [selectedVendorRfqId, setSelectedVendorRfqId] = useState<string | null>(null);
  const [vendorQuotations, setVendorQuotations] = useState<VendorQuotationItem[]>(INITIAL_VENDOR_QUOTATIONS);
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);
  const [vendorOrders, setVendorOrders] = useState<VendorServiceOrderItem[]>(INITIAL_VENDOR_ORDERS);
  const [selectedVendorOrderId, setSelectedVendorOrderId] = useState<string | null>(null);
  const [vendorReviews, setVendorReviews] = useState<VendorReviewItem[]>(INITIAL_VENDOR_REVIEWS);
  const [vendorPayoutSettings, setVendorPayoutSettings] = useState<VendorPayoutSettings>(INITIAL_VENDOR_PAYOUT_SETTINGS);

  // Organizer Portal Domain States (O01 - O25)
  const [activeOrganizerTab, setActiveOrganizerTabState] = useState<OrganizerTab>(initialInfo.orgTab || 'overview');
  const [organizerProfile, setOrganizerProfile] = useState<OrganizerProfile>(DEFAULT_ORGANIZER_PROFILE);
  const [gateScans, setGateScans] = useState<GateScanRecord[]>(INITIAL_GATE_SCANS);
  const [gateOpen, setGateOpen] = useState<boolean>(true);
  const [organizerRfqs, setOrganizerRfqs] = useState<OrganizerRFQPayload[]>(INITIAL_ORGANIZER_RFQS);
  const [organizerQuotes, setOrganizerQuotes] = useState<Record<string, OrganizerQuotationComparison[]>>(INITIAL_QUOTATIONS_COMPARISON);
  const [organizerOrders, setOrganizerOrders] = useState<OrganizerServiceOrder[]>(INITIAL_ORGANIZER_ORDERS);
  const [selectedCommandCenterEventId, setSelectedCommandCenterEventId] = useState<number>(1);

  // Sync state when URL pathname/search changes (e.g. Back/Forward or direct link)
  useEffect(() => {
    const parsed = pathToScreen(location.pathname, location.search);
    if (parsed.screen !== screen) {
      setScreen(parsed.screen);
      sessionStorage.setItem('eviq-screen', parsed.screen);
    }
    if (parsed.adminTab && parsed.adminTab !== activeAdminTab) {
      setActiveAdminTabState(parsed.adminTab);
    }
    if (parsed.vendorTab && parsed.vendorTab !== activeVendorTab) {
      setActiveVendorTabState(parsed.vendorTab);
    }
    if (parsed.orgTab && parsed.orgTab !== activeOrganizerTab) {
      setActiveOrganizerTabState(parsed.orgTab);
    }
    if (parsed.params) {
      setScreenParams((prev) => ({ ...prev, ...parsed.params }));
    }
  }, [location.pathname, location.search]);

  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [adminKycQueue, setAdminKycQueue] = useState<VendorKYCItem[]>(INITIAL_VENDOR_KYC);
  const [adminEventsQueue, setAdminEventsQueue] = useState<AdminModerationEvent[]>(INITIAL_MODERATION_EVENTS);
  const [adminCategories, setAdminCategories] = useState<AdminCategoryItem[]>(INITIAL_ADMIN_CATEGORIES);
  const [adminDisputes, setAdminDisputes] = useState<AdminDisputeItem[]>(INITIAL_ADMIN_DISPUTES);
  const [adminBroadcasts, setAdminBroadcasts] = useState<AdminBroadcastItem[]>(INITIAL_ADMIN_BROADCASTS);
  const [adminMetrics] = useState<AdminSystemHealthMetrics>(INITIAL_ADMIN_SYSTEM_METRICS);
  const [adminSettings, setAdminSettings] = useState<AdminSystemSettings>(INITIAL_ADMIN_SETTINGS);

  const setActiveAdminTab = (tab: AdminTab, params?: Record<string, unknown>) => {
    setActiveAdminTabState(tab);
    if (params?.userId) setSelectedAdminUserId(params.userId as string);
    if (params?.kycId) setSelectedAdminKycId(params.kycId as string);
    if (params?.eventId) setSelectedAdminEventId(params.eventId as number);
    const targetPath = `/admin/${tab}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addAdminUser = (userData: Omit<AdminUserItem, 'id' | 'joinedDate'> & { id?: string }) => {
    const newId = userData.id || `USR-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toISOString().slice(0, 10);
    const initialLog: import('../types').AdminAuditLogEntry = {
      id: `LOG-${Date.now()}`,
      action: 'Account Created',
      actionAr: 'إنشاء الحساب وتعيين الدور',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      details: `Account registered with role: ${userData.role}`,
      detailsAr: `تم إنشاء الحساب وتعيين الدور: ${userData.role}`,
      actor: 'Super Admin',
    };
    const newUser: AdminUserItem = {
      ...userData,
      id: newId,
      joinedDate: today,
      auditLog: userData.auditLog || [initialLog],
    };
    setAdminUsers((prev) => [newUser, ...prev]);
    showToast(`User ${newUser.name} created successfully`, 'ok');
  };

  const toggleUserStatus = (userId: string, reason?: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newActive = !u.active;
          const newLog: import('../types').AdminAuditLogEntry = {
            id: `LOG-${Date.now()}`,
            action: newActive ? 'Account Reactivated' : 'Account Suspended',
            actionAr: newActive ? 'إلغاء تجميد الحساب' : 'تجميد الحساب',
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            details: newActive
              ? 'Access reactivated by Super Admin'
              : `Suspended by Super Admin. Reason: ${reason || 'Governance review'}`,
            detailsAr: newActive
              ? 'إلغاء التجميد من قبل المشرف العام'
              : `تم التجميد من المشرف العام. السبب: ${reason || 'مراجعة حوكمة'}`,
            actor: 'Super Admin',
          };
          return {
            ...u,
            active: newActive,
            suspendedReason: newActive ? undefined : reason,
            auditLog: [newLog, ...u.auditLog],
          };
        }
        return u;
      })
    );
    showToast(`User status updated successfully`, 'ok');
  };

  const reviewKyc = (
    kycId: string,
    status: 'VERIFIED' | 'REJECTED' | 'REVISION_REQUESTED',
    notes?: string
  ) => {
    setAdminKycQueue((prev) =>
      prev.map((item) => {
        if (item.id === kycId) {
          return {
            ...item,
            status,
            reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            rejectionReason: status === 'REJECTED' ? notes : undefined,
            revisionNotes: status === 'REVISION_REQUESTED' ? notes : undefined,
          };
        }
        return item;
      })
    );

    // Also notify
    const target = adminKycQueue.find((k) => k.id === kycId);
    showToast(
      status === 'VERIFIED'
        ? `Vendor ${target?.companyName || ''} successfully verified!`
        : status === 'REVISION_REQUESTED'
        ? `Revision requested with notes sent to vendor`
        : `KYC submission rejected`,
      status === 'VERIFIED' ? 'ok' : 'info'
    );
  };

  const moderateEvent = (
    eventId: number,
    status: 'Approved' | 'Rejected' | 'Cancelled',
    notes?: string
  ) => {
    setAdminEventsQueue((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          return {
            ...ev,
            status,
            rejectionNotes: notes,
          };
        }
        return ev;
      })
    );

    if (status === 'Approved') {
      // also push to published events if approved
      const modEv = adminEventsQueue.find((e) => e.id === eventId);
      if (modEv && !events.some((e) => e.id === modEv.id)) {
        setEvents((prev) => [
          {
            id: modEv.id,
            title: modEv.title,
            titleAr: modEv.titleAr,
            cat: modEv.category,
            date: modEv.date,
            time: modEv.time,
            venue: modEv.venue,
            city: modEv.city,
            price: modEv.price,
            left: modEv.capacity,
            capacity: modEv.capacity,
            img: modEv.coverImage,
            featured: false,
            multi: false,
            match: 95,
            status: 'Published',
            organizer: modEv.organizerName,
            description: modEv.description,
            descriptionAr: modEv.descriptionAr,
            tiers: modEv.tiers,
            speakers: modEv.speakers,
            agenda: modEv.agenda,
          },
          ...prev,
        ]);
      }
      showToast(`Event "${eventId}" approved and published to Marketplace!`, 'ok');
    } else {
      showToast(`Event decision saved (${status})`, 'info');
    }
  };

  const addCategory = (cat: Omit<AdminCategoryItem, 'id'>) => {
    const newCat: AdminCategoryItem = {
      ...cat,
      id: `CAT-${Date.now()}`,
    };
    setAdminCategories((prev) => [...prev, newCat]);
    showToast(`Category "${cat.name}" added successfully!`, 'ok');
  };

  const toggleCategoryActive = (id: string) => {
    setAdminCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const updateDisputeStatus = (
    id: string,
    status: 'Open' | 'In Progress' | 'Resolved',
    note?: string
  ) => {
    setAdminDisputes((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const newEntry = note
            ? {
                id: `TL-${Date.now()}`,
                author: 'Super Admin',
                role: 'admin' as Role,
                message: note,
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              }
            : undefined;
          return {
            ...d,
            status,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            resolutionNotes: status === 'Resolved' && note ? note : d.resolutionNotes,
            timeline: newEntry ? [...d.timeline, newEntry] : d.timeline,
          };
        }
        return d;
      })
    );
    showToast(`Dispute #${id} updated to ${status}`, 'ok');
  };

  const sendBroadcast = (broadcast: Omit<AdminBroadcastItem, 'id' | 'sentAt'>) => {
    const newBroadcast: AdminBroadcastItem = {
      ...broadcast,
      id: `BRD-${Date.now()}`,
      sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setAdminBroadcasts((prev) => [newBroadcast, ...prev]);
    showToast(`Broadcast notification sent to ${broadcast.recipientsCount} users!`, 'ok');
  };

  const updateAdminSettings = (settings: Partial<AdminSystemSettings>) => {
    setAdminSettings((prev) => ({ ...prev, ...settings }));
    showToast('Platform settings updated successfully', 'ok');
  };

  // -------------------------------------------------------------
  // Vendor Domain Action Handlers (V01 - V16)
  // -------------------------------------------------------------
  const setActiveVendorTab = (tab: VendorTab, params?: Record<string, unknown>) => {
    setActiveVendorTabState(tab);
    if (params?.rfqId) setSelectedVendorRfqId(params.rfqId as string);
    if (params?.orderId) setSelectedVendorOrderId(params.orderId as string);
    if (params?.quoteId) setSelectedQuotationId(params.quoteId as string);
    const targetPath = `/vendor/${tab}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateVendorProfile = (updates: Partial<VendorCompanyProfile>) => {
    setVendorProfile((prev) => ({ ...prev, ...updates }));
    showToast('تم حفظ تحديثات الملف التعريفي للشركة', 'ok');
  };

  const setVendorKycStatus = (status: KYCStatus) => {
    setVendorProfile((prev) => ({ ...prev, kycStatus: status }));
    showToast(`تم تبديل حالة التوثيق إلى: ${status}`, status === 'VERIFIED' ? 'ok' : 'info');
  };

  const addVendorService = (service: Omit<VendorServiceItem, 'id'>) => {
    const newService: VendorServiceItem = {
      ...service,
      id: `srv_${Date.now()}`,
    };
    setVendorServices((prev) => [newService, ...prev]);
    showToast('تمت إضافة الخدمة إلى الكتالوج بنجاح', 'ok');
  };

  const updateVendorService = (id: string, updates: Partial<VendorServiceItem>) => {
    setVendorServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast('تم تحديث بيانات الخدمة', 'ok');
  };

  const deleteVendorService = (id: string) => {
    setVendorServices((prev) => prev.filter((s) => s.id !== id));
    showToast('تم حذف الخدمة من الكتالوج', 'info');
  };

  const toggleVendorServiceActive = (id: string) => {
    setVendorServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const submitQuotation = (quotation: Omit<VendorQuotationItem, 'id' | 'submittedAt' | 'status'>) => {
    const newQuote: VendorQuotationItem = {
      ...quotation,
      id: `quot_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    setVendorQuotations((prev) => [newQuote, ...prev]);
    setVendorRfqs((prev) =>
      prev.map((r) => (r.id === quotation.rfqId ? { ...r, hasQuoted: true, status: 'QUOTED' } : r))
    );
    showToast('تم تقديم عرض السعر للمنظم بنجاح!', 'ok');
  };

  const withdrawQuotation = (id: string) => {
    setVendorQuotations((prev) => prev.filter((q) => q.id !== id));
    showToast('تم سحب عرض السعر', 'info');
  };

  const updateServiceOrderStatus = (orderId: string, status: ServiceOrderStatus) => {
    setVendorOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`تم تحديث حالة أمر التشغيل إلى ${status}`, 'ok');
  };

  const toggleOrderMilestone = (orderId: string, milestoneId: string) => {
    setVendorOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedMilestones = order.milestones.map((m) =>
          m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted, completedAt: !m.isCompleted ? new Date().toISOString() : undefined } : m
        );
        const completedCount = updatedMilestones.filter((m) => m.isCompleted).length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);
        return {
          ...order,
          milestones: updatedMilestones,
          progressPercent,
          status: progressPercent === 100 ? 'COMPLETED' : order.status,
        };
      })
    );
  };

  const addOrderNote = (orderId: string, text: string) => {
    setVendorOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          notes: [
            ...o.notes,
            {
              id: `note_${Date.now()}`,
              author: vendorProfile.name,
              text,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      })
    );
    showToast('تمت إضافة الملاحظة لأمر التشغيل', 'ok');
  };

  const replyToVendorReview = (reviewId: string, replyText: string) => {
    setVendorReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, vendorReply: { text: replyText, date: new Date().toISOString() } }
          : r
      )
    );
    showToast('تم نشر الرد على التقييم بنجاح', 'ok');
  };

  const updateVendorPayoutSettings = (settings: Partial<VendorPayoutSettings>) => {
    setVendorPayoutSettings((prev) => ({ ...prev, ...settings }));
    showToast('تم حفظ إعدادات الحساب البنكي والتحويلات', 'ok');
  };

  // --------------------------------------------------------------------------
  // Organizer Domain Actions (O01 - O25)
  // --------------------------------------------------------------------------
  const setActiveOrganizerTab = (tab: OrganizerTab, params?: Record<string, unknown>) => {
    setActiveOrganizerTabState(tab);
    if (params?.eventId) setSelectedCommandCenterEventId(params.eventId as number);
    const targetPath = `/organizer/${tab}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  const updateOrganizerProfile = (updates: Partial<OrganizerProfile>) => {
    setOrganizerProfile((prev) => ({ ...prev, ...updates }));
    showToast('تم تحديث الملف التعريفي للمنظم بنجاح', 'ok');
  };

  const toggleGate = () => {
    setGateOpen((prev) => {
      const next = !prev;
      showToast(next ? 'تم استئناف تشغيل البوابة ومسح التذاكر' : 'تم إيقاف البوابة مؤقتاً', next ? 'ok' : 'info');
      return next;
    });
  };

  const verifyGateTicket = (code: string): { status: 'ADMIT' | 'DUPLICATE' | 'INVALID'; reason?: string; ticket?: DigitalTicket } => {
    if (!gateOpen) {
      showToast('البوابة متوقفة مؤقتاً عن استقبال الحضور!', 'err');
      return { status: 'INVALID', reason: 'Gate is paused by operations team.' };
    }

    const cleanCode = code.trim().toUpperCase();
    const existingTicket = tickets.find((t) => t.qrToken?.toUpperCase() === cleanCode || t.id.toUpperCase() === cleanCode);

    const nowTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

    if (!existingTicket) {
      const invalidRecord: GateScanRecord = {
        id: `scan_${Date.now()}`,
        ticketId: cleanCode || 'UNKNOWN-HASH',
        attendeeName: 'غير معروف (تذكرة غير مسجلة)',
        eventTitle: 'Tech Summit Cairo 2026',
        tier: 'غير صالحة',
        timestamp: nowTime,
        status: 'INVALID',
        rejectionReason: 'فشل التوقيع الرقمي / التذكرة غير موجودة بالنظام',
        gateName: 'Gate A - Smart Scan',
      };
      setGateScans((prev) => [invalidRecord, ...prev]);
      showToast('تذكرة غير صالحة! تم رفض الدخول وتسجيل محاولة مشبوهة.', 'err');
      return { status: 'INVALID', reason: 'Cryptographic Signature Mismatch / Invalid Ticket Hash.' };
    }

    if (existingTicket.status === 'Used') {
      const duplicateRecord: GateScanRecord = {
        id: `scan_${Date.now()}`,
        ticketId: existingTicket.qrToken || existingTicket.id,
        attendeeName: `${existingTicket.attendeeName} (محاولة مكررة)`,
        attendeeEmail: 'visitor@example.com',
        eventTitle: existingTicket.eventTitle,
        tier: existingTicket.tierName,
        timestamp: nowTime,
        status: 'DUPLICATE',
        rejectionReason: 'محاولة إعادة استخدام التذكرة (Anti-Replay Violation) - تم الدخول مسبقاً',
        gateName: 'Gate A - Smart Scan',
      };
      setGateScans((prev) => [duplicateRecord, ...prev]);
      showToast('تنبيه أمني: التذكرة مستخدمة مسبقاً! تم رفض الدخول المتكرر.', 'err');
      return { status: 'DUPLICATE', reason: 'Ticket already marked USED. Anti-replay transaction triggered.' };
    }

    // Success admit
    const admitRecord: GateScanRecord = {
      id: `scan_${Date.now()}`,
      ticketId: existingTicket.qrToken || existingTicket.id,
      attendeeName: existingTicket.attendeeName,
      attendeeEmail: 'visitor@example.com',
      eventTitle: existingTicket.eventTitle,
      tier: existingTicket.tierName,
      timestamp: nowTime,
      status: 'ADMIT',
      gateName: 'Gate A - Smart Scan',
    };
    setGateScans((prev) => [admitRecord, ...prev]);

    // Update ticket state to Used
    setTickets((prev) =>
      prev.map((t) => (t.id === existingTicket.id ? { ...t, status: 'Used' } : t))
    );

    showToast(`مرحباً بك ${existingTicket.attendeeName}! تم التحقق بنجاح (${existingTicket.tierName}).`, 'ok');
    return { status: 'ADMIT', ticket: { ...existingTicket, status: 'Used' } };
  };

  const createOrganizerRFQ = (rfqData: Omit<OrganizerRFQPayload, 'id' | 'rfqCode' | 'createdAt' | 'quotationsReceivedCount' | 'status'>): string => {
    const newId = `rfq-${Date.now()}`;
    const newCode = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRfq: OrganizerRFQPayload = {
      ...rfqData,
      id: newId,
      rfqCode: newCode,
      status: 'OPEN',
      quotationsReceivedCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setOrganizerRfqs((prev) => [newRfq, ...prev]);

    // Two-Way Sync: immediately add to vendorRfqs so vendors see this new opportunity!
    const vendorOpportunity: VendorRFQItem = {
      id: newId,
      rfqCode: newCode,
      eventTitle: rfqData.eventTitle,
      eventTitleAr: rfqData.eventTitle,
      organizerName: organizerProfile.name,
      organizerAvatar: organizerProfile.avatar,
      organizerEmail: organizerProfile.email,
      organizerPhone: organizerProfile.phone,
      category: rfqData.category,
      categoryAr: rfqData.categoryAr,
      requiredServices: rfqData.items.map((i) => i.name),
      requiredServicesAr: rfqData.items.map((i) => i.name),
      eventDate: rfqData.eventDate,
      eventLocation: 'Cairo International Convention Center - CICC',
      eventCity: 'Cairo',
      estimatedBudgetMax: rfqData.budgetMax,
      deadline: rfqData.deadline,
      aiMatchScore: 94,
      matchReasons: ['تطابق تام مع تصنيف الخدمات المطلوب', 'تغطية للمدينة وتاريخ الفعالية'],
      matchReasonsAr: ['تطابق تام مع تصنيف الخدمات المطلوب', 'تغطية للمدينة وتاريخ الفعالية'],
      status: 'NEW',
      scopeDescription: rfqData.items.map((i) => `${i.name} (الكمية: ${i.qty} ${i.unit}) - ${i.specs}`).join('\n'),
      scopeDescriptionAr: rfqData.items.map((i) => `${i.name} (الكمية: ${i.qty} ${i.unit}) - ${i.specs}`).join('\n'),
      requirementsList: rfqData.items.map((i) => i.name),
      requirementsListAr: rfqData.items.map((i) => i.name),
      expectedAttendees: 500,
      hasQuoted: false,
    };
    setVendorRfqs((prev) => [vendorOpportunity, ...prev]);

    showToast(`تم نشر طلب الـ RFQ بنجاح برقم ${newCode} وإخطار الموردين المؤهلين!`, 'ok');
    return newId;
  };

  const awardQuotationContract = (rfqId: string, quoteId: string) => {
    // 1. Update quotation status to ACCEPTED
    let selectedQuote: OrganizerQuotationComparison | undefined;
    setOrganizerQuotes((prev) => {
      const quotesForRfq = prev[rfqId] || [];
      const updated = quotesForRfq.map((q) => {
        if (q.id === quoteId) {
          selectedQuote = q;
          return { ...q, status: 'ACCEPTED' as const };
        }
        return { ...q, status: 'REJECTED' as const };
      });
      return { ...prev, [rfqId]: updated };
    });

    // 2. Update RFQ status to AWARDED
    setOrganizerRfqs((prev) =>
      prev.map((r) => (r.id === rfqId ? { ...r, status: 'AWARDED' } : r))
    );

    // 3. Create Organizer Service Order
    const currentRfq = organizerRfqs.find((r) => r.id === rfqId);
    const newOrderCode = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderId = `ord-${Date.now()}`;
    const newOrder: OrganizerServiceOrder = {
      id: newOrderId,
      orderCode: newOrderCode,
      rfqId,
      quotationId: quoteId,
      eventId: currentRfq?.eventId || 1,
      eventTitle: currentRfq?.eventTitle || 'Tech Summit Cairo 2026',
      vendorId: selectedQuote?.vendorId || 'ven-1',
      vendorName: selectedQuote?.vendorName || 'SoundWave Egypt',
      vendorPhone: '+20 102 334 4556',
      vendorEmail: 'contracts@vendor.eg',
      category: currentRfq?.category || 'Sound & Audio',
      categoryAr: currentRfq?.categoryAr || 'الصوتيات والأنظمة الصوتية',
      totalAmount: selectedQuote?.proposedPrice || 42000,
      status: 'IN_PROGRESS',
      currentMilestone: 'Contract Signed & Advance Payment Confirmed',
      currentMilestoneAr: 'توقيع العقد وسداد الدفعة المقدمة',
      progressPercent: 25,
      startDate: new Date().toISOString().split('T')[0],
      completionDate: currentRfq?.eventDate || '2026-06-06',
      milestones: [
        { id: 'm1', title: 'Contract Signed & Advance Payment', titleAr: 'توقيع العقد وسداد الدفعة المقدمة', completed: true, dueDate: '2026-03-25' },
        { id: 'm2', title: 'Technical Site Survey & Floorplan Check', titleAr: 'المعاينة الميدانية ومطابقة المخطط الهندسي', completed: false, dueDate: '2026-04-10' },
        { id: 'm3', title: 'Equipment Warehouse Staging', titleAr: 'تجهيز واختبار المعدات بالمخازن', completed: false, dueDate: '2026-06-04' },
        { id: 'm4', title: 'On-site Rigging & Live Audio Run', titleAr: 'التركيب الميداني والتشغيل الحي', completed: false, dueDate: '2026-06-06' },
      ],
      deliverablesAccepted: false,
      reviewed: false,
    };
    setOrganizerOrders((prev) => [newOrder, ...prev]);

    // Two-way sync: Add to vendorOrders!
    const newVendorOrder: VendorServiceOrderItem = {
      id: newOrderId,
      orderNumber: newOrderCode,
      rfqId,
      quotationId: quoteId,
      eventTitle: currentRfq?.eventTitle || 'Tech Summit Cairo 2026',
      eventTitleAr: 'قمة القاهرة للتكنولوجيا 2026',
      organizerName: organizerProfile.name,
      organizerPhone: organizerProfile.phone,
      organizerEmail: organizerProfile.email,
      venueName: 'Cairo International Convention Center - CICC',
      venueCity: 'Cairo',
      eventDate: currentRfq?.eventDate || '2026-06-06',
      contractValue: selectedQuote?.proposedPrice || 42000,
      paidAmount: Math.round((selectedQuote?.proposedPrice || 42000) * 0.4),
      status: 'IN_PROGRESS',
      progressPercent: 25,
      milestones: [
        { id: 'm1', title: 'Contract Signed & Advance Payment', titleAr: 'توقيع العقد وسداد الدفعة المقدمة', isCompleted: true, completedAt: new Date().toISOString(), dueDate: '2026-03-25' },
        { id: 'm2', title: 'Technical Site Survey & Floorplan Check', titleAr: 'المعاينة الميدانية ومطابقة المخطط الهندسي', isCompleted: false, dueDate: '2026-04-10' },
        { id: 'm3', title: 'Equipment Warehouse Staging', titleAr: 'تجهيز واختبار المعدات بالمخازن', isCompleted: false, dueDate: '2026-06-04' },
        { id: 'm4', title: 'On-site Rigging & Live Audio Run', titleAr: 'التركيب الميداني والتشغيل الحي', isCompleted: false, dueDate: '2026-06-06' },
      ],
      notes: [
        { id: 'n1', author: 'System', text: 'تمت ترسية العقد من المنظم وبدء مرحلة التنفيذ التعاقدي.', timestamp: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    };
    setVendorOrders((prev) => [newVendorOrder, ...prev]);

    showToast(`تهانينا! تمت ترسية العقد بنجاح برقم ${newOrderCode} وإصدار أمر التنفيذ.`, 'ok');
  };

  const toggleOrganizerOrderMilestone = (orderId: string, milestoneId: string) => {
    setOrganizerOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updated = order.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const doneCount = updated.filter((m) => m.completed).length;
        const progress = Math.round((doneCount / updated.length) * 100);
        return {
          ...order,
          milestones: updated,
          progressPercent: progress,
          status: progress === 100 ? 'COMPLETED' : order.status,
        };
      })
    );
    showToast('تم تحديث حالة المرحلة اللوجستية بنجاح', 'ok');
  };

  const confirmOrderDeliverables = (orderId: string) => {
    setOrganizerOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              deliverablesAccepted: true,
              status: 'COMPLETED',
              progressPercent: 100,
            }
          : o
      )
    );
    showToast('تم تأكيد استلام كافة التجهيزات وإغلاق أمر التنفيذ بنجاح!', 'ok');
  };

  const submitOrganizerVendorReview = (orderId: string, _vendorId: string, rating: number, review: string) => {
    setOrganizerOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, reviewed: true } : o))
    );
    // Two-way sync: Add to vendorReviews
    const newReviewItem: VendorReviewItem = {
      id: `rev_${Date.now()}`,
      organizerName: organizerProfile.name,
      organizerCompany: organizerProfile.organization,
      organizerAvatar: organizerProfile.avatar,
      eventTitle: 'Tech Summit Cairo 2026',
      eventTitleAr: 'قمة القاهرة للتقنية',
      rating,
      qualityRating: rating,
      punctualityRating: rating,
      communicationRating: rating,
      valueRating: rating,
      date: new Date().toISOString().split('T')[0],
      comment: review,
    };
    setVendorReviews((prev) => [newReviewItem, ...prev]);
    showToast('شكراً لك! تم نشر تقييمك لشركة التنفيذ بنجاح.', 'ok');
  };

  const publishOrganizerEvent = (eventId: number) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'Published' } : e))
    );
    showToast('تم نشر الفعالية رسمياً وفتح حجز التذاكر للجمهور!', 'ok');
  };

  const submitEventForApproval = (eventData: Partial<EventItem> & Record<string, any>): number => {
    const newId = events.length + 1;
    const catName = eventData.cat || eventData.category || 'Technology';
    const newEvent: EventItem = {
      id: newId,
      title: eventData.title || 'فعالية جديدة',
      titleAr: eventData.titleAr || eventData.title || 'فعالية جديدة',
      cat: catName,
      date: eventData.date || '2026-08-15',
      time: eventData.time || '10:00 AM – 06:00 PM',
      venue: eventData.venue || 'مركز القاهرة الدولي للمؤتمرات',
      city: eventData.city || 'Cairo',
      address: eventData.address || 'El-Nasr Rd, Nasr City',
      price: eventData.price || 250,
      left: eventData.left ?? 500,
      capacity: eventData.capacity || 500,
      img: eventData.img || eventData.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      description: eventData.description || 'وصف الفعالية',
      descriptionAr: eventData.descriptionAr || 'وصف الفعالية',
      featured: false,
      rating: 5.0,
      status: 'PendingApproval',
      organizer: organizerProfile.organization,
      organizerLogo: organizerProfile.avatar,
      tiers: eventData.tiers || [
        { id: 't1', name: 'VIP Pass', price: 450, capacity: 100, remaining: 100, perks: ['مقعد أمامي', 'دخول صالة كبار الزوار'] },
        { id: 't2', name: 'Regular Pass', price: 200, capacity: 400, remaining: 400, perks: ['دخول القاعة العامة'] },
      ],
      agenda: eventData.agenda || [
        { id: 'ag1', time: '09:00 AM', title: 'التسجيل واستقبال الحضور', speaker: 'فريق التنظيم' },
        { id: 'ag2', time: '10:00 AM', title: 'الكلمة الافتتاحية للمؤتمر', speaker: 'د. كريم فاروق' },
      ],
      speakers: eventData.speakers || [],
      sponsors: eventData.sponsors || [],
    };

    setEvents((prev) => [newEvent, ...prev]);

    // Also notify Super Admin queue
    const adminEvent: AdminModerationEvent = {
      id: newId,
      title: newEvent.title,
      titleAr: newEvent.titleAr,
      category: newEvent.cat,
      categoryAr: 'تكنولوجيا',
      organizerName: organizerProfile.organization,
      organizerEmail: organizerProfile.email,
      date: newEvent.date,
      time: newEvent.time || '10:00 AM – 06:00 PM',
      venue: newEvent.venue,
      city: newEvent.city,
      price: newEvent.price,
      capacity: newEvent.capacity || 500,
      submittedAt: new Date().toISOString(),
      status: 'PendingApproval',
      description: newEvent.description || 'وصف الفعالية',
      descriptionAr: newEvent.descriptionAr,
      coverImage: newEvent.img,
      tiers: newEvent.tiers || [],
      speakers: newEvent.speakers || [],
      agenda: newEvent.agenda || [],
      complianceCheck: {
        venueConfirmed: true,
        pricingValid: true,
        termsAccepted: true,
        aiContentClean: true,
      },
    };
    setAdminEventsQueue((prev) => [adminEvent, ...prev]);

    showToast('تم إرسال الفعالية للمراجعة والاعتماد من الإدارة المركزية بنجاح!', 'ok');
    return newId;
  };

  const updateEventTiers = (eventId: number, tiers: TicketTier[]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, tiers } : e))
    );
    showToast('تم تحديث فئات وأسعار التذاكر بنجاح', 'ok');
  };

  const updateEventAgenda = (eventId: number, agenda: AgendaItem[]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, agenda } : e))
    );
    showToast('تم تحديث جدول الأعمال بنجاح', 'ok');
  };

  const updateEventSpeakers = (eventId: number, speakers: Speaker[]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, speakers } : e))
    );
    showToast('تم تحديث قائمة المتحدثين بنجاح', 'ok');
  };

  const updateEventSponsors = (eventId: number, sponsors: Sponsor[]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, sponsors } : e))
    );
    showToast('تم تحديث الرعاة والشركاء بنجاح', 'ok');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem('eviq-auth');
    localStorage.removeItem('eviq-user-profile');
    setCurrentUser(DEFAULT_ATTENDEE_USER);
    setEvents(INITIAL_EVENTS);
    setFavs([1, 2]);
    sessionStorage.removeItem('eviq-screen');
    go('landing');
    showToast('Demo data reset to initial state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        screenParams,
        role,
        currentUser,
        isAuthenticated,
        events,
        favs,
        bookings,
        tickets,
        notifications,
        toast,
        isLoading,
        setIsLoading,
        toggleLoading,
        go,
        setRole,
        setCurrentUser,
        updateUserProfile,
        login,
        logout,
        toggleFav,
        bookTickets,
        bookMultiTickets,
        payBooking,
        showToast,
        markAllNotificationsRead,
        resetDemoData,

        // Admin Domain Exports
        activeAdminTab,
        setActiveAdminTab,
        selectedAdminUserId,
        setSelectedAdminUserId,
        selectedAdminKycId,
        setSelectedAdminKycId,
        selectedAdminEventId,
        setSelectedAdminEventId,
        adminUsers,
        adminKycQueue,
        adminEventsQueue,
        adminCategories,
        adminDisputes,
        adminBroadcasts,
        adminMetrics,
        adminSettings,
        addAdminUser,
        toggleUserStatus,
        reviewKyc,
        moderateEvent,
        addCategory,
        toggleCategoryActive,
        updateDisputeStatus,
        sendBroadcast,
        updateAdminSettings,

        // Vendor Domain Exports
        activeVendorTab,
        setActiveVendorTab,
        vendorProfile,
        updateVendorProfile,
        vendorServices,
        addVendorService,
        updateVendorService,
        deleteVendorService,
        toggleVendorServiceActive,
        vendorRfqs,
        selectedVendorRfqId,
        setSelectedVendorRfqId,
        vendorQuotations,
        selectedQuotationId,
        setSelectedQuotationId,
        submitQuotation,
        withdrawQuotation,
        vendorOrders,
        selectedVendorOrderId,
        setSelectedVendorOrderId,
        updateServiceOrderStatus,
        toggleOrderMilestone,
        addOrderNote,
        vendorReviews,
        replyToVendorReview,
        vendorPayoutSettings,
        updateVendorPayoutSettings,
        setVendorKycStatus,

        // Organizer Domain Exports (O01 - O25)
        activeOrganizerTab,
        setActiveOrganizerTab,
        organizerProfile,
        updateOrganizerProfile,
        gateScans,
        gateOpen,
        toggleGate,
        verifyGateTicket,
        organizerRfqs,
        createOrganizerRFQ,
        organizerQuotes,
        awardQuotationContract,
        organizerOrders,
        toggleOrganizerOrderMilestone,
        confirmOrderDeliverables,
        submitOrganizerVendorReview,
        selectedCommandCenterEventId,
        setSelectedCommandCenterEventId,
        publishOrganizerEvent,
        submitEventForApproval,
        updateEventTiers,
        updateEventAgenda,
        updateEventSpeakers,
        updateEventSponsors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
