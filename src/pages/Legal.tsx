import { ArrowLeft, Download } from 'lucide-react';
import { navigate } from '../lib/router';
import BrandMark from '../components/BrandMark';
import { PRIMARY_DISCLAIMER } from '../lib/legal';

interface Props {
  type: 'disclaimer' | 'terms' | 'privacy';
}

const content = {
  disclaimer: {
    title: 'Important Disclaimer',
    pdf: '/docs/disclaimer.pdf',
    pdfLabel: 'Download Disclaimer PDF',
    body: [
      PRIMARY_DISCLAIMER,
      'Claim Navigator is a self-help document preparation tool designed to assist individuals in organizing and preparing their own materials for small claims proceedings.',
      'No attorney-client relationship is formed through your use of this website, any templates, clerical preparation services, or any consultation provided.',
      'You are solely responsible for how you use these documents, how you adapt them to your specific situation, and for complying with your local court rules, filing deadlines, and jurisdictional procedures.',
      'Matthew M. Aulicino is not a licensed attorney. If you need legal advice specific to your situation, please consult a qualified attorney licensed in your jurisdiction.',
      'The free 5-minute after-purchase consultation is a brief, structured call to answer general product or document-preparation questions. It does not include legal advice of any kind.',
    ],
  },
  terms: {
    title: 'Terms Of Service',
    pdf: '/docs/terms-of-service.pdf',
    pdfLabel: 'Download Terms Of Service PDF',
    body: [
      'By purchasing or downloading the Claim Navigator Starter Pack or any clerical document preparation package, you agree to use the templates and services solely for your own self-representation or informational purposes.',
      'For clerical document preparation packages, you must provide all substantive information, facts, responses, and document content required for completion. Get Pro Se Solutions, LLC types, formats, and transfers customer-provided information only.',
      'You may not resell, redistribute, sublicense, or publicly post the templates or any derivative works. All templates and content remain the intellectual property of Claim Navigator.',
      'Due to the digital nature of the product and the administrative time reserved for clerical preparation services, all sales are final unless otherwise required by law.',
      'We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of the updated terms.',
      'The Claim Navigator platform, templates, clerical preparation services, and all related content are provided "as is" without warranties of any kind, either express or implied.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    pdf: '',
    pdfLabel: '',
    body: [
      'We collect only the information you provide voluntarily: name, email address, phone number, document content, customer responses, and any case details you choose to share on contact, consultation, intake, or checkout forms.',
      'Payment processing is handled by Stripe. We do not store full credit card information on our servers.',
      'Your information is used to fulfill your order, deliver digital products, confirm consultations, provide clerical document preparation, and respond to inquiries. We do not sell or share your personal data with third parties for marketing purposes.',
      'We may use your email to send occasional product updates and educational resources. You may unsubscribe at any time.',
      'You may request access to, correction of, or deletion of your personal data by emailing us at the contact address on this site.',
    ],
  },
};

export default function Legal({ type }: Props) {
  const { title, body, pdf, pdfLabel } = content[type];
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
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </button>

        <div className="bg-white rounded-2xl p-10 border border-navy-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <h1 className="font-serif text-4xl font-semibold text-navy-900">{title}</h1>
            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                {pdfLabel}
              </a>
            )}
          </div>
          <div className="space-y-5 text-navy-700 leading-relaxed">
            {body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-10 pt-6 border-t border-navy-100 text-sm text-navy-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

