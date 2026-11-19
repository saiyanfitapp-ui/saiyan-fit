'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` }
    });
    if (error) { setState('error'); setMsg('Non sono riuscito a inviare il link. Controlla l\'email e riprova tra un minuto.'); }
    else setState('sent');
  }

  return (
    <main className="login">
      <div className="login-card stack s16">
        <div className="brand" style={{ fontSize: 26 }}>
          <svg viewBox="0 0 32 32" aria-hidden="true" width="40" height="40"><rect x="2" y="2" width="28" height="28" rx="9" fill="#0B1B3F" /><path d="M7 21 9 9l3.5 6L16 5l3.5 10L23 9l2 12z" fill="var(--gold)" /><path d="M9 21h14v2.5a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" fill="var(--gold-2)" /></svg>
          <span>Saiyan <span style={{ color: 'var(--gold)' }}>Fit</span></span>
        </div>
        {state === 'sent' ? (
          <p>Ti ho mandato un link a <b>{email}</b>. Aprilo da questo dispositivo per entrare.</p>
        ) : (
          <form onSubmit={onSubmit} className="stack s12">
            <label htmlFor="email" className="flabel">La tua email</label>
            <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
            <button className="btn ai block" disabled={state === 'sending'}>{state === 'sending' ? 'Invio…' : 'Ricevi il link di accesso'}</button>
            {state === 'error' && <p className="tiny" role="alert">{msg}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
