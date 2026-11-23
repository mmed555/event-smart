import { apiClient, ApiResponse, IS_MOCK_FALLBACK } from './apiClient';
import { EventItem } from '../types';
import { INITIAL_EVENTS } from '../mock/data';

export interface EventFilterParams {
  category?: string;
  city?: string;
  date?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export const eventsService = {
  /**
   * Fetch events with filters and pagination
   */
  async getEvents(params: EventFilterParams = {}): Promise<EventItem[]> {
    try {
      const response = await apiClient.get<ApiResponse<EventItem[]>>('/events', { params });
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'Failed to fetch events');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        return INITIAL_EVENTS;
      }
      throw error;
    }
  },

  /**
   * Fetch event by ID
   */
  async getEventById(id: number): Promise<EventItem | null> {
    try {
      const response = await apiClient.get<ApiResponse<EventItem>>(`/events/${id}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        const found = INITIAL_EVENTS.find((e) => e.id === id);
        return found || null;
      }
      throw error;
    }
  },

  /**
   * Create new event (Organizer)
   */
  async createEvent(eventData: Partial<EventItem>): Promise<EventItem> {
    try {
      const response = await apiClient.post<ApiResponse<EventItem>>('/events', eventData);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'Failed to create event');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        return {
          id: Date.now(),
          title: eventData.title || 'Untitled Event',
          cat: eventData.cat || 'Technology',
          date: eventData.date || new Date().toISOString().split('T')[0],
          venue: eventData.venue || 'Cairo ICC',
          city: eventData.city || 'Cairo',
          price: eventData.price || 0,
          left: eventData.left || 100,
          capacity: eventData.capacity || 100,
          status: 'Published',
          img: eventData.img || '',
          organizer: eventData.organizer || 'Event Organizer',
          ...eventData,
        } as EventItem;
      }
      throw error;
    }
  },
};

export default eventsService;
