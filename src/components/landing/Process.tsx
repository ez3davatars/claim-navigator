const steps = [
  {
    number: '01',
    title: 'Download Your Templates',
    description: 'Access educational complaint templates, formatting examples, and general organizational resources immediately after purchase.',
  },
  {
    number: '02',
    title: 'Review the Structure',
    description: 'Use the sample formatting guides to better understand how court complaints are commonly organized and presented.',
  },
  {
    number: '03',
    title: 'Organize Your Information',
    description: 'Transfer your own information into the template structure using the educational examples provided.',
  },
  {
    number: '04',
    title: 'Review Before Filing',
    description: 'Carefully review your documents, local court requirements, and filing procedures before submitting any materials to the court.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-navy-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f1d33 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">
            Educational complaint templates and formatting resources designed to help self-represented litigants better organize court paperwork.
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-md border border-navy-100 mb-6 relative z-10">
                  <span className="font-serif text-3xl font-bold text-navy-900">{number}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">{title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
