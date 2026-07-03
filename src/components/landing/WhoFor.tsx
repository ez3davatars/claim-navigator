import { FileSearch, Gavel, Users } from 'lucide-react';

const personas = [
  {
    icon: Gavel,
    title: 'Filing a Complaint',
    description: 'You want educational complaint templates and formatting examples to help better organize your information before filing in court.',
  },
  {
    icon: FileSearch,
    title: 'Reviewing Court Documents',
    description: 'You are trying to better understand how complaints and court filings are commonly structured and formatted.',
  },
  {
    icon: Users,
    title: 'Self-Represented Litigants',
    description: 'You want educational resources and structured examples to help you organize court paperwork without hiring an attorney.',
  },
];

export default function WhoFor() {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-sm font-semibold text-gold-400 uppercase tracking-widest mb-4">Who This Is For</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6 text-balance">
            Designed for people ready to stand up for themselves.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-gold-400/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Icon className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-3">{title}</h3>
              <p className="text-navy-200 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
