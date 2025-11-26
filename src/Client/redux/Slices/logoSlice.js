import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../api/axios";

// ✅ Fetch current logo
export const fetchLogo = createAsyncThunk(
  "logo/fetchLogo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API_URL.get("/logo");
            console.log(res.data.url);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching logo");
    }
  }
);

// ✅ Upload new logo
export const uploadLogo = createAsyncThunk(
  "logo/uploadLogo",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("logo", file); // لازم الاسم يكون زي upload.single("logo")

      const res = await API_URL.post("/logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error uploading logo");
    }
  }
);


// ✅ Remove logo
export const removeLogo = createAsyncThunk(
  "logo/removeLogo",
  async (_, { rejectWithValue }) => {
    try {
      await API_URL.delete("/logo");
      return null; // عشان نمسح من الstate
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error removing logo");
    }
  }
);

// ✅ Revert logo
export const revertLogo = createAsyncThunk(
  "logo/revertLogo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API_URL.post("/logo/revert");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error reverting logo");
    }
  }
);

const logoSlice = createSlice({
  name: "logo",
  initialState: {
    url: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogo.fulfilled, (state, action) => {
       
        
        state.loading = false;
        state.url = action.payload?.url || null;
         console.log("gg"+ state.url);
      })
      .addCase(fetchLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // upload
      .addCase(uploadLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload?.url || null;
      })
      .addCase(uploadLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // remove
      .addCase(removeLogo.fulfilled, (state) => {
        state.url = null;
      })

      // revert
      .addCase(revertLogo.fulfilled, (state, action) => {
        state.url = action.payload?.url || null;
      });
  },
});

export default logoSlice.reducer;
