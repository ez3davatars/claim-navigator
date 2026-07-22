import { useState } from 'react';
import { AlertCircle, ArrowLeft, Mail, Scale } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { navigate } from '../lib/router';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Unable to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10"><Scale className="w-6 h-6 text-gold-400" /></div>
            <span className="font-serif text-2xl font-semibold text-white">Claim Navigator</span>
          </div>
          <h1 className="text-white font-serif text-2xl">Reset your password</h1>
          <p className="text-navy-300 text-sm mt-1">We will email you a secure recovery link.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="space-y-5 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"><Mail className="w-6 h-6 text-green-700" /></div>
              <div><h2 className="font-serif text-xl font-semibold text-navy-900">Check your email</h2><p className="mt-2 text-sm leading-relaxed text-navy-600">If an account exists for {email}, a password-reset link has been sent. Use the newest email you receive.</p></div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><label className="block text-sm font-semibold text-navy-800 mb-2">Email</label><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" /></div>
              {error && <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60">{loading ? 'Sending...' : 'Send reset link'}</button>
            </form>
          )}
          <button type="button" onClick={() => navigate('/admin/login')} className="mx-auto mt-6 flex items-center gap-2 text-sm font-semibold text-gold-600 hover:underline"><ArrowLeft className="w-4 h-4" /> Back to sign in</button>
        </div>
      </div>
    </div>
  );
}
