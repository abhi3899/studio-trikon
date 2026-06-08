import { Navigate, Outlet } from 'react-router-dom'

const ADMIN_KEY = 'studio_trikon_admin'

export default function AdminGuard() {
  const auth = sessionStorage.getItem(ADMIN_KEY)
  return auth ? <Outlet /> : <Navigate to="/admin" replace />
}
