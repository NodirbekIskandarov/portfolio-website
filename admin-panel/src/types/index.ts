export interface Profile {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  order: number;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

export interface Testimonial {
  _id?: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  order: number;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}
