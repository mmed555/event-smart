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

  // Initial Bookings & Digital Tickets
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK-2026-0841',
      eventId: 1,
      eventTitle: 'Tech Summit Cairo 2026',
      eventDate: 'Mar 14–15, 2026',
      venue: 'CICC, Cairo',
      tierName: 'Regular Pass',
      quantity: 1,
      unitPrice: 350,
      total: 350,
      status: 'Confirmed',
      createdAt: '2026-03-01',
      qrToken: 'EVQ-TCS-00742-SEC-8921a',
      attendeeName: 'Ahmed Hassan',
      attendeeEmail: 'ahmed.hassan@example.com',
    },
  ]);

  const [tickets, setTickets] = useState<DigitalTicket[]>([
    {
      id: 'TKT-00742',
      bookingId: 'BK-2026-0841',
      eventId: 1,
      eventTitle: 'Tech Summit Cairo 2026',
      eventDate: 'Mar 14–15, 2026',
      eventTime: '09:00 – 18:00',
      venue: 'CICC (Cairo International Convention Center)',
      city: 'Cairo',
      seat: 'Hall A · Row G · Seat 14',
      tierName: 'Regular Pass',
      status: 'Confirmed',
      qrToken: 'EVQ-TCS-00742-SEC-8921a',
      attendeeName: 'Ahmed Hassan',
      gate: 'Gate A',
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
        go,
        setRole,
        toggleFav,
        bookTickets,
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
