'use client';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { useTranslation } from '@/lib/i18n';

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.experience.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.experience.title}</h2>
          <div className="h-1 w-16 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        <div className="relative pl-8">
          <div className="timeline-line" />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute -left-[2.35rem] top-5 w-4 h-4 rounded-full border-2 border-blue-500 z-10"
                  style={{ background: exp.current ? '#3b82f6' : '#05050f' }}
                />

                <div className="glass-card gradient-border rounded-2xl p-6 transition-all duration-300 hover:-translate-x-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <HiBriefcase className="text-blue-400" size={14} />
                        <span className="text-blue-400 font-medium text-sm">{exp.company}</span>
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
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-green-400"
                              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.30)' }}>
                          {t.experience.current}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
