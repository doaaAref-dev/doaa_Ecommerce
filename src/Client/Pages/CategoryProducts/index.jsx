import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../Component/ProductItem/index";

import { useParams, useLocation } from "react-router-dom";
import { fetchProductsByCategory, fetchProductsBySub } from "../../redux/Slices/productSlice";

export default function CategoryProducts() {
  const { id, name } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { categoryProducts, loading } = useSelector((state) => state.products);

  // 🔹 fetch data حسب الـ route
  useEffect(() => {
    if (location.pathname.includes("/category/")) {
      dispatch(fetchProductsByCategory(id));
    } else if (location.pathname.includes("/subcategory/")) {
      dispatch(fetchProductsBySub(name));
    }
  }, [dispatch, id, name, location]);

  return (
    <div className="container mx-auto flex gap-6 py-8">
      {/* قائمة المنتجات */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {loading ? (
          <p>جاري التحميل...</p>
        ) : categoryProducts?.length > 0 ? (
          categoryProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
         <p>No products match these criteria</p>
        )}
      </div>
    </div>
  );
}
