'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { sendContact } from '@/lib/api';
import { useTranslation } from '@/lib/i18n';

interface Profile {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  github?: string | null;
  linkedin?: string | null;
}

export default function Contact({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    { icon: FaEnvelope,     label: t.contact.email,    value: profile?.email,    href: `mailto:${profile?.email}` },
    { icon: FaPhone,        label: t.contact.phone,    value: profile?.phone,    href: `tel:${profile?.phone}` },
    { icon: FaMapMarkerAlt, label: t.contact.location, value: profile?.location, href: null },
  ];

  return (
    <section id="contact" className="section relative" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.contact.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact.title}</h2>
          <div className="h-1 w-16 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass-card rounded-2xl p-6 mb-2">
              <h3 className="text-white font-semibold text-lg mb-2">{t.contact.letsWork}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.contact.openTo}</p>
            </div>

            {contactInfo.map(({ icon: Icon, label, value, href }) =>
              value ? (
                <div key={label} className="glass-card gradient-border rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-x-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                       style={{ background: 'rgba(59,130,246,0.15)' }}>
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-blue-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ) : null
            )}

            <div className="flex gap-3 mt-2">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                  <FaGithub size={18} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                  <FaLinkedin size={18} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.yourName}</label>
                  <input className="form-input" placeholder={t.contact.namePlaceholder} value={form.name} onChange={set('name')} required />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.yourEmail}</label>
                  <input className="form-input" type="email" placeholder={t.contact.emailPlaceholder} value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.subject}</label>
                <input className="form-input" placeholder={t.contact.subjectPlaceholder} value={form.subject} onChange={set('subject')} required />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.message}</label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  value={form.message}
                  onChange={set('message')}
                  required
                />
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm p-3 rounded-xl"
                     style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  <HiCheckCircle size={16} /> {t.contact.success}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl"
                     style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  <HiExclamationCircle size={16} /> {t.contact.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {status === 'loading' ? t.contact.sending : t.contact.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
