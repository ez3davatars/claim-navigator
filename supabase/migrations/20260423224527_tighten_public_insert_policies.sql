/*
  # Tighten public INSERT policies

  ## Overview
  Replaces permissive "always true" WITH CHECK clauses on public-facing INSERT
  policies with validated constraints. Anonymous users can still submit forms,
  but cannot inject arbitrary internal state (e.g. pre-setting status to 'paid',
  inflating total_spent, or supplying empty garbage).

  ## Changes
    1. `leads` - enforce non-empty email, status defaults to 'new', notes empty
    2. `consultations` - enforce required name/email, status must be 'requested', notes empty
    3. `contact_messages` - enforce required fields, status must be 'new'
    4. `customers` - enforce non-empty email, total_spent must be 0, no preset stripe_customer_id or tags
    5. `orders` - enforce product/amount/currency/status='pending'/fulfillment='pending'; only admins can mark paid/refunded

  ## Notes
    - Admin-updated rows (marking orders paid, etc.) go through the authenticated UPDATE
      policies which require the row owner to be an admin.
    - These changes preserve functionality while preventing privilege escalation via form submission.
*/

-- leads
DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;
CREATE POLICY "Public can submit a lead with safe fields"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(email)) > 3
    AND email LIKE '%_@_%.__%'
    AND length(email) <= 320
    AND length(coalesce(name, '')) <= 200
    AND length(coalesce(source, '')) <= 100
    AND status = 'new'
    AND coalesce(notes, '') = ''
  );

-- consultations
DROP POLICY IF EXISTS "Anyone can request a consultation" ON consultations;
CREATE POLICY "Public can request a consultation with safe fields"
  ON consultations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(customer_name)) > 0
    AND length(customer_name) <= 200
    AND length(trim(customer_email)) > 3
    AND customer_email LIKE '%_@_%.__%'
    AND length(customer_email) <= 320
    AND length(coalesce(phone, '')) <= 40
    AND length(coalesce(case_summary, '')) <= 2000
    AND status = 'requested'
    AND coalesce(notes, '') = ''
  );

-- contact_messages
DROP POLICY IF EXISTS "Anyone can send a contact message" ON contact_messages;
CREATE POLICY "Public can send a contact message with safe fields"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(name) <= 200
    AND length(trim(email)) > 3
    AND email LIKE '%_@_%.__%'
    AND length(email) <= 320
    AND length(coalesce(subject, '')) <= 300
    AND length(trim(message)) > 0
    AND length(message) <= 5000
    AND status = 'new'
  );

-- customers
DROP POLICY IF EXISTS "Anyone can upsert a customer at checkout" ON customers;
CREATE POLICY "Public can create a customer with safe fields"
  ON customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(email)) > 3
    AND email LIKE '%_@_%.__%'
    AND length(email) <= 320
    AND length(coalesce(full_name, '')) <= 200
    AND length(coalesce(phone, '')) <= 40
    AND coalesce(stripe_customer_id, '') = ''
    AND total_spent = 0
    AND (tags IS NULL OR array_length(tags, 1) IS NULL)
  );

-- orders
DROP POLICY IF EXISTS "Anyone can create an order at checkout" ON orders;
CREATE POLICY "Public can create a pending order with safe fields"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(customer_email)) > 3
    AND customer_email LIKE '%_@_%.__%'
    AND length(customer_email) <= 320
    AND length(coalesce(customer_name, '')) <= 200
    AND product = 'Claim Navigator Starter Pack'
    AND amount = 39
    AND currency = 'USD'
    AND status = 'pending'
    AND fulfillment_status = 'pending'
    AND length(coalesce(case_type, '')) <= 200
    AND length(coalesce(stripe_payment_intent, '')) <= 200
    AND length(coalesce(stripe_session_id, '')) <= 200
  );
