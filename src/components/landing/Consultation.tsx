import { useState } from 'react';
import { AlertCircle, CalendarClock, CheckCircle2, Phone, Video } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const BUSINESS_TIME_SLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
];

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function isWeekday(dateValue: string) {
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.getDay();
  return weekday >= 1 && weekday <= 5;
}

export default function Consultation() {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    phone: '',
    meeting_type: '',
    preferred_date: '',
    preferred_time: '',
    case_summary: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    if (!form.preferred_date || !isWeekday(form.preferred_date)) {
      setStatus('error');
      setError('Please choose a Monday through Friday date.');
      return;
    }

    if (!form.preferred_time || !BUSINESS_TIME_SLOTS.includes(form.preferred_time)) {
      setStatus('error');
      setError('Please choose a time between 9:00 AM and 5:00 PM.');
      return;
    }

    if (form.meeting_type === 'Phone' && !form.phone.trim()) {
      setStatus('error');
      setError('Please enter a phone number for phone consultations.');
      return;
    }

    const caseSummary = [
      `Meeting type: ${form.meeting_type}`,
      'Consultation length: 5 minutes after purchase',
      form.case_summary.trim() ? `Customer note: ${form.case_summary.trim()}` : '',
    ].filter(Boolean).join('\n\n');

    const { error: err } = await supabase.from('consultations').insert([{
      customer_name: form.customer_name,
      customer_email: form.customer_email,
      phone: form.phone,
      preferred_date: form.preferred_date || null,
      preferred_time: form.preferred_time,
      case_summary: caseSummary,
      status: 'requested',
    }]);

    if (err) {
      setStatus('error');
      setError(err.message);
    } else {
      setStatus('success');
      setForm({
        customer_name: '',
        customer_email: '',
        phone: '',
        meeting_type: '',
        preferred_date: '',
        preferred_time: '',
        case_summary: '',
      });
    }
  };

  return (
    <section id="consultation" className="py-24 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              <CalendarClock className="w-4 h-4" /> Included After Purchase
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6 text-balance">
              Free 5-Minute Consultation
            </h2>
            <p className="text-lg text-navy-600 leading-relaxed mb-8">
              After purchase, choose a brief phone call or Microsoft Teams video meeting during weekday business hours. Consultations are available Monday through Friday, 9:00 AM to 5:00 PM.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Choose phone or Microsoft Teams video',
                'Schedule from available weekday time slots',
                'General product and document-preparation questions only',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <span className="text-navy-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white border-l-4 border-gold-500 p-5 rounded-r-lg shadow-sm">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <p className="text-sm text-navy-700 leading-relaxed">
                  This is a brief, structured call and <strong>does not include legal advice, legal opinions, legal strategy, or legal representation</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-navy-100 p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-navy-900 mb-2">Request Received</h3>
                <p className="text-navy-600 mb-6">We'll reach out within 1 business day to confirm your phone or Microsoft Teams time.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-gold-600 font-semibold hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-navy-900 mb-2">Schedule Your Consultation</h3>
                  <p className="text-sm text-navy-500">Select a weekday date and time between 9:00 AM and 5:00 PM.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Order email address"
                    value={form.customer_email}
                    onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${form.meeting_type === 'Phone' ? 'border-gold-500 bg-gold-50' : 'border-navy-200 hover:border-gold-300'}`}>
                    <input
                      type="radio"
                      required
                      name="meeting_type"
                      value="Phone"
                      checked={form.meeting_type === 'Phone'}
                      onChange={(e) => setForm({ ...form, meeting_type: e.target.value })}
                      className="text-gold-600 focus:ring-gold-400"
                    />
                    <Phone className="w-5 h-5 text-navy-700" />
                    <span className="font-semibold text-navy-800">Phone</span>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${form.meeting_type === 'Microsoft Teams Video' ? 'border-gold-500 bg-gold-50' : 'border-navy-200 hover:border-gold-300'}`}>
                    <input
                      type="radio"
                      required
                      name="meeting_type"
                      value="Microsoft Teams Video"
                      checked={form.meeting_type === 'Microsoft Teams Video'}
                      onChange={(e) => setForm({ ...form, meeting_type: e.target.value })}
                      className="text-gold-600 focus:ring-gold-400"
                    />
                    <Video className="w-5 h-5 text-navy-700" />
                    <span className="font-semibold text-navy-800">Microsoft Teams</span>
                  </label>
                </div>

                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    min={todayInputValue()}
                    value={form.preferred_date}
                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-navy-700"
                  />
                  <div className="bg-navy-50 border border-navy-100 rounded-lg px-4 py-3 text-sm text-navy-600">
                    Monday-Friday only<br />
                    9:00 AM-5:00 PM
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-navy-800 mb-2">Available Times</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUSINESS_TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, preferred_time: slot })}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                          form.preferred_time === slot
                            ? 'bg-navy-900 text-white border-navy-900'
                            : 'bg-white text-navy-700 border-navy-200 hover:border-gold-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Brief note about what you want to cover"
                  rows={4}
                  value={form.case_summary}
                  onChange={(e) => setForm({ ...form, case_summary: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                />

                {status === 'error' && <div className="text-sm text-red-600">{error}</div>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-4 rounded-lg transition disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
