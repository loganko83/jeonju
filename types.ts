export interface Transaction {
  id: string;
  date: string;
  merchantName: string;
  amount: number;
  cashbackEarned: number; // Positive for earned
  cashbackUsed: number;   // Positive if used
  type: 'PAYMENT' | 'CHARGE' | 'GIFT' | 'REFUND';
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  lat: number;
  lng: number;
  isCashback: boolean;
  description?: string;
  image?: string;
}

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  balance: number;
  cashbackBalance: number;
  cashbackRate: number; // e.g., 0.12 for 12%
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  type: 'EVENT' | 'NOTICE';
}

export interface Gift {
  id: string;
  type: 'RECEIVED' | 'SENT';
  otherParty: string; // Sender name if received, Receiver name if sent
  amount: number;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED' | 'EXPIRED';
  message: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'MARKETING' | 'TRANSACTION' | 'SYSTEM';
}
