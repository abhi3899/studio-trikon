import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'

const ADMIN_PASS = 'trikon2024'
const ADMIN_KEY = 'studio_trikon_admin'

export default function AdminLogin() {
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_KEY, '1')
      navigate('/admin/dashboard')
    } else {
      setError(true)
      setPass('')
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

        <form onSubmit={submit} className="bg-bg border border-border p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-muted" />
            <span className="font-body text-sm text-muted">Enter admin password</span>
          </div>

          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={e => { setPass(e.target.value); setError(false) }}
              required
              autoFocus
              className={`w-full bg-surface border px-4 py-3 pr-10 font-body text-sm text-ink focus:outline-none transition-colors ${
                error ? 'border-red-400' : 'border-border focus:border-ink'
              }`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500 mb-4">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full bg-ink text-white font-body text-sm py-3 hover:bg-accent transition-colors duration-200"
          >
            Enter Admin
          </button>

          <p className="font-body text-xs text-muted text-center mt-5">
            Default password: <code className="font-mono bg-surface px-1.5 py-0.5">trikon2024</code>
          </p>
        </form>
      </div>
    </main>
  )
}
