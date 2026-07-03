import { useEffect, useState } from 'react';
import { supabase, Consultation } from '../../lib/supabase';
import DataTable from './DataTable';

export default function Consultations() {
  const [rows, setRows] = useState<Consultation[]>([]);

  const load = async () => {
    const { data } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
    setRows((data || []) as Consultation[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Consultation['status']) => {
    await supabase.from('consultations').update({ status }).eq('id', id);
    load();
  };

  return (
    <DataTable
      title="Consultations"
      rows={rows}
      searchKeys={['customer_email', 'customer_name']}
      columns={[
        { key: 'created_at', label: 'Requested', render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: 'customer_name', label: 'Customer', render: (r) => (
          <div>
            <div className="font-semibold">{r.customer_name}</div>
            <div className="text-xs text-navy-500">{r.customer_email}</div>
          </div>
        ) },
        { key: 'preferred_date', label: 'Preferred', render: (r) => (
          <div className="text-xs">
            <div>{r.preferred_date || 'Not set'}</div>
            <div className="text-navy-500">{r.preferred_time}</div>
          </div>
        ) },
        { key: 'case_summary', label: 'Summary', render: (r) => (
          <div className="max-w-xs truncate text-navy-600" title={r.case_summary}>{r.case_summary || '—'}</div>
        ) },
        { key: 'status', label: 'Status', render: (r) => (
          <select
            value={r.status}
            onChange={(e) => updateStatus(r.id, e.target.value as Consultation['status'])}
            className="text-xs font-semibold px-2.5 py-1 rounded-full border-0 bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {['requested', 'scheduled', 'completed', 'no_show', 'cancelled'].map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        ) },
      ]}
    />
  );
}
