import { useEffect, useState } from 'react';
import { supabase, ContactMessage } from '../../lib/supabase';
import DataTable from './DataTable';

export default function Messages() {
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setRows((data || []) as ContactMessage[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: ContactMessage['status']) => {
    await supabase.from('contact_messages').update({ status }).eq('id', id);
    load();
  };

  return (
    <>
      <DataTable
        title="Messages"
        rows={rows}
        searchKeys={['email', 'name', 'subject']}
        columns={[
          { key: 'created_at', label: 'Date', render: (r) => new Date(r.created_at).toLocaleDateString() },
          { key: 'name', label: 'From', render: (r) => (
            <div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-xs text-navy-500">{r.email}</div>
            </div>
          ) },
          { key: 'subject', label: 'Subject', render: (r) => r.subject || '—' },
          { key: 'message', label: 'Preview', render: (r) => (
            <button onClick={() => setSelected(r)} className="text-left max-w-md truncate text-navy-600 hover:text-gold-600">
              {r.message}
            </button>
          ) },
          { key: 'status', label: 'Status', render: (r) => (
            <select
              value={r.status}
              onChange={(e) => updateStatus(r.id, e.target.value as ContactMessage['status'])}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border-0 bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {['new', 'read', 'replied', 'archived'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) },
        ]}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy-950/70" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-navy-500 mb-1">{new Date(selected.created_at).toLocaleString()}</div>
            <h3 className="font-serif text-2xl font-semibold text-navy-900">{selected.subject || 'No subject'}</h3>
            <div className="text-sm text-navy-600 mt-1 mb-6">From <strong>{selected.name}</strong> &lt;{selected.email}&gt;</div>
            <div className="bg-navy-50 rounded-lg p-5 text-navy-800 whitespace-pre-wrap leading-relaxed">{selected.message}</div>
            <button onClick={() => setSelected(null)} className="mt-6 bg-navy-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-navy-800">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
