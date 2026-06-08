import { useState } from 'react'
import { PlusCircle, Pencil, Trash2, Check, X } from 'lucide-react'
import { useProjects } from '../../context/ProjectContext'
import type { Testimonial } from '../../types'

const EMPTY: Omit<Testimonial, 'id'> = {
  name: '',
  project: '',
  quote: '',
  role: '',
}

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useProjects()
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>(EMPTY)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const startEdit = (t: Testimonial) => {
    setEditing(t.id)
    setAdding(false)
    setForm({ name: t.name, project: t.project, quote: t.quote, role: t.role })
  }

  const startAdd = () => {
    setAdding(true)
    setEditing(null)
    setForm(EMPTY)
  }

  const save = () => {
    if (!form.name.trim() || !form.quote.trim()) return
    if (editing) {
      updateTestimonial({ id: editing, ...form })
      setEditing(null)
    } else {
      addTestimonial({ id: `t${Date.now()}`, ...form })
      setAdding(false)
    }
    setForm(EMPTY)
  }

  const cancel = () => {
    setEditing(null)
    setAdding(false)
    setForm(EMPTY)
  }

  const inputClass = 'w-full bg-bg border border-border px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors'

  const InlineForm = () => (
    <div className="bg-accent-light border border-accent/20 p-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="Client Name *" />
        <input value={form.role} onChange={e => set('role', e.target.value)} className={inputClass} placeholder="Role / Company" />
      </div>
      <input value={form.project} onChange={e => set('project', e.target.value)} className={inputClass} placeholder="Project Name" />
      <textarea
        rows={3}
        value={form.quote}
        onChange={e => set('quote', e.target.value)}
        className={`${inputClass} resize-none`}
        placeholder="Testimonial quote *"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={!form.name.trim() || !form.quote.trim()}
          className="inline-flex items-center gap-1.5 bg-ink text-white font-body text-sm px-4 py-2 hover:bg-accent transition-colors disabled:opacity-40"
        >
          <Check size={13} />
          {editing ? 'Save Changes' : 'Add Testimonial'}
        </button>
        <button onClick={cancel} className="inline-flex items-center gap-1.5 font-body text-sm text-muted hover:text-ink transition-colors">
          <X size={13} />
          Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-ink">Testimonials</h1>
          <p className="font-body text-sm text-muted mt-0.5">{testimonials.length} total</p>
        </div>
        {!adding && !editing && (
          <button
            onClick={startAdd}
            className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm px-4 py-2.5 hover:bg-accent transition-colors"
          >
            <PlusCircle size={14} />
            Add Testimonial
          </button>
        )}
      </div>

      {adding && <div className="mb-6"><InlineForm /></div>}

      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id}>
            {editing === t.id ? (
              <InlineForm />
            ) : (
              <div
                className={`bg-white border border-border p-5 transition-colors ${
                  confirmDelete === t.id ? 'bg-red-50 border-red-200' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-body text-sm font-medium text-ink">{t.name}</span>
                      {t.role && (
                        <span className="font-body text-xs text-muted">— {t.role}</span>
                      )}
                      {t.project && (
                        <span className="font-body text-[10px] tracking-wide uppercase text-accent bg-accent-light px-2 py-0.5">
                          {t.project}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted italic leading-relaxed line-clamp-3">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {confirmDelete === t.id ? (
                      <>
                        <button onClick={() => { deleteTestimonial(t.id); setConfirmDelete(null) }} className="font-body text-xs text-red-500 hover:text-red-700">Confirm</button>
                        <span className="text-border">|</span>
                        <button onClick={() => setConfirmDelete(null)} className="font-body text-xs text-muted hover:text-ink">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(t)} className="text-muted hover:text-ink transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setConfirmDelete(t.id)} className="text-muted hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
