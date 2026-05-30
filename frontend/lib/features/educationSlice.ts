import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEducation } from '../api';

export interface EducationItem {
  id: string;
  institution: string;
  institutionRu?: string;
  institutionUz?: string;
  degree: string;
  degreeRu?: string;
  degreeUz?: string;
  field: string;
  fieldRu?: string;
  fieldUz?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description?: string;
  descriptionRu?: string;
  descriptionUz?: string;
  grade?: string;
  order: number;
}

interface EducationState {
  data: EducationItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = { data: [], loading: false, error: null };

export const fetchEducation = createAsyncThunk('education/fetch', async () => {
  const response = await getEducation();
  return response.data;
});

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEducation.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchEducation.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed'; });
  },
});

export default educationSlice.reducer;
