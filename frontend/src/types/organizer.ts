export type OrganizerTab =
  | 'overview'
  | 'events'
  | 'wizard'
  | 'command-center'
  | 'checkin'
  | 'bookings'
  | 'ai-planner'
  | 'marketplace'
  | 'rfqs'
  | 'quotes'
  | 'orders'
  | 'reviews'
  | 'settings';

export interface OrganizerProfile {
  id: string;
  name: string;
  nameAr: string;
  organization: string;
  organizationAr: string;
  avatar: string;
  email: string;
  phone: string;
  verified: boolean;
  totalEventsCreated: number;
  totalTicketsSold: number;
  totalRevenueEgp: number;
  rating: number;
}

export interface GateScanRecord {
  id: string;
  ticketId: string;
  attendeeName: string;
  attendeeEmail?: string;
  eventTitle: string;
  tier: string;
  timestamp: string;
  status: 'ADMIT' | 'DUPLICATE' | 'INVALID';
  rejectionReason?: string;
  gateName: string;
}

export interface AILogisticsItem {
  id: string;
  category: string;
  categoryAr: string;
  name: string;
  nameAr: string;
  suggestedQty: number;
  unit: string;
  unitAr: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  specs: string;
  specsAr: string;
  selected: boolean;
}

export interface OrganizerRFQPayload {
  id: string;
  rfqCode: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  category: string;
  categoryAr: string;
  items: Array<{
    name: string;
    qty: number;
    unit: string;
    specs: string;
  }>;
  budgetMax: number;
  deadline: string;
  status: 'DRAFT' | 'OPEN' | 'QUOTED' | 'AWARDED' | 'CANCELLED';
  invitedVendors: string[];
  quotationsReceivedCount: number;
  createdAt: string;
}

export interface OrganizerQuotationComparison {
  id: string;
  rfqId: string;
  vendorId: string;
  vendorName: string;
  vendorLogo: string;
  vendorRating: number;
  vendorReviewsCount: number;
  verifiedKyc: boolean;
  proposedPrice: number;
  currency: string;
  deliveryDays: number;
  scopeSummary: string;
  scopeSummaryAr: string;
  paymentTerms: string;
  aiMatchScore: number;
  matchHighlights: string[];
  submittedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface OrganizerServiceOrder {
  id: string;
  orderCode: string;
  rfqId: string;
  quotationId: string;
  eventId: number;
  eventTitle: string;
  vendorId: string;
  vendorName: string;
  vendorPhone: string;
  vendorEmail: string;
  category: string;
  categoryAr: string;
  totalAmount: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  currentMilestone: string;
  currentMilestoneAr: string;
  progressPercent: number;
  startDate: string;
  completionDate: string;
  milestones: Array<{
    id: string;
    title: string;
    titleAr: string;
    completed: boolean;
    dueDate: string;
  }>;
  deliverablesAccepted: boolean;
  reviewed: boolean;
}
