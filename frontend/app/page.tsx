'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchProfile } from '@/lib/features/profileSlice';
import { fetchSkills } from '@/lib/features/skillsSlice';
import { fetchProjects } from '@/lib/features/projectsSlice';
import { fetchExperience } from '@/lib/features/experienceSlice';
import { fetchTestimonials } from '@/lib/features/testimonialsSlice';
import { fetchBlogPosts } from '@/lib/features/blogSlice';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.data);
  const skills = useSelector((state: RootState) => state.skills.data);
  const projects = useSelector((state: RootState) => state.projects.data);
  const experience = useSelector((state: RootState) => state.experience.data);
  const testimonials = useSelector((state: RootState) => state.testimonials.data);
  const blogPosts = useSelector((state: RootState) => state.blog.posts);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchExperience());
    dispatch(fetchTestimonials());
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {profile?.name || 'Nodirbek Iskandarov'}
          </h1>
          <p className="text-2xl md:text-3xl text-blue-400 mb-8">
            {profile?.title || 'Software Engineer'}
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            {profile?.bio || 'Loading...'}
          </p>
          <div className="flex gap-6 justify-center">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-blue-400 transition-colors">
                <FaGithub size={32} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-blue-400 transition-colors">
                <FaLinkedin size={32} />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-blue-400 transition-colors">
                <FaTwitter size={32} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">{skill.level}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300">
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.location}</p>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate!).getFullYear()}
                  </span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4 italic">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Latest Blog Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">Blog Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={`/blog/${post.id}`} className="text-blue-400 hover:text-blue-300">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-blue-400 text-3xl mb-4" />
              <p className="text-white">{profile?.email}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaPhone className="text-blue-400 text-3xl mb-4" />
              <p className="text-white">{profile?.phone}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-blue-400 text-3xl mb-4" />
              <p className="text-white">{profile?.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 {profile?.name || 'Nodirbek Iskandarov'}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
