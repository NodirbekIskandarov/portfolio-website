import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../api';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

interface ProjectsState {
  data: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const response = await getProjects();
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      });
  },
});

export default projectsSlice.reducer;
