import { Download, FileText } from 'lucide-react';

const SAMPLE_DOCS = [
  { title: 'Sample #1', href: '/docs/sample-complaint-1.pdf' },
  { title: 'Sample #2', href: '/docs/sample-complaint-2.pdf' },
  { title: 'Sample #3', href: '/docs/sample-complaint-3.pdf' },
];

export default function ExampleDocuments() {
  return (
    <section id="example-documents" className="py-24 bg-white border-t border-navy-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Example Documents</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">
            Sample Complaints
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Review these examples to better understand common complaint structure and formatting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {SAMPLE_DOCS.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-navy-50/70 border border-navy-100 rounded-2xl p-6 hover:border-gold-400 hover:bg-gold-50/40 transition"
            >
              <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-gold-400" aria-hidden="true" />
              </div>
              <div className="font-serif text-2xl font-semibold text-navy-900 mb-2">{doc.title}</div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 group-hover:text-gold-600">
                Open PDF <Download className="w-4 h-4" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-navy-950 text-white rounded-2xl p-8 md:p-10">
          <div className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">What Is a Complaint?</div>
          <p className="text-navy-100 leading-relaxed mb-5">
            A Complaint is one of the most important documents filed at the beginning of a small claims or civil court case. It explains your side of the dispute to the Court in a structured legal format and outlines the facts, damages, and relief being requested.
          </p>
          <p className="text-navy-100 leading-relaxed mb-4">A properly organized complaint can help the Court better understand:</p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-navy-100">
            {['What happened', 'Who is involved', 'Why damages are being claimed', 'What outcome the Plaintiff is requesting'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-navy-100 leading-relaxed mb-5">
            For self-represented litigants, having a clear and professionally formatted complaint helps present the case in a more organized and understandable manner.
          </p>
          <p className="text-navy-100 leading-relaxed mb-5">
            These sample complaints are provided solely for educational and illustrative purposes to help users better understand the general structure and formatting commonly seen in civil filings.
          </p>
          <p className="text-sm text-navy-300">
            Get Pro Se Solutions, LLC is not a law firm and does not provide legal advice or legal representation.
          </p>
        </div>
      </div>
    </section>
  );
}

