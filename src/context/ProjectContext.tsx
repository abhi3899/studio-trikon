import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Project, Testimonial } from '../types'
import { seedProjects, seedTestimonials } from '../data/seedData'

const STORAGE_KEY = 'studio_trikon_projects'
const TESTIMONIALS_KEY = 'studio_trikon_testimonials'

interface ProjectContextValue {
  projects: Project[]
  testimonials: Testimonial[]
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  addTestimonial: (t: Testimonial) => void
  updateTestimonial: (t: Testimonial) => void
  deleteTestimonial: (id: string) => void
  getProject: (id: string) => Project | undefined
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : seedProjects
    } catch {
      return seedProjects
    }
  })

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem(TESTIMONIALS_KEY)
      return stored ? JSON.parse(stored) : seedTestimonials
    } catch {
      return seedTestimonials
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials))
  }, [testimonials])

  const addProject = (p: Project) => setProjects(prev => [p, ...prev])
  const updateProject = (p: Project) =>
    setProjects(prev => prev.map(x => (x.id === p.id ? p : x)))
  const deleteProject = (id: string) =>
    setProjects(prev => prev.filter(x => x.id !== id))
  const getProject = (id: string) => projects.find(x => x.id === id)

  const addTestimonial = (t: Testimonial) => setTestimonials(prev => [t, ...prev])
  const updateTestimonial = (t: Testimonial) =>
    setTestimonials(prev => prev.map(x => (x.id === t.id ? t : x)))
  const deleteTestimonial = (id: string) =>
    setTestimonials(prev => prev.filter(x => x.id !== id))

  return (
    <ProjectContext.Provider
      value={{
        projects,
        testimonials,
        addProject,
        updateProject,
        deleteProject,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider')
  return ctx
}
