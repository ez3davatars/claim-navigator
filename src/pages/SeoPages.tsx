import SeoLayout from '../components/seo/SeoLayout';
import FAQ from '../components/landing/FAQ';
import { navigate } from '../lib/router';
import { useSeo, breadcrumbSchema, webPageSchema, faqSchema } from '../lib/seo';
import { ALL_FAQS } from '../lib/faqs';
import PricingSection from '../components/landing/PricingSection';

const HOME = { name: 'Home', path: '/' };
const L = (label: string, to: string) => (
  <a onClick={(e) => { e.preventDefault(); navigate(to); }} href={to}>{label}</a>
);

export function TemplatesHub() {
  const path = '/small-claims-court-document-templates';
  const title = 'Small Claims Court Document Templates | Claim Navigator';
  const desc = 'Structured small claims court document templates for self-represented litigants. Complaint, demand letter, answer, discovery, and settlement proposal—by Get Pro Se Solutions, LLC.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Templates', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Templates', path }]}
      title="Small Claims Court Document Templates"
      subtitle="A complete set of structured templates for self-represented litigants preparing small claims paperwork."
    >
      <p><strong>Small claims court document templates</strong> are pre-built, fill-in-the-blank forms that give self-represented litigants a clean structure for each stage of a small claims case. Claim Navigator, by Get Pro Se Solutions, LLC, packages the six most commonly needed templates in one downloadable Starter Pack.</p>

      <h2>Templates Included in the Starter Pack</h2>
      <p>The Claim Navigator Starter Pack includes the six core document templates self-represented litigants typically need:</p>
      <ul>
        <li>{L('Small Claims Complaint Template', '/small-claims-complaint-template')} — a structured statement of claim used when filing a case.</li>
        <li>Discovery Demand Template — a formal request for evidence and information from the opposing party after your case is filed.</li>
        <li>{L('Small Claims Demand Letter Template', '/small-claims-demand-letter-template')} — a professional pre-filing letter asking the other party to resolve the dispute.</li>
        <li>Defendant's Answer Template — a guided response for defendants replying to a summons or complaint.</li>
        <li>Settlement Proposal Template — a clear, structured way to propose resolution before trial.</li>
        <li>Step-by-Step Instructions Guide — plain-language explanations of how and when to use each document.</li>
      </ul>

      <h2>Who These Templates Are For</h2>
      <p>These templates are designed for pro se plaintiffs filing a small claims case, defendants responding to a summons, and anyone who wants organized paperwork without hiring an attorney. They are not a substitute for legal counsel.</p>

      <h2>How Templates Fit Into a Small Claims Case</h2>
      <ol>
        <li>Send a demand letter to attempt resolution before filing.</li>
        <li>If unresolved, file a complaint or statement of claim with the appropriate court.</li>
        <li>If a defendant, file a timely answer to avoid default.</li>
        <li>Use discovery to request relevant evidence or information.</li>
        <li>Consider sending a settlement proposal before the court date.</li>
      </ol>

      <h2>What These Templates Do Not Do</h2>
      <p>These templates do not replace legal advice, do not guarantee any outcome, and are not filed with the court on your behalf. Users are responsible for adapting each template to their jurisdiction and for meeting all filing deadlines and service requirements.</p>

      <h2>Related Reading</h2>
      <ul>
        <li>{L('Self-Represented Litigant Help', '/self-represented-litigant-help')}</li>
        <li>{L('Pro Se Court Document Preparation', '/pro-se-court-document-preparation')}</li>
        <li>{L('How It Works', '/how-it-works')}</li>
      </ul>

      <FAQ faqs={ALL_FAQS.slice(0, 6)} heading="Template FAQs" />
    </SeoLayout>
  );
}

