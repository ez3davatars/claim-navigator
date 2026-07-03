import { GraduationCap, Scale, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-100 via-white to-navy-100 shadow-[0_0_0_20px_rgba(255,255,255,0.75)]" />
            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-white shadow-2xl">
              <img
                src="/assets/Profile Picture.png"
                alt="Matthew M. Aulicino, founder of Get Pro Se Solutions, LLC"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-navy-950 text-white p-6 rounded-2xl shadow-2xl max-w-xs">
              <div className="text-gold-400 font-serif text-4xl font-bold">17+</div>
              <div className="text-sm text-navy-200 mt-1">Years of pro se experience across Small Claims, Civil, and Supreme Court</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">About the Founder</div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">
              Built from Real-World Pro Se Experience
            </h2>
            <p className="text-xl font-serif italic text-navy-700 mb-4">Matthew M. Aulicino - Founder, Get Pro Se Solutions, LLC</p>
            <p className="text-navy-600 leading-relaxed mb-6">
              Claim Navigator is a self-help educational platform by <strong>Get Pro Se Solutions, LLC</strong> designed to help self-represented litigants organize information using complaint templates, formatting examples, and structured educational resources.
            </p>
            <p className="text-navy-600 leading-relaxed mb-8">
              I have been a self-represented litigant since 2008, with experience across Small Claims, Civil, and Supreme Court proceedings. Claim Navigator was created to help individuals better understand court document structure, formatting, and organization through educational examples and self-help resources.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: GraduationCap, label: "Master's in Criminal Justice" },
                { icon: Shield, label: 'U.S. Army Veteran' },
                { icon: Scale, label: 'Pro Se Since 2008' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-navy-50 p-4 rounded-xl border border-navy-100 text-center">
                  <Icon className="w-6 h-6 text-gold-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-navy-800">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

