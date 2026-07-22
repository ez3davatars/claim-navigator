/*
  PostgREST requires table grants in addition to RLS policies. Keep anonymous
  access limited to the public intake inserts; authenticated access remains
  constrained by the existing row-level policies.
*/

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.customers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.orders TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.consultations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.contact_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.customer_notes TO authenticated;

GRANT INSERT ON TABLE public.leads TO anon;
GRANT INSERT ON TABLE public.customers TO anon;
GRANT INSERT ON TABLE public.orders TO anon;
GRANT INSERT ON TABLE public.consultations TO anon;
GRANT INSERT ON TABLE public.contact_messages TO anon;
