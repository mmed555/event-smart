import React, { createContext, useContext, useState, useEffect } from 'react';
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
  toggleUserStatus: (userId: string, reason?: string) => void;
  reviewKyc: (kycId: string, status: 'VERIFIED' | 'REJECTED' | 'REVISION_REQUESTED', notes?: string) => void;
  moderateEvent: (eventId: number, status: 'Approved' | 'Rejected' | 'Cancelled', notes?: string) => void;
  addCategory: (cat: Omit<AdminCategoryItem, 'id'>) => void;
  toggleCategoryActive: (id: string) => void;
  updateDisputeStatus: (id: string, status: 'Open' | 'In Progress' | 'Resolved', note?: string) => void;
  sendBroadcast: (broadcast: Omit<AdminBroadcastItem, 'id' | 'sentAt'>) => void;
  updateAdminSettings: (settings: Partial<AdminSystemSettings>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenId>(() => {
    return (sessionStorage.getItem('eviq-screen') as ScreenId) || 'landing';
  });
  const [screenParams, setScreenParams] = useState<ScreenParams>({});
  const [role, setRoleState] = useState<Role>('attendee');

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
    if (newScreen !== screen) {
      setScreen(newScreen);
      sessionStorage.setItem('eviq-screen', newScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
  const [activeAdminTab, setActiveAdminTabState] = useState<AdminTab>('overview');
  const [selectedAdminUserId, setSelectedAdminUserId] = useState<string | null>(null);
  const [selectedAdminKycId, setSelectedAdminKycId] = useState<string | null>(null);
  const [selectedAdminEventId, setSelectedAdminEventId] = useState<number | null>(null);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        toggleUserStatus,
        reviewKyc,
        moderateEvent,
        addCategory,
        toggleCategoryActive,
        updateDisputeStatus,
        sendBroadcast,
        updateAdminSettings,
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
