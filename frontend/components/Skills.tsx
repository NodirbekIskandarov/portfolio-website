'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="glass-card gradient-border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-sm">{skill.name}</span>
        <span className="text-gray-500 text-xs">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="skill-bar-fill h-1.5"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.05 }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useTranslation();
  const categories = [t.skills.all, ...Array.from(new Set(skills.map((s) => s.category)))];
  const [active, setActive] = useState(t.skills.all);

  const filtered = active === t.skills.all ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="section relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.skills.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{t.skills.title}</h2>
          <div className="mt-4 h-1 w-16 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => {
            const isAll = cat === t.skills.all;
            const icon = isAll ? '💡' : (CATEGORY_ICONS[cat] ?? '💡');
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? 'text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 border border-white/10 hover:border-white/20 hover:text-white bg-white/5'
                }`}
                style={active === cat ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
              >
                <span>{icon}</span>
                {cat}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
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
