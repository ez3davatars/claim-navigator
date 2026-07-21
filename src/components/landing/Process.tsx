const steps = [
  {
    number: '01',
    title: 'Select Your Package',
    description: 'Select the package that best fits your needs, from DIY templates to clerical document preparation support.',
  },
  {
    number: '02',
    title: 'Complete the Prompts',
    description: 'Complete the guided prompts, templates, or intake questionnaire for the package you selected.',
  },
  {
    number: '03',
    title: 'Organize Your Information',
    description: 'Organize your case-specific facts, documents, and supporting information in a clear preparation format.',
  },
  {
    number: '04',
    title: 'Review Local Requirements',
    description: 'Review your local court rules, deadlines, and filing requirements before submitting anything.',
  },
  {
    number: '05',
    title: 'File and Serve',
    description: "File and serve documents according to your jurisdiction's rules and court procedures.",
  },
];

export default function Process() {
  return (
    <section id="how-it-works" className="py-24 bg-navy-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f1d33 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">
            A clear preparation flow for DIY templates, standard clerical preparation, and expedited support.
          </h2>
          <a
            href="#video-guide"
            data-video-jump="2"
            className="inline-flex text-sm font-semibold text-gold-700 underline decoration-gold-300 underline-offset-4 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 rounded"
          >
            Watch: How your story becomes a structured complaint
          </a>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
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
