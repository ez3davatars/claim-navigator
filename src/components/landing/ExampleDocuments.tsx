export default function ExampleDocuments() {
  return (
    <section id="example-documents" className="py-24 bg-white border-t border-navy-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-14">
          <img
            src="/assets/VA Badge.png"
            alt="Virginia veteran-owned small business badge"
            className="block w-full h-auto"
          />
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

