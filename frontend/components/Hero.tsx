'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { useTranslation } from '@/lib/i18n';

interface Profile {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero({
  profile,
  projectCount = 0,
  skillCount = 0,
}: {
  profile: Profile | null;
  projectCount?: number;
  skillCount?: number;
}) {
  const { t } = useTranslation();

  const initials = profile?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2) ?? 'NI';

  const socials = [
    { icon: FaGithub,   href: profile?.github,   label: 'GitHub' },
    { icon: FaLinkedin, href: profile?.linkedin,  label: 'LinkedIn' },
    { icon: FaTwitter,  href: profile?.twitter,   label: 'Twitter' },
    { icon: FaGlobe,    href: profile?.website,   label: 'Website' },
  ].filter((s) => s.href);

  const stats = [
    { value: '2+',               label: t.hero.yearsExp },
    { value: `${projectCount}+`, label: t.hero.projects },
    { value: `${skillCount}+`,   label: t.hero.technologies },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-32 flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white select-none"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            >
              {initials}
            </div>
            <div
              className="absolute inset-0 rounded-full opacity-40 blur-2xl scale-110 -z-10"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-[#05050f]" />
          </div>
        </motion.div>

        <motion.p {...fade(0.2)} className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          {...fade(0.3)}
          className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
        >
          {profile?.name ?? 'Nodirbek Iskandarov'}
        </motion.h1>

        <motion.p {...fade(0.4)} className="text-xl md:text-2xl gradient-text font-semibold mb-6">
          {profile?.title ?? 'Frontend Developer'}
        </motion.p>

        <motion.p {...fade(0.45)} className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          {profile?.bio ?? 'Building modern web experiences with clean code and thoughtful design.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fade(0.5)} className="flex flex-wrap gap-4 justify-center mb-10">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full text-white font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            {t.hero.viewWork}
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full text-white font-semibold border border-white/20 hover:bg-white/5 transition-all hover:-translate-y-0.5"
          >
            {t.hero.letsTalk}
          </button>
        </motion.div>

        {/* Social links */}
        {socials.length > 0 && (
          <motion.div {...fade(0.55)} className="flex gap-3 mb-16">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex gap-12 justify-center"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-gray-500 text-xs mt-1 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <HiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
