import { ArrowRight } from 'lucide-react';
import { navigate } from '../../lib/router';

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-gold-500/5 blur-3xl rounded-full" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #dcae35 1px, transparent 0)', backgroundSize: '28px 28px' }} />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-white mb-6 text-balance">
              Don't walk into court unprepared.
            </h2>
            <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get the structure you need before your court date. Choose DIY templates or clerical document preparation support.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="group inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-10 py-5 rounded-xl text-lg transition-all shadow-xl hover:shadow-gold-500/30"
            >
              View Packages
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-navy-300 text-sm mt-6">DIY templates start at $49 - secure checkout via Stripe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
