import { FileText, Search, Mail, Shield, Handshake, BookOpen } from 'lucide-react';
import PricingSection from './PricingSection';

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
    <section id="documents" className="py-24 bg-white scroll-mt-24">
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

        <div className="pt-24">
          <PricingSection />
        </div>
      </div>
    </section>
  );
}
