import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import skillsReducer from './features/skillsSlice';
import projectsReducer from './features/projectsSlice';
import experienceReducer from './features/experienceSlice';
import testimonialsReducer from './features/testimonialsSlice';
import blogReducer from './features/blogSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    experience: experienceReducer,
    testimonials: testimonialsReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
