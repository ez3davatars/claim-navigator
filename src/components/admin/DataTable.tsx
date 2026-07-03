import { useState, ReactNode } from 'react';
import { Search } from 'lucide-react';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  title: string;
  rows: T[];
  columns: Column<T>[];
  searchKeys?: string[];
  emptyText?: string;
  actions?: ReactNode;
}

export default function DataTable<T extends { id: string }>({ title, rows, columns, searchKeys = [], emptyText = 'No records yet.', actions }: Props<T>) {
  const [query, setQuery] = useState('');

  const filtered = query && searchKeys.length
    ? rows.filter((r) =>
        searchKeys.some((k) => {
          const v = (r as any)[k];
          return v && String(v).toLowerCase().includes(query.toLowerCase());
        })
      )
    : rows;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-navy-900">{title}</h1>
          <p className="text-navy-500 mt-1 text-sm">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          {searchKeys.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
            </div>
          )}
          {actions}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50 border-b border-navy-100">
                {columns.map((col) => (
                  <th key={col.key} className="text-left text-xs font-semibold text-navy-700 uppercase tracking-wider px-6 py-3">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 text-navy-500">{emptyText}</td>
                </tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-navy-800">
                      {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
