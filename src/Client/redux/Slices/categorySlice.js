// تحديث كاتيجوري

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../api/axios";

// إضافة كاتيجوري جديدة
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API_URL.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error");
    }
  }
);

// جلب الكاتيجوري
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API_URL.get("/categories");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error");
    }
  }
);




export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API_URL.put(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error");
    }

  }
);

// حذف كاتيجوري
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await API_URL.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error");
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    CatLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      })
          .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export default categorySlice.reducer;