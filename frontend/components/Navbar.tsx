'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslation, type Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar({ name }: { name?: string }) {
  const { t, lang, setLang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home,       href: '#home' },
    { label: t.nav.skills,     href: '#skills' },
    { label: t.nav.projects,   href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.blog,       href: '#blog' },
    { label: t.nav.contact,    href: '#contact' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05050f]/85 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#home')}
          className="text-lg font-bold gradient-text tracking-tight"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {name?.split(' ')[0] ?? 'Portfolio'}.dev
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              // @ts-ignore
              transition2={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            >
              {link.label}
            </motion.button>
          ))}

          <motion.button
            onClick={() => scrollTo('#contact')}
            className="ml-4 px-5 py-2 text-sm font-semibold rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(59,130,246,0.4)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {t.nav.hireMe}
          </motion.button>

          {/* Language switcher */}
          <div className="ml-3 flex items-center gap-0.5 p-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {LANGS.map(({ code, label }) => (
              <motion.button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  lang === code ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
                style={lang === code ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
                whileHover={lang !== code ? { scale: 1.08 } : {}}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <HiX size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <HiMenuAlt3 size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:hidden overflow-hidden bg-[#05050f]/95 backdrop-blur-2xl border-b border-white/5"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="px-4 py-4 flex flex-col gap-1"
            >
              {navLinks.map(link => (
                <motion.button
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                  }}
                  onClick={() => { scrollTo(link.href); setOpen(false); }}
                  className="text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl text-sm"
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.35 } } }}
                className="flex gap-2 px-4 pt-3 pb-1 border-t border-white/5 mt-1"
              >
                {LANGS.map(({ code, label }) => (
                  <motion.button
                    key={code}
                    onClick={() => { setLang(code); setOpen(false); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      lang === code ? 'text-white' : 'text-gray-500 bg-white/5'
                    }`}
                    style={lang === code ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
