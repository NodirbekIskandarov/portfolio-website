import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExperience } from '../api';

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

interface ExperienceState {
  data: Experience[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchExperience = createAsyncThunk('experience/fetch', async () => {
  const response = await getExperience();
  return response.data;
});

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch experience';
      });
  },
});

export default experienceSlice.reducer;
