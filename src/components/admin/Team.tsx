import { useEffect, useState } from 'react';
import { supabase, AdminUser, Role } from '../../lib/supabase';
import DataTable from './DataTable';

export default function Team({ currentUser }: { currentUser: AdminUser }) {
  const [rows, setRows] = useState<AdminUser[]>([]);

  const load = async () => {
    const { data } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    setRows((data || []) as AdminUser[]);
  };

  useEffect(() => { load(); }, []);

  const updateRole = async (id: string, role: Role) => {
    await supabase.from('admin_users').update({ role }).eq('id', id);
    load();
  };

  return (
    <DataTable
      title="Team Members"
      rows={rows}
      searchKeys={['email', 'full_name']}
      columns={[
        { key: 'created_at', label: 'Joined', render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: 'full_name', label: 'Member', render: (r) => (
          <div>
            <div className="font-semibold">{r.full_name || '—'}{r.id === currentUser.id && <span className="ml-2 text-xs text-gold-600">(you)</span>}</div>
            <div className="text-xs text-navy-500">{r.email}</div>
          </div>
        ) },
        { key: 'role', label: 'Role', render: (r) => (
          r.id === currentUser.id ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 capitalize">{r.role}</span>
          ) : (
            <select
              value={r.role}
              onChange={(e) => updateRole(r.id, e.target.value as Role)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border-0 bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {['owner', 'admin', 'staff'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )
        ) },
      ]}
    />
  );
}
