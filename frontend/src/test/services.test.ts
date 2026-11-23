import { describe, it, expect, beforeEach } from 'vitest';
import { apiClient, API_BASE_URL } from '../services/apiClient';
import { authService } from '../services/authService';
import { eventsService } from '../services/eventsService';
import { ticketsService } from '../services/ticketsService';

describe('Frontend API Services & Adapters', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes apiClient with proper base URL and timeout', () => {
    expect(apiClient.defaults.baseURL).toBe(API_BASE_URL);
    expect(apiClient.defaults.timeout).toBe(15000);
  });

  it('authService.login returns mock authentication in fallback mode', async () => {
    const res = await authService.login({
      email: 'test@event-smart.eg',
      role: 'attendee',
    });
    expect(res).toBeDefined();
    expect(res.user.email).toBe('test@event-smart.eg');
    expect(res.token).toContain('mock-jwt');
    expect(localStorage.getItem('eviq-jwt-token')).toBe(res.token);
  });

  it('authService.logout clears tokens properly', async () => {
    localStorage.setItem('eviq-jwt-token', 'sample-token');
    await authService.logout();
    expect(localStorage.getItem('eviq-jwt-token')).toBeNull();
    expect(localStorage.getItem('eviq-auth')).toBe('logged_out');
  });

  it('eventsService.getEvents retrieves event list', async () => {
    const events = await eventsService.getEvents();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('eventsService.getEventById retrieves specific event', async () => {
    const event = await eventsService.getEventById(1);
    expect(event).toBeDefined();
    expect(event?.id).toBe(1);
  });

  it('ticketsService.createBooking creates booking and digital tickets', async () => {
    const result = await ticketsService.createBooking({
      eventId: 1,
      tierId: 'general',
      quantity: 2,
      attendees: [{ name: 'Attendee 1' }, { name: 'Attendee 2' }],
    });
    expect(result.booking).toBeDefined();
    expect(result.booking.quantity).toBe(2);
    expect(result.tickets.length).toBe(2);
    expect(result.tickets[0].qrToken).toContain('EVQ-1-');
  });

  it('ticketsService.verifyGateQR admits ticket in fallback mode', async () => {
    const result = await ticketsService.verifyGateQR('EVQ-1-TEST');
    expect(result.valid).toBe(true);
    expect(result.code).toBe('ADMIT');
  });
});
