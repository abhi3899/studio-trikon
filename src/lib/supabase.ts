import { createClient } from '@supabase/supabase-js'
import type { Project, Testimonial } from '../types'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  console.warn(
    '[Studio Trikon] Supabase env vars missing. ' +
    'Copy .env.example → .env.local and fill in your project credentials.'
  )
}

export const supabase = createClient(url ?? '', key ?? '')

// ── Type helpers ──────────────────────────────────────────

interface ProjectRow {
  id: string
  title: string
  category: string
  year: string
  location: string
  area: string
  description: string
  short_description: string
  images: string[]
  cover_image: string
  tags: string[]
  featured: boolean
  created_at?: string
}

interface TestimonialRow {
  id: string
  name: string
  project: string
  quote: string
  role: string
  created_at?: string
}

export function rowToProject(r: ProjectRow): Project {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    year: r.year,
    location: r.location,
    area: r.area,
    description: r.description,
    shortDescription: r.short_description,
    images: r.images,
    coverImage: r.cover_image,
    tags: r.tags,
    featured: r.featured,
  }
}

export function projectToRow(p: Project): Omit<ProjectRow, 'created_at'> {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    year: p.year,
    location: p.location,
    area: p.area,
    description: p.description,
    short_description: p.shortDescription,
    images: p.images,
    cover_image: p.coverImage,
    tags: p.tags,
    featured: p.featured,
  }
}

export function rowToTestimonial(r: TestimonialRow): Testimonial {
  return { id: r.id, name: r.name, project: r.project, quote: r.quote, role: r.role }
}
