'use client';
import { motion } from 'motion/react';
import { HiClock, HiEye, HiArrowRight } from 'react-icons/hi';
import { useTranslation, timeAgo, localize } from '@/lib/i18n';

interface BlogPost {
  id: string;
  title: string;
  titleRu?: string;
  titleUz?: string;
  slug: string;
  excerpt: string;
  excerptRu?: string;
  excerptUz?: string;
  image?: string;
  tags: string[];
  views: number;
  createdAt?: string;
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const { t, lang } = useTranslation();
  if (!posts.length) return null;

  return (
    <section id="blog" className="section relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.blog.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.blog.title}</h2>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.slice(0, 6).map((post) => {
            const title = localize(post as Record<string, any>, 'title', lang);
            const excerpt = localize(post as Record<string, any>, 'excerpt', lang);

            return (
              <motion.article
                key={post.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="glass-card gradient-border rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div
                  className="h-44 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))' }}
                >
                  {post.image ? (
                    <motion.img
                      src={post.image}
                      alt={title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-15 font-bold text-white select-none">
                      {title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map(tag => (
                      <motion.span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-400"
                        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                        whileHover={{ scale: 1.08 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2 leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-2 mb-4">{excerpt}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-3 text-gray-600 text-xs">
                      {post.createdAt && (
                        <span className="flex items-center gap-1">
                          <HiClock size={11} /> {timeAgo(post.createdAt, t.blog)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <HiEye size={11} /> {post.views}
                      </span>
                    </div>
                    <motion.a
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-xs text-blue-400 font-medium"
                      whileHover={{ x: 3, color: '#93c5fd' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {t.blog.read} <HiArrowRight size={12} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
