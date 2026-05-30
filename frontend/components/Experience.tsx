'use client';
import { motion } from 'motion/react';
import { HiBriefcase } from 'react-icons/hi';
import { useTranslation, localize } from '@/lib/i18n';

interface Experience {
  id: string;
  company: string;
  companyRu?: string;
  companyUz?: string;
  position: string;
  positionRu?: string;
  positionUz?: string;
  description: string;
  descriptionRu?: string;
  descriptionUz?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

const MONTH_NAMES = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  uz: ['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek'],
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Experience({ experience }: { experience: Experience[] }) {
  const { t, lang } = useTranslation();

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!month) return year;
    const months = MONTH_NAMES[lang] ?? MONTH_NAMES.en;
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  return (
    <section id="experience" className="section relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.experience.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.experience.title}</h2>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Animated timeline line */}
          <motion.div
            className="timeline-line"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}
          />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => {
              const position = localize(exp as Record<string, any>, 'position', lang);
              const company = localize(exp as Record<string, any>, 'company', lang);
              const description = localize(exp as Record<string, any>, 'description', lang);

              return (
                <motion.div
                  key={exp.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-[2.35rem] top-5 w-4 h-4 rounded-full border-2 border-blue-500 z-10"
                    style={{ background: exp.current ? '#3b82f6' : '#05050f' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.12 + 0.2 }}
                    whileHover={{ scale: 1.4 }}
                  />

                  {/* Card */}
                  <motion.div
                    className="glass-card gradient-border rounded-2xl p-6"
                    whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{position}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <HiBriefcase className="text-blue-400" size={14} />
                          <span className="text-blue-400 font-medium text-sm">{company}</span>
                          <span className="text-gray-600 text-xs">· {exp.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{
                            background: exp.current ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                            border: exp.current ? '1px solid rgba(59,130,246,0.40)' : '1px solid rgba(255,255,255,0.10)',
                            color: exp.current ? '#60a5fa' : '#9ca3af',
                          }}
                        >
                          {formatDate(exp.startDate)} — {exp.current ? t.experience.present : formatDate(exp.endDate ?? '')}
                        </span>
                        {exp.current && (
                          <motion.span
                            className="px-2.5 py-1 rounded-full text-xs font-semibold text-green-400"
                            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.30)' }}
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            {t.experience.current}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
