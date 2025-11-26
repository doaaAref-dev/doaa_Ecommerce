import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { MdZoomOutMap } from "react-icons/md";
import { VscGitCompare } from "react-icons/vsc";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import QuikVeiw from "../QuikVeiw";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/Slices/wishlistSlice";
import toast from "react-hot-toast";
export default function ProductItem({ product}) {
  console.log("gggggg"+product);
  
  const [open, setOpen] = useState(false);
const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const img1 = product.images?.[0] || "/uploads/default.png";
  const img2 = product.images?.[2] 
  
  
  const discount = product.discount || 0;

  // احسبي السعر بعد الخصم إن وجد
  const discountedPrice = discount
    ? (product.price - (product.price * discount) / 100).toFixed(2)
    : product.price;


     const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast("Removed from wishlist 🖤");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist 💖");
    }
  };

  return (
    <div className="Product_Item shadow-sm rounded-md overflow-hidden mt-4 border-2 border-[rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-[tomato]">
      {/* ==== الصورة ==== */}
      <div className="img-wrapper w-full h-[150px] relative bg-gray-50 flex items-center justify-center group">
        <Link to={`/Card/${product._id}`}>
          <div className="relative h-[220px] overflow-hidden group">
            <img
              src={img1}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={img2}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:!opacity-100 group-hover:scale-150"
            />
          </div>
        </Link>

        {/* ==== الخصم ==== */}
        {discount > 0 && (
          <span className="absolute top-[10px] left-[10px] px-2 py-1 rounded-lg bg-[#ff6347] text-white text-xs font-semibold shadow-md">
            {discount}%
          </span>
        )}

        {/* ==== الأزرار ==== */}
        <div className="actions absolute top-[10px] right-[5px] flex flex-col gap-2 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
          <button
            className="bg-white p-2 rounded-full text-red-500 w-[34px] h-[34px] shadow hover:bg-[tomato] hover:text-white transition-colors duration-200"
            onClick={() => setOpen(true)}
          >
            <MdZoomOutMap className="text-lg" />
          </button>

<QuikVeiw open={open} setOpen={setOpen} product={product} />

         <button
        onClick={handleWishlistToggle}
        className={` bg-white p-2 rounded-full w-[34px] h-[34px] shadow hover:bg-[tomato] hover:text-white transition-colors duration-200 ${
          isInWishlist ? "text-[tomato]" : "text-gray-400"
        }`}
      >
        {isInWishlist ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
      </button>
          <button className="bg-white p-2 rounded-full text-red-500 w-[34px] h-[34px] shadow hover:bg-[tomato] hover:text-white transition-colors duration-200">
            <VscGitCompare className="text-lg" />
          </button>
        </div>
      </div>

      {/* ==== التفاصيل ==== */}
      <div className="info p-4 mt-2 h-[150px] flex flex-col justify-between">
        <h6 className="my-2 font-semibold text-gray-800 hover:text-[tomato] transition-colors duration-200">
          <Link className="link" to={`/product/${product._id}`}>
            {product.name}
          </Link>
        </h6>

        <Rating
          name="size-small"
          value={product.rating || 3}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-4 mt-2">
          {discount > 0 ? (
            <>
              <span className="line-through text-gray-400">${product.price}</span>
              <span className="text-[tomato] font-bold">${discountedPrice}</span>
            </>
          ) : (
            <span className="text-[tomato] font-bold">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
