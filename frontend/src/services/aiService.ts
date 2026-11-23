import { apiClient, ApiResponse, IS_MOCK_FALLBACK } from './apiClient';
import { AISlots } from '../types';

export interface AIChatRequestPayload {
  message: string;
  language?: 'ar' | 'en';
  currentSlots?: AISlots;
}

export interface AIChatResponsePayload {
  reply: string;
  extractedSlots?: AISlots;
  suggestedEventIds?: number[];
}

export const aiService = {
  /**
   * Send user message to advisory conversational AI service (ADR-0002)
   */
  async sendMessage(payload: AIChatRequestPayload): Promise<AIChatResponsePayload> {
    try {
      // Node.js backend proxies /api/v1/ai/chat -> FastAPI /internal/v1/nlp/chat
      const response = await apiClient.post<ApiResponse<AIChatResponsePayload>>('/ai/chat', payload);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'AI request failed');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        const isAr = payload.language === 'ar' || /[\u0600-\u06FF]/.test(payload.message);
        return {
          reply: isAr
            ? 'تم تحليل طلبك بنجاح! هذه أبرز الفعاليات المطابقة لاهتماماتك في القاهرة.'
            : 'I found matching events for your request in Cairo! Here are the best options.',
          extractedSlots: {
            category: 'Technology',
            city: 'Cairo',
            budgetMax: 500,
          },
          suggestedEventIds: [1, 2],
        };
      }
      throw error;
    }
  },
};

export default aiService;
