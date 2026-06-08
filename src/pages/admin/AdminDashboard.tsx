import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Pencil, Trash2, Star, StarOff } from 'lucide-react'
import { useProjects } from '../../context/ProjectContext'
import LazyImage from '../../components/LazyImage'

export default function AdminDashboard() {
  const { projects, deleteProject, updateProject } = useProjects()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    deleteProject(id)
    setConfirmDelete(null)
  }

  const toggleFeatured = (id: string) => {
    const p = projects.find(x => x.id === id)
    if (p) updateProject({ ...p, featured: !p.featured })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-ink">Projects</h1>
          <p className="font-body text-sm text-muted mt-0.5">{projects.length} total</p>
        </div>
        <Link
          to="/admin/add-project"
          className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm px-4 py-2.5 hover:bg-accent transition-colors"
        >
          <PlusCircle size={14} />
          Add Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          ['Total', projects.length],
          ['Featured', projects.filter(p => p.featured).length],
          ['Residential', projects.filter(p => p.category === 'Residential').length],
          ['Commercial', projects.filter(p => p.category === 'Commercial').length],
        ].map(([label, count]) => (
          <div key={label as string} className="bg-surface border border-border p-4">
            <p className="font-display text-3xl text-ink">{count}</p>
            <p className="font-body text-xs text-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted w-16">Image</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted">Title</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted hidden md:table-cell">Year</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted hidden lg:table-cell">Location</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-[0.1em] uppercase text-muted">Featured</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-border last:border-0 hover:bg-surface/50 transition-colors ${
                    confirmDelete === p.id ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 overflow-hidden bg-surface shrink-0">
                      <LazyImage src={p.coverImage} alt={p.title} size="thumbnail" className="w-full h-full" />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-body text-sm text-ink font-medium">{p.title}</p>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="font-body text-xs text-muted bg-surface border border-border px-2 py-0.5">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <p className="font-body text-sm text-muted">{p.year}</p>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <p className="font-body text-sm text-muted">{p.location}</p>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleFeatured(p.id)}
                      className={`transition-colors ${
                        p.featured ? 'text-accent' : 'text-subtle hover:text-muted'
                      }`}
                      title={p.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      {p.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    {confirmDelete === p.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="font-body text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <span className="text-border">|</span>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="font-body text-xs text-muted hover:text-ink transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/edit-project/${p.id}`}
                          className="text-muted hover:text-ink transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(p.id)}
                          className="text-muted hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
