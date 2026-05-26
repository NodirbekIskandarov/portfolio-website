'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchProfile }      from '@/lib/features/profileSlice';
import { fetchSkills }       from '@/lib/features/skillsSlice';
import { fetchProjects }     from '@/lib/features/projectsSlice';
import { fetchExperience }   from '@/lib/features/experienceSlice';
import { fetchBlogPosts }    from '@/lib/features/blogSlice';

import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import Skills       from '@/components/Skills';
import Projects     from '@/components/Projects';
import Experience   from '@/components/Experience';
import Blog         from '@/components/Blog';
import Contact      from '@/components/Contact';
import Footer       from '@/components/Footer';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const profile      = useSelector((s: RootState) => s.profile.data);
  const skills       = useSelector((s: RootState) => s.skills.data);
  const projects     = useSelector((s: RootState) => s.projects.data);
  const experience   = useSelector((s: RootState) => s.experience.data);
  const blogPosts    = useSelector((s: RootState) => s.blog.posts);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchExperience());
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen" style={{ background: '#05050f' }}>
      <Navbar name={profile?.name ?? undefined} />

      <Hero
        profile={profile}
        projectCount={projects.length}
        skillCount={skills.length}
      />

      <Skills skills={skills} />

      <Projects projects={projects} />

      <Experience experience={experience} />

      <Blog posts={blogPosts} />

      <Contact profile={profile} />

      <Footer profile={profile} />
    </div>
  );
}
