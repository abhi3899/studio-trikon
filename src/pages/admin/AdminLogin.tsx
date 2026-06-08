import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (authError) {
      setError('Incorrect email or password.')
      setPassword('')
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-ink mb-5">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,24 2,24" fill="none" stroke="#c1603a" strokeWidth="1.5" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-ink">Studio Trikon</h1>
          <p className="font-body text-sm text-muted mt-1">Admin Portal</p>
        </div>

        <form onSubmit={submit} className="bg-bg border border-border p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock size={14} className="text-muted" />
            <span className="font-body text-sm text-muted">Sign in to continue</span>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full bg-surface border border-border pl-9 pr-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors"
              placeholder="admin@studiotrikon.in"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              required
              className={`w-full bg-surface border px-4 py-3 pr-10 font-body text-sm text-ink focus:outline-none transition-colors ${
                error ? 'border-red-400' : 'border-border focus:border-ink'
              }`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white font-body text-sm py-3 hover:bg-accent transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
