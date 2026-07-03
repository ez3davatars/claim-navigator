import { LayoutDashboard, ShoppingBag, Users, CalendarDays, Mail, UserCog, LogOut, Scale, Inbox } from 'lucide-react';
import { AdminUser } from '../../lib/supabase';

interface Props {
  view: string;
  setView: (v: string) => void;
  user: AdminUser;
  onSignOut: () => void;
}

export default function Sidebar({ view, setView, user, onSignOut }: Props) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'consultations', label: 'Consultations', icon: CalendarDays },
    { id: 'leads', label: 'Leads', icon: Mail },
    { id: 'messages', label: 'Messages', icon: Inbox },
  ];

  if (user.role === 'owner') {
    items.push({ id: 'team', label: 'Team', icon: UserCog });
  }

  return (
    <aside className="w-64 bg-navy-950 text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-white/5">
            <Scale className="w-5 h-5 text-gold-400" />
          </div>
          <span className="font-serif text-lg font-semibold">Claim Navigator</span>
        </div>
        <div className="text-xs text-navy-300 ml-1">CRM Dashboard</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              view === id ? 'bg-gold-500 text-navy-950' : 'text-navy-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-2 mb-2">
          <div className="text-sm font-semibold text-white truncate">{user.full_name || user.email}</div>
          <div className="text-xs text-gold-400 uppercase tracking-wider">{user.role}</div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
