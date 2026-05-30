'use client';
import { motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { useTranslation } from '@/lib/i18n';

interface Profile {
  name?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const links = [
    { label: t.nav.skills,     href: '#skills' },
    { label: t.nav.projects,   href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.education,  href: '#education' },
    { label: t.nav.contact,    href: '#contact' },
  ];

  const socials = [
    { icon: FaGithub,   href: profile?.github,   label: 'GitHub',   hover: 'rgba(255,255,255,0.9)' },
    { icon: FaLinkedin, href: profile?.linkedin,  label: 'LinkedIn', hover: '#0a66c2' },
    { icon: FaTwitter,  href: profile?.twitter,   label: 'Twitter',  hover: '#1da1f2' },
  ].filter(s => s.href);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="border-t border-white/5 pt-12 pb-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.button
              onClick={() => scrollTo('#home')}
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {profile?.name?.split(' ')[0] ?? 'Portfolio'}.dev
            </motion.button>
            <p className="text-gray-600 text-sm mt-1">{t.footer.tagline}</p>
          </motion.div>

          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-x-6 gap-y-2 justify-center"
          >
            {links.map(l => (
              <motion.button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-gray-500 text-sm"
                whileHover={{ color: '#fff', y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-3"
          >
            {socials.map(({ icon: Icon, href, label, hover }) => (
              <motion.a
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-500"
                whileHover={{ scale: 1.15, y: -3, borderColor: 'rgba(59,130,246,0.4)', color: hover }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
          <p>© {year} {profile?.name ?? 'Portfolio'}. {t.footer.rights}.</p>
          <motion.p
            className="flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            {t.footer.madeWith}{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaHeart size={10} className="text-red-500 mx-0.5" />
            </motion.span>
            {' '}{t.footer.using}
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
