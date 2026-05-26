'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05050f]/85 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => scrollTo('#home')} className="text-lg font-bold gradient-text tracking-tight">
          {name?.split(' ')[0] ?? 'Portfolio'}.dev
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="ml-4 px-5 py-2 text-sm font-semibold rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
          >
            {t.nav.hireMe}
          </button>

          {/* Language switcher */}
          <div className="ml-3 flex items-center gap-0.5 p-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                  lang === code
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                style={lang === code ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#05050f]/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { scrollTo(link.href); setOpen(false); }}
                  className="text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm"
                >
                  {link.label}
                </button>
              ))}
              {/* Mobile language switcher */}
              <div className="flex gap-2 px-4 pt-3 pb-1 border-t border-white/5 mt-1">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setOpen(false); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      lang === code
                        ? 'text-white'
                        : 'text-gray-500 bg-white/5 hover:text-white'
                    }`}
                    style={lang === code ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
