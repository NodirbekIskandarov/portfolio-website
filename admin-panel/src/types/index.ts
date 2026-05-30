export interface Profile {
  id?: string;
  name: string;
  title: string;
  titleRu?: string;
  titleUz?: string;
  bio: string;
  bioRu?: string;
  bioUz?: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  titleRu?: string;
  titleUz?: string;
  description: string;
  descriptionRu?: string;
  descriptionUz?: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  id?: string;
  company: string;
  companyRu?: string;
  companyUz?: string;
  position: string;
  positionRu?: string;
  positionUz?: string;
  description: string;
  descriptionRu?: string;
  descriptionUz?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

export interface Testimonial {
  id?: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  order: number;
}

export interface BlogPost {
  id?: string;
  title: string;
  titleRu?: string;
  titleUz?: string;
  slug: string;
  content: string;
  contentRu?: string;
  contentUz?: string;
  excerpt: string;
  excerptRu?: string;
  excerptUz?: string;
  image: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}
