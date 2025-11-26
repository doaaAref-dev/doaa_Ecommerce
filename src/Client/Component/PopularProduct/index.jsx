import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from "@mui/material";
import { fetchCategories } from "../../redux/Slices/categorySlice";
import { fetchProductsByCategory } from "../../redux/Slices/productSlice";
import ProductSlider from "../ProductSlider";

export default function PopularProducts() {
  const dispatch = useDispatch();

  // ✅ الحالة من الـ Redux
  const { categories, loading: catLoading } = useSelector((state) => state.category);
  const { categoryProducts, loading: prodLoading } = useSelector((state) => state.products);

  // ✅ state داخلي لتحديد التاب الحالي
  const [value, setValue] = useState(0);

  // ✅ جلب الكاتيجوري عند أول تحميل
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ أول ما الكاتيجوري تتجاب أو التاب يتغير → نجيب المنتجات بتاعتها
  useEffect(() => {
    if (categories.length > 0) {
      const selectedCategory = categories[value];
      if (selectedCategory && selectedCategory._id) {
        dispatch(fetchProductsByCategory(selectedCategory._id));
        console.log("Selected Category ID:", selectedCategory._id);
      }
    }
  }, [dispatch, categories, value]);

  // ✅ تغيير التاب
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <section className="py-6 popular-products">
      <div className="container">
        {/* ====== Header ====== */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="leftSide">
            <h3 className="text-[20px] font-semibold mb-1">Popular Products</h3>
            <p className="text-gray-600">
              Don't miss out on our most popular products!
            </p>
          </div>

          {/* ====== Tabs ====== */}
          <div className="rightSide w-full md:w-[60%]">
            {catLoading ? (
              <p>Loading categories...</p>
            ) : categories.length > 0 ? (
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {/* ✅ عرض أول 3 كاتيجوري فقط */}
                {categories.slice(0, 3).map((cat, i) => (
                  <Tab key={cat._id} label={cat.name} />
                ))}
              </Tabs>
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
<div className="h-[400px]">
    {prodLoading ? (
          <p className="h-100">Loading products...</p>
        ) : categoryProducts && categoryProducts.length > 0 ? (
          <ProductSlider items={categoryProducts} />
        ) : (
          <p className="text-gray-500 mt-4">
            No products found for this category.
          </p>
        )}
</div>
        {/* ====== Products Section ====== */}
    
      </div>
    </section>
  );
}
