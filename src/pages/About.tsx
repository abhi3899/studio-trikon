import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import SectionLabel from '../components/SectionLabel'

const values = [
  {
    title: 'Context first',
    body: 'Every site has a story — climate, light, neighbour, soil. We read all of it before we draw a single line.',
  },
  {
    title: 'Material honesty',
    body: 'We don\'t cover things up. Concrete looks like concrete. Wood ages gracefully. The building\'s life is part of its beauty.',
  },
  {
    title: 'Quiet restraint',
    body: 'We resist the urge to add. The question is always: what can we take away? What remains is stronger for the editing.',
  },
  {
    title: 'Client as collaborator',
    body: 'You live there. We don\'t. The best outcome comes when we build together — your knowledge of your life, our knowledge of space.',
  },
]

export default function About() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 px-6 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>The Studio</SectionLabel>
            <h1 className="font-display text-display-xl text-ink mt-2 leading-tight">
              Two architects,<br />
              <span className="italic text-muted">one practice.</span>
            </h1>
            <p className="font-body text-base text-muted mt-6 leading-relaxed max-w-sm">
              Studio Trikon was founded in 2022 by Harshada Bhosale and Shivam Kumaria after
              years of working across leading practices in India. Based in Ahmedabad, the studio
              is their shared answer to a single belief: that good architecture should be quiet,
              contextual, and deeply personal.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-border">
            <LazyImage
              src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=900&q=80"
              alt="Studio Trikon workspace"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* The Two Architects */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>The Team</SectionLabel>
          <h2 className="font-display text-display-md text-ink mt-2 mb-14">Meet the architects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Harshada Bhosale */}
            <div>
              <div className="aspect-[3/4] overflow-hidden bg-surface mb-6">
                <LazyImage
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80"
                  alt="Harshada Bhosale"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-display text-2xl text-ink">Harshada Bhosale</h3>
              <p className="font-body text-sm text-accent mt-1 mb-4 tracking-wide">Co-founder, Principal Architect</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Harshada studied architecture at CEPT Ahmedabad and worked across residential
                and cultural projects at leading practices in Pune and Mumbai before co-founding
                Trikon. She leads the studio's residential projects and is drawn to questions of
                light, threshold, and the way a house holds a family's daily life.
              </p>
            </div>

            {/* Shivam Kumaria */}
            <div>
              <div className="aspect-[3/4] overflow-hidden bg-surface mb-6">
                <LazyImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700&q=80"
                  alt="Shivam Kumaria"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-display text-2xl text-ink">Shivam Kumaria</h3>
              <p className="font-body text-sm text-accent mt-1 mb-4 tracking-wide">Co-founder, Design Director</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Shivam graduated from CEPT and spent several years working on commercial and
                hospitality projects across Gujarat and Rajasthan before establishing Trikon.
                His practice is rooted in materials and making — he makes regular visits to
                stone quarries, tile workshops, and fabricators on site. He leads all interior
                and commercial work at the studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-display text-display-md text-ink mt-2 mb-14">Our principles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
            {values.map((v, i) => (
              <div key={i} className="bg-bg p-8">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted mb-3">0{i + 1}</p>
                <h3 className="font-display text-xl text-ink mb-3">{v.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="font-display text-display-md text-ink mt-2 mb-8">From brief to building</h2>

            <ol className="space-y-6">
              {[
                ['Discovery', 'We visit your site and spend time understanding how you live, work, or gather. This shapes everything.'],
                ['Concept', 'A single clear idea — not many ideas at once. We present one direction we believe in.'],
                ['Design Development', 'Drawings, models, material samples. We iterate together until the design is resolved.'],
                ['Construction', 'We stay closely involved during construction. The best buildings are won in the details on site.'],
              ].map(([step, desc], i) => (
                <li key={i} className="flex gap-5">
                  <div className="mt-0.5">
                    <span className="font-body text-xs text-accent tracking-wide">0{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-medium text-ink">{step}</h4>
                    <p className="font-body text-sm text-muted mt-1 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-surface">
            <LazyImage
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
              alt="Architecture process"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-ink">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-display-md text-white">Ready to start?</h2>
            <p className="font-body text-sm text-white/50 mt-2">We'd love to hear about your project.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/projects"
              className="font-body text-sm text-white/50 hover:text-white transition-colors"
            >
              See Our Work
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-body text-sm px-6 py-3 hover:bg-accent-hover transition-colors group"
            >
              Contact Us <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
