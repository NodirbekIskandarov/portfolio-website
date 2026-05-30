'use client';
import { motion } from 'motion/react';
import { useTranslation, localize } from '@/lib/i18n';

export interface EducationItem {
  id: string;
  institution: string;
  institutionRu?: string;
  institutionUz?: string;
  degree: string;
  degreeRu?: string;
  degreeUz?: string;
  field: string;
  fieldRu?: string;
  fieldUz?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description?: string;
  descriptionRu?: string;
  descriptionUz?: string;
  grade?: string;
  order: number;
}

const MONTH_NAMES = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  uz: ['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek'],
};

// Graduation cap SVG icon
function GraduationCap({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Education({ education }: { education: EducationItem[] }) {
  const { t, lang } = useTranslation();
  if (!education.length) return null;

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!month) return year;
    const months = MONTH_NAMES[lang] ?? MONTH_NAMES.en;
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  return (
    <section id="education" className="section relative" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">{t.education.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.education.title}</h2>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => {
            const institution = localize(edu as Record<string, any>, 'institution', lang);
            const degree = localize(edu as Record<string, any>, 'degree', lang);
            const field = localize(edu as Record<string, any>, 'field', lang);
            const description = localize(edu as Record<string, any>, 'description', lang);

            return (
              <motion.div
                key={edu.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="glass-card gradient-border rounded-2xl p-6 flex flex-col"
              >
                {/* Top row: icon + date badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Graduation cap icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <GraduationCap className="w-6 h-6 text-emerald-400" />
                  </motion.div>

                  {/* Date badge + current */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{
                        background: edu.current ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)',
                        border: edu.current ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(255,255,255,0.10)',
                        color: edu.current ? '#34d399' : '#9ca3af',
                      }}
                    >
                      {formatDate(edu.startDate)} — {edu.current ? t.education.present : formatDate(edu.endDate ?? '')}
                    </span>
                    {edu.current && (
                      <motion.span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-400"
                        style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.30)' }}
                        animate={{ opacity: [1, 0.55, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {t.education.current}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Institution */}
                <h3 className="text-white font-bold text-base leading-snug mb-1">{institution}</h3>

                {/* Degree · Field */}
                <p className="text-emerald-400 text-sm font-medium mb-1">
                  {degree}
                  {field && <span className="text-gray-500 font-normal"> · {field}</span>}
                </p>

                {/* Location */}
                {edu.location && (
                  <p className="text-gray-600 text-xs mb-3 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {edu.location}
                  </p>
                )}

                {/* Description */}
                {description && (
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{description}</p>
                )}

                {/* Grade */}
                {edu.grade && (
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs">{t.education.grade}:</span>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}
                    >
                      {edu.grade}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
