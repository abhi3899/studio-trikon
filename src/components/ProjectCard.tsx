import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import LazyImage from './LazyImage'
import type { Project } from '../types'

interface Props {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-surface mb-4">
        <LazyImage
          src={project.coverImage}
          alt={project.title}
          size="cover"
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-400 flex items-end p-5 opacity-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 bg-bg text-ink text-xs font-body tracking-wide px-3 py-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Project <ArrowUpRight size={12} />
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="font-body text-[10px] tracking-[0.12em] uppercase bg-bg/90 backdrop-blur-sm text-muted px-2.5 py-1">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-xl text-ink group-hover:text-accent transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-muted mt-0.5">
            {project.location} — {project.year}
          </p>
        </div>
        <ArrowUpRight
          size={16}
          className="text-subtle mt-1 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
        />
      </div>
    </Link>
  )
}
