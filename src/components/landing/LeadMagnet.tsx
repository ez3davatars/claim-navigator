import { useEffect, useState } from 'react';
import { X, Gift, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function LeadMagnet() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (sessionStorage.getItem('cn_leadmagnet_seen')) return;
    const timer = setTimeout(() => setShow(true), 18000);
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('cn_leadmagnet_seen')) setShow(true);
    };
    document.addEventListener('mouseleave', onExit);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onExit);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem('cn_leadmagnet_seen', '1');
    setShow(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('leads').insert([{
      email,
      name,
      source: 'lead_magnet_popup',
      status: 'new',
    }]);
    if (error) setStatus('error');
    else {
      setStatus('success');
      setTimeout(close, 2500);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={close} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-up">
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-navy-100 text-navy-600 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-navy-900 to-navy-950 p-8 text-center">
          <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-navy-950" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-white mb-2">Free Preparation Checklist</h3>
          <p className="text-navy-200 text-sm">Get our Small Claims Preparation Checklist delivered to your inbox.</p>
        </div>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <div className="font-serif text-lg font-semibold text-navy-900">Check your inbox.</div>
              <p className="text-sm text-navy-600 mt-1">Your checklist is on its way.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <input
                type="text"
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Send My Checklist'}
              </button>
              <p className="text-xs text-navy-500 text-center">No spam. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
