import { useState } from 'react';
import { Scale, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { navigate } from '../lib/router';

type Mode = 'signin' | 'signup';

export default function AdminLogin() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(() =>
    new URLSearchParams(window.location.search).get('password_reset') === 'success'
      ? 'Password updated successfully. Sign in with your new password.'
      : '',
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (err) throw err;
        if (!data.user) throw new Error('Signup failed');
        if (!data.session) {
          setMode('signin');
          setPassword('');
          setMessage('Account created. Check your email to confirm your address, then sign in.');
          return;
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <Scale className="w-6 h-6 text-gold-400" />
            </div>
            <span className="font-serif text-2xl font-semibold text-white">Claim Navigator</span>
          </div>
          <h1 className="text-white font-serif text-2xl">Admin Portal</h1>
          <p className="text-navy-300 text-sm mt-1">
            {mode === 'signin' ? 'Sign in to manage your CRM' : 'Create an admin account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-navy-800 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              {mode === 'signin' && (
                <button type="button" onClick={() => navigate('/admin/forgot-password')} className="mt-2 text-sm font-semibold text-gold-600 hover:underline">Forgot password?</button>
              )}
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }}
              className="text-gold-600 font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
            </button>
          </div>

          {mode === 'signup' && (
            <div className="mt-4 text-xs text-navy-500 bg-navy-50 rounded-lg p-3 leading-relaxed">
              The first account created becomes the <strong>owner</strong>. Subsequent signups are created as <strong>staff</strong> and can be promoted by the owner.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
