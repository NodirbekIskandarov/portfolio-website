'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
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

const infoVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const infoItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Contact({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.contact.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact.title}</h2>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <motion.div variants={infoItem} className="glass-card rounded-2xl p-6 mb-2">
              <h3 className="text-white font-semibold text-lg mb-2">{t.contact.letsWork}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.contact.openTo}</p>
            </motion.div>

            {contactInfo.map(({ icon: Icon, label, value, href }) =>
              value ? (
                <motion.div
                  key={label}
                  variants={infoItem}
                  className="glass-card gradient-border rounded-2xl p-5 flex items-center gap-4"
                  whileHover={{ x: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                >
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
                </motion.div>
              ) : null
            )}

            {/* Social links */}
            <motion.div variants={infoItem} className="flex gap-3 mt-2">
              {profile?.github && (
                <motion.a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400"
                  whileHover={{ scale: 1.15, color: '#fff', borderColor: 'rgba(59,130,246,0.5)', y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <FaGithub size={18} />
                </motion.a>
              )}
              {profile?.linkedin && (
                <motion.a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400"
                  whileHover={{ scale: 1.15, color: '#0a66c2', borderColor: 'rgba(10,102,194,0.5)', y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <FaLinkedin size={18} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.yourName}</label>
                  <motion.input
                    className="form-input"
                    placeholder={t.contact.namePlaceholder}
                    value={form.name}
                    onChange={set('name')}
                    required
                    whileFocus={{ borderColor: 'rgba(59,130,246,0.7)', scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.yourEmail}</label>
                  <motion.input
                    className="form-input"
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    value={form.email}
                    onChange={set('email')}
                    required
                    whileFocus={{ borderColor: 'rgba(59,130,246,0.7)', scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.subject}</label>
                <motion.input
                  className="form-input"
                  placeholder={t.contact.subjectPlaceholder}
                  value={form.subject}
                  onChange={set('subject')}
                  required
                  whileFocus={{ borderColor: 'rgba(59,130,246,0.7)', scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider">{t.contact.message}</label>
                <motion.textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  value={form.message}
                  onChange={set('message')}
                  required
                  whileFocus={{ borderColor: 'rgba(59,130,246,0.7)' }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm p-3 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)' }}
                >
                  <HiCheckCircle size={16} /> {t.contact.success}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <HiExclamationCircle size={16} /> {t.contact.error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    {t.contact.sending}
                  </span>
                ) : t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
