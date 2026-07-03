import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Role = 'owner' | 'admin' | 'staff';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  created_at: string;
}

export interface Lead {
  id: string;
  email: string;
  name: string;
  source: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  notes: string;
  created_at: string;
}

export interface Customer {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  stripe_customer_id: string;
  total_spent: number;
  tags: string[];
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string | null;
  customer_email: string;
  customer_name: string;
  product: string;
  amount: number;
  currency: string;
  stripe_session_id: string;
  stripe_payment_intent: string;
  status: 'pending' | 'paid' | 'refunded' | 'failed' | 'cancelled';
  fulfillment_status: 'pending' | 'delivered';
  case_type: string;
  package_id: 'starter' | 'standard' | 'expedited';
  intake_document_content: string;
  intake_customer_responses: string;
  intake_formatting_instructions: string;
  representation_acknowledgment: boolean;
  intake_acknowledgment: boolean;
  created_at: string;
}

export interface Consultation {
  id: string;
  customer_email: string;
  customer_name: string;
  phone: string;
  preferred_date: string | null;
  preferred_time: string;
  case_summary: string;
  status: 'requested' | 'scheduled' | 'completed' | 'no_show' | 'cancelled';
  notes: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}
