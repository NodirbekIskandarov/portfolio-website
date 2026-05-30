'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '@/lib/i18n';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: '🎨',
  Backend:  '⚙️',
  Database: '🗄️',
  Tools:    '🛠️',
  Mobile:   '📱',
  DevOps:   '🚀',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, scale: 0.85, y: -12, transition: { duration: 0.25 } },
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="glass-card gradient-border rounded-2xl p-5 cursor-default"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-sm">{skill.name}</span>
        <motion.span
          className="text-gray-500 text-xs tabular-nums"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04 + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="skill-bar-fill h-1.5"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.04 }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useTranslation();
  const allLabel = t.skills.all;
  const categories = [allLabel, ...Array.from(new Set(skills.map(s => s.category)))];
  const [active, setActive] = useState(allLabel);

  const filtered = active === allLabel ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.skills.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{t.skills.title}</h2>
          <motion.div
            className="mt-4 h-1 w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => {
            const isAll = cat === allLabel;
            const icon = isAll ? '💡' : (CATEGORY_ICONS[cat] ?? '💡');
            const isActive = active === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 border border-white/10 hover:border-white/20 hover:text-white bg-white/5'
                }`}
                style={isActive ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span>{icon}</span>
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid with stagger */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
