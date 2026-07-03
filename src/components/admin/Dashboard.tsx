import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, CalendarDays, Users, TrendingUp } from 'lucide-react';
import { supabase, Order, Consultation, Lead } from '../../lib/supabase';

interface Stats {
  revenue: number;
  orders: number;
  pendingConsultations: number;
  newLeads: number;
  recentOrders: Order[];
  recentConsultations: Consultation[];
  recentLeads: Lead[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const [ordersRes, consultsRes, leadsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('consultations').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
      ]);

      const orders = (ordersRes.data || []) as Order[];
      const consults = (consultsRes.data || []) as Consultation[];
      const leads = (leadsRes.data || []) as Lead[];

      setStats({
        revenue: orders.filter((o) => o.status === 'paid').reduce((s, o) => s + Number(o.amount), 0),
        orders: orders.length,
        pendingConsultations: consults.filter((c) => c.status === 'requested' || c.status === 'scheduled').length,
        newLeads: leads.filter((l) => l.status === 'new').length,
        recentOrders: orders.slice(0, 5),
        recentConsultations: consults.slice(0, 5),
        recentLeads: leads.slice(0, 5),
      });
    })();
  }, []);

  if (!stats) return <div className="text-navy-500">Loading dashboard...</div>;

  const cards = [
    { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'bg-gold-500' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'bg-navy-900' },
    { label: 'Active Consultations', value: stats.pendingConsultations, icon: CalendarDays, color: 'bg-emerald-600' },
    { label: 'New Leads', value: stats.newLeads, icon: Users, color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-navy-900">Dashboard</h1>
          <p className="text-navy-500 mt-1">Overview of your business performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy-900">{value}</div>
            <div className="text-sm text-navy-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-navy-100">
          <h3 className="font-serif text-lg font-semibold text-navy-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {stats.recentOrders.length === 0 && <div className="text-sm text-navy-500">No orders yet.</div>}
            {stats.recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-navy-50 last:border-0">
                <div>
                  <div className="font-medium text-navy-900 text-sm">{o.customer_name || o.customer_email}</div>
                  <div className="text-xs text-navy-500">{new Date(o.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-navy-900">${Number(o.amount).toFixed(2)}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-navy-100">
          <h3 className="font-serif text-lg font-semibold text-navy-900 mb-4">Recent Consultations</h3>
          <div className="space-y-3">
            {stats.recentConsultations.length === 0 && <div className="text-sm text-navy-500">No consultations yet.</div>}
            {stats.recentConsultations.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-navy-50 last:border-0">
                <div>
                  <div className="font-medium text-navy-900 text-sm">{c.customer_name}</div>
                  <div className="text-xs text-navy-500">{c.preferred_date || 'No date set'}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-gold-100 text-gold-800',
    requested: 'bg-gold-100 text-gold-800',
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    refunded: 'bg-red-100 text-red-700',
    failed: 'bg-red-100 text-red-700',
    cancelled: 'bg-navy-100 text-navy-700',
    no_show: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${map[status] || 'bg-navy-100 text-navy-700'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
