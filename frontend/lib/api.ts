import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile
export const getProfile = () => api.get('/profile');

// Skills
export const getSkills = () => api.get('/skills');

// Projects
export const getProjects = () => api.get('/projects');

// Experience
export const getExperience = () => api.get('/experience');

// Education
export const getEducation = () => api.get('/education');

// Testimonials
export const getTestimonials = () => api.get('/testimonials');

// Blog
export const getBlogPosts = () => api.get('/blog');
export const getBlogPost = (id: string) => api.get(`/blog/${id}`);

// Contact
export const sendContact = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => api.post('/contact', data);
