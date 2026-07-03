import { useEffect, useState } from 'react';
import { supabase, Lead } from '../../lib/supabase';
import DataTable from './DataTable';

export default function Leads() {
  const [rows, setRows] = useState<Lead[]>([]);

  const load = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setRows((data || []) as Lead[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Lead['status']) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    load();
  };

  return (
    <DataTable
      title="Leads"
      rows={rows}
      searchKeys={['email', 'name', 'source']}
      columns={[
        { key: 'created_at', label: 'Captured', render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: 'email', label: 'Contact', render: (r) => (
          <div>
            <div className="font-semibold">{r.name || '—'}</div>
            <div className="text-xs text-navy-500">{r.email}</div>
          </div>
        ) },
        { key: 'source', label: 'Source' },
        { key: 'status', label: 'Status', render: (r) => (
          <select
            value={r.status}
            onChange={(e) => updateStatus(r.id, e.target.value as Lead['status'])}
            className="text-xs font-semibold px-2.5 py-1 rounded-full border-0 bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {['new', 'contacted', 'converted', 'archived'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) },
      ]}
    />
  );
}
