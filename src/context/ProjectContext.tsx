import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Project, Testimonial } from '../types'
import { supabase, rowToProject, projectToRow, rowToTestimonial } from '../lib/supabase'
import { seedProjects, seedTestimonials } from '../data/seedData'

interface ProjectContextValue {
  projects: Project[]
  testimonials: Testimonial[]
  loading: boolean
  addProject: (p: Project) => Promise<void>
  updateProject: (p: Project) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addTestimonial: (t: Testimonial) => Promise<void>
  updateTestimonial: (t: Testimonial) => Promise<void>
  deleteTestimonial: (id: string) => Promise<void>
  getProject: (id: string) => Project | undefined
  seedDatabase: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchProjects(), fetchTestimonials()]).finally(() =>
      setLoading(false)
    )
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error('fetchProjects:', error.message); return }
    setProjects((data ?? []).map(rowToProject))
  }

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) { console.error('fetchTestimonials:', error.message); return }
    setTestimonials((data ?? []).map(rowToTestimonial))
  }

  const addProject = async (p: Project) => {
    const { error } = await supabase.from('projects').insert(projectToRow(p))
    if (error) throw new Error(error.message)
    setProjects(prev => [p, ...prev])
  }

  const updateProject = async (p: Project) => {
    const { error } = await supabase
      .from('projects')
      .update(projectToRow(p))
      .eq('id', p.id)
    if (error) throw new Error(error.message)
    setProjects(prev => prev.map(x => (x.id === p.id ? p : x)))
  }

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setProjects(prev => prev.filter(x => x.id !== id))
  }

  const addTestimonial = async (t: Testimonial) => {
    const { error } = await supabase.from('testimonials').insert(t)
    if (error) throw new Error(error.message)
    setTestimonials(prev => [...prev, t])
  }

  const updateTestimonial = async (t: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update(t)
      .eq('id', t.id)
    if (error) throw new Error(error.message)
    setTestimonials(prev => prev.map(x => (x.id === t.id ? t : x)))
  }

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setTestimonials(prev => prev.filter(x => x.id !== id))
  }

  const getProject = (id: string) => projects.find(x => x.id === id)

  // One-time seed: inserts demo data when the DB is empty
  const seedDatabase = async () => {
    const rows = seedProjects.map(projectToRow)
    const { error: pe } = await supabase.from('projects').insert(rows)
    if (pe) throw new Error(pe.message)
    const { error: te } = await supabase.from('testimonials').insert(seedTestimonials)
    if (te) throw new Error(te.message)
    setProjects(seedProjects)
    setTestimonials(seedTestimonials)
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        testimonials,
        loading,
        addProject,
        updateProject,
        deleteProject,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        getProject,
        seedDatabase,
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
