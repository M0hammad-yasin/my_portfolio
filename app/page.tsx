'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code2,
  Database,
  Shield,
  Server,
  Smartphone,
  Palette,
  Cpu,
  Zap,
  ChevronDown,
  Menu,
  X,
  Send,
  GraduationCap,
  Briefcase,
} from 'lucide-react'
import { toast } from "sonner"

// Type-safe animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Skill categories
const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Code2 className="w-5 h-5" />,
    skills: ['React', 'Next.js', 'TanStack Query', 'Zustand', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'Ant Design'],
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-5 h-5" />,
    skills: ['Node.js', 'Express', 'REST APIs', 'Socket.io', 'Prisma ORM', 'TypeScript']
  },
  {
    title: 'Database & Storage',
    icon: <Database className="w-5 h-5" />,
    skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis', 'my SQL', 'MongoDB Atlas']
  },
  {
    title: 'Cybersecurity',
    icon: <Shield className="w-5 h-5" />,
    skills: ['OWASP Top 10', 'Security Auditing', 'Secure Coding', 'Cryptography Basics']
  },
  {
    title: 'DevOps & Tools',
    icon: <Terminal className="w-5 h-5" />,
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Linux basic', 'AWS basic', 'Cloudflare basic']
  },
]

// Projects data
const projects = [
  {
    title: 'Online Educator',
    description: 'A comprehensive full-stack platform built with React (TypeScript) and Node.js/Express that enables role-based online tutoring with class scheduling, real-time analytics, and permission management. Features include multi-role access control (Admin, Moderator, Teacher, Student), class scheduling with calendar views, interactive dashboards with charts, and a clean MongoDB database schema. Designed for educators and tutoring centers to manage classes, track student progress, and visualize performance metrics.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Prisma', 'Ant Design', 'TanStack Query', 'Zustand', 'Tailwind ', 'Framer Motion', 'Zod', 'multer', 'cloudinary', 'bcrypt', 'JWT', 'axios'],
    github: 'https://github.com/M0hammad-yasin/Online-educator',
    demo: 'https://online-educator.vercel.app/'
  },
  {
    title: 'Aero Agriculture',
    description: 'AeroAgriculture is a comprehensive IoT-powered smart agriculture platform that combines modern web technologies with real-time sensor monitoring and automated hydroponic farming controls. It provides a responsive dashboard for monitoring plant growth, environmental conditions, and managing IoT hardware like LED lights, sprinklers, and pumps.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Chakra UI', 'WebSocket', 'IoT', 'NodeMCU', 'Recharts', 'Axios', 'Vite', 'Zustand', 'Framer Motion', 'Zod', 'multer', 'cloudinary'],
    github: 'https://github.com/M0hammad-yasin/aero-agriculture',
    demo: 'https://aero-agriculture.vercel.app/'
  },
  {
    title: 'College Network (Cisco Packet Tracer)',
    description: 'Designed and simulated a secure college LAN using Cisco Packet Tracer, implementing VLANs, IP addressing, RIP routing, and centralized servers (DNS, FTP, Web). Improved network scalability, performance, and security through structured topology, inter-VLAN communication, and efficient routing protocols.',
    tags: ['Cisco Packet Tracer', 'VLANs', 'IP addressing', 'RIP routing', 'centralized servers', 'DNS', 'FTP', 'Web', 'structured topology', 'inter-VLAN communication', 'routing protocols'],
    github: 'https://drive.google.com/drive/folders/1L2Ip6V_dFVPGUCZGgkf-ncS1meo0LZzr?usp=sharing',
    demo: 'https://drive.google.com/drive/folders/1L2Ip6V_dFVPGUCZGgkf-ncS1meo0LZzr?usp=sharing'
  },
  {
    title: 'Communication Network of UIIT Department (Cisco Packet Tracer)',
    description: 'Designed and simulated a secure departmental network using Cisco Packet Tracer, implementing VLAN-based segmentation, IP addressing, and inter-VLAN routing to ensure efficient and secure communication. Integrated core services including DNS, FTP, and Web servers, and validated network reliability, traffic flow, and security through structured testing.',
    tags: ['Cisco Packet Tracer', 'VLANs', 'IP addressing', 'inter-VLAN routing', 'core services', 'DNS', 'FTP', 'Web', 'structured testing'],
    github: 'https://drive.google.com/drive/folders/1ubK0USvR4px9_C6VS2htACS_kiiwkpgM?usp=sharing',
    demo: 'https://drive.google.com/drive/folders/1ubK0USvR4px9_C6VS2htACS_kiiwkpgM?usp=sharing'
  },
  {
    title: 'ECWS Project',
    description: 'This project is a modern e‑commerce web application built with Vite, React, and TypeScript, designed to provide a fast, scalable, and user‑friendly shopping experience. It includes features like product exploration and seller onboarding, making it easy for users to browse items and for merchants to become sellers.',
    tags: ['Next.js', 'NextAuth.js', 'Prisma', 'bcrypt'],
    github: 'https://github.com/M0hammad-yasin/ecws',
    demo: 'https://ecws.vercel.app/'
  },
  {
    title: 'Dental Clinic Management System',
    description: 'Developed a comprehensive dental clinic management system using the .NET framework to streamline patient records, appointment scheduling, and user administration. Implemented secure data storage and efficient database interactions to support reliable clinic operations and structured data management.',
    tags: ['C# (.NET Framework)', 'MySQL', 'T-SQL', 'Visual Studio'],
    github: 'https://github.com/M0hammad-yasin/Dental_clinic_system',
    demo: 'https://github.com/M0hammad-yasin/Dental_clinic_system',
  },
  {
    title: 'Eid Wish web App',
    description: 'This project is an interactive Eid wishing web app that delivers a joyful, animated experience. It highlights the spiritual significance of Ramadan and Eid, combining heartfelt messages with smooth transitions and a modern UI. Built with dedication, it’s designed to spread positivity, reflection, and celebration during the festive season.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'ShadCN UI'],
    github: 'https://github.com/M0hammad-yasin/eid-wish.git',
    demo: 'https://eid-mubarek.vercel.app/',
  },
  // {
  //   title: '',
  //   description: '',
  //   tags: [],
  //   github: '',
  //   demo: '',
  // },
  // {
  //   title: '',
  //   description: '',
  //   tags: [],
  //   github: '',
  //   demo: '',
  // }
]

