import { useEffect, useState } from 'react';
import { supabase, Customer } from '../../lib/supabase';
import DataTable from './DataTable';

export default function Customers() {
  const [rows, setRows] = useState<Customer[]>([]);

  useEffect(() => {
    supabase.from('customers').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setRows((data || []) as Customer[]);
    });
  }, []);

  return (
    <DataTable
      title="Customers"
      rows={rows}
      searchKeys={['email', 'full_name', 'phone']}
      columns={[
        { key: 'created_at', label: 'Joined', render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: 'full_name', label: 'Name', render: (r) => (
          <div>
            <div className="font-semibold">{r.full_name || '—'}</div>
            <div className="text-xs text-navy-500">{r.email}</div>
          </div>
        ) },
        { key: 'phone', label: 'Phone', render: (r) => r.phone || '—' },
        { key: 'total_spent', label: 'Lifetime Spend', render: (r) => `$${Number(r.total_spent).toFixed(2)}` },
      ]}
    />
  );
}
