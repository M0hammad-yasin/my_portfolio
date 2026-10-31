'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Github, Linkedin, Mail, ArrowUpRight, Braces, Moon, Sun, Menu, X, Send, Lock } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Project = {
  name: string
  type: string
  place: string
  url: string
  domain: string
  summary: string
  built: string[]
  stack: string[]
  pages: string[]
  hue: number // card colour in the browser mock
  image?: string // optional: put a screenshot in /public and set e.g. '/ufc.png'
  structure: string
}

const projects: Project[] = [
  {
    name: 'United Five Construction',
    type: 'General contractor website',
    place: 'New York City & New Jersey',
    url: 'https://unitedfiveconstruct.com/',
    domain: 'unitedfiveconstruct.com',
    summary:
      'Marketing site for a licensed general contractor. It explains four trades clearly, shows licences and certifications, and sends every visitor toward a quote request.',
    built: [
      'Service pages for concrete, facade, asphalt, and framing and drywall',
      'BIM and portfolio pages, plus a quote form with a service selector',
      'Licence and certificate section to build trust with commercial clients',
    ],
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SEO'],
    pages: ['Home', 'About', 'Specializations', 'BIM', 'Portfolio', 'Contact'],
    hue: 250,
    structure: `unitedfiveconstruct.com/
├── index.php
├── about-us.php
├── specializations.php
├── bim.php
├── portfolio.php
├── contact.php
├── includes/            shared header, footer, quote form
└── assets/
    └── img/
        ├── footer-logo/        licence and certificate badges
        ├── specializations/    concrete, facade, asphalt, framing
        └── projects/           portfolio photography`,
  },
  {
    name: 'Fraser Facility Services',
    type: 'Commercial cleaning and facility services',
    place: 'Lower Mainland and Fraser Valley, BC',
    url: 'https://fraserfacilityservices.ca/',
    domain: 'fraserfacilityservices.ca',
    summary:
      'A full multi-page site for a family-owned facility company: six service lines, 17 service areas, a blog and FAQ for search traffic, and a free-quote funnel.',
    built: [
      'Six service pages, from janitorial and floor care to snow and ice',
      'Blog with article pages to bring in search visitors',
      'Credentials, service-area list, FAQ and a downloadable brochure',
    ],
    stack: ['PHP', 'Bootstrap', 'JavaScript', 'SEO'],
    pages: ['Home', 'About', 'Services', 'Our Work', 'Blog', 'FAQ', 'Contact'],
    hue: 170,
    structure: `fraserfacilityservices.ca/
├── index.php
├── about.php
├── service.php
├── our-work.php
├── blogs.php            blog list
├── blog.php             single article (by slug)
├── faq.php
├── contact.php
├── includes/            header, footer, quote CTA
├── documents/           brochure (PDF)
└── assets/
    └── img/
        ├── home/
        ├── about_us/
        ├── services/
        └── blog/`,
  },
  {
    name: 'Black Cab',
    type: 'Taxi company website (Norwegian)',
    place: 'Oslo, Norway',
    url: 'https://blackcab.online/index.php',
    domain: 'blackcab.online',
    summary:
      'A Norwegian-language site for an Oslo taxi company. It covers pricing, recruiting new licence holders and licence courses, with a phone number always one tap away.',
    built: [
      'Pricing, licence-holder and licence-course pages in Norwegian',
      'Customer service and contact page with opening hours',
      'Mobile-first layout with click-to-call',
    ],
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    pages: ['Hjem', 'Priser', 'Bli løyvehaver', 'Løyvekurs', 'Kundeservice'],
    hue: 30,
    structure: `blackcab.online/
├── index.php
├── priser.php
├── bli_loyvehaver.php
├── loyvekurs_for_drosje.php
├── contact.php
├── includes/            header, footer
└── img/                 logo, icons, photography`,
  },
  {
    name: 'Sasko NorthEast',
    type: 'Construction management company website',
    place: 'Group site: Sasko, Tristate CM and UFC',
    url: 'https://saskonortheast.com/coming-soon',
    domain: 'saskonortheast.com',
    summary:
      'A large multi-page PHP site for a construction management group. It covers the full project lifecycle, from planning to closeout, and shows past work in project galleries. The public link currently opens the coming-soon page.',
    built: [
      'Service pages for pre-construction planning, cost estimation, design coordination, scheduling, oversight and closeout',
      'Project galleries for residential, commercial, government and city contracts, plus an on-going projects page',
      'BIM section with video, team, news and FAQ pages, and a contact form handled by PHP',
    ],
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    pages: ['Home', 'Our Firm', 'Services', 'Portfolio', 'Team', 'News', 'Contact'],
    hue: 310,
    structure: `saskonortheast.com/
├── index.php
├── our-firm.php  our-expertise.php  team.php
├── sasko.php  tristate.php  tristateCM.php  ufc.php      group entities
├── services.php  build.php  design.php  finance.php  bim.php  concrete.php
│   ├── pre-construction-planning.php
│   ├── cost-estimation-procurement.php
│   ├── design-phase-coordination.php
│   ├── schedule-management.php
│   ├── construction-oversight.php
│   └── closeout-turnover.php
├── portfolio.php  portfolio-section.php  on-going-project.php
│   ├── residential-gallery.php
│   ├── commercial-gallery.php
│   ├── government-gallery.php
│   └── city-contracts-gallery.php
├── news.html  news-details.html  faq.html  about.html
├── contact.php  contact-us.php  send.php                 contact form handler
├── coming-soon.php  coming-soon-1..4.php                 launch pages
├── head.php  header.php  footer.php  preloader.php       shared partials
├── .htaccess  .gitignore  style.css
└── assets/
    ├── css/    fonts/    js/
    ├── img/    WebP images
    └── video/  BIM section video and poster`,
  },
]

