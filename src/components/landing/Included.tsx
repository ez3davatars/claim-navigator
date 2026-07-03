import { FileText, Search, Mail, Shield, Handshake, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { navigate } from '../../lib/router';
import { PACKAGES } from '../../lib/packages';

const templates = [
  {
    icon: FileText,
    title: 'Complaint Templates',
    description: 'Educational complaint templates designed to help self-represented litigants understand common court document structure, formatting, and organization used in small claims, civil, supreme, and federal court filings.',
  },
  {
    icon: Search,
    title: 'Complaint Formatting Examples',
    description: 'Professionally structured examples showing how complaints are commonly formatted and organized to help users better present their information in a clear and readable manner.',
  },
  {
    icon: Mail,
    title: 'Court Caption Examples',
    description: 'Sample court caption layouts demonstrating how parties, court information, and case headings are commonly displayed in court filings across multiple court levels.',
  },
  {
    icon: Shield,
    title: 'Filing Structure Guides',
    description: 'General educational examples showing how court documents are commonly organized, including sections such as parties, jurisdiction, facts, damages, and requested relief.',
  },
  {
    icon: Handshake,
    title: 'Educational Sample Complaints',
    description: 'Fictional sample complaints provided for educational and illustrative purposes only to help users better understand how court filings are typically structured.',
  },
  {
    icon: BookOpen,
    title: 'Self-Help Filing Guide',
    description: 'A general informational guide designed to help self-represented litigants better understand basic filing preparation, document organization, and common court formatting practices.',
  },
];

export default function Included() {
  return (
    <section id="included" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">What's Included</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6 text-balance">
            Self-Help Complaint Template & Formatting Toolkit
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Educational templates and formatting examples designed to help self-represented litigants better understand common court document structure and organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              className="group relative bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border border-navy-100 hover:border-gold-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-gold-200 font-serif text-5xl font-bold opacity-30 group-hover:opacity-60 transition">
                0{idx + 1}
              </div>
              <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center mb-5 shadow-md">
                <Icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">{title}</h3>
              <p className="text-navy-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div id="packages" className="pt-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Packages</div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6 text-balance">
              Choose the level of help you need.
            </h2>
            <p className="text-lg text-navy-600 leading-relaxed">
              Start with DIY templates, or choose clerical document preparation where your information is typed, formatted, and transferred exactly as provided.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`flex flex-col bg-white border rounded-2xl p-7 shadow-sm hover:shadow-xl transition ${
                  pkg.id === 'standard' ? 'border-gold-400 ring-2 ring-gold-100' : 'border-navy-100'
                }`}
              >
                <div className="text-sm font-semibold text-gold-700 uppercase tracking-widest mb-3">{pkg.eyebrow}</div>
                <h3 className="font-serif text-2xl font-semibold text-navy-900 mb-3">{pkg.title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed mb-5">{pkg.description}</p>

                <div className="flex items-end justify-between gap-4 pb-5 mb-5 border-b border-navy-100">
                  <div>
                    <div className="text-4xl font-serif font-bold text-navy-900">${pkg.price}</div>
                    <div className="text-xs text-navy-500">one-time</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-navy-500">Turnaround</div>
                    <div className="font-semibold text-navy-900">{pkg.turnaround}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-navy-700">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {pkg.disclaimer && (
                  <p className="text-xs text-navy-600 leading-relaxed bg-navy-50 border border-navy-100 rounded-lg p-4 mb-6">
                    {pkg.disclaimer}
                  </p>
                )}

                <button
                  onClick={() => navigate(`/checkout?package=${pkg.id}`)}
                  className="mt-auto group w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Select Package
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
