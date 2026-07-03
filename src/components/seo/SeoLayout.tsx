import { ReactNode } from 'react';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import { navigate } from '../../lib/router';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { PRIMARY_DISCLAIMER } from '../../lib/legal';

interface Crumb { name: string; path: string; }

interface Props {
  breadcrumbs: Crumb[];
  title: string;
  subtitle?: string;
  children: ReactNode;
  showCta?: boolean;
}

export default function SeoLayout({ breadcrumbs, title, subtitle, children, showCta = true }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24">
        <div className="bg-gradient-to-b from-navy-50 to-white border-b border-navy-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-500 mb-6 flex-wrap">
              {breadcrumbs.map((c, i) => (
                <span key={c.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
                  {i < breadcrumbs.length - 1 ? (
                    <button onClick={() => navigate(c.path)} className="hover:text-gold-600">{c.name}</button>
                  ) : (
                    <span className="text-navy-900 font-medium">{c.name}</span>
                  )}
                </span>
              ))}
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-navy-900 mb-4 text-balance">{title}</h1>
            {subtitle && <p className="text-lg md:text-xl text-navy-600 leading-relaxed max-w-3xl">{subtitle}</p>}
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16 prose-page">
          {children}
        </article>

        {showCta && (
          <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
            <div className="bg-navy-950 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3">View Claim Navigator Packages</h2>
              <p className="text-navy-200 mb-6 max-w-xl mx-auto">DIY templates start at $49, with optional clerical document preparation packages available.</p>
              <button
                onClick={() => navigate('/pricing')}
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-3.5 rounded-lg transition shadow-lg"
              >
                See Packages <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        <section className="border-t border-navy-100 bg-navy-50/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10 text-sm text-navy-600 leading-relaxed">
            <strong className="text-navy-900">Legal Disclaimer:</strong> {PRIMARY_DISCLAIMER}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