export function DemandLetterPage() {
  const path = '/small-claims-demand-letter-template';
  const title = 'Small Claims Demand Letter Template | Claim Navigator';
  const desc = 'A structured small claims demand letter template for self-represented litigants. Plain-language instructions and pre-filing steps from Get Pro Se Solutions, LLC.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Templates', path: '/small-claims-court-document-templates' }, { name: 'Demand Letter', path }]),
      faqSchema([
        { q: 'Is a demand letter required before filing?', a: 'Requirements vary by jurisdiction. Even when not strictly required, a demand letter is often strongly recommended because it documents your good-faith attempt to resolve the matter.' },
      ]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Templates', path: '/small-claims-court-document-templates' }, { name: 'Demand Letter', path }]}
      title="Small Claims Demand Letter Template"
      subtitle="A professional pre-filing letter that documents your position and attempts resolution before court."
    >
      <p>A <strong>small claims demand letter</strong> is a written notice sent to the opposing party before filing a lawsuit. It outlines the dispute, states the amount owed or relief requested, and sets a deadline for resolution. A strong demand letter is often the first step toward settling without going to court.</p>

      <h2>What a Demand Letter Typically Includes</h2>
      <ul>
        <li>A clear identification of both parties.</li>
        <li>A factual summary of the dispute, in chronological order.</li>
        <li>The specific amount owed or the relief requested.</li>
        <li>A reasonable deadline to respond (commonly 10–30 days).</li>
        <li>A clear statement that legal action may follow if the matter is not resolved.</li>
      </ul>

      <h2>Why Use a Demand Letter Template</h2>
      <p>A structured template keeps the letter professional, clear, and focused. Without structure, self-represented litigants often send letters that are too emotional, too vague, or omit the essential facts a court would later want to see.</p>

      <h2>When to Send a Demand Letter</h2>
      <p>A demand letter is typically sent before filing a small claims case. Some jurisdictions require a demand before filing; many do not. Even when not required, a documented demand can strengthen your position and may resolve the dispute without litigation.</p>

      <h2>What a Demand Letter Is Not</h2>
      <p>A demand letter is not a court filing, not a judgment, and not legal advice. Claim Navigator provides a template and instructions; it does not draft, review, or send the letter for you.</p>

      <h2>Related Templates</h2>
      <ul>
        <li>{L('Small Claims Complaint Template', '/small-claims-complaint-template')}</li>
        <li>{L('All Small Claims Templates', '/small-claims-court-document-templates')}</li>
      </ul>

      <FAQ faqs={ALL_FAQS.slice(0, 6)} heading="Demand Letter FAQs" />
    </SeoLayout>
  );
}

export function ComplaintPage() {
  const path = '/small-claims-complaint-template';
  const title = 'Small Claims Complaint Template | Claim Navigator';
  const desc = 'A structured small claims complaint template for self-represented litigants. Clear sections for parties, facts, and relief requested. By Get Pro Se Solutions, LLC.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Templates', path: '/small-claims-court-document-templates' }, { name: 'Complaint', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Templates', path: '/small-claims-court-document-templates' }, { name: 'Complaint', path }]}
      title="Small Claims Complaint Template"
      subtitle="A structured, fill-in-the-blank document for clearly presenting your claim when filing a small claims case."
    >
      <p>A <strong>small claims complaint</strong> (sometimes called a statement of claim) is the document a plaintiff files to start a small claims case. It identifies the parties, describes the facts, and states what the plaintiff is asking the court to order.</p>

      <h2>What a Complaint Typically Includes</h2>
      <ul>
        <li>Plaintiff and defendant names and contact information.</li>
        <li>The court and case caption.</li>
        <li>A short, factual statement of the dispute.</li>
        <li>The legal basis or reason the defendant owes something.</li>
        <li>The specific relief requested (a dollar amount or other remedy).</li>
        <li>A signature and date.</li>
      </ul>

      <h2>Why Structure Matters</h2>
      <p>Courts read many self-represented filings that are hard to follow. A structured complaint helps the judge understand the dispute quickly and puts the plaintiff in a stronger preparation posture. Claim Navigator provides the structure; you supply the facts specific to your case.</p>

      <h2>Filing Rules Vary</h2>
      <p>Every state and every court has its own filing rules, fee schedules, service requirements, and deadlines. Users are responsible for verifying and following their local rules before filing any document.</p>

      <h2>Related Resources</h2>
      <ul>
        <li>{L('Small Claims Demand Letter Template', '/small-claims-demand-letter-template')}</li>
        <li>{L('Self-Represented Litigant Help', '/self-represented-litigant-help')}</li>
      </ul>

      <FAQ faqs={ALL_FAQS.slice(0, 6)} heading="Complaint FAQs" />
    </SeoLayout>
  );
}

