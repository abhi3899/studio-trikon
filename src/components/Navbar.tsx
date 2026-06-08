import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const isHome = location.pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-bg/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
              <polygon
                points="14,2 26,24 2,24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-colors duration-300 ${
                  scrolled || !isHome ? 'text-accent' : 'text-accent'
                }`}
              />
            </svg>
            <span
              className={`font-display text-xl tracking-wide font-medium transition-colors duration-300 ${
                scrolled || !isHome ? 'text-ink' : 'text-white'
              }`}
            >
              Studio Trikon
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`font-body text-sm tracking-wide transition-all duration-200 hover:text-accent relative group ${
                    scrolled || !isHome ? 'text-muted' : 'text-white/80'
                  } ${location.pathname === l.to ? '!text-accent' : ''}`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-200 ${
                      location.pathname === l.to ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className={`md:hidden transition-colors ${scrolled || !isHome ? 'text-ink' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center transition-all duration-400 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`font-display text-4xl text-ink hover:text-accent transition-colors ${
                  location.pathname === l.to ? 'text-accent' : ''
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
