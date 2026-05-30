'use client';
import { motion } from 'framer-motion';
import { HiClock, HiEye, HiArrowRight } from 'react-icons/hi';
import { useTranslation, timeAgo, localize } from '@/lib/i18n';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  tags: string[];
  views: number;
  createdAt?: string;
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const { t, lang } = useTranslation();
  if (!posts.length) return null;

  return (
    <section id="blog" className="section relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">{t.blog.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.blog.title}</h2>
          <div className="h-1 w-16 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card gradient-border rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-44 relative overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))' }}>
                {post.image ? (
                  <img src={post.image} alt={post.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-15 font-bold text-white select-none">
                    {post.title.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-400"
                          style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                  {localize(post as Record<string, any>, 'title', lang)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-2 mb-4">
                  {localize(post as Record<string, any>, 'excerpt', lang)}
                </p>

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
                  <a href={`/blog/${post.id}`}
                     className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    {t.blog.read} <HiArrowRight size={12} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
