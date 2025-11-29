import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../api/axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await API_URL.get("/blogs");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error");
  }
});

export const createBlog = createAsyncThunk("blogs/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await API_URL.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error");
  }
});

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API_URL.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const deleteBlog = createAsyncThunk("blogs/delete", async (id, { rejectWithValue }) => {
  try {
    await API_URL.delete(`/blogs/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error");
  }
});
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API_URL.get(`/blogs/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching blog");
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((b) => (b._id === action.payload._id ? action.payload : b));
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(fetchBlogById.pending, (state) => {
  state.loading = true;
})
.addCase(fetchBlogById.fulfilled, (state, action) => {
  state.loading = false;
  const existing = state.blogs.find((b) => b._id === action.payload._id);
  if (!existing) {
    state.blogs.push(action.payload); 
  }
})
.addCase(fetchBlogById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export default blogSlice.reducer;
