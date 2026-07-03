import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigate } from '../../lib/router';
import BrandMark from '../BrandMark';

const NAV = [
  { label: 'Templates', to: '/small-claims-court-document-templates' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Terms Of Service', to: '/terms' },
  { label: 'Disclaimer', to: '/disclaimer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-navy-100 bg-white/90 shadow-sm backdrop-blur-xl'
          : 'border-b border-white/10 bg-navy-950/35 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <button onClick={() => go('/')} className="flex items-center gap-2 group" aria-label="Claim Navigator home">
          <BrandMark size="sm" className={scrolled ? 'ring-2 ring-navy-900/10 shadow-md' : 'ring-2 ring-gold-300/25 shadow-lg'} />
          <span className={`font-serif text-xl font-semibold ${scrolled ? 'text-navy-900' : 'text-white'}`}>
            Claim Navigator
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Primary">
          {NAV.map(({ label, to }) => (
            <button
              key={to}
              onClick={() => go(to)}
              className={`text-xs xl:text-sm font-medium transition hover:text-gold-500 ${
                scrolled ? 'text-navy-700' : 'text-white/90'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => go('/checkout')}
            className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 text-navy-950 font-semibold px-4 xl:px-5 py-2.5 rounded-lg text-xs xl:text-sm transition shadow-[0_10px_28px_rgba(196,145,42,0.24)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(220,174,53,0.34)]"
          >
            Get Starter Pack - $49
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${scrolled ? 'text-navy-900' : 'text-white'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-navy-100 px-6 py-4 space-y-3 shadow-lg">
          {NAV.map(({ label, to }) => (
            <button
              key={to}
              onClick={() => go(to)}
              className="block w-full text-left text-navy-800 font-medium py-2"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => go('/checkout')}
            className="block w-full bg-gold-500 text-navy-950 font-semibold px-5 py-3 rounded-lg"
          >
            Get Starter Pack - $49
          </button>
        </div>
      )}
    </header>
  );
}