export function SelfRepresentedPage() {
  const path = '/self-represented-litigant-help';
  const title = 'Self-Represented Litigant Help | Claim Navigator';
  const desc = 'Practical, structured help for self-represented litigants preparing small claims documents. By Get Pro Se Solutions, LLC. Not legal advice.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Self-Represented Help', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Self-Represented Help', path }]}
      title="Self-Represented Litigant Help"
      subtitle="A calm, structured starting point for people handling their own small claims case."
    >
      <p><strong>Self-represented litigants</strong>—sometimes called <em>pro se</em> parties—are people who appear in court without an attorney. Claim Navigator, by Get Pro Se Solutions, LLC, is built specifically to help self-represented litigants prepare organized small claims paperwork without guessing at structure or sequence.</p>

      <h2>Common Challenges Self-Represented Litigants Face</h2>
      <ul>
        <li>Unfamiliar courtroom language and form requirements.</li>
        <li>Uncertainty about deadlines and service rules.</li>
        <li>Disorganized facts that are hard for a judge to follow.</li>
        <li>Emotional framing instead of factual, chronological writing.</li>
      </ul>

      <h2>How Structure Improves Preparation</h2>
      <p>Most self-represented litigants lose cases not because their facts are wrong, but because their documents are disorganized and their sequence of steps is unclear. A template-based approach forces the key elements into the right order.</p>

      <h2>What Claim Navigator Provides</h2>
      <p>Claim Navigator provides document templates and a step-by-step instructions guide. It does not provide legal advice, file anything with a court, or represent users. Attorney review is recommended when legal rights, deadlines, or complex facts are involved.</p>

      <h2>When to Seek an Attorney</h2>
      <ul>
        <li>When the amount in dispute exceeds small claims limits.</li>
        <li>When deadlines or service issues are unclear.</li>
        <li>When the case involves contracts, injuries, or facts you do not fully understand.</li>
      </ul>

      <h2>Related Resources</h2>
      <ul>
        <li>{L('Small Claims Court Document Templates', '/small-claims-court-document-templates')}</li>
        <li>{L('Pro Se Court Document Preparation', '/pro-se-court-document-preparation')}</li>
        <li>{L('How It Works', '/how-it-works')}</li>
      </ul>

      <FAQ faqs={ALL_FAQS.slice(0, 6)} heading="Self-Represented Litigant FAQs" />
    </SeoLayout>
  );
}

export function ProSePrepPage() {
  const path = '/pro-se-court-document-preparation';
  const title = 'Pro Se Court Document Preparation | Claim Navigator';
  const desc = 'Structured pro se court document preparation for small claims cases. Templates and plain-language instructions from Get Pro Se Solutions, LLC. Not legal advice.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Pro Se Preparation', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Pro Se Preparation', path }]}
      title="Pro Se Court Document Preparation"
      subtitle="Prepare your small claims documents with structure, not guesswork."
    >
      <p><strong>Pro se court document preparation</strong> is the process of organizing and drafting the documents needed for a case without an attorney. Claim Navigator provides structured templates and a step-by-step instructions guide so pro se litigants can prepare their paperwork in the right order and with the right components.</p>

      <h2>Why Preparation Matters</h2>
      <p>Small claims cases often move quickly. Judges rely on the documents in front of them. Preparation that is organized, factual, and complete is often the difference between a confident appearance and a stressful one.</p>

      <h2>The Preparation Workflow</h2>
      <ol>
        <li>Gather the facts: dates, amounts, communications, and receipts.</li>
        <li>Send a demand letter documenting the dispute and a reasonable deadline.</li>
        <li>Prepare your complaint or your answer, depending on your role.</li>
        <li>Plan discovery: identify the evidence and information you need.</li>
        <li>Consider a settlement proposal before the court date.</li>
        <li>Confirm local filing and service rules before submitting anything.</li>
      </ol>

      <h2>Common Preparation Mistakes</h2>
      <ul>
        <li>Mixing opinion with facts.</li>
        <li>Missing deadlines or service requirements.</li>
        <li>Skipping a demand letter when one could have resolved the dispute.</li>
        <li>Submitting documents that are not formatted for the specific court.</li>
      </ul>

      <h2>Important Limits</h2>
      <p>Claim Navigator does not provide legal advice and does not represent users. It provides document templates and plain-language instructions. Users are responsible for verifying and following the rules of their local court.</p>

      <FAQ faqs={ALL_FAQS.slice(0, 6)} heading="Pro Se Preparation FAQs" />
    </SeoLayout>
  );
}

