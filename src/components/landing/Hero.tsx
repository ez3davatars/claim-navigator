import { ArrowRight, Award, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { navigate } from '../../lib/router';
import BrandMark from '../BrandMark';

const LOGO_ANIMATION_SRC = '/assets/Seedance 2_0 - Make the green sphere in the middle spin like a globe withing the black space in the 4K.mp4';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy-950 pt-24 pb-16 lg:min-h-[820px] lg:pt-28 lg:pb-20">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Small claims courtroom with desk and legal documents"
          loading="eager"
          className="h-full w-full object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(8,17,33,0.98)_0%,rgba(15,29,51,0.92)_42%,rgba(7,28,32,0.95)_100%)]" />
        <div className="absolute -left-44 top-8 h-[42rem] w-[42rem] rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute right-[-15rem] top-24 h-[46rem] w-[46rem] rounded-full bg-emerald-500/[0.16] blur-3xl" />
        <div className="absolute right-[10%] top-[22%] h-96 w-96 rounded-full bg-navy-400/[0.18] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(248,239,200,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(248,239,200,0.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.52)_100%)]" />
        <div className="absolute -left-1/4 top-0 h-44 w-[150%] rotate-[-8deg] bg-white/[0.08] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="animate-fade-up lg:col-span-7 lg:-translate-y-3">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-white/[0.065] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-8 lg:p-10">
              <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent" />

              <div className="mb-7 flex flex-col gap-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-300/30 bg-navy-950/[0.45] px-4 py-2 shadow-lg shadow-black/20">
                  <Award className="h-4 w-4 text-gold-300" aria-hidden="true" />
                  <span className="text-sm font-medium text-gold-100">By Get Pro Se Solutions, LLC - Veteran-founded</span>
                </div>

                <div className="group relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-gold-300/[0.55] bg-navy-950/[0.72] p-3 shadow-[0_0_42px_rgba(220,174,53,0.24)] backdrop-blur-xl md:h-[82px]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold-300/10 via-white/5 to-transparent opacity-80" />
                  <div className="relative flex items-center gap-4">
                    <img
                      src="/assets/sdvosb-badge.png"
                      alt="VOB SDVOSB verified member badge"
                      className="h-[58px] w-[58px] shrink-0 rounded-full bg-white object-contain p-1 shadow-lg shadow-gold-500/20"
                    />
                    <div className="min-w-0">
                      <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-gold-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-200">
                        <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                        Verified Member
                      </div>
                      <div className="font-serif text-lg font-semibold leading-tight text-white">Verified SDVOSB</div>
                      <div className="text-xs font-medium leading-snug text-navy-100">Service-Disabled Veteran-Owned Small Business</div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="mb-6 max-w-4xl text-balance font-serif text-5xl font-semibold leading-[1.03] text-white md:text-6xl lg:text-7xl">
                Take Control of Your{' '}
                <span className="text-gold-400 italic drop-shadow-[0_0_24px_rgba(220,174,53,0.26)]">Small Claims</span> Case
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-navy-100 md:text-xl">
                Claim Navigator is a self-help document preparation platform for self-represented litigants. Structured small claims court templates and plain-language instructions from Get Pro Se Solutions, LLC. <span className="text-gold-200">Not a law firm. Does not provide legal advice.</span>
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => navigate('/checkout')}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-navy-950 shadow-[0_18px_44px_rgba(196,145,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(220,174,53,0.42)]"
                >
                  Download Starter Pack - $49
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
                <button
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-xl border border-white/[0.22] bg-white/[0.08] px-8 py-4 font-medium text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/[0.65] hover:bg-white/[0.13]"
                >
                  See Packages
                </button>
              </div>

              <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-navy-950/40 p-3 text-sm text-navy-50 shadow-inner shadow-black/10 backdrop-blur-md">
                <div className="flex items-center gap-2 rounded-full px-2 py-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-300" /> Instant Digital Delivery
                </div>
                <div className="flex items-center gap-2 rounded-full px-2 py-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-300" /> Clerical Preparation Options
                </div>
                <div className="flex items-center gap-2 rounded-full px-2 py-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-300" /> Step-by-Step Guide
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in lg:col-span-5 lg:min-h-[560px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl lg:block" />
            <video
              className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[1px] mix-blend-screen lg:block"
              src={LOGO_ANIMATION_SRC}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              style={{
                WebkitMaskImage: 'radial-gradient(circle, black 46%, transparent 72%)',
                maskImage: 'radial-gradient(circle, black 46%, transparent 72%)',
              }}
            />
            <div className="pointer-events-none absolute right-0 top-8 hidden h-44 w-44 rounded-full border border-gold-300/[0.15] lg:block" />

            <div className="relative z-10 mx-auto w-full max-w-[450px] rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-[#fbfaf4] to-gold-50 p-6 shadow-[0_34px_90px_rgba(0,0,0,0.42)] transition-transform duration-500 lg:-translate-y-2 lg:rotate-[1.3deg] lg:hover:rotate-0 md:p-8">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold-200/[0.55] blur-3xl" />
              <div className="pointer-events-none absolute bottom-8 right-8 opacity-[0.08]">
                <FileText className="h-44 w-44 text-navy-900" aria-hidden="true" />
              </div>
              <div className="pointer-events-none absolute left-8 right-8 top-32 space-y-3 opacity-[0.08]">
                {[0, 1, 2, 3].map((line) => (
                  <div key={line} className="h-2 rounded-full bg-navy-900" style={{ width: `${88 - line * 12}%` }} />
                ))}
              </div>

              <div className="relative mb-7 flex items-center gap-4 border-b border-navy-100 pb-6">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gold-400/35 blur-md" />
                  <div className="relative rounded-full bg-navy-950 p-2 shadow-xl">
                    <BrandMark size="md" />
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-navy-900">Starter Pack</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">Complete Toolkit</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-serif text-4xl font-bold text-navy-900">$49</div>
                  <div className="text-xs text-navy-500">one-time</div>
                </div>
              </div>

              <ul className="relative space-y-3.5 text-sm">
                {[
                  'Complaint Template',
                  'Discovery Demand Template',
                  'Demand Letter Template',
                  "Defendant's Answer Template",
                  'Settlement Proposal Template',
                  'Step-by-Step Instructions Guide',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-navy-700">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-gold-700" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 rounded-2xl border border-gold-200 bg-white/70 p-3 shadow-inner">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Instant Digital Access
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full rounded-xl bg-navy-950 py-3 font-semibold text-white shadow-[0_16px_36px_rgba(8,17,33,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-[0_20px_44px_rgba(8,17,33,0.36)]"
                >
                  Get Instant Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

