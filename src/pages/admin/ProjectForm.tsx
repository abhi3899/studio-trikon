import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Trash2, ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useProjects } from '../../context/ProjectContext'
import type { Project } from '../../types'
import LazyImage from '../../components/LazyImage'
import { resolveImageUrl, isGoogleDriveUrl, getImageUrl } from '../../utils/imageUtils'

interface Props {
  existing?: Project
}

const EMPTY: Omit<Project, 'id'> = {
  title: '',
  category: 'Residential',
  year: new Date().getFullYear().toString(),
  location: '',
  area: '',
  description: '',
  shortDescription: '',
  images: [],
  coverImage: '',
  tags: [],
  featured: false,
}

export default function ProjectForm({ existing }: Props) {
  const { addProject, updateProject } = useProjects()
  const navigate = useNavigate()
  const [form, setForm] = useState<Omit<Project, 'id'>>(
    existing ? { ...existing } : { ...EMPTY }
  )
  const [imageUrl, setImageUrl] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (key: keyof typeof form, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }))

  const addImage = () => {
    const url = imageUrl.trim()
    if (!url) return
    // Always store the resolved URL so Drive links work immediately on the public site
    const resolved = resolveImageUrl(url)
    const updated = [...form.images, resolved]
    set('images', updated)
    if (!form.coverImage) set('coverImage', resolved)
    setImageUrl('')
  }

  const removeImage = (i: number) => {
    const updated = form.images.filter((_, idx) => idx !== i)
    set('images', updated)
    if (form.coverImage === form.images[i]) {
      set('coverImage', updated[0] || '')
    }
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (!t || form.tags.includes(t)) return
    set('tags', [...form.tags, t])
    setTagInput('')
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.location.trim()) e.location = 'Location is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.shortDescription.trim()) e.shortDescription = 'Short description is required'
    if (form.images.length === 0) e.images = 'Add at least one image'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)

    const id = existing?.id || `p${Date.now()}`
    const project: Project = { id, ...form }

    if (existing) {
      updateProject(project)
    } else {
      addProject(project)
    }

    navigate('/admin/dashboard')
  }

  const inputClass = (key: string) =>
    `w-full bg-surface border px-4 py-2.5 font-body text-sm text-ink focus:outline-none transition-colors ${
      errors[key] ? 'border-red-400 bg-red-50/30' : 'border-border focus:border-ink'
    }`

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-2xl text-ink">
          {existing ? 'Edit Project' : 'Add New Project'}
        </h1>
      </div>

      <form onSubmit={submit} className="space-y-8">
        {/* Basic info */}
        <section className="bg-white border border-border p-6 space-y-5">
          <h2 className="font-body text-xs tracking-[0.15em] uppercase text-muted border-b border-border pb-3">
            Basic Information
          </h2>

          <div>
            <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
              Project Title *
            </label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className={inputClass('title')}
              placeholder="e.g. Kharadi Residence"
            />
            {errors.title && <p className="font-body text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                Category *
              </label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className={inputClass('category')}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Interior">Interior</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Year *</label>
              <input
                value={form.year}
                onChange={e => set('year', e.target.value)}
                className={inputClass('year')}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                Location *
              </label>
              <input
                value={form.location}
                onChange={e => set('location', e.target.value)}
                className={inputClass('location')}
                placeholder="Pune, Maharashtra"
              />
              {errors.location && <p className="font-body text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
            <div>
              <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                Area
              </label>
              <input
                value={form.area}
                onChange={e => set('area', e.target.value)}
                className={inputClass('area')}
                placeholder="2,400 sq ft"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
              Short Description * <span className="normal-case text-subtle">(used in cards)</span>
            </label>
            <input
              value={form.shortDescription}
              onChange={e => set('shortDescription', e.target.value)}
              className={inputClass('shortDescription')}
              placeholder="One line summary for project cards"
            />
            {errors.shortDescription && <p className="font-body text-xs text-red-500 mt-1">{errors.shortDescription}</p>}
          </div>

          <div>
            <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
              Full Description *
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className={`${inputClass('description')} resize-none`}
              placeholder="Describe the project — its context, the design brief, what makes it special..."
            />
            {errors.description && <p className="font-body text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
        </section>

        {/* Images */}
        <section className="bg-white border border-border p-6 space-y-4">
          <h2 className="font-body text-xs tracking-[0.15em] uppercase text-muted border-b border-border pb-3">
            Project Images
          </h2>

          {/* How to use Google Drive */}
          <div className="bg-accent-light border border-accent/20 p-4 rounded-sm space-y-1.5">
            <p className="font-body text-xs font-medium text-ink">How to add images from Google Drive:</p>
            <ol className="font-body text-xs text-muted space-y-1 list-decimal list-inside">
              <li>Upload your photo to Google Drive</li>
              <li>Right-click the file → <strong>Share</strong> → set to <strong>"Anyone with the link"</strong></li>
              <li>Copy the link and paste it below — it will be auto-converted ✓</li>
            </ol>
            <p className="font-body text-[11px] text-muted pt-1">Also works with: Unsplash, Cloudinary, Dropbox (direct links), or any public image URL.</p>
          </div>

          {/* URL input with live preview */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
                className="flex-1 bg-surface border border-border px-4 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="Paste Google Drive link or any image URL..."
              />
              <button
                type="button"
                onClick={addImage}
                disabled={!imageUrl.trim()}
                className="inline-flex items-center gap-1.5 bg-ink text-white font-body text-sm px-4 py-2.5 hover:bg-accent transition-colors shrink-0 disabled:opacity-40"
              >
                <PlusCircle size={14} />
                Add
              </button>
            </div>

            {/* Live preview + Drive conversion indicator */}
            {imageUrl.trim() && (
              <div className="flex items-start gap-3 bg-surface border border-border p-3">
                <div className="w-20 h-14 overflow-hidden shrink-0 bg-border">
                  <img
                    src={getImageUrl(imageUrl.trim(), 'thumbnail')}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {isGoogleDriveUrl(imageUrl.trim()) && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                      <span className="font-body text-[11px] text-green-700 font-medium">Google Drive detected — will be auto-converted to fast CDN URL</span>
                    </div>
                  )}
                  <p className="font-body text-[11px] text-muted truncate">{resolveImageUrl(imageUrl.trim())}</p>
                </div>
              </div>
            )}
          </div>

          {errors.images && <p className="font-body text-xs text-red-500">{errors.images}</p>}

          {/* Image list */}
          {form.images.length > 0 && (
            <div className="space-y-2">
              {form.images.map((img, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface border border-border p-2">
                  <div className="w-14 h-10 overflow-hidden shrink-0 bg-border">
                    <LazyImage src={img} alt="" size="thumbnail" className="w-full h-full" />
                  </div>
                  <p className="flex-1 font-body text-xs text-muted truncate">{img}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {i === 0 && (
                      <span className="font-body text-[10px] text-accent border border-accent/30 px-1.5 py-0.5">Cover</span>
                    )}
                    {i !== 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const imgs = [...form.images]
                          imgs[0] = imgs[i]
                          imgs[i] = form.images[0]
                          set('images', imgs)
                          set('coverImage', imgs[0])
                        }}
                        className="font-body text-[10px] text-muted hover:text-accent transition-colors"
                      >
                        Set cover
                      </button>
                    )}
                    <a href={img} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                      <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tags & options */}
        <section className="bg-white border border-border p-6 space-y-5">
          <h2 className="font-body text-xs tracking-[0.15em] uppercase text-muted border-b border-border pb-3">
            Tags & Display
          </h2>

          <div>
            <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 bg-surface border border-border px-4 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="e.g. Sustainable"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center gap-1.5 border border-border text-muted font-body text-sm px-4 py-2.5 hover:border-ink hover:text-ink transition-colors shrink-0"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-surface border border-border font-body text-xs px-2.5 py-1 text-muted"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => set('tags', form.tags.filter(t => t !== tag))}
                    className="hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set('featured', !form.featured)}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ${
                form.featured ? 'bg-accent' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.featured ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div>
              <p className="font-body text-sm text-ink">Feature on homepage</p>
              <p className="font-body text-xs text-muted">Shows in the "Selected Work" section (max 3)</p>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="font-body text-sm text-muted hover:text-ink transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm px-6 py-3 hover:bg-accent transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : existing ? 'Save Changes' : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  )
}