export function HowItWorksPage() {
  const path = '/how-it-works';
  const title = 'How Claim Navigator Works | Get Pro Se Solutions, LLC';
  const desc = 'How Claim Navigator works for DIY templates, standard clerical document preparation, and expedited preparation packages from Get Pro Se Solutions, LLC.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'How It Works', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'How It Works', path }]}
      title="How Claim Navigator Works"
      subtitle="A clear preparation flow for DIY templates, standard clerical preparation, and expedited support."
    >
      <p>Claim Navigator is designed to help self-represented litigants organize complaint preparation materials before filing. The process works across all three package options.</p>

      <h2>1. Select the Package That Fits Your Needs</h2>
      <p>Choose the $49 DIY Template Starter Pack, the $149 Standard Clerical Document Preparation package, or the $299 Expedited Clerical Document Preparation package.</p>

      <h2>2. Complete the Guided Materials</h2>
      <p>Complete the guided prompts, templates, or intake questionnaire for your selected package. The customer provides all case-specific facts, responses, and supporting information.</p>

      <h2>3. Organize Your Case Information</h2>
      <p>Gather and organize your case-specific facts, documents, timelines, communications, and supporting information before preparing or reviewing any document.</p>

      <h2>4. Review Local Court Requirements</h2>
      <p>Review your local court rules, deadlines, service requirements, filing fees, and formatting requirements before submitting anything to the court.</p>

      <h2>5. File and Serve According to Your Jurisdiction</h2>
      <p>File and serve documents according to your jurisdiction's rules. Claim Navigator does not file documents with the court or provide legal representation.</p>

      <h2>What Claim Navigator Does Not Do</h2>
      <p>Claim Navigator does not provide legal advice, file documents on your behalf, or represent you in court. It is a self-help document preparation platform, not a law firm.</p>

      <FAQ faqs={ALL_FAQS.slice(0, 8)} heading="How It Works FAQs" />
    </SeoLayout>
  );
}

export function PricingPage() {
  return <PackagesPricingPage />;
}

export function PackagesPricingPage() {
  const path = '/pricing';
  const title = 'Pricing | Claim Navigator Packages from $49';
  const desc = 'Claim Navigator pricing for DIY templates and clerical document preparation packages by Get Pro Se Solutions, LLC. Packages start at $49.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Pricing', path }]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Claim Navigator Packages',
        description: 'DIY small claims templates and clerical document preparation packages.',
        brand: { '@type': 'Brand', name: 'Claim Navigator' },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '49.00',
          highPrice: '299.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Pricing', path }]}
      title="Simple package pricing."
      subtitle="Choose DIY templates or clerical document preparation support. No subscriptions."
    >
      <div className="not-prose my-8">
        <PricingSection showHeading={false} />
      </div>

      <h2>Package Options</h2>
      <p>The DIY Template Starter Pack provides instant digital delivery. The Standard and Expedited packages provide administrative document assistance only, with information typed, formatted, and transferred exactly as provided by the customer.</p>

      <h2>Refund Policy</h2>
      <p>Because the Starter Pack is a digital product delivered immediately, and clerical preparation reserves administrative time, all sales are final unless otherwise required by law. A free 5-minute after-purchase consultation is available for general product and process questions.</p>

      <h2>Secure Checkout</h2>
      <p>Payment is processed through Stripe. We do not store credit card information on our servers.</p>

      <FAQ faqs={ALL_FAQS.slice(8, 10).concat(ALL_FAQS.slice(0, 4))} heading="Pricing FAQs" />
    </SeoLayout>
  );
}
export function FaqPage() {
  const path = '/faq';
  const title = 'Frequently Asked Questions | Claim Navigator';
  const desc = 'Answers to common questions about Claim Navigator, small claims court document templates, self-representation, and Get Pro Se Solutions, LLC.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'FAQ', path }]),
      faqSchema(ALL_FAQS.map((f) => ({ q: f.q, a: f.a }))),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'FAQ', path }]}
      title="Frequently Asked Questions"
      subtitle="Direct, plain-language answers about Claim Navigator, small claims documents, and self-representation."
      showCta={false}
    >
      <FAQ faqs={ALL_FAQS} heading="Everything you might ask" />
    </SeoLayout>
  );
}

