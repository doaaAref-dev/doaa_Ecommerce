import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios"; // عدل المسار

// Async thunk لإضافة المنتج
export const addProduct = createAsyncThunk(
  
  "products/addProduct",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await api.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
       console.log(res.data);
      return res.data;
     
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("products/get");
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/category/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchProductsBySub = createAsyncThunk(
  "products/fetchBySub",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/subcategory/${name}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchLatestProducts = createAsyncThunk(
  "products/fetchLatestProducts",
  async (limit, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/latest?limit=${limit}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${productId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (query, thunkAPI) => {
    try {
      const res = await api.get(`/products/search?search=${encodeURIComponent(query)}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, formData, token }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// 🟢 حذف المنتج
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return productId; // نرجع ID للحذف من Redux
    } catch (err) {
      console.error(err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ productId, data }) => {
    const res = await api.post(`/products/reviews/${productId}`, data);
    return res.data;
  }
);

// جلب الـ reviews
export const fetchReviews = createAsyncThunk(
  "products/fetchReviews",
  async (productId) => {
    const res = await api.get(`/products/reviews/${productId}`, {
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    return res.data; // array of reviews
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    // بيانات إنشاء المنتج
    title: "",
    brand: "",
    description: "",
    price: "",
    discount: "",
    categoryId: "",
    subcategoryId: "",
  subcategories: [],
    colors: [],
    sizes: [],
    tags: [],
    images: [],
countInStock:"",
Quantity:"",

    // بيانات العرض
    products: [],            // كل المنتجات
    latestProducts: [],       // أحدث المنتجات (عشان ما تتبدلش)
    categoryProducts: [],     // المنتجات حسب الفئة
singleProduct: null,
  searchResults: [],
  reviews:[],
    loading: false,
        reviewsLoading: false, // خاص بالـ reviews

    error: null,
  },
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((_, i) => i !== action.payload);
      
    },
     addReviewLocal: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 كل المنتجات
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟣 المنتجات حسب الفئة
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟡 أحدث المنتجات
      .addCase(fetchLatestProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.latestProducts = action.payload; // ✅ هنا نخزنها منفصلة
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchProductById.fulfilled, (state, action) => {
  state.loading = false;
  state.singleProduct = action.payload;
})
.addCase(fetchProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    .addCase(fetchReviews.pending, (state) => {
        state.reviewsLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviewsLoading = false;
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        // نضيف آخر review فقط (حسب تصميمك)
        if (Array.isArray(action.payload.reviews)) {
          state.reviews.push(action.payload.reviews.slice(-1)[0]);
        }
      })


      // 🚀 fetch by subcategory
      .addCase(fetchProductsBySub.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryProducts = [];
      })
      .addCase(fetchProductsBySub.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsBySub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setField, addImage, removeImage, addTag, removeTag,addReviewLocal } =
  productSlice.actions;
export default productSlice.reducer;
