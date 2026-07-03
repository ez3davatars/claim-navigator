import { useEffect, useState } from 'react';
import { supabase, Order } from '../../lib/supabase';
import DataTable from './DataTable';
import StatusBadge from './StatusBadge';

export default function Orders() {
  const [rows, setRows] = useState<Order[]>([]);

  const load = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setRows((data || []) as Order[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Order['status']) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    load();
  };

  return (
    <DataTable
      title="Orders"
      rows={rows}
      searchKeys={['customer_email', 'customer_name', 'stripe_session_id', 'package_id']}
      columns={[
        { key: 'created_at', label: 'Date', render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: 'customer_name', label: 'Customer', render: (r) => (
          <div>
            <div className="font-semibold">{r.customer_name || '-'}</div>
            <div className="text-xs text-navy-500">{r.customer_email}</div>
          </div>
        ) },
        { key: 'product', label: 'Product', render: (r) => (
          <div>
            <div className="font-semibold">{r.product}</div>
            <div className="text-xs text-navy-500">{r.package_id || 'starter'}</div>
          </div>
        ) },
        { key: 'amount', label: 'Amount', render: (r) => `$${Number(r.amount).toFixed(2)}` },
        { key: 'representation_acknowledgment', label: 'Acks', render: (r) => (
          <div className="text-xs text-navy-600">
            <div>Not legal rep: {r.representation_acknowledgment ? 'yes' : 'no'}</div>
            <div>Customer supplied info: {r.intake_acknowledgment ? 'yes' : 'no'}</div>
          </div>
        ) },
        { key: 'status', label: 'Status', render: (r) => (
          <select
            value={r.status}
            onChange={(e) => updateStatus(r.id, e.target.value as Order['status'])}
            className="text-xs font-semibold px-2.5 py-1 rounded-full border-0 bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {['pending', 'paid', 'refunded', 'failed', 'cancelled'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) },
        { key: 'fulfillment_status', label: 'Fulfillment', render: (r) => <StatusBadge status={r.fulfillment_status} /> },
      ]}
    />
  );
}
