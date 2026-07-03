/*
  # Add package checkout intake and acknowledgments

  Adds fields needed for the Standard and Expedited clerical document
  preparation packages, then replaces the public order INSERT policy so only
  the approved packages, prices, and required acknowledgments can be submitted.
*/

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS package_id text NOT NULL DEFAULT 'starter'
    CHECK (package_id IN ('starter', 'standard', 'expedited')),
  ADD COLUMN IF NOT EXISTS intake_document_content text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS intake_customer_responses text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS intake_formatting_instructions text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS representation_acknowledgment boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS intake_acknowledgment boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "Public can create a pending order with safe fields" ON orders;

CREATE POLICY "Public can create a pending package order with safe fields"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(customer_email)) > 3
    AND customer_email LIKE '%_@_%.__%'
    AND length(customer_email) <= 320
    AND length(coalesce(customer_name, '')) <= 200
    AND package_id IN ('starter', 'standard', 'expedited')
    AND (
      (package_id = 'starter' AND product = 'Claim Navigator Starter Pack' AND amount = 39)
      OR (package_id = 'standard' AND product = 'Standard Clerical Document Preparation' AND amount = 149)
      OR (package_id = 'expedited' AND product = 'Expedited Clerical Document Preparation' AND amount = 399)
    )
    AND currency = 'USD'
    AND status = 'pending'
    AND fulfillment_status = 'pending'
    AND representation_acknowledgment = true
    AND (
      package_id = 'starter'
      OR (
        intake_acknowledgment = true
        AND length(trim(intake_document_content)) > 0
        AND length(intake_document_content) <= 8000
        AND length(trim(intake_customer_responses)) > 0
        AND length(intake_customer_responses) <= 8000
      )
    )
    AND length(coalesce(intake_formatting_instructions, '')) <= 4000
    AND length(coalesce(case_type, '')) <= 200
    AND length(coalesce(stripe_payment_intent, '')) <= 200
    AND length(coalesce(stripe_session_id, '')) <= 200
  );
