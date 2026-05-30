'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import { useTranslation, localize } from '@/lib/i18n';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const TECH_COLORS: Record<string, string> = {
  React:       '#61dafb',
  'Next.js':   '#ffffff',
  TypeScript:  '#3178c6',
  JavaScript:  '#f7df1e',
  Go:          '#00add8',
  Python:      '#3776ab',
  MongoDB:     '#47a248',
  PostgreSQL:  '#336791',
  Docker:      '#2496ed',
  Redux:       '#764abc',
  TailwindCSS: '#06b6d4',
  Node:        '#339933',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useTranslation();
  const title = localize(project as Record<string, any>, 'title', lang);
  const description = localize(project as Record<string, any>, 'description', lang);
  const [hovered, setHovered] = useState(false);

  const gradients = [
    'from-blue-600/30 via-violet-600/20 to-transparent',
    'from-violet-600/30 via-purple-600/20 to-transparent',
    'from-cyan-600/30 via-blue-600/20 to-transparent',
    'from-indigo-600/30 via-blue-600/20 to-transparent',
  ];
  const grad = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card gradient-border rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image / placeholder */}
      <div className={`relative h-48 bg-gradient-to-br ${grad} overflow-hidden`}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl opacity-20 select-none font-bold text-white">
              {project.title.slice(0, 2).toUpperCase()}
            </div>
          </div>
        )}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
               onClick={(e) => e.stopPropagation()}>
              <FaGithub size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
               onClick={(e) => e.stopPropagation()}>
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </motion.div>

        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-yellow-300"
               style={{ background: 'rgba(234,179,8,0.20)', border: '1px solid rgba(234,179,8,0.40)' }}>
            <HiStar size={10} /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: TECH_COLORS[tech] ?? '#60a5fa' }}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-1 rounded-full text-xs text-gray-500"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex gap-4 pt-2 border-t border-white/5">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs transition-colors">
              <FaGithub size={13} /> {t.projects.source}
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-gray-500 hover:text-blue-400 text-xs transition-colors">
              <FaExternalLinkAlt size={11} /> {t.projects.liveDemo}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'featured'>('featured');
  const visible = filter === 'featured' ? projects.filter((p) => p.featured) : projects;
  const hasFeatured = projects.some((p) => p.featured);

  return (
    <section id="projects" className="section relative" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.projects.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.projects.title}</h2>
          <div className="h-1 w-16 mx-auto rounded-full mb-8" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />

          {hasFeatured && (
            <div className="inline-flex gap-1 p-1 rounded-full"
                 style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(['featured', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f ? 'text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                  style={filter === f ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
                >
                  {f === 'featured' ? t.projects.featured : t.projects.allProjects}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-12">{t.projects.noProjects}</p>
        )}
      </div>
    </section>
  );
}
