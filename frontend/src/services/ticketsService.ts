import { apiClient, ApiResponse, IS_MOCK_FALLBACK } from './apiClient';
import { DigitalTicket, Booking } from '../types';

export interface BookingPayload {
  eventId: number;
  tierId: string;
  quantity: number;
  attendees?: { name: string; email?: string }[];
}

export interface GateVerifyResult {
  valid: boolean;
  ticket?: DigitalTicket;
  message: string;
  code: 'ADMIT' | 'DUPLICATE' | 'INVALID' | 'REVOKED';
}

export const ticketsService = {
  /**
   * Book tickets with atomic confirmation
   */
  async createBooking(payload: BookingPayload): Promise<{ booking: Booking; tickets: DigitalTicket[] }> {
    try {
      const response = await apiClient.post<ApiResponse<{ booking: Booking; tickets: DigitalTicket[] }>>(
        '/bookings',
        payload
      );
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'Booking failed');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        const mockBookingId = `BK-${Date.now().toString(36).toUpperCase()}`;
        const mockBooking: Booking = {
          id: mockBookingId,
          eventId: payload.eventId,
          eventTitle: 'Event Booking',
          eventDate: new Date().toISOString().split('T')[0],
          venue: 'Cairo International Convention Centre',
          tierName: 'General Admission',
          quantity: payload.quantity,
          unitPrice: 250,
          total: 250 * payload.quantity,
          status: 'Confirmed',
          createdAt: new Date().toISOString().split('T')[0],
          attendeeName: payload.attendees?.[0]?.name || 'Attendee',
          attendeeEmail: payload.attendees?.[0]?.email || 'attendee@example.com',
        };
        const mockTickets: DigitalTicket[] = Array.from({ length: payload.quantity }, (_, idx) => ({
          id: `TCK-${mockBookingId}-${idx + 1}`,
          bookingId: mockBookingId,
          eventId: payload.eventId,
          eventTitle: 'Event Booking',
          eventDate: new Date().toISOString().split('T')[0],
          eventTime: '10:00 AM',
          venue: 'Cairo International Convention Centre',
          city: 'Cairo',
          seat: `GA-${idx + 1}`,
          tierName: 'General Admission',
          status: 'Confirmed',
          qrToken: `EVQ-${payload.eventId}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
          attendeeName: payload.attendees?.[idx]?.name || 'Attendee',
          gate: 'Gate 3',
        }));
        return { booking: mockBooking, tickets: mockTickets };
      }
      throw error;
    }
  },

  /**
   * Gate QR Verification - calls atomic check-in transaction in backend
   */
  async verifyGateQR(qrToken: string): Promise<GateVerifyResult> {
    try {
      const response = await apiClient.post<ApiResponse<GateVerifyResult>>('/checkins/verify', { qrToken });
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'Check-in failed');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        return {
          valid: true,
          message: 'Admitted successfully (Mock Verification)',
          code: 'ADMIT',
        };
      }
      throw error;
    }
  },
};

export default ticketsService;
