'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'en' | 'ru' | 'uz';

export type T = {
  nav: { home: string; skills: string; projects: string; experience: string; blog: string; contact: string; hireMe: string };
  hero: { greeting: string; viewWork: string; letsTalk: string; yearsExp: string; projects: string; technologies: string; scroll: string };
  skills: { label: string; title: string; all: string };
  projects: { label: string; title: string; featured: string; allProjects: string; source: string; liveDemo: string; noProjects: string };
  experience: { label: string; title: string; present: string; current: string };
  blog: { label: string; title: string; read: string; today: string; yesterday: string; daysAgo: string; monthsAgo: string; yearsAgo: string };
  contact: { label: string; title: string; letsWork: string; openTo: string; email: string; phone: string; location: string; yourName: string; yourEmail: string; subject: string; message: string; namePlaceholder: string; emailPlaceholder: string; subjectPlaceholder: string; messagePlaceholder: string; send: string; sending: string; success: string; error: string };
  footer: { tagline: string; rights: string; madeWith: string; using: string };
};

const translations: Record<Lang, T> = {
  en: {
    nav: { home: 'Home', skills: 'Skills', projects: 'Projects', experience: 'Experience', blog: 'Blog', contact: 'Contact', hireMe: 'Hire Me' },
    hero: { greeting: "Hello, I'm", viewWork: 'View My Work', letsTalk: "Let's Talk", yearsExp: 'Years Exp.', projects: 'Projects', technologies: 'Technologies', scroll: 'Scroll' },
    skills: { label: 'What I Know', title: 'My Skills', all: 'All' },
    projects: { label: 'My Work', title: 'Projects', featured: '⭐ Featured', allProjects: 'All Projects', source: 'Source', liveDemo: 'Live Demo', noProjects: 'No projects found.' },
    experience: { label: 'Career Path', title: 'Experience', present: 'Present', current: 'Current' },
    blog: { label: 'My Thoughts', title: 'Latest Posts', read: 'Read', today: 'Today', yesterday: 'Yesterday', daysAgo: '{n} days ago', monthsAgo: '{n} months ago', yearsAgo: '{n} years ago' },
    contact: { label: 'Get In Touch', title: 'Contact Me', letsWork: "Let's Work Together", openTo: "I'm always open to new opportunities and interesting projects. Feel free to reach out!", email: 'Email', phone: 'Phone', location: 'Location', yourName: 'Your Name', yourEmail: 'Email', subject: 'Subject', message: 'Message', namePlaceholder: 'John Doe', emailPlaceholder: 'john@example.com', subjectPlaceholder: 'Project Inquiry', messagePlaceholder: 'Tell me about your project...', send: 'Send Message', sending: 'Sending…', success: "Message sent! I'll get back to you soon.", error: 'Something went wrong. Please try again.' },
    footer: { tagline: 'Crafting digital experiences', rights: 'All rights reserved', madeWith: 'Made with', using: 'using Next.js & TailwindCSS' },
  },
  ru: {
    nav: { home: 'Главная', skills: 'Навыки', projects: 'Проекты', experience: 'Опыт', blog: 'Блог', contact: 'Контакт', hireMe: 'Нанять меня' },
    hero: { greeting: 'Привет, я', viewWork: 'Мои проекты', letsTalk: 'Написать мне', yearsExp: 'Года опыта', projects: 'Проектов', technologies: 'Технологий', scroll: 'Листать' },
    skills: { label: 'Что я знаю', title: 'Мои навыки', all: 'Все' },
    projects: { label: 'Мои работы', title: 'Проекты', featured: '⭐ Избранные', allProjects: 'Все проекты', source: 'Код', liveDemo: 'Демо', noProjects: 'Проекты не найдены.' },
    experience: { label: 'Карьерный путь', title: 'Опыт работы', present: 'По н.в.', current: 'Текущее' },
    blog: { label: 'Мысли вслух', title: 'Последние посты', read: 'Читать', today: 'Сегодня', yesterday: 'Вчера', daysAgo: '{n} дн. назад', monthsAgo: '{n} мес. назад', yearsAgo: '{n} г. назад' },
    contact: { label: 'Связаться', title: 'Контакты', letsWork: 'Давайте работать вместе', openTo: 'Я всегда открыт для новых возможностей и интересных проектов. Смело пишите!', email: 'Email', phone: 'Телефон', location: 'Город', yourName: 'Ваше имя', yourEmail: 'Email', subject: 'Тема', message: 'Сообщение', namePlaceholder: 'Иван Иванов', emailPlaceholder: 'ivan@example.com', subjectPlaceholder: 'Запрос по проекту', messagePlaceholder: 'Расскажите о вашем проекте...', send: 'Отправить', sending: 'Отправка…', success: 'Сообщение отправлено! Скоро отвечу.', error: 'Что-то пошло не так. Попробуйте снова.' },
    footer: { tagline: 'Создаю цифровые решения', rights: 'Все права защищены', madeWith: 'Сделано с', using: 'на Next.js и TailwindCSS' },
  },
  uz: {
    nav: { home: 'Bosh sahifa', skills: "Ko'nikmalar", projects: 'Loyihalar', experience: 'Tajriba', blog: 'Blog', contact: 'Aloqa', hireMe: 'Yollash' },
    hero: { greeting: 'Salom, men', viewWork: 'Loyihalarim', letsTalk: "Bog'lanish", yearsExp: 'Yillik tajriba', projects: 'Loyiha', technologies: 'Texnologiya', scroll: 'Pastga' },
    skills: { label: 'Nima bilaman', title: "Ko'nikmalarim", all: 'Barchasi' },
    projects: { label: 'Ishlarim', title: 'Loyihalar', featured: '⭐ Tanlangan', allProjects: 'Barcha loyihalar', source: 'Kod', liveDemo: 'Demo', noProjects: 'Loyiha topilmadi.' },
    experience: { label: "Kasbiy yo'lim", title: 'Ish tajribasi', present: 'Hozirgi kungacha', current: 'Hozirgi' },
    blog: { label: 'Fikrlarim', title: "So'nggi maqolalar", read: "O'qish", today: 'Bugun', yesterday: 'Kecha', daysAgo: '{n} kun oldin', monthsAgo: '{n} oy oldin', yearsAgo: '{n} yil oldin' },
    contact: { label: 'Aloqaga chiqing', title: "Men bilan bog'laning", letsWork: 'Birga ishlaymiz', openTo: "Men doimo yangi imkoniyatlar va qiziqarli loyihalar uchun ochiqman. Bemalol murojaat qiling!", email: 'Email', phone: 'Telefon', location: 'Shahar', yourName: 'Ismingiz', yourEmail: 'Email', subject: 'Mavzu', message: 'Xabar', namePlaceholder: 'Nodir Iskandarov', emailPlaceholder: 'nodir@example.com', subjectPlaceholder: "Loyiha so'rovi", messagePlaceholder: 'Loyihangiz haqida aytib bering...', send: 'Yuborish', sending: 'Yuborilmoqda…', success: "Xabar yuborildi! Tez orada javob beraman.", error: "Xatolik yuz berdi. Qaytadan urinib ko'ring." },
    footer: { tagline: 'Raqamli tajribalar yarataman', rights: 'Barcha huquqlar himoyalangan', madeWith: 'Bilan yaratildi', using: 'Next.js va TailwindCSS yordamida' },
  },
};

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: T }

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored && (stored === 'en' || stored === 'ru' || stored === 'uz')) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LangContext);
}

export function timeAgo(dateStr: string | undefined, tb: T['blog']): string {
  if (!dateStr) return '';
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return tb.today;
  if (days === 1) return tb.yesterday;
  if (days < 30) return tb.daysAgo.replace('{n}', String(days));
  if (days < 365) return tb.monthsAgo.replace('{n}', String(Math.floor(days / 30)));
  return tb.yearsAgo.replace('{n}', String(Math.floor(days / 365)));
}
