import { useState } from 'react';
import { Lock, CheckCircle2, ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { navigate } from '../lib/router';
import { getPackageById, PACKAGES, PackageId } from '../lib/packages';
import { CLERICAL_PACKAGE_DISCLAIMER } from '../lib/legal';
import BrandMark from '../components/BrandMark';

function initialPackageId(): PackageId {
  return getPackageById(new URLSearchParams(window.location.search).get('package')).id;
}

export default function Checkout() {
  const [packageId, setPackageId] = useState<PackageId>(initialPackageId);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    case_type: '',
    intake_document_content: '',
    intake_customer_responses: '',
    intake_formatting_instructions: '',
  });
  const [acknowledgments, setAcknowledgments] = useState({
    not_legal_representation: false,
    customer_supplied_information: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedPackage = getPackageById(packageId);
  const needsIntake = selectedPackage.requiresIntake;

  const selectPackage = (id: PackageId) => {
    setPackageId(id);
    window.history.replaceState({}, '', `/checkout?package=${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!acknowledgments.not_legal_representation) {
        throw new Error('Please acknowledge that this purchase is not legal representation.');
      }

      if (needsIntake) {
        if (!form.intake_document_content.trim() || !form.intake_customer_responses.trim()) {
          throw new Error('Please provide the document content and required customer responses for clerical preparation.');
        }
        if (!acknowledgments.customer_supplied_information) {
          throw new Error('Please acknowledge that you supplied all substantive information.');
        }
      }

      await supabase.from('customers').insert([{
        email: form.email,
        full_name: form.full_name,
        phone: form.phone,
      }]);

      const mockStripeSessionId = `cs_test_${crypto.randomUUID().replace(/-/g, '')}`;

      const { error: orderError } = await supabase.from('orders').insert([{
        customer_email: form.email,
        customer_name: form.full_name,
        product: selectedPackage.product,
        amount: selectedPackage.price,
        currency: 'USD',
        stripe_session_id: mockStripeSessionId,
        status: 'pending',
        fulfillment_status: 'pending',
        case_type: form.case_type,
        package_id: selectedPackage.id,
        intake_document_content: needsIntake ? form.intake_document_content : '',
        intake_customer_responses: needsIntake ? form.intake_customer_responses : '',
        intake_formatting_instructions: needsIntake ? form.intake_formatting_instructions : '',
        representation_acknowledgment: acknowledgments.not_legal_representation,
        intake_acknowledgment: needsIntake ? acknowledgments.customer_supplied_information : false,
      }]);

      if (orderError) throw orderError;
      navigate(`/success?email=${encodeURIComponent(form.email)}&package=${selectedPackage.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <BrandMark size="sm" />
            <span className="font-serif text-xl font-semibold text-navy-900">Claim Navigator</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <Lock className="w-4 h-4" /> Secure Checkout
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </button>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-8">
              <h1 className="font-serif text-3xl font-semibold text-navy-900 mb-2">Complete Your Order</h1>
              <p className="text-navy-600 mb-8">Choose a package and enter your details to continue.</p>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">Choose Your Package</h2>
                  <div className="grid gap-3">
                    {PACKAGES.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`block border rounded-xl p-4 cursor-pointer transition ${
                          packageId === pkg.id ? 'border-gold-500 bg-gold-50/50 ring-2 ring-gold-100' : 'border-navy-100 hover:border-gold-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="package"
                            value={pkg.id}
                            checked={packageId === pkg.id}
                            onChange={() => selectPackage(pkg.id)}
                            className="mt-1 text-gold-600 focus:ring-gold-400"
                          />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-gold-700">{pkg.eyebrow}</div>
                                <div className="font-serif text-xl font-semibold text-navy-900">{pkg.title}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-serif text-2xl font-bold text-navy-900">${pkg.price}</div>
                                <div className="text-xs text-navy-500">{pkg.turnaround}</div>
                              </div>
                            </div>
                            <p className="text-sm text-navy-600 mt-2">{pkg.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                    <p className="text-xs text-navy-500 mt-1">Your confirmation and downloads will be sent here.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-2">Case Type (optional)</label>
                    <select
                      value={form.case_type}
                      onChange={(e) => setForm({ ...form, case_type: e.target.value })}
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-700"
                    >
                      <option value="">Select your situation</option>
                      <option>Filing a small claims case</option>
                      <option>Responding to a summons / complaint</option>
                      <option>Considering settlement</option>
                      <option>Other / Not sure yet</option>
                    </select>
                  </div>
                </div>

                {needsIntake && (
                  <div className="border border-navy-100 rounded-2xl p-6 bg-navy-50/60">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-gold-600" />
                      <h2 className="font-serif text-2xl font-semibold text-navy-900">Required Intake</h2>
                    </div>
                    <p className="text-sm text-navy-600 mb-5">
                      Clerical preparation requires the customer to provide all document content, facts, and responses. Get Pro Se Solutions, LLC will type, format, and transfer the information exactly as provided.
                    </p>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-navy-800 mb-2">Document Content and Facts</label>
                        <textarea
                          required={needsIntake}
                          rows={5}
                          value={form.intake_document_content}
                          onChange={(e) => setForm({ ...form, intake_document_content: e.target.value })}
                          placeholder="Provide the exact facts, names, dates, amounts, requested relief, and document content you want used."
                          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-navy-800 mb-2">Customer Responses for Forms or Templates</label>
                        <textarea
                          required={needsIntake}
                          rows={5}
                          value={form.intake_customer_responses}
                          onChange={(e) => setForm({ ...form, intake_customer_responses: e.target.value })}
                          placeholder="Provide your responses for each required field, prompt, or section."
                          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-navy-800 mb-2">Formatting Instructions (optional)</label>
                        <textarea
                          rows={3}
                          value={form.intake_formatting_instructions}
                          onChange={(e) => setForm({ ...form, intake_formatting_instructions: e.target.value })}
                          placeholder="List any formatting preferences, court form names, or template instructions."
                          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none bg-white"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-navy-600 leading-relaxed bg-white border border-navy-100 rounded-lg p-4 mt-5">
                      {CLERICAL_PACKAGE_DISCLAIMER}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-navy-200 rounded-lg bg-white">
                    <input
                      type="checkbox"
                      required
                      checked={acknowledgments.not_legal_representation}
                      onChange={(e) => setAcknowledgments({ ...acknowledgments, not_legal_representation: e.target.checked })}
                      className="mt-1 text-gold-600 focus:ring-gold-400"
                    />
                    <span className="text-sm text-navy-700 leading-relaxed">
                      I understand this purchase is <strong>not legal representation</strong> and does not include legal advice, legal opinions, legal strategy, or attorney-client representation.
                    </span>
                  </label>

                  {needsIntake && (
                    <label className="flex items-start gap-3 p-4 border border-navy-200 rounded-lg bg-white">
                      <input
                        type="checkbox"
                        required={needsIntake}
                        checked={acknowledgments.customer_supplied_information}
                        onChange={(e) => setAcknowledgments({ ...acknowledgments, customer_supplied_information: e.target.checked })}
                        className="mt-1 text-gold-600 focus:ring-gold-400"
                      />
                      <span className="text-sm text-navy-700 leading-relaxed">
                        I digitally acknowledge that I supplied all substantive information, facts, and responses for document preparation.
                      </span>
                    </label>
                  )}
                </div>

                <div className="border-t border-navy-100 pt-6">
                  <div className="flex items-center gap-2 mb-4 text-navy-800 font-semibold">
                    <CreditCard className="w-5 h-5" /> Payment (Stripe Test Mode)
                  </div>
                  <div className="bg-navy-50 border border-navy-200 rounded-lg p-4 text-sm text-navy-600">
                    Stripe checkout will be enabled when production API keys are connected. Completing this form will create an order in the CRM as a test transaction.
                  </div>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-4 rounded-lg text-lg transition disabled:opacity-60 shadow-md"
                >
                  {loading ? 'Processing...' : `Complete Purchase - $${selectedPackage.price}`}
                </button>

                <div className="flex items-center gap-2 justify-center text-xs text-navy-500">
                  <Shield className="w-4 h-4" /> Protected by Stripe. Your information is encrypted.
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-navy-950 text-white rounded-2xl p-8 sticky top-8">
              <h3 className="font-serif text-xl font-semibold mb-1">Order Summary</h3>
              <p className="text-navy-300 text-sm mb-6">{selectedPackage.title}</p>

              <ul className="space-y-3 mb-6 pb-6 border-b border-white/10">
                {selectedPackage.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy-100">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-navy-200">
                  <span>Subtotal</span><span>${selectedPackage.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-navy-200">
                  <span>Tax</span><span>$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-bold text-white pt-3 border-t border-white/10 mt-3">
                  <span>Total</span><span>${selectedPackage.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 bg-white/5 rounded-lg p-4 text-xs text-navy-200 leading-relaxed">
                {selectedPackage.requiresIntake
                  ? `Turnaround time: ${selectedPackage.turnaround}. Customer-provided content is required before clerical preparation can begin.`
                  : 'Instant digital delivery. Due to the nature of this digital product, all sales are final.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

