import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <polygon points="14,2 26,24 2,24" fill="none" stroke="#c1603a" strokeWidth="1.5" />
              </svg>
              <span className="font-display text-lg text-white/90 font-medium">Studio Trikon</span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-xs">
              Architecture and design studio based in Pune. Building spaces that last.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs tracking-[0.12em] uppercase text-white/40 mb-4">Navigate</p>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Contact'].map(l => (
                <li key={l}>
                  <Link
                    to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                    className="font-body text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.12em] uppercase text-white/40 mb-4">Get in touch</p>
            <address className="not-italic font-body text-sm space-y-1.5">
              <p>hello@studiotrikon.in</p>
              <p>+91 98765 43210</p>
              <p className="mt-3 leading-relaxed">
                Studio Trikon, Koregaon Park<br />
                Pune 411001, Maharashtra
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs">© {new Date().getFullYear()} Studio Trikon. All rights reserved.</p>
          <Link to="/admin" className="font-body text-xs text-white/20 hover:text-white/40 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
