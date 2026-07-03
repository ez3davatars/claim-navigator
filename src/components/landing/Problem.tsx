import { AlertTriangle, Clock, FileQuestion } from 'lucide-react';

const items = [
  {
    icon: FileQuestion,
    title: 'Overwhelmed by Paperwork',
    description: 'Court forms use unfamiliar language and require precise structure. One mistake can delay or derail your case.',
  },
  {
    icon: Clock,
    title: 'Running Out of Time',
    description: 'Filing deadlines, response windows, and court dates move fast. Preparation cannot wait until the week before.',
  },
  {
    icon: AlertTriangle,
    title: 'Unprepared in Court',
    description: 'Most self-represented litigants lose not because their claim is weak—but because they walk in without structure.',
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-navy-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">The Reality</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6 text-balance">
            Most people lose cases not because they're wrong— because they're{' '}
            <span className="text-gold-600 italic">unprepared.</span>
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            The court system is procedural, unforgiving, and rarely designed with the layperson in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white p-8 rounded-2xl border border-navy-100 hover:border-gold-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">{title}</h3>
              <p className="text-navy-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
