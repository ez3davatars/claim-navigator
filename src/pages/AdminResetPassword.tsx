import { useEffect, useState } from 'react';
import { AlertCircle, Lock, Scale } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { navigate } from '../lib/router';

export default function AdminResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const authError = query.get('error_description') || hash.get('error_description');
    if (authError) {
      setError(authError.replace(/\+/g, ' '));
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setReady(true);
        setChecking(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      await supabase.auth.signOut();
      navigate('/admin/login?password_reset=success');
    } catch (err: any) {
      setError(err.message || 'Unable to update password');
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
          <h1 className="text-white font-serif text-2xl">Choose a new password</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {checking ? <p className="text-center text-sm text-navy-600">Verifying your recovery link...</p> : ready ? (
            <form onSubmit={submit} className="space-y-4">
              <div><label className="block text-sm font-semibold text-navy-800 mb-2">New password</label><input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" /></div>
              <div><label className="block text-sm font-semibold text-navy-800 mb-2">Confirm new password</label><input type="password" required minLength={8} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400" /></div>
              {error && <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> {loading ? 'Updating...' : 'Update password'}</button>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-left text-red-700 text-sm"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error || 'This recovery link is invalid or has expired. Request a new one.'}</div>
              <button type="button" onClick={() => navigate('/admin/forgot-password')} className="font-semibold text-gold-600 hover:underline">Request a new reset link</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
