import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductZoom from "../ProductZoom";
import Rating from "@mui/material/Rating";
import Quantity from "../QtyBox";
import { CiShoppingCart } from "react-icons/ci";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import ReviewDrawer from "../ReveiwDr";
import { fetchProductById, fetchProductsByCategory } from "../../redux/Slices/productSlice";
import Productslice from "../ProductSlider";
import { addToCart } from "../../redux/Slices/cartSlice"; // ✅ تعديل هنا
import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../redux/Slices/wishlistSlice";

export default function ProductInfo({ product: propProduct, related = false }) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, categoryProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user} = useSelector(
    (state) => state.auth
  );
  const [revOpen, setRevOpen] = useState(false);
  const [qty, setQty] = useState(1);
const { wishlistItems } = useSelector((state) => state.wishlist);

  // ✅ تحميل المنتج
  useEffect(() => {
    if (!propProduct && productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, propProduct]);

  const product = propProduct || singleProduct;
const isInWishlist =
  product && wishlistItems?.some((w) => w._id === product._id);


  // ✅ تحميل المنتجات المتعلقة
  useEffect(() => {
    if (related && product?.category) {
      dispatch(fetchProductsByCategory(product.category));
    }
  }, [dispatch, related, product?.category]);

  // ✅ إضافة إلى الكارت المحلي
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart!");
  };

  // ✅ إضافة إلى الـ wishlist
const handleWishlistToggle = () => {
  if (isInWishlist) {
    dispatch(removeFromWishlist(product._id));
    toast("Removed from wishlist 🖤");
  } else {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist 💖");
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <section className="bg-white p-5">
      <div className="container flex flex-col gap-10">
        {/* ===== تفاصيل المنتج ===== */}
        <div className="flex gap-8">
          <div className="ProductZoomContainer w-[40%]">
            <ProductZoom images={product.images} />
          </div>

          <div className="ContentContainer w-[60%]">
            <h1 className="text-[20px] text-[rgba(0,0,0,0.7)]">{product.name}</h1>

            <div className="flex gap-3 items-center">
              <span>Brand: {product.brand}</span>
              <Rating
                name="size-small"
                value={product.rating || 4}
                size="small"
                readOnly
              />
              <button onClick={() => setRevOpen(true)}>reviews</button>
<ReviewDrawer open={revOpen} onClose={() => setRevOpen(false)} product={product} />
            </div>

            <div className="flex items-center gap-4 mt-2">
              {product.discount > 0 ? (
                <>
                  <span className="line-through text-gray-400">${product.price}</span>
                  <span className="text-[tomato] font-bold">
                    ${product.price - (product.price * product.discount) / 100}
                  </span>
                </>
              ) : (
                <span className="text-[tomato] font-bold">${product.price}</span>
              )}
            </div>

            <span>
              Available In Stock:{" "}
              <span className="text-[tomato] font-bold">{product.countInStock}</span>
            </span>

            <p className="text-[rgba(0,0,0,0.6)] mt-4">{product.description}</p>

            <div className="flex items-center mt-4 mb-2 gap-3">
              
              <Quantity value={qty} onChange={setQty} />
              <button
                onClick={handleAddToCart}
                className="bg-[#ff6347] p-1 rounded-1 w-[160px] text-white flex gap-1"
              >
                <CiShoppingCart className="text-[22px]" /> Add To Cart
              </button>
            </div>

            <p className="text-[#368da7]">
              Free Shipping , Delivery Time 2-3 days
            </p>

            <div className="flex gap-4 mt-4">
              <span
                onClick={handleWishlistToggle}
                className="flex gap-2 items-center hover:text-[#ff6347] cursor-pointer"
              >
                <FaHandHoldingHeart /> Add To Wishlist
              </span>

              <span className="flex gap-2 items-center hover:text-[#ff6347] cursor-pointer">
                <IoIosGitCompare /> Add To Compare
              </span>
            </div>
          </div>
        </div>

        {/* ===== المنتجات المتعلقة ===== */}
        {related && categoryProducts?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-[22px] font-semibold mb-4">Related Products</h2>
            <Productslice
              items={categoryProducts.filter((item) => item._id !== product._id)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
