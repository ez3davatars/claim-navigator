import { useEffect, useState } from 'react';
import { supabase, AdminUser } from '../lib/supabase';
import { navigate } from '../lib/router';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import Orders from '../components/admin/Orders';
import Customers from '../components/admin/Customers';
import Consultations from '../components/admin/Consultations';
import Leads from '../components/admin/Leads';
import Messages from '../components/admin/Messages';
import Team from '../components/admin/Team';

export default function Admin() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      const { data } = await supabase.from('admin_users').select('*').eq('id', session.user.id).maybeSingle();
      if (!data) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }
      setUser(data as AdminUser);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin/login');
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="text-navy-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50 flex">
      <Sidebar view={view} setView={setView} user={user} onSignOut={signOut} />
      <main className="flex-1 p-8 overflow-x-auto">
        {view === 'dashboard' && <Dashboard />}
        {view === 'orders' && <Orders />}
        {view === 'customers' && <Customers />}
        {view === 'consultations' && <Consultations />}
        {view === 'leads' && <Leads />}
        {view === 'messages' && <Messages />}
        {view === 'team' && user.role === 'owner' && <Team currentUser={user} />}
      </main>
    </div>
  );
}