const moreProjects = [
  { title: 'Online Educator', note: 'Role-based tutoring platform with class scheduling and dashboards', tags: 'React, Node.js, MongoDB', github: 'https://github.com/M0hammad-yasin/Online-educator', demo: 'https://online-educator.vercel.app/' },
  { title: 'Aero Agriculture', note: 'IoT hydroponic farming dashboard. 1st place among 300+ final-year projects', tags: 'React, Node.js, WebSocket, IoT', github: 'https://github.com/M0hammad-yasin/aero-agriculture', demo: 'https://aero-agriculture.vercel.app/' },
  { title: 'ECWS', note: 'E-commerce app with product browsing and seller onboarding', tags: 'Next.js, Prisma, NextAuth', github: 'https://github.com/M0hammad-yasin/ecws', demo: 'https://ecws.vercel.app/' },
  { title: 'Dental Clinic System', note: 'Patient records and appointment scheduling', tags: 'C#, .NET, MySQL', github: 'https://github.com/M0hammad-yasin/Dental_clinic_system', demo: 'https://github.com/M0hammad-yasin/Dental_clinic_system' },
  { title: 'Eid Wish', note: 'Animated Eid greeting web app', tags: 'Next.js, Framer Motion', github: 'https://github.com/M0hammad-yasin/eid-wish.git', demo: 'https://eid-mubarek.vercel.app/' },
]

const skills = [
  ['Frontend', 'React, Next.js, TypeScript, Tailwind CSS, Bootstrap, Framer Motion, shadcn/ui'],
  ['Backend', 'PHP, Node.js, Express, REST APIs, Socket.io, Prisma'],
  ['Databases', 'MySQL, MariaDB, PostgreSQL, MongoDB, Redis'],
  ['Security', 'OWASP Top 10, security auditing, secure coding'],
  ['Tools', 'Git, GitHub, Docker, CI/CD, Linux, AWS and Cloudflare basics'],
]

const experiences = [
  // TODO: replace the company and description with your real details for these two periods
  { period: 'Apr 2026 - Present', title: 'Full Stack Developer', place: 'XTechra', text: 'Design, build and maintain websites for clients in New York, Vancouver and Oslo, from first layout to deployment.' },
  { period: 'Nov 2025 - Apr 2026', title: 'Full Stack Developer', place: 'K2 Peak', text: 'Started professional web development, building PHP and frontend sites for businesses.' },
  { period: '2025', title: 'Junior Developer Intern', place: 'DevSin', text: 'Contributed to multiple projects and gained hands-on full-stack experience.' },
  { period: '2023 - Present', title: 'Full-Stack Developer', place: 'Freelance', text: 'Fixed and maintained MERN applications, debugged APIs and improved performance.' },
  { period: '2020 - 2024', title: 'BS Computer Science', place: 'UIIT', text: 'Software engineering, algorithms and cybersecurity. Final-year IoT project placed 1st among 300+ students.' },
]

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function ExperienceBar() {
  return (
    <div className="mt-14 max-w-xl" aria-label="One year of professional experience">
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span>1+ year building for real clients</span>
        <span className="text-muted-foreground">Nov 2025 to now</span>
      </div>
      <div className="flex h-9 gap-1.5">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }} style={{ originX: 0, flex: 5 }} className="rounded-md bg-primary/25" />
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }} style={{ originX: 0, flex: 6.5 }} className="rounded-md bg-primary" />
      </div>
      <div className="mt-1.5 flex gap-1.5 text-xs text-muted-foreground">
        <span style={{ flex: 5 }}>Nov 2025</span>
        <span style={{ flex: 6.5 }} className="flex justify-between"><span>Apr 2026</span><span>Now</span></span>
      </div>
    </div>
  )
}

