import { useEffect, useState } from 'react';
import { CheckCircle2, Download, ArrowRight, CalendarClock } from 'lucide-react';
import { navigate } from '../lib/router';
import BrandMark from '../components/BrandMark';
import { getPackageById } from '../lib/packages';

const DOWNLOADS = [
  { name: 'Complaint Template.pdf', placeholder: true },
  { name: 'Discovery Demand Template.pdf', placeholder: true },
  { name: 'Demand Letter Template.pdf', placeholder: true },
  { name: "Defendant's Answer Template.pdf", placeholder: true },
  { name: 'Settlement Proposal Template.pdf', placeholder: true },
  { name: 'Step-by-Step Instructions Guide.pdf', placeholder: true },
];

export default function Success() {
  const [email, setEmail] = useState('');
  const [packageName, setPackageName] = useState('Claim Navigator Starter Pack');

  useEffect(() => {
    const query = window.location.search || window.location.hash.split('?')[1] || '';
    const params = new URLSearchParams(query);
    const e = params.get('email');
    const pkg = getPackageById(params.get('package'));
    if (e) setEmail(e);
    setPackageName(pkg.title);
  }, []);

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <BrandMark size="sm" />
            <span className="font-serif text-xl font-semibold text-navy-900">Claim Navigator</span>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-navy-100 p-10 text-center mb-8">
          <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-gold-600" />
          </div>
          <h1 className="font-serif text-4xl font-semibold text-navy-900 mb-3">Thank you for your purchase!</h1>
          <p className="text-navy-600 text-lg max-w-xl mx-auto">
            Your {packageName} order is ready. {email && <>A confirmation was sent to <strong>{email}</strong>.</>}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-navy-100 p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
              <CalendarClock className="w-7 h-7 text-gold-700" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-1">Free 5-Minute After-Purchase Consultation</h2>
              <p className="text-sm text-navy-600">Choose a phone call or Microsoft Teams video meeting, Monday-Friday from 9:00 AM to 5:00 PM.</p>
            </div>
            <button
              onClick={() => navigate('/#consultation')}
              className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3 rounded-lg transition"
            >
              Schedule
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-navy-100 p-10">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-2">Your Downloads</h2>
          <p className="text-navy-600 text-sm mb-6">Click any template to download. Templates are currently placeholders and will be replaced with final PDFs.</p>

          <div className="space-y-3 mb-8">
            {DOWNLOADS.map((doc) => (
              <a
                key={doc.name}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Placeholder: final PDF will be delivered here once content is uploaded.'); }}
                className="group flex items-center justify-between p-5 border border-navy-100 rounded-xl hover:border-gold-400 hover:bg-gold-50/30 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center">
                    <Download className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900">{doc.name}</div>
                    <div className="text-xs text-navy-500">PDF - Ready to download</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-navy-400 group-hover:text-gold-600 group-hover:translate-x-1 transition" />
              </a>
            ))}
          </div>

          <div className="bg-navy-50 rounded-xl p-5 border border-navy-100">
            <div className="font-semibold text-navy-900 mb-1">Start with the Step-by-Step Guide</div>
            <p className="text-sm text-navy-600">
              We recommend reading the Instructions Guide first. It explains how and when to use each template throughout your case.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
