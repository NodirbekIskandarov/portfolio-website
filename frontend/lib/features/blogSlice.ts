import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBlogPosts, getBlogPost } from '../api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchBlogPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const response = await getBlogPosts();
  return response.data;
});

export const fetchBlogPost = createAsyncThunk('blog/fetchPost', async (id: string) => {
  const response = await getBlogPost(id);
  return response.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog posts';
      })
      .addCase(fetchBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog post';
      });
  },
});

export default blogSlice.reducer;
