
// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'organizer';
  referralCode: string;
  points: number;
  pointsExpiry?: Date;
  profileImage?: string;
}

export interface Event {
  id: string;
  name: string;
  organizerId: string;
  organizerName: string;
  description: string;
  location: string;
  category: string;
  startDate: Date;
  endDate: Date;
  price: number;
  isFree: boolean;
  availableSeats: number;
  image?: string;
  createdAt: Date;
}

export interface EventFilter {
  search?: string;
  category?: string;
  location?: string;
  date?: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  price: number;
  description?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  eventId: string;
  ticketId: string;
  quantity: number;
  totalPrice: number;
  status: 'waiting_for_payment' | 'waiting_for_confirmation' | 'done' | 'rejected' | 'expired' | 'canceled';
  paymentProof?: string;
  pointsUsed?: number;
  voucherId?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface Voucher {
  id: string;
  code: string;
  organizerId: string;
  eventId?: string;
  discount: number;
  isPercentage: boolean;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  isPercentage: boolean;
  expiryDate: Date;
  isActive: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
