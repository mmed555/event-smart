import { KYCStatus } from './index';

export type VendorTab =
  | 'overview'
  | 'services'
  | 'rfq-inbox'
  | 'my-quotes'
  | 'orders'
  | 'reviews'
  | 'kyc'
  | 'profile'
  | 'settings';

export interface VendorCompanyProfile {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  logo: string;
  coverImage: string;
  bio: string;
  bioAr: string;
  categories: string[];
  categoriesAr: string[];
  cities: string[];
  citiesAr: string[];
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear: number;
  crNumber: string;
  taxNumber: string;
  kycStatus: KYCStatus;
  kycSubmittedAt?: string;
  kycReviewedAt?: string;
  rejectionReason?: string;
  averageRating: number;
  totalReviews: number;
  completedOrdersCount: number;
  activeOrdersCount: number;
  totalEarnings: number;
  responseRatePercent: number;
  onTimeDeliveryRate: number;
  isAvailable: boolean;
  gallery: Array<{
    id: string;
    title: string;
    titleAr: string;
    imageUrl: string;
    category: string;
  }>;
}

export type PricingModel = 'fixed' | 'hourly' | 'daily' | 'per_unit' | 'custom';

export interface VendorServiceItem {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  pricingModel: PricingModel;
  basePrice: number;
  maxPrice?: number;
  unitLabel?: string;
  unitLabelAr?: string;
  turnaroundDays: number;
  isActive: boolean;
  imageUrl?: string;
  features: string[];
  featuresAr: string[];
}

export type VendorRFQStatus = 'NEW' | 'VIEWED' | 'QUOTED' | 'EXPIRED';

export interface VendorRFQItem {
  id: string;
  rfqCode: string;
  eventTitle: string;
  eventTitleAr: string;
  organizerName: string;
  organizerAvatar: string;
  organizerEmail: string;
  organizerPhone?: string;
  category: string;
  categoryAr: string;
  requiredServices: string[];
  requiredServicesAr: string[];
  eventDate: string;
  eventLocation: string;
  eventCity: string;
  estimatedBudgetMax: number;
  deadline: string;
  aiMatchScore: number;
  matchReasons: string[];
  matchReasonsAr: string[];
  status: VendorRFQStatus;
  scopeDescription: string;
  scopeDescriptionAr: string;
  requirementsList: string[];
  requirementsListAr: string[];
  expectedAttendees: number;
  hasQuoted: boolean;
}

export type QuotationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface VendorQuotationItem {
  id: string;
  rfqId: string;
  rfqCode: string;
  eventTitle: string;
  eventTitleAr: string;
  organizerName: string;
  proposedPrice: number;
  depositPercent: number;
  timelineDays: number;
  scopeSummary: string;
  scopeSummaryAr: string;
  items: Array<{
    title: string;
    titleAr: string;
    qty: number;
    unitPrice: number;
  }>;
  terms: string;
  termsAr: string;
  status: QuotationStatus;
  submittedAt: string;
  validUntil: string;
  feedbackFromOrganizer?: string;
}

export type ServiceOrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface OrderMilestone {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  isCompleted: boolean;
  completedAt?: string;
  dueDate: string;
}

export interface VendorServiceOrderItem {
  id: string;
  orderNumber: string;
  rfqId: string;
  quotationId: string;
  eventTitle: string;
  eventTitleAr: string;
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
  venueName: string;
  venueCity: string;
  eventDate: string;
  contractValue: number;
  paidAmount: number;
  status: ServiceOrderStatus;
  progressPercent: number;
  milestones: OrderMilestone[];
  notes: Array<{
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }>;
  createdAt: string;
}

export interface VendorReviewItem {
  id: string;
  organizerName: string;
  organizerAvatar: string;
  organizerCompany?: string;
  eventTitle: string;
  eventTitleAr: string;
  rating: number;
  qualityRating: number;
  punctualityRating: number;
  communicationRating: number;
  valueRating: number;
  comment: string;
  commentAr?: string;
  date: string;
  vendorReply?: {
    text: string;
    date: string;
  };
}

export interface VendorPayoutSettings {
  bankName: string;
  accountHolderName: string;
  iban: string;
  swiftCode: string;
  instapayHandle?: string;
  vodafoneCash?: string;
  automaticPayout: boolean;
  payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
}
