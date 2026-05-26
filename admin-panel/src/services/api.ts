import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid token — auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (data: any) => api.put('/admin/profile', data);

// Skills
export const getSkills = () => api.get('/skills');
export const createSkill = (data: any) => api.post('/admin/skills', data);
export const updateSkill = (id: string, data: any) => api.put(`/admin/skills/${id}`, data);
export const deleteSkill = (id: string) => api.delete(`/admin/skills/${id}`);

// Projects
export const getProjects = () => api.get('/projects');
export const createProject = (data: any) => api.post('/admin/projects', data);
export const updateProject = (id: string, data: any) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/admin/projects/${id}`);

// Experience
export const getExperience = () => api.get('/experience');
export const createExperience = (data: any) => api.post('/admin/experience', data);
export const updateExperience = (id: string, data: any) => api.put(`/admin/experience/${id}`, data);
export const deleteExperience = (id: string) => api.delete(`/admin/experience/${id}`);

// Testimonials
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data: any) => api.post('/admin/testimonials', data);
export const updateTestimonial = (id: string, data: any) => api.put(`/admin/testimonials/${id}`, data);
export const deleteTestimonial = (id: string) => api.delete(`/admin/testimonials/${id}`);

// Blog
export const getBlogPosts = () => api.get('/admin/blog');
export const createBlogPost = (data: any) => api.post('/admin/blog', data);
export const updateBlogPost = (id: string, data: any) => api.put(`/admin/blog/${id}`, data);
export const deleteBlogPost = (id: string) => api.delete(`/admin/blog/${id}`);

// Contacts
export const getContacts = () => api.get('/admin/contacts');
export const deleteContact = (id: string) => api.delete(`/admin/contacts/${id}`);

export default api;
