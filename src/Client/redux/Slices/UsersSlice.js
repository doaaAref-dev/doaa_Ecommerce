// redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../api/axios";

// جلب كل المستخدمين
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const res = await API_URL.get("/users");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// إضافة مستخدم جديد
export const addUser = createAsyncThunk("users/addUser", async (formData, thunkAPI) => {
  try {
    const res = await API_URL.post("/users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add user");
  }
});

// تحديث مستخدم
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API_URL.put(`/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);


// حذف مستخدم
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, thunkAPI) => {
  try {
    await API_URL.delete(`/users/${id}`);
    return id; // نرجع الـ id عشان نشيله من الستور
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    form: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      image: null,
      permissions: {
        addProduct: false,
        updateProduct: false,
        deleteProduct: false,
        applyDiscount: false,
      },
    },
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    updatePermission: (state, action) => {
      const { key, value } = action.payload;
      state.form.permissions[key] = value;
    },
    updateImage: (state, action) => {
      state.form.image = action.payload;
    },
    resetForm: (state) => {
      state.form = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        image: null,
        permissions: {
          addProduct: false,
          updateProduct: false,
          deleteProduct: false,
          applyDiscount: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })

      // update
     .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    })

      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((u) => u._id !== action.payload);
      });
  },
});

export const { updateFormField, updatePermission, updateImage, resetForm } = userSlice.actions;
export default userSlice.reducer;