export function AboutPage() {
  const path = '/about';
  const title = 'About Claim Navigator & Get Pro Se Solutions, LLC';
  const desc = 'Claim Navigator is a self-help document preparation platform by Get Pro Se Solutions, LLC, founded by Matthew M. Aulicino, a veteran and long-time pro se litigant.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'About', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'About', path }]}
      title="About Claim Navigator"
      subtitle="A self-help document preparation platform by Get Pro Se Solutions, LLC."
    >
      <p><strong>Claim Navigator is a self-help document preparation platform by Get Pro Se Solutions, LLC.</strong> It helps individuals organize information and prepare small claims court documents without presenting itself as a law firm or attorney service.</p>

      <h2>Our Company</h2>
      <p>Get Pro Se Solutions, LLC operates the Claim Navigator platform. The company provides legal information, document templates, and self-help preparation support for self-represented litigants. Get Pro Se Solutions, LLC is not a law firm and does not provide legal advice or attorney representation.</p>

      <h2>Our Founder</h2>
      <p>Claim Navigator was founded by <strong>Matthew M. Aulicino</strong>, a U.S. Army Veteran who holds a Master's degree in Criminal Justice. Matthew has been a pro se litigant since 2008 with experience across Small Claims, Civil, and Supreme Court. He built Claim Navigator after years of watching capable people lose cases simply because their documents were disorganized.</p>

      <h2>Our Mission</h2>
      <p>To give self-represented litigants the same structural advantage that represented parties take for granted: clear documents, a clear order of operations, and a clear path to walk into court prepared.</p>

      <h2>What We Are Not</h2>
      <p>We are not a law firm. We do not provide legal advice. We do not represent users in legal proceedings. We do not file documents with any court. We do not guarantee any outcome. Our role is to provide structure, templates, and plain-language instructions so self-represented people can prepare their own documents more effectively.</p>

      <h2>Contact</h2>
      <p>Visit our {L('Contact page', '/contact')} to reach Get Pro Se Solutions, LLC.</p>
    </SeoLayout>
  );
}

export function ContactPage() {
  const path = '/contact';
  const title = 'Contact Get Pro Se Solutions, LLC | Claim Navigator';
  const desc = 'Contact Get Pro Se Solutions, LLC about Claim Navigator. Send a message or request the free 5-minute after-purchase consultation.';
  useSeo({
    title, description: desc, path,
    jsonLd: [
      webPageSchema(title, desc, path),
      breadcrumbSchema([HOME, { name: 'Contact', path }]),
    ],
  });

  return (
    <SeoLayout
      breadcrumbs={[HOME, { name: 'Contact', path }]}
      title="Contact Get Pro Se Solutions, LLC"
      subtitle="Questions about Claim Navigator? Send us a message or book the free 5-minute after-purchase consultation."
      showCta={false}
    >
      <ContactForm />
      <h2>Consultation</h2>
      <p>Want a quick after-purchase call? Use the {L('free 5-minute consultation form', '/#consultation')} on our homepage. The call can be by phone or Microsoft Teams video and does not include legal advice.</p>
      <h2>Entity</h2>
      <p><strong>Get Pro Se Solutions, LLC</strong> — operator of Claim Navigator. Not a law firm. Does not provide legal advice.</p>
    </SeoLayout>
  );
}

import { useState } from 'react';
import { supabase } from '../lib/supabase';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading'); setError('');
    const { error: err } = await supabase.from('contact_messages').insert([{ ...form, status: 'new' }]);
    if (err) { setStatus('error'); setError(err.message); }
    else { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); }
  };

  if (status === 'success') {
    return (
      <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-6">
        <h3 className="font-serif text-xl font-semibold text-emerald-900 mb-2">Message received.</h3>
        <p className="text-emerald-800">We'll respond by email within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="not-prose bg-navy-50/60 border border-navy-100 rounded-2xl p-6 md:p-8 my-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" />
        <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" />
      </div>
      <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" />
      <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none" />
      {status === 'error' && <div className="text-sm text-red-600">{error}</div>}
      <button type="submit" disabled={status === 'loading'}
        className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-60">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}



