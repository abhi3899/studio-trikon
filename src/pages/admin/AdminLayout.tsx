import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutGrid, PlusCircle, MessageSquareQuote, LogOut, ExternalLink } from 'lucide-react'

const ADMIN_KEY = 'studio_trikon_admin'

const links = [
  { to: '/admin/dashboard', icon: LayoutGrid, label: 'Projects' },
  { to: '/admin/add-project', icon: PlusCircle, label: 'Add Project' },
  { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY)
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-ink flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,24 2,24" fill="none" stroke="#c1603a" strokeWidth="1.5" />
            </svg>
            <span className="font-display text-base text-white/90">Studio Trikon</span>
          </div>
          <p className="font-body text-[10px] text-white/30 mt-1 tracking-wide uppercase">Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4">
          <ul className="space-y-0.5">
            {links.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/admin/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-all duration-150 ${
                      isActive
                        ? 'text-white bg-white/10 text-sm'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={15} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 font-body text-sm text-white/40 hover:text-white transition-colors"
          >
            <ExternalLink size={15} />
            View Site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 font-body text-sm text-white/40 hover:text-red-400 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
