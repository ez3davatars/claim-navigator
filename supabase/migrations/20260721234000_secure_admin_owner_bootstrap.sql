/*
  Bootstrap the first authenticated user as the owner on the server. This
  avoids relying on an anonymous client query and breaks the recursive
  admin_users SELECT policy used by the rest of the CRM policies.
*/

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

DROP POLICY IF EXISTS "Admins can view all admin users" ON public.admin_users;
CREATE POLICY "Admins can view all admin users"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('claim_navigator_first_admin'));

  IF NOT EXISTS (SELECT 1 FROM public.admin_users) THEN
    INSERT INTO public.admin_users (id, email, full_name, role)
    VALUES (
      NEW.id,
      COALESCE(NEW.email, ''),
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
      'owner'
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bootstrap_first_admin_after_signup ON auth.users;
CREATE TRIGGER bootstrap_first_admin_after_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();