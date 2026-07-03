export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-gold-100 text-gold-800',
    new: 'bg-blue-100 text-blue-700',
    requested: 'bg-gold-100 text-gold-800',
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    refunded: 'bg-red-100 text-red-700',
    failed: 'bg-red-100 text-red-700',
    cancelled: 'bg-navy-100 text-navy-700',
    no_show: 'bg-red-100 text-red-700',
    contacted: 'bg-blue-100 text-blue-700',
    converted: 'bg-emerald-100 text-emerald-700',
    archived: 'bg-navy-100 text-navy-600',
    read: 'bg-blue-100 text-blue-700',
    replied: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize inline-block ${map[status] || 'bg-navy-100 text-navy-700'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
