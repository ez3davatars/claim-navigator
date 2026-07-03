import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ALL_FAQS } from '../../lib/faqs';

export default function FAQ({ faqs = ALL_FAQS.slice(0, 8), heading = 'Common questions, clear answers.' }: { faqs?: { q: string; a: string }[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Frequently Asked</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">{heading}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all ${
                open === i ? 'border-gold-400 bg-navy-50/50 shadow-md' : 'border-navy-100 bg-white hover:border-navy-200'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left p-6"
                aria-expanded={open === i}
              >
                <span className="font-serif text-lg md:text-xl font-semibold text-navy-900 pr-8">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${
                  open === i ? 'bg-gold-500 text-navy-950' : 'bg-navy-100 text-navy-700'
                }`}>
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-navy-700 leading-relaxed whitespace-pre-line animate-fade-in">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
