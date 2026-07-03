import { AlertTriangle } from 'lucide-react';
import { PRIMARY_DISCLAIMER } from '../../lib/legal';

export default function DisclaimerNotice() {
  return (
    <section className="bg-navy-50 border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-start bg-white border border-navy-100 rounded-2xl p-6 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-2">Important Disclaimer</h2>
            <p className="text-navy-700 leading-relaxed">{PRIMARY_DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
