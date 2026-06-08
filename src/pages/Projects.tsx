import { useState } from 'react'
import { useProjects } from '../context/ProjectContext'
import ProjectCard from '../components/ProjectCard'
import SectionLabel from '../components/SectionLabel'

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior']

export default function Projects() {
  const { projects } = useProjects()
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="py-20 px-6 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Our Portfolio</SectionLabel>
          <h1 className="font-display text-display-xl text-ink mt-2">
            All Projects
          </h1>
          <p className="font-body text-base text-muted mt-4 max-w-lg">
            {projects.length} projects across residential, commercial, and interior design.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 font-body text-sm px-5 py-2 border transition-all duration-200 ${
                active === cat
                  ? 'border-ink bg-ink text-white'
                  : 'border-border text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-2 text-xs opacity-50">
                  ({projects.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-muted italic">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
