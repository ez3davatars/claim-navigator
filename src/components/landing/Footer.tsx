import { navigate } from '../../lib/router';
import BrandMark from '../BrandMark';
import { PRIMARY_DISCLAIMER } from '../../lib/legal';

export default function Footer() {
  const col = (title: string, links: [string, string][]) => (
    <div>
      <div className="text-white font-semibold mb-4">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={to}>
            <button onClick={() => navigate(to)} className="hover:text-gold-400 transition">{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BrandMark size="md" />
              <span className="font-serif text-xl font-semibold text-white">Claim Navigator</span>
            </div>
            <p className="text-navy-300 leading-relaxed max-w-md mb-4">
              A self-help document preparation platform by <strong className="text-navy-100">Get Pro Se Solutions, LLC</strong>. Small claims court document templates and clerical preparation support for self-represented litigants.
            </p>
            <p className="text-xs text-navy-400">
              Not a law firm. Does not provide legal advice.
            </p>
          </div>

          {col('Product', [
            ['Templates', '/small-claims-court-document-templates'],
            ['How It Works', '/how-it-works'],
            ['Pricing', '/pricing'],
            ['FAQ', '/faq'],
          ])}

          {col('Resources', [
            ['Demand Letter Template', '/small-claims-demand-letter-template'],
            ['Complaint Template', '/small-claims-complaint-template'],
            ['Self-Represented Help', '/self-represented-litigant-help'],
            ['Pro Se Preparation', '/pro-se-court-document-preparation'],
          ])}

          {col('Company', [
            ['About', '/about'],
            ['Contact', '/contact'],
            ['Disclaimer', '/disclaimer'],
            ['Terms Of Service', '/terms'],
            ['Privacy Policy', '/privacy'],
            ['Admin Portal', '/admin'],
          ])}
        </div>

        <div className="border-t border-white/10 pt-8 text-xs text-navy-400 leading-relaxed">
          <p className="mb-3">
            <strong className="text-navy-200">Important Disclaimer:</strong> {PRIMARY_DISCLAIMER}
          </p>
          <p>Copyright {new Date().getFullYear()} Get Pro Se Solutions, LLC. All rights reserved. Claim Navigator is a product of Get Pro Se Solutions, LLC.</p>
        </div>
      </div>
    </footer>
  );
}

