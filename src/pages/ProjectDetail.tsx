import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize2 } from 'lucide-react'
import { useProjects } from '../context/ProjectContext'
import LazyImage from '../components/LazyImage'
import SectionLabel from '../components/SectionLabel'
import ProjectCard from '../components/ProjectCard'
import { getImageUrl } from '../utils/imageUtils'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { projects, getProject } = useProjects()
  const project = getProject(id!)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3)

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }
  const prev = () => setLightboxIndex(i => (i - 1 + project.images.length) % project.images.length)
  const next = () => setLightboxIndex(i => (i + 1) % project.images.length)

  return (
    <main className="pt-[72px]">
      {/* Back */}
      <div className="px-6 py-5 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-ink transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            All Projects
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <div className="aspect-[16/7] overflow-hidden bg-surface cursor-pointer" onClick={() => openLightbox(0)}>
        <LazyImage
          src={project.images[0]}
          alt={project.title}
          size="hero"
          className="w-full h-full hover:scale-[1.02] transition-transform duration-700"
        />
      </div>

      {/* Project header */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionLabel>{project.category}</SectionLabel>
            <h1 className="font-display text-display-lg text-ink mt-2">{project.title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:pl-8 lg:border-l border-border">
            <div>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted mb-1">Year</p>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-accent" />
                <p className="font-body text-sm text-ink">{project.year}</p>
              </div>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted mb-1">Location</p>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" />
                <p className="font-body text-sm text-ink">{project.location}</p>
              </div>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted mb-1">Area</p>
              <p className="font-body text-sm text-ink">{project.area}</p>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted mb-1">Type</p>
              <p className="font-body text-sm text-ink">{project.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="font-body text-lg text-ink/80 leading-relaxed">{project.description}</p>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-body text-xs tracking-wide px-3 py-1 bg-surface text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image gallery */}
      {project.images.length > 1 && (
        <section className="pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>Project Gallery</SectionLabel>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer overflow-hidden aspect-[4/3] bg-surface"
                  onClick={() => openLightbox(i)}
                >
                  <LazyImage src={img} alt={`${project.title} ${i + 1}`} size="cover" className="w-full h-full" />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>More {project.category} Projects</SectionLabel>
            <h2 className="font-display text-display-md text-ink mt-2 mb-10">Related Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-5 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] w-full px-16"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={getImageUrl(project.images[lightboxIndex], 'full')}
              alt={`${project.title} ${lightboxIndex + 1}`}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <p className="text-center text-white/40 font-body text-xs mt-3">
              {lightboxIndex + 1} / {project.images.length}
            </p>
          </div>

          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-5 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </main>
  )
}
