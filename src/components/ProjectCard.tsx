import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import LazyImage from './LazyImage'
import type { Project } from '../types'

interface Props {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-surface">
        {/* Index number */}
        <span className="absolute top-4 left-4 z-10 font-body text-[11px] tracking-[0.18em] text-white/40 select-none">
          {num}
        </span>

        <LazyImage
          src={project.coverImage}
          alt={project.title}
          size="cover"
          className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-[1.07]"
        />

        {/* Slide-up overlay */}
        <div className="absolute inset-0 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-t from-ink/95 via-ink/70 to-transparent">
          <div className="p-5 pb-6">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-2">
              {project.category}
            </p>
            <h3 className="font-display text-[1.35rem] text-white leading-tight">
              {project.title}
            </h3>
            <p className="font-body text-xs text-white/45 mt-1">
              {project.location} · {project.year}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-white/60 font-body text-[11px] tracking-[0.1em] uppercase border-b border-white/20 pb-0.5">
              View Project <ArrowUpRight size={11} className="ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Below card */}
      <div className="pt-4 flex items-start justify-between">
        <div>
          <h3 className="font-display text-xl text-ink group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-muted mt-0.5">
            {project.location} · {project.year}
          </p>
        </div>
        <span className="font-body text-[10px] text-subtle/70 tracking-wider mt-1 select-none">
          {num}
        </span>
      </div>
    </Link>
  )
}
