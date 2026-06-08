import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Quote } from 'lucide-react'
import { useProjects } from '../context/ProjectContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from '../components/ProjectCard'
import SectionLabel from '../components/SectionLabel'
import LazyImage from '../components/LazyImage'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85'

const marqueeWords = [
  'Residential', '·', 'Commercial', '·', 'Interior', '·',
  'Hospitality', '·', 'Adaptive Reuse', '·', 'Sustainable Design', '·',
]

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Home() {
  const { projects, testimonials } = useProjects()
  const featured = projects.filter(p => p.featured).slice(0, 3)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Parallax on hero wrapper
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.22}px)`
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
      <section className="relative h-screen min-h-[680px] overflow-hidden bg-ink">
        {/* Ken Burns parallax wrapper */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          {heroLoaded ? (
            <img
              src={HERO_IMAGE}
              alt="Architecture hero"
              className="w-full h-full object-cover opacity-50 animate-ken-burns"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ink to-ink/80" />
          )}
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink" />

        {/* Right label */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-white/15" />
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-white/25 [writing-mode:vertical-rl]">
            Ahmedabad · Est. 2022
          </span>
          <div className="w-px h-16 bg-white/15" />
        </div>

        {/* Triangle watermark — top right */}
        <div className="absolute top-20 right-16 z-10 hidden lg:block opacity-[0.06]">
          <svg width="120" height="105" viewBox="0 0 120 105" fill="none">
            <polygon points="60,4 116,101 4,101" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 max-w-7xl mx-auto">
          <div className="h-[72px] shrink-0" />
          <div className="flex-1" />

          {/* Bottom text */}
          <div className="pb-0">
            <SectionLabel light>Architecture · Interior · Ahmedabad</SectionLabel>

            <h1 className="font-display text-display-2xl text-white leading-[1.0] mt-5">
              We build spaces
            </h1>
            <h1
              className="font-display text-display-2xl italic leading-[1.0] mb-8"
              style={{ color: '#c1603a' }}
            >
              that hold memory.
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent text-white font-body text-sm tracking-wide px-6 py-3.5 hover:bg-accent-hover transition-colors duration-200 w-fit"
              >
                See Our Work <ArrowRight size={14} />
              </Link>
              <Link
                to="/about"
                className="font-body text-sm text-white/45 hover:text-white transition-colors tracking-wide"
              >
                About the Studio →
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-10 border-t border-white/10 grid grid-cols-3 divide-x divide-white/10">
            {[
              ['28+', 'Projects Built'],
              ['Ahmedabad', 'Gujarat, India'],
              ['2 Years', 'Of Practice'],
            ].map(([num, label]) => (
              <div key={label} className="px-0 py-4 first:pl-0 sm:px-6">
                <p className="font-display text-base text-white font-medium">{num}</p>
                <p className="font-body text-[11px] text-white/35 mt-0.5 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-[88px] right-8 z-10 lg:hidden flex flex-col items-center gap-2 text-white/30">
          <ArrowDown size={13} className="animate-bounce" />
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
          <Reveal className="flex items-end justify-between mb-14">
            <div className="flex items-end gap-8">
              {/* Large decorative number */}
              <span
                className="font-display leading-none text-border select-none hidden lg:block"
                style={{ fontSize: 'clamp(5rem,10vw,9rem)' }}
              >
                01
              </span>
              <div>
                <SectionLabel>Selected Work</SectionLabel>
                <h2 className="font-display text-display-lg text-ink mt-2">
                  Recent Projects
                </h2>
              </div>
            </div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent transition-colors group shrink-0 ml-4"
            >
              All projects
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProjectCard project={p} index={i} />
              </Reveal>
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

      {/* ─── EDITORIAL PULL QUOTE ───────────────────────────────── */}
      <section className="py-20 px-6 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="font-display text-display-xl text-ink italic leading-[1.1] text-center max-w-5xl mx-auto">
              "Every space we design is a love letter to the people who will live in it."
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-center mt-6 font-body text-sm text-muted tracking-[0.12em] uppercase">
              — Harshada Bhosale &amp; Shivam Kumaria
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── STATEMENT ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <LazyImage
                  src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=900&q=80"
                  alt="Studio Trikon at work"
                  className="w-full h-full"
                />
              </div>
              {/* Section index */}
              <span
                className="absolute -top-6 -left-2 font-display text-border/80 select-none leading-none hidden lg:block"
                style={{ fontSize: '7rem' }}
              >
                02
              </span>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 bg-ink text-white p-6 w-36">
                <p className="font-display text-4xl text-accent">2+</p>
                <p className="font-body text-xs text-white/55 mt-1">Years of practice</p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="lg:pl-8">
            <Reveal>
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="font-display text-display-md text-ink mt-3 mb-6 leading-snug">
                Good architecture<br />
                <span className="italic text-muted">starts with listening.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="font-body text-base text-muted leading-relaxed mb-5">
                We're Harshada and Shivam — two architects who met at CEPT and never stopped
                debating about buildings. Studio Trikon is how we resolved that debate into
                something you can walk through.
              </p>
              <p className="font-body text-base text-muted leading-relaxed mb-10">
                Every project begins with the client's life, not our portfolio. We ask about
                morning light, about where the dog sleeps, about what you want guests to feel
                when they walk in. The rest follows.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[['28+', 'Projects Built'], ['Gujarat', 'Home State'], ['100%', 'Client Referrals']].map(
                  ([num, label]) => (
                    <div key={label}>
                      <p className="font-display text-3xl text-ink">{num}</p>
                      <p className="font-body text-xs text-muted mt-0.5 leading-tight">{label}</p>
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 bg-ink overflow-hidden relative">
          {/* Large decorative 03 */}
          <span
            className="absolute right-8 top-12 font-display leading-none select-none opacity-[0.04] text-white hidden lg:block"
            style={{ fontSize: '14rem' }}
          >
            03
          </span>

          <div className="max-w-7xl mx-auto relative">
            <Reveal>
              <div className="flex items-center justify-between mb-16">
                <div>
                  <SectionLabel light>Client Voices</SectionLabel>
                  <h2 className="font-display text-display-lg text-white mt-2">
                    What they say
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeTestimonial ? 'bg-accent w-6' : 'bg-white/20 w-1.5'
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            {testimonials[activeTestimonial] && (
              <div key={activeTestimonial} className="max-w-3xl">
                <Quote size={36} className="text-accent/30 mb-8" strokeWidth={1.5} />
                <blockquote className="font-display text-display-md text-white/88 italic leading-relaxed mb-8">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-accent/60" />
                  <div>
                    <p className="font-body text-white font-medium text-sm">
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="font-body text-xs text-white/35 mt-0.5">
                      {testimonials[activeTestimonial].role} — {testimonials[activeTestimonial].project}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="sm:hidden flex items-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'bg-accent w-6' : 'bg-white/20 w-1.5'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 overflow-hidden relative">
        {/* Background accent line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-border-light" />
        <div className="max-w-7xl mx-auto text-center relative">
          <Reveal>
            <div className="inline-block bg-bg px-10">
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
          </Reveal>
        </div>
      </section>
    </main>
  )
}
