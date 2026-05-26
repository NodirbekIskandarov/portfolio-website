'use client';
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
    { label: t.nav.contact,    href: '#contact' },
  ];

  return (
    <footer className="border-t border-white/5 pt-12 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <button onClick={() => scrollTo('#home')} className="text-xl font-bold gradient-text">
              {profile?.name?.split(' ')[0] ?? 'Portfolio'}.dev
            </button>
            <p className="text-gray-600 text-sm mt-1">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                 className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-500 hover:text-white hover:border-blue-500/40 transition-all">
                <FaGithub size={16} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                 className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-500 hover:text-white hover:border-blue-500/40 transition-all">
                <FaLinkedin size={16} />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                 className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-500 hover:text-white hover:border-blue-500/40 transition-all">
                <FaTwitter size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
          <p>© {year} {profile?.name ?? 'Portfolio'}. {t.footer.rights}.</p>
          <p className="flex items-center gap-1">
            {t.footer.madeWith} <FaHeart size={10} className="text-red-500 mx-0.5" /> {t.footer.using}
          </p>
        </div>
      </div>
    </footer>
  );
}
