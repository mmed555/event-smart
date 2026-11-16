import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventItem,
  Role,
  Booking,
  DigitalTicket,
  NotificationItem,
} from '../types';
import { INITIAL_EVENTS, INITIAL_NOTIFICATIONS } from '../mock/data';

export type ScreenId =
  | 'system'
  | 'landing'
  | 'auth'
  | 'ai'
  | 'search'
  | 'details'
  | 'tickets'
  | 'org'
  | 'wizard'
  | 'planner'
  | 'checkin'
  | 'market'
  | 'quotes'
  | 'vendor'
  | 'admin'
  | 'mobile';

export interface ScreenParams {
  id?: number;
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
  toggleFav: (eventId: number) => void;
  bookTickets: (
    eventId: number,
    tierId: string,
    quantity: number,
    attendeeName: string,
    attendeeEmail: string
  ) => Promise<boolean>;
  payBooking: (bookingId: string) => void;
  showToast: (message: string, tone?: 'ok' | 'err' | 'info') => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenId>(() => {
    return (sessionStorage.getItem('eviq-screen') as ScreenId) || 'landing';
  });
  const [screenParams, setScreenParams] = useState<ScreenParams>({});
  const [role, setRoleState] = useState<Role>('attendee');
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

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const resetDemoData = () => {
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
        toggleFav,
        bookTickets,
        payBooking,
        showToast,
        markAllNotificationsRead,
        resetDemoData,
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
