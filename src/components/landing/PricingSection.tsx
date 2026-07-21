import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { navigate } from '../../lib/router';
import { SHARED_PRICING_DISCLAIMER } from '../../lib/legal';
import { PACKAGES } from '../../lib/packages';

export default function PricingSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <div id="pricing" className="scroll-mt-24">
      {showHeading && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6 text-balance">
            Choose the level of help you need.
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-5">
            Start with DIY templates, or choose clerical document preparation where your information is typed, formatted, and transferred exactly as provided.
          </p>
          <a
            href="#video-guide"
            data-video-jump="3"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 underline decoration-gold-300 underline-offset-4 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 rounded"
          >
            Watch: Choosing the right preparation package
          </a>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className={`relative flex flex-col bg-white border rounded-2xl p-7 shadow-sm hover:shadow-xl transition ${
              pkg.featured ? 'border-gold-400 ring-2 ring-gold-100 lg:-translate-y-2' : 'border-navy-100'
            }`}
          >
            {pkg.featured && (
              <div className="absolute -top-4 left-7 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy-950 shadow-sm">
                Most Popular
              </div>
            )}

            <div className="text-sm font-semibold text-gold-700 uppercase tracking-widest mb-3">{pkg.eyebrow}</div>
            <h3 className="font-serif text-2xl font-semibold text-navy-900 mb-3">{pkg.title}</h3>
            <p className="text-sm text-navy-600 leading-relaxed mb-5">{pkg.description}</p>

            <div className="flex items-end justify-between gap-4 pb-5 mb-5 border-b border-navy-100">
              <div>
                <div className="text-4xl font-serif font-bold text-navy-900">${pkg.price}</div>
                <div className="text-xs text-navy-500">{pkg.paymentLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-navy-500">Turnaround</div>
                <div className="font-semibold text-navy-900">{pkg.turnaround}</div>
              </div>
            </div>

            <ul className="space-y-3 mb-7">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => navigate(`/checkout?package=${pkg.id}`)}
              className={`mt-auto group w-full font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
                pkg.featured ? 'bg-gold-500 hover:bg-gold-400 text-navy-950' : 'bg-navy-900 hover:bg-navy-800 text-white'
              }`}
            >
              {pkg.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm md:text-base text-navy-700 leading-relaxed bg-navy-50 border border-navy-100 rounded-2xl p-5">
        {SHARED_PRICING_DISCLAIMER}
      </p>
    </div>
  );
}
