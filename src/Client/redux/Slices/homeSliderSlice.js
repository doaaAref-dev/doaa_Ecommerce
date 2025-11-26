import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../api/axios";

// إضافة Slide جديد
export const addSlide = createAsyncThunk(
  "homeSlider/addSlide",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API_URL.post("/homeslides", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding slide");
    }
  }
);

// جلب كل Slides
export const fetchSlides = createAsyncThunk(
  "homeSlider/fetchSlides",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API_URL.get("/homeslides");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching slides");
    }
  }
);

// تحديث Slide
export const updateSlide = createAsyncThunk(
  "homeSlider/updateSlide",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API_URL.put(`/homeslides/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating slide");
    }
  }
);

// حذف Slide
export const deleteSlide = createAsyncThunk(
  "homeSlider/deleteSlide",
  async (id, { rejectWithValue }) => {
    try {
      await API_URL.delete(`/homeslides/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting slide");
    }
  }
);

const homeSliderSlice = createSlice({
  name: "homeSlider",
  initialState: {
    slides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSlide.fulfilled, (state, action) => {
        state.loading = false;
        state.slides.unshift(action.payload);
      })
      .addCase(addSlide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch
      .addCase(fetchSlides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateSlide.fulfilled, (state, action) => {
        state.slides = state.slides.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })

      // delete
      .addCase(deleteSlide.fulfilled, (state, action) => {
        state.slides = state.slides.filter((s) => s._id !== action.payload);
      });
  },
});

export default homeSliderSlice.reducer;