// Experience data
const experiences = [
  {
    title: 'Full-Stack Developer',
    company: 'Fiverr',
    period: '2023 - Present',
    description: 'Worked on full-stack web development tasks assigned through professional referrals, fixing and maintaining MERN stack applications, resolving frontend and backend issues, debugging APIs, and improving application performance.',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    title: 'Final Year Project',
    company: 'UIIT',
    period: '2024-2025',
    description: 'Developed AeroAgriculture, an innovative and high-performing IoT-based smart hydroponic farming system using the MERN stack. The system enables real-time sensor monitoring (temperature, humidity, pH, EC, CO₂), automated control of lights, pumps, and sprinklers, data analytics, and secure user authentication. The project achieved 1st position among 300+ students.',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    title: 'Junior Developer Intern',
    company: 'DevSin',
    period: '2025-2025',
    description: 'Contributed to multiple projects and gained hands-on experience with full-stack development.',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    title: 'BS Computer Science',
    company: 'University',
    period: '2020 - 2024',
    description: 'Focus on software engineering, algorithms, data structures, and cybersecurity. Participated in hackathons and coding competitions.',
    icon: <GraduationCap className="w-5 h-5" />
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast("Message sent!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    })
    e.currentTarget.reset()
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <Code2 className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">MY</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {item}
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Zap className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Zap className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 inline-block"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Badge variant="outline" className="mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  Security-Focused Developer
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Muhammad Yasin
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Computer Science-Focused <span className="text-primary font-semibold"> Full-Stack Developer</span>   with a Passion for
                <span className="text-primary font-semibold"> Cybersecurity</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap gap-4 justify-center mb-12"
              >
                <Button size="lg" onClick={() => scrollToSection('projects')}>
                  View Projects
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                  Get In Touch
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex justify-center gap-6"
              >
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/M0hammad-yasin" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/muhammad-yasin-379059268/" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:mohdysn111@gmail.com" aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">About Me</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Building Secure & Scalable Solutions</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Who I Am
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a passionate Full-Stack Developer with a strong foundation in Computer Science and a keen interest in cybersecurity. I specialize in building secure, scalable, and user-friendly web applications using modern technologies.
                  </p>
                  <p>
                    With experience in both frontend and backend development, I bring ideas to life from concept to deployment. My cybersecurity background ensures that every application I build is designed with security best practices from the ground up.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    My Approach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    I believe in writing clean, maintainable code that follows industry best practices. Security is always a top priority in my development process, not an afterthought.
                  </p>
                  <p>
                    I'm constantly learning new technologies and staying updated with the latest security threats and mitigation strategies. This allows me to build applications that are not only feature-rich but also resilient against cyber threats.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Skills & Expertise</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Proficiency</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive skill set spanning full-stack development and cybersecurity
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="text-primary">{category.icon}</span>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Portfolio</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A showcase of my recent work in full-stack development and security
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Journey</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience & Education</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="border-2 hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {exp.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="text-xl font-bold">{exp.title}</h3>
                            <Badge variant="secondary">{exp.period}</Badge>
                          </div>
                          <p className="text-primary font-medium mb-2">{exp.company}</p>
                          <p className="text-muted-foreground">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Contact</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interested in collaborating or have a question? Feel free to reach out!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What's this about?" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex justify-center gap-6"
            >
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="https://github.com/M0hammad-yasin">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="https://www.linkedin.com/in/muhammad-yasin-379059268/">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="mailto:mohdysn111@gmail.com">
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-semibold">Muhammad Yasin</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Muhammad Yasin. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/M0hammad-yasin" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/muhammad-yasin-379059268/" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:mohdysn111@gmail.com" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}