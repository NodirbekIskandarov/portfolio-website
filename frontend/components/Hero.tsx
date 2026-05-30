'use client';
import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
  useSpring,
} from 'motion/react';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { useTranslation, localize } from '@/lib/i18n';

interface Profile {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
}

// Word-by-word blur reveal
function BlurReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

// Animated counter stat
function Stat({ raw, label, delay }: { raw: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const display = useMotionValue('0');

  const numericPart = parseInt(raw.replace(/\D/g, '')) || 0;
  const suffix = raw.replace(/\d/g, '');

  useEffect(() => {
    if (!isInView) return;
    const unsub = count.on('change', (v) => display.set(`${Math.round(v)}${suffix}`));
    const ctrl = animate(count, numericPart, { duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] });
    return () => { ctrl.stop(); unsub(); };
  }, [isInView]); // eslint-disable-line

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-3xl font-bold gradient-text">
        <motion.span>{display}</motion.span>
      </div>
      <div className="text-gray-500 text-xs mt-1 tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

export default function Hero({
  profile,
  projectCount = 0,
  skillCount = 0,
}: {
  profile: Profile | null;
  projectCount?: number;
  skillCount?: number;
}) {
  const { t, lang } = useTranslation();
  const { scrollY } = useScroll();

  // Orb parallax
  const orb1Y = useTransform(scrollY, [0, 800], [0, -120]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, 140]);
  const orb3Y = useTransform(scrollY, [0, 800], [0, -80]);
  const orb1Scale = useTransform(scrollY, [0, 800], [1, 1.3]);
  const orb2Scale = useTransform(scrollY, [0, 800], [1, 0.8]);

  // Content fades as you scroll down
  const rawOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const rawY = useTransform(scrollY, [0, 380], [0, -50]);
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const initials = profile?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'NI';
  const displayName = profile?.name ?? 'Nodirbek Iskandarov';
  const displayTitle = profile ? localize(profile as Record<string, any>, 'title', lang) || (profile.title ?? 'Frontend Developer') : 'Frontend Developer';
  const displayBio = profile ? localize(profile as Record<string, any>, 'bio', lang) || (profile.bio ?? '') : '';

  const socials = [
    { icon: FaGithub,   href: profile?.github,   label: 'GitHub' },
    { icon: FaLinkedin, href: profile?.linkedin,  label: 'LinkedIn' },
    { icon: FaTwitter,  href: profile?.twitter,   label: 'Twitter' },
    { icon: FaGlobe,    href: profile?.website,   label: 'Website' },
  ].filter(s => s.href);

  const stats = [
    { raw: '2+',               label: t.hero.yearsExp },
    { raw: `${projectCount}+`, label: t.hero.projects },
    { raw: `${skillCount}+`,   label: t.hero.technologies },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="orb orb-1" style={{ y: orb1Y, scale: orb1Scale }} />
        <motion.div className="orb orb-2" style={{ y: orb2Y, scale: orb2Scale }} />
        <motion.div className="orb orb-3" style={{ y: orb3Y }} />
      </div>
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Scrolling content wrapper */}
      <motion.div
        style={{ opacity: smoothOpacity, y: smoothY }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-32 flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32">
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white select-none"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              {initials}
            </motion.div>
            {/* Pulsing glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full -z-10 blur-2xl"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Online dot */}
            <motion.span
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-[#05050f]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3"
        >
          {t.hero.greeting}
        </motion.p>

        {/* Name — word blur reveal */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
          <BlurReveal text={displayName} delay={0.35} />
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-xl md:text-2xl gradient-text font-semibold mb-6"
        >
          {displayTitle}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          {displayBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.82, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full text-white font-semibold"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 32px rgba(59,130,246,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {t.hero.viewWork}
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full text-white font-semibold border border-white/20"
            whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {t.hero.letsTalk}
          </motion.button>
        </motion.div>

        {/* Social links */}
        {socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex gap-3 mb-16"
          >
            {socials.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.95 + i * 0.08 }}
                whileHover={{ scale: 1.18, y: -4, color: '#fff', borderColor: 'rgba(59,130,246,0.6)', backgroundColor: 'rgba(59,130,246,0.12)' }}
                whileTap={{ scale: 0.88 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Stats with animated counters */}
        <div className="flex gap-12 justify-center">
          {stats.map((s, i) => (
            <Stat key={i} raw={s.raw} label={s.label} delay={1.1 + i * 0.12} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <HiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
