export interface Project {
  id: string
  title: string
  category: 'Residential' | 'Commercial' | 'Interior' | string
  year: string
  location: string
  area: string
  description: string
  shortDescription: string
  images: string[]
  coverImage: string
  tags: string[]
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  project: string
  quote: string
  role: string
}

export interface AdminCredentials {
  password: string
}
