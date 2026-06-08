import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminGuard from './pages/admin/AdminGuard'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProject from './pages/admin/AddProject'
import EditProject from './pages/admin/EditProject'
import AdminTestimonials from './pages/admin/AdminTestimonials'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicLayout>
                <Projects />
              </PublicLayout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PublicLayout>
                <ProjectDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add-project" element={<AddProject />} />
              <Route path="/admin/edit-project/:id" element={<EditProject />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectProvider>
  )
}