function BrowserMock({ p }: { p: Project }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <div className="flex-1 truncate rounded-md bg-background px-3 py-1 font-mono text-xs text-muted-foreground">{p.domain}</div>
      </div>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={`${p.name} website screenshot`} className="aspect-[16/10] w-full object-cover object-top" />
      ) : (
        <div
          className="flex aspect-[16/10] flex-col justify-between p-6 text-white sm:p-8"
          style={{ background: `linear-gradient(135deg, oklch(0.38 0.14 ${p.hue}), oklch(0.24 0.09 ${p.hue + 30}))` }}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">{p.pages.map((x) => <span key={x}>{x}</span>)}</div>
          <div>
            <p className="font-display text-3xl font-extrabold leading-none sm:text-4xl">{p.name}</p>
            <p className="mt-2 text-sm text-white/75">{p.place}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false)

  const showCode = () => {
    toast('Project code is private', {
      description: "Due to security reasons and client consent, I can't show this project's code. Here is its structure instead.",
      icon: <Lock className="h-4 w-4" />,
    })
    setOpen((v) => !v)
  }

  return (
    <article className="border-t py-14 first:border-t-0 first:pt-0">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-7 ${index % 2 ? 'lg:order-2' : ''}`}
        >
          <BrowserMock p={p} />
        </motion.div>

        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-primary">{p.type}</p>
          <h3 className="font-display mt-1 text-3xl font-extrabold tracking-tight">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.place}</p>
          <p className="mt-4 text-muted-foreground">{p.summary}</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {p.built.map((b) => (
              <li key={b} className="flex gap-2"><span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-primary" aria-hidden="true" />{b}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={p.url} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button variant="outline" onClick={showCode} aria-expanded={open}>
              <Braces className="mr-1 h-4 w-4" /> Project code
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-8 rounded-xl border bg-card p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" /> Source code is private. Simplified project structure only.
              </div>
              <pre className="overflow-x-auto font-mono text-[13px] leading-6">{p.structure}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const links = [['Work', 'work'], ['Services', 'services'], ['Skills', 'skills'], ['Experience', 'experience'], ['Contact', 'contact']]

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()
  const [menu, setMenu] = useState(false)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const d = new FormData(f)
    const body = `${d.get('message')}\n\nFrom: ${d.get('name')} (${d.get('email')})`
    window.location.href = `mailto:mohdysn111@gmail.com?subject=${encodeURIComponent(String(d.get('subject')))}&body=${encodeURIComponent(body)}`
    toast('Opening your email app', { description: "Send the drafted message and I'll reply soon." })
    f.reset()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight">Muhammad Yasin</a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map(([l, id]) => <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>)}
            <Button size="sm" asChild><a href="#contact">Hire me</a></Button>
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
              <Sun className="hidden h-5 w-5 dark:block" /><Moon className="h-5 w-5 dark:hidden" />
            </Button>
          </nav>
          <div className="flex items-center gap-1 md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
              <Sun className="hidden h-5 w-5 dark:block" /><Moon className="h-5 w-5 dark:hidden" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
          </div>
        </div>
        {menu && (
          <div className="border-t bg-background px-5 py-3 md:hidden">
            {links.map(([l, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block py-2 text-sm text-muted-foreground">{l}</a>)}
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" /> Available for new client projects
            </div>
            <h1 className="font-display mt-6 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
              Websites that help service businesses win clients.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              I’m a full-stack developer. My live client sites include a New York general contractor, a Vancouver facility-services company and an Oslo taxi firm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><a href="#contact"><Mail className="mr-2 h-4 w-4" />Start your project</a></Button>
              <Button size="lg" variant="outline" asChild><a href="#work">See live projects</a></Button>
            </div>
            <ExperienceBar />
          </motion.div>
        </section>

        {/* Work */}
        <section id="work" className="border-t bg-muted/40 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display mb-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">Client projects, live on the web</h2>
            <p className="mb-14 max-w-2xl text-muted-foreground">Every site below is in use by a real business. Client code is private, so the project code button shows each site’s structure instead.</p>
            {projects.map((p, i) => <ProjectRow key={p.name} p={p} index={i} />)}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="font-display mb-12 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">What I can build for you</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              ['Business websites', 'Clear, fast sites that explain what you do, build trust and make the next step obvious: call, quote or book.'],
              ['Web apps and dashboards', 'Custom tools for scheduling, orders, analytics and admin work, built with React, Node and a real database.'],
              ['Secure by default', 'Input validation, authentication and safe data handling are part of every build, not an extra at the end.'],
            ].map(([t, d]) => (
              <div key={t} className="border-t-2 border-primary pt-5">
                <h3 className="font-display text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t bg-muted/40 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display mb-10 text-4xl font-extrabold tracking-tight sm:text-5xl">Skills</h2>
            <dl className="divide-y border-y">
              {skills.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr]">
                  <dt className="font-semibold">{k}</dt><dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* More projects */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="font-display mb-10 text-4xl font-extrabold tracking-tight sm:text-5xl">Other projects</h2>
          <ul className="divide-y border-y">
            {moreProjects.map((m) => (
              <li key={m.title} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="font-display text-xl font-bold">{m.title}</h3>
                  <p className="text-muted-foreground">{m.note}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{m.tags}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild><a href={m.github} target="_blank" rel="noopener noreferrer"><Github className="mr-1 h-4 w-4" />Code</a></Button>
                  <Button variant="outline" size="sm" asChild><a href={m.demo} target="_blank" rel="noopener noreferrer">Demo <ArrowUpRight className="ml-1 h-4 w-4" /></a></Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t bg-muted/40 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display mb-10 text-4xl font-extrabold tracking-tight sm:text-5xl">Experience and education</h2>
            <ol className="border-l-2 border-border">
              {experiences.map((e, i) => (
                <li key={e.title + e.period} className="relative pb-10 pl-8 last:pb-0">
                  <span className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${i < 2 ? 'bg-primary' : 'bg-border'}`} aria-hidden="true" />
                  <p className="text-sm font-medium text-primary">{e.period}</p>
                  <h3 className="font-display text-xl font-bold">{e.title}, <span className="font-semibold text-muted-foreground">{e.place}</span></h3>
                  <p className="mt-1 max-w-2xl text-muted-foreground">{e.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Tell me what you need built.</h2>
              <p className="mt-4 max-w-md text-muted-foreground">Send a few lines about your project. I reply with questions or a rough estimate.</p>
              <div className="mt-8 space-y-3">
                <a href="mailto:mohdysn111@gmail.com" className="flex items-center gap-3 hover:text-primary"><Mail className="h-5 w-5" />mohdysn111@gmail.com</a>
                <a href="https://www.linkedin.com/in/muhammad-yasin-379059268/" className="flex items-center gap-3 hover:text-primary"><Linkedin className="h-5 w-5" />LinkedIn</a>
                <a href="https://github.com/M0hammad-yasin" className="flex items-center gap-3 hover:text-primary"><Github className="h-5 w-5" />GitHub</a>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><label htmlFor="name" className="text-sm font-medium">Name</label><Input id="name" name="name" required /></div>
                <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">Email</label><Input id="email" name="email" type="email" required /></div>
              </div>
              <div className="space-y-2"><label htmlFor="subject" className="text-sm font-medium">What do you need?</label><Input id="subject" name="subject" placeholder="New website, redesign, web app..." required /></div>
              <div className="space-y-2"><label htmlFor="message" className="text-sm font-medium">Details</label><Textarea id="message" name="message" rows={5} required /></div>
              <Button type="submit" size="lg" className="w-full"><Send className="mr-2 h-4 w-4" />Send message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 Muhammad Yasin</footer>
    </div>
  )
}
