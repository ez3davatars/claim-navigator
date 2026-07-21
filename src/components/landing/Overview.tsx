const BLOCKS = [
  {
    h: 'WHAT IS CLAIM NAVIGATOR?',
    p: 'Claim Navigator is a self-help document preparation platform by Get Pro Se Solutions, LLC designed to help self-represented litigants organize and prepare professionally formatted complaint documents commonly used in small claims, civil, supreme, and federal court proceedings.',
    videoJump: 0,
    videoText: 'Watch: What a complaint does in a lawsuit',
  },
  {
    h: 'WHO IS CLAIM NAVIGATOR FOR?',
    p: 'Claim Navigator is for individuals representing themselves in court who want organized complaint templates and structured document formatting without hiring an attorney.',
  },
  {
    h: 'WHAT DOCUMENTS CAN CLAIM NAVIGATOR HELP WITH?',
    p: 'Claim Navigator focuses on educational complaint templates and formatting examples designed to help self-represented litigants better understand how complaints are commonly organized and presented in court.',
  },
  {
    h: 'IS THIS LEGAL ADVICE?',
    p: 'No. Claim Navigator and Get Pro Se Solutions, LLC are not law firms and do not provide legal advice, legal representation, or legal strategy. All services are strictly educational, clerical, and administrative in nature.',
  },
  {
    h: 'WHAT CLAIM NAVIGATOR DOES NOT DO',
    p: 'Claim Navigator does not provide legal advice, interpret laws, represent users in court, select legal claims, or guarantee legal outcomes. Users remain solely responsible for all legal decisions and filings.',
  },
  {
    h: 'WHY USE CLAIM NAVIGATOR INSTEAD OF STARTING FROM SCRATCH?',
    p: 'Claim Navigator helps self-represented litigants organize their information into a clearer and more professionally structured complaint format, helping users present their case in a more organized and understandable manner.',
  },
];

export default function Overview() {
  return (
    <section className="py-20 bg-white border-t border-navy-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Overview</div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900">Everything you need to know, at a glance.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {BLOCKS.map(({ h, p, videoJump, videoText }) => (
            <article
              key={h}
              className="bg-gradient-to-br from-gold-100/90 via-gold-50 to-white border border-gold-200 rounded-2xl p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-gold-400 hover:shadow-2xl"
            >
              <h3 className="font-serif text-xl font-semibold text-navy-900 mb-2">{h}</h3>
              <p className="text-navy-700 leading-relaxed">{p}</p>
              {videoText && typeof videoJump === 'number' && (
                <a
                  href="#video-guide"
                  data-video-jump={videoJump}
                  className="inline-flex mt-4 text-sm font-semibold text-gold-700 underline decoration-gold-300 underline-offset-4 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 rounded"
                >
                  {videoText}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
