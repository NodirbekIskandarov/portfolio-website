import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSkills } from '../api';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

interface SkillsState {
  data: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk('skills/fetch', async () => {
  const response = await getSkills();
  return response.data;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skills';
      });
  },
});

export default skillsSlice.reducer;
