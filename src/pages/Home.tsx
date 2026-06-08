import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Quote } from 'lucide-react'
import { useProjects } from '../context/ProjectContext'
import ProjectCard from '../components/ProjectCard'
import SectionLabel from '../components/SectionLabel'
import LazyImage from '../components/LazyImage'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85'

const marqueeWords = [
  'Residential',
  '·',
  'Commercial',
  '·',
  'Interior',
  '·',
  'Hospitality',
  '·',
  'Adaptive Reuse',
  '·',
  'Sustainable Design',
  '·',
]

export default function Home() {
  const { projects, testimonials } = useProjects()
  const featured = projects.filter(p => p.featured).slice(0, 3)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Parallax on hero image
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.transform = `translateY(${y * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Preload hero
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHeroLoaded(true)
    img.src = HERO_IMAGE
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return
    const t = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [testimonials.length])

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-ink">
        {/* Background image with parallax */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          {heroLoaded ? (
            <img
              src={HERO_IMAGE}
              alt="Architecture hero"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ink to-ink/80 animate-pulse" />
          )}
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/80" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-6">
              <SectionLabel light>Architecture & Design Studio</SectionLabel>
            </div>

            <div className="overflow-hidden mb-3">
              <h1
                className="font-display text-display-2xl text-white leading-none"
                style={{ animationDelay: '100ms' }}
              >
                We build spaces
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="font-display text-display-2xl text-white/50 italic leading-none">
                that hold memory.
              </h1>
            </div>

            <p className="font-body text-base text-white/60 max-w-sm leading-relaxed mb-10">
              Pune-based studio crafting residential, commercial, and interior
              spaces with precision and warmth.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent text-white font-body text-sm tracking-wide px-6 py-3 hover:bg-accent-hover transition-colors duration-200"
              >
                See Our Work <ArrowRight size={14} />
              </Link>
              <Link
                to="/about"
                className="font-body text-sm text-white/60 hover:text-white transition-colors tracking-wide"
              >
                About Studio
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/40">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase rotate-90 origin-center mb-6">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ─── MARQUEE ────────────────────────────────────────────── */}
      <div className="bg-surface border-y border-border py-4 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className={`font-body text-xs tracking-[0.15em] uppercase shrink-0 ${
                w === '·' ? 'text-accent' : 'text-muted'
              }`}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED PROJECTS ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="font-display text-display-lg text-ink mt-2">
                Recent Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent transition-colors group"
            >
              All projects
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent transition-colors group"
            >
              All projects <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATEMENT ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <LazyImage
                src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=900&q=80"
                alt="Studio Trikon at work"
                className="w-full h-full"
              />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-6 bg-ink text-white p-6 w-36">
              <p className="font-display text-4xl text-accent">12+</p>
              <p className="font-body text-xs text-white/60 mt-1">Years of practice</p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:pl-8">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-display text-display-md text-ink mt-3 mb-6 leading-snug">
              Good architecture<br />
              <span className="italic text-muted">starts with listening.</span>
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              We're Arjun and Meera — two architects who met in school and never stopped arguing
              about buildings. Studio Trikon is our attempt to resolve that argument into
              something real.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-10">
              Every project begins with the client's life, not our portfolio. We ask about
              morning light, about where the dog sleeps, about what you want guests to feel
              when they walk in. The rest follows.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[['28', 'Projects Built'], ['3', 'States'], ['100%', 'Client Referrals']].map(
                ([num, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl text-ink">{num}</p>
                    <p className="font-body text-xs text-muted mt-0.5 leading-tight">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 bg-ink overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <SectionLabel light>Client Voices</SectionLabel>
                <h2 className="font-display text-display-lg text-white mt-2">
                  What they say
                </h2>
              </div>
              {/* Dots */}
              <div className="hidden sm:flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? 'bg-accent w-4' : 'bg-white/20'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {testimonials[activeTestimonial] && (
              <div key={activeTestimonial} className="max-w-3xl">
                <Quote size={32} className="text-accent/40 mb-6" />
                <blockquote className="font-display text-display-md text-white/90 italic leading-relaxed mb-8">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div>
                  <p className="font-body text-white font-medium">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="font-body text-sm text-white/40 mt-0.5">
                    {testimonials[activeTestimonial].role} — {testimonials[activeTestimonial].project}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile dots */}
            <div className="sm:hidden flex items-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'bg-accent w-4' : 'bg-white/20'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <SectionLabel>Start a Conversation</SectionLabel>
          <h2 className="font-display text-display-xl text-ink mt-3 mb-6">
            Have a project in mind?
          </h2>
          <p className="font-body text-base text-muted max-w-md mx-auto mb-10">
            We take on a small number of projects each year to ensure each one gets our full attention.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm tracking-wide px-8 py-4 hover:bg-accent transition-colors duration-300 group"
          >
            Get in Touch <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  )
}
