import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestProducts } from "../../redux/Slices/productSlice";
import ProductSlider from "../ProductSlider";

export default function LatestProduct() {
  const dispatch = useDispatch();
const { latestProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchLatestProducts(8)); // مثلاً آخر 8 منتجات
  }, [dispatch]);

  if (loading) return <p> Loading... </p>;
  if (error) return <p>An error occurred {error}</p>;

  return (
    <div className="container">
<h3 className="text-[20px] font-semibold mb-1">Latest Products</h3>
 <ProductSlider items={latestProducts} />
    </div>
 
      
  );
}
