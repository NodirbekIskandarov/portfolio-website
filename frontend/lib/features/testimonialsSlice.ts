import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTestimonials } from '../api';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  order: number;
}

interface TestimonialsState {
  data: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk('testimonials/fetch', async () => {
  const response = await getTestimonials();
  return response.data;
});

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch testimonials';
      });
  },
});

export default testimonialsSlice.reducer;
