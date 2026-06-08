import { useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Static site: just show success (integrate with Formspree/Netlify Forms in production)
    setSubmitted(true)
  }

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="py-20 px-6 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Let's Talk</SectionLabel>
          <h1 className="font-display text-display-xl text-ink mt-2">Get in Touch</h1>
          <p className="font-body text-base text-muted mt-4 max-w-md">
            We'd love to hear about your project. Fill in the form or reach us directly.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact info */}
          <div className="space-y-10">
            <div>
              <SectionLabel>Studio</SectionLabel>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                  <address className="not-italic font-body text-sm text-muted leading-relaxed">
                    Studio Trikon<br />
                    Prahladnagar, SG Road<br />
                    Ahmedabad 380015, Gujarat
                  </address>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} className="text-accent shrink-0" />
                  <a href="tel:+919876543210" className="font-body text-sm text-muted hover:text-ink transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-accent shrink-0" />
                  <a href="mailto:hello@studiotrikon.in" className="font-body text-sm text-muted hover:text-ink transition-colors">
                    hello@studiotrikon.in
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <SectionLabel>Hours</SectionLabel>
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted">Monday–Friday</span>
                  <span className="text-ink">9:30 – 18:00</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted">Saturday</span>
                  <span className="text-ink">10:00 – 14:00</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted">Sunday</span>
                  <span className="text-muted">Closed</span>
                </div>
              </div>
            </div>

            <div>
              <SectionLabel>Note</SectionLabel>
              <p className="mt-3 font-body text-sm text-muted leading-relaxed">
                We take on a limited number of projects each year to ensure every client gets
                our full attention. Enquiries with a brief are prioritised.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-14 h-14 bg-accent-light flex items-center justify-center mb-6">
                  <ArrowRight size={20} className="text-accent" />
                </div>
                <h2 className="font-display text-2xl text-ink mb-3">Thank you, we'll be in touch.</h2>
                <p className="font-body text-sm text-muted max-w-xs">
                  We aim to respond within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-xs tracking-[0.12em] uppercase text-muted block mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handle}
                      className="w-full bg-surface border border-border px-4 py-3 font-body text-sm text-ink placeholder-subtle focus:outline-none focus:border-ink transition-colors"
                      placeholder="Priya Mehta"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.12em] uppercase text-muted block mb-2">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handle}
                      className="w-full bg-surface border border-border px-4 py-3 font-body text-sm text-ink placeholder-subtle focus:outline-none focus:border-ink transition-colors"
                      placeholder="priya@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-xs tracking-[0.12em] uppercase text-muted block mb-2">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      className="w-full bg-surface border border-border px-4 py-3 font-body text-sm text-ink placeholder-subtle focus:outline-none focus:border-ink transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.12em] uppercase text-muted block mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handle}
                      className="w-full bg-surface border border-border px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors appearance-none"
                    >
                      <option value="">Select a type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="interior">Interior Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs tracking-[0.12em] uppercase text-muted block mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handle}
                    className="w-full bg-surface border border-border px-4 py-3 font-body text-sm text-ink placeholder-subtle focus:outline-none focus:border-ink transition-colors resize-none"
                    placeholder="Location, size, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm tracking-wide px-8 py-4 hover:bg-accent transition-colors duration-300 group"
                >
                  Send Enquiry
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
