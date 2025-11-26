import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/Slices/cartSlice";
import { removeFromWishlist, clearWishlist } from "../../redux/Slices/wishlistSlice";
import toast from "react-hot-toast";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success("Added to cart!");
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast("Removed from wishlist 🖤");
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Your wishlist is empty 💔
      </p>
    );
  }

  return (
    <section className="py-10 container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Wishlist</h2>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl shadow-sm bg-white p-4 flex flex-col items-center text-center hover:shadow-md transition"
          >
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-[150px] h-[150px] object-cover mb-3 rounded-lg"
            />
            <h5 >{product.name}</h5>
            <p className="text-gray-600 mt-1">{product.price} EGP</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#ff6347] text-white !px-4 !rounded-md hover:bg-[#e5543f] !text-sm"
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleRemove(product._id)}
                className="bg-gray-200 text-gray-700 px-3 py-2 !rounded-md hover:bg-gray-300 !text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
