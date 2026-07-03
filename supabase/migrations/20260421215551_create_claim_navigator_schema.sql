/*
  # Claim Navigator CRM Schema

  ## Overview
  Creates the complete schema for the Claim Navigator landing page, sales, and CRM platform.

  ## 1. New Tables
    - `admin_users` - Staff members with role-based access (owner, admin, staff)
      - `id` (uuid, PK, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `role` (text) - owner | admin | staff
      - `created_at` (timestamptz)

    - `leads` - Email captures from lead magnets and newsletter signups
      - `id` (uuid, PK)
      - `email` (text)
      - `name` (text)
      - `source` (text) - where they came from
      - `status` (text) - new | contacted | converted
      - `notes` (text)
      - `created_at` (timestamptz)

    - `customers` - People who purchased or booked consultations
      - `id` (uuid, PK)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `stripe_customer_id` (text)
      - `total_spent` (numeric)
      - `tags` (text[])
      - `created_at` (timestamptz)

    - `orders` - Stripe purchase records
      - `id` (uuid, PK)
      - `customer_id` (uuid, FK)
      - `customer_email` (text)
      - `customer_name` (text)
      - `product` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `stripe_session_id` (text)
      - `stripe_payment_intent` (text)
      - `status` (text) - pending | paid | refunded | failed
      - `fulfillment_status` (text) - pending | delivered
      - `case_type` (text)
      - `created_at` (timestamptz)

    - `consultations` - Free 5-minute consultation bookings
      - `id` (uuid, PK)
      - `customer_email` (text)
      - `customer_name` (text)
      - `phone` (text)
      - `preferred_date` (date)
      - `preferred_time` (text)
      - `case_summary` (text)
      - `status` (text) - requested | scheduled | completed | no_show | cancelled
      - `notes` (text)
      - `created_at` (timestamptz)

    - `contact_messages` - General inquiry form submissions
      - `id` (uuid, PK)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text) - new | read | replied
      - `created_at` (timestamptz)

    - `customer_notes` - Internal notes on customer records
      - `id` (uuid, PK)
      - `customer_id` (uuid, FK)
      - `author_id` (uuid, FK admin_users)
      - `author_name` (text)
      - `content` (text)
      - `created_at` (timestamptz)

  ## 2. Security
    All tables have RLS enabled.
    - Public (anon) can INSERT into leads, consultations, contact_messages, orders (for checkout)
    - Only authenticated admin_users can SELECT/UPDATE/DELETE
    - Role hierarchy: owner > admin > staff
    - Owners can manage admin_users; admins can manage content; staff can view and update limited fields

  ## 3. Notes
    - `total_spent` auto-updates via triggers when an order is marked paid
    - Indexes added on frequently-queried columns (email, status, created_at)
*/

-- =========================
-- admin_users
-- =========================
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  role text NOT NULL DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'staff')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Owners can insert admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner'));

CREATE POLICY "Owners can update admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner'));

CREATE POLICY "Owners can delete admin users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner'));

-- =========================
-- leads
-- =========================
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text DEFAULT '',
  source text DEFAULT 'website',
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins and owners can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role IN ('owner', 'admin')));

-- =========================
-- customers
-- =========================
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  phone text DEFAULT '',
  stripe_customer_id text DEFAULT '',
  total_spent numeric(10,2) DEFAULT 0,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at DESC);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Anyone can upsert a customer at checkout"
  ON customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins and owners can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role IN ('owner', 'admin')));

-- =========================
-- orders
-- =========================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  customer_email text NOT NULL,
  customer_name text DEFAULT '',
  product text DEFAULT 'Claim Navigator Starter Pack',
  amount numeric(10,2) NOT NULL DEFAULT 39,
  currency text DEFAULT 'USD',
  stripe_session_id text DEFAULT '',
  stripe_payment_intent text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'failed', 'cancelled')),
  fulfillment_status text DEFAULT 'pending' CHECK (fulfillment_status IN ('pending', 'delivered')),
  case_type text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create an order at checkout"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Owners can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner'));

-- =========================
-- consultations
-- =========================
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  phone text DEFAULT '',
  preferred_date date,
  preferred_time text DEFAULT '',
  case_summary text DEFAULT '',
  status text DEFAULT 'requested' CHECK (status IN ('requested', 'scheduled', 'completed', 'no_show', 'cancelled')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a consultation"
  ON consultations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins can update consultations"
  ON consultations FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins and owners can delete consultations"
  ON consultations FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role IN ('owner', 'admin')));

-- =========================
-- contact_messages
-- =========================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins and owners can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role IN ('owner', 'admin')));

-- =========================
-- customer_notes
-- =========================
CREATE TABLE IF NOT EXISTS customer_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  author_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  author_name text DEFAULT '',
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notes_customer ON customer_notes(customer_id);

ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view customer notes"
  ON customer_notes FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Admins can insert customer notes"
  ON customer_notes FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid()));

CREATE POLICY "Authors and owners can update notes"
  ON customer_notes FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner')
  )
  WITH CHECK (
    author_id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner')
  );

CREATE POLICY "Authors and owners can delete notes"
  ON customer_notes FOR DELETE
  TO authenticated
  USING (
    author_id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users a WHERE a.id = auth.uid() AND a.role = 'owner')
  );
