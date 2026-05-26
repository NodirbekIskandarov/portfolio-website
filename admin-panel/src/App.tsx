import { useState, useEffect } from 'react';
import * as api from './services/api';
import type { Profile, Skill, Project, Experience, Testimonial, BlogPost, Contact } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // Data states
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, skillsRes, projectsRes, expRes, testRes, blogRes] = await Promise.all([
        api.getProfile(),
        api.getSkills(),
        api.getProjects(),
        api.getExperience(),
        api.getTestimonials(),
        api.getBlogPosts(),
      ]);
      
      setProfile(profileRes.data);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
      setExperiences(expRes.data);
      setTestimonials(testRes.data);
      setBlogPosts(blogRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.login(loginForm.username, loginForm.password);
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  // Profile handlers
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await api.updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  // Skill handlers
  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteSkill(id);
      setSkills(skills.filter(s => s._id !== id));
    } catch (err) {
      alert('Error deleting skill');
    }
  };

  const handleSaveSkill = async (skill: Skill) => {
    setLoading(true);
    try {
      if (skill._id) {
        await api.updateSkill(skill._id, skill);
        setSkills(skills.map(s => s._id === skill._id ? skill : s));
      } else {
        const res = await api.createSkill(skill);
        setSkills([...skills, res.data]);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving skill');
    }
    setLoading(false);
  };

  // Project handlers
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleSaveProject = async (project: Project) => {
    setLoading(true);
    try {
      if (project._id) {
        await api.updateProject(project._id, project);
        setProjects(projects.map(p => p._id === project._id ? project : p));
      } else {
        const res = await api.createProject(project);
        setProjects([...projects, res.data]);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving project');
    }
    setLoading(false);
  };

  // Experience handlers
  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteExperience(id);
      setExperiences(experiences.filter(e => e._id !== id));
    } catch (err) {
      alert('Error deleting experience');
    }
  };

  const handleSaveExperience = async (exp: Experience) => {
    setLoading(true);
    try {
      if (exp._id) {
        await api.updateExperience(exp._id, exp);
        setExperiences(experiences.map(e => e._id === exp._id ? exp : e));
      } else {
        const res = await api.createExperience(exp);
        setExperiences([...experiences, res.data]);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving experience');
    }
    setLoading(false);
  };

  // Testimonial handlers
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (err) {
      alert('Error deleting testimonial');
    }
  };

  const handleSaveTestimonial = async (test: Testimonial) => {
    setLoading(true);
    try {
      if (test._id) {
        await api.updateTestimonial(test._id, test);
        setTestimonials(testimonials.map(t => t._id === test._id ? test : t));
      } else {
        const res = await api.createTestimonial(test);
        setTestimonials([...testimonials, res.data]);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving testimonial');
    }
    setLoading(false);
  };

  // Blog handlers
  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteBlogPost(id);
      setBlogPosts(blogPosts.filter(b => b._id !== id));
    } catch (err) {
      alert('Error deleting blog post');
    }
  };

  const handleSaveBlogPost = async (post: BlogPost) => {
    setLoading(true);
    try {
      if (post._id) {
        await api.updateBlogPost(post._id, post);
        setBlogPosts(blogPosts.map(b => b._id === post._id ? post : b));
      } else {
        const res = await api.createBlogPost(post);
        setBlogPosts([...blogPosts, res.data]);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      alert('Error saving blog post');
    }
    setLoading(false);
  };

  // Contact handlers
  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteContact(id);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      alert('Error deleting contact');
    }
  };

  const loadContacts = async () => {
    try {
      const res = await api.getContacts();
      setContacts(res.data);
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'contacts' && isLoggedIn) {
      loadContacts();
    }
  }, [activeTab, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h1>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Default credentials:</p>
            <p>Username: admin | Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto">
            {['profile', 'skills', 'projects', 'experience', 'testimonials', 'blog', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Management</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={profile.twitter}
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Website</label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Skills Management</h2>
              <button
                onClick={() => {
                  setEditingItem({ name: '', category: 'Frontend', level: 50, icon: '', order: skills.length + 1 });
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Skill
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-300 py-3 px-4">Name</th>
                    <th className="text-left text-gray-300 py-3 px-4">Category</th>
                    <th className="text-left text-gray-300 py-3 px-4">Level</th>
                    <th className="text-left text-gray-300 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill._id} className="border-b border-gray-700">
                      <td className="text-white py-3 px-4">{skill.name}</td>
                      <td className="text-gray-400 py-3 px-4">{skill.category}</td>
                      <td className="text-gray-400 py-3 px-4">{skill.level}%</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setEditingItem(skill);
                            setShowModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill._id!)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Projects Management</h2>
              <button
                onClick={() => {
                  setEditingItem({ 
                    title: '', 
                    description: '', 
                    image: '', 
                    technologies: [], 
                    githubUrl: '', 
                    liveUrl: '', 
                    featured: false, 
                    order: projects.length + 1 
                  });
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description.substring(0, 100)}...</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(project);
                        setShowModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id!)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Experience Management</h2>
              <button
                onClick={() => {
                  setEditingItem({ 
                    company: '', 
                    position: '', 
                    description: '', 
                    location: '', 
                    startDate: '', 
                    endDate: '', 
                    current: false, 
                    order: experiences.length + 1 
                  });
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold">{exp.position}</h3>
                      <p className="text-gray-400">{exp.company} - {exp.location}</p>
                      <p className="text-gray-500 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(exp);
                          setShowModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp._id!)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>
              <button
                onClick={() => {
                  setEditingItem({ 
                    name: '', 
                    position: '', 
                    company: '', 
                    content: '', 
                    rating: 5, 
                    order: testimonials.length + 1 
                  });
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Testimonial
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((test) => (
                <div key={test._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-bold">{test.name}</h3>
                      <p className="text-gray-400 text-sm">{test.position} at {test.company}</p>
                    </div>
                    <div className="text-yellow-400">{'⭐'.repeat(test.rating)}</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{test.content.substring(0, 100)}...</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(test);
                        setShowModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(test._id!)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Blog Management</h2>
              <button
                onClick={() => {
                  setEditingItem({ 
                    title: '', 
                    slug: '', 
                    content: '', 
                    excerpt: '', 
                    image: '', 
                    tags: [], 
                    published: false, 
                    views: 0 
                  });
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Blog Post
              </button>
            </div>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold">{post.title}</h3>
                      <p className="text-gray-400 text-sm">{post.excerpt}</p>
                      <div className="flex gap-2 mt-2">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(post);
                          setShowModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(post._id!)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold">{contact.name}</h3>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      <p className="text-gray-300 mt-2">{contact.message}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact._id!)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal for editing - simplified version */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingItem._id ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
            </h3>
            
            {/* Skill Form */}
            {activeTab === 'skills' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveSkill(editingItem); }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Database</option>
                    <option>Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Level (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingItem.level}
                    onChange={(e) => setEditingItem({ ...editingItem, level: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Icon</label>
                  <input
                    type="text"
                    value={editingItem.icon}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Project Form */}
            {activeTab === 'projects' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProject(editingItem); }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingItem.technologies.join(', ')}
                    onChange={(e) => setEditingItem({ ...editingItem, technologies: e.target.value.split(',').map((t: string) => t.trim()) })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={editingItem.githubUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Live URL</label>
                  <input
                    type="url"
                    value={editingItem.liveUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingItem.featured}
                      onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured Project
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Experience Form */}
            {activeTab === 'experience' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveExperience(editingItem); }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={editingItem.position}
                    onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Start Date</label>
                    <input
                      type="month"
                      value={editingItem.startDate}
                      onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">End Date</label>
                    <input
                      type="month"
                      value={editingItem.endDate || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                      disabled={editingItem.current}
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingItem.current}
                      onChange={(e) => setEditingItem({ ...editingItem, current: e.target.checked, endDate: e.target.checked ? '' : editingItem.endDate })}
                      className="mr-2"
                    />
                    Current Position
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Testimonial Form */}
            {activeTab === 'testimonials' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveTestimonial(editingItem); }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={editingItem.position}
                    onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Content</label>
                  <textarea
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Blog Form */}
            {activeTab === 'blog' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveBlogPost(editingItem); }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Excerpt</label>
                  <textarea
                    value={editingItem.excerpt}
                    onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Content</label>
                  <textarea
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingItem.tags.join(', ')}
                    onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value.split(',').map((t: string) => t.trim()) })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingItem.published}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="mr-2"
                    />
                    Published
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
