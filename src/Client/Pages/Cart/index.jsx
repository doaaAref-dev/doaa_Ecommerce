import React from "react";
import { useSelector } from "react-redux";
import Quantity from "../../Component/QtyBox";
import { Link, useNavigate } from "react-router-dom";
import ProductSlice from "../../Component/ProductSlider";

export default function MyCart() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user); // لو عندك auth slice
  const navigate = useNavigate();

  return (
    <div className="CartPage p-6">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>

      <div className="flex gap-6">
        <div className="flex-1">
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div>
                    <p>{item.name}</p>
                    <Quantity productId={item._id} value={item.qty} />
                  </div>
                </div>
                <span className="text-[#368da7] font-semibold">
                  {(item.price * item.qty).toFixed(2)} EGP
                </span>
              </div>
            ))
          )}
        </div>

        <div className="w-[350px] h-[250px] shadow-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} EGP</span>
            </div>
            <Link>Do you have a discount coupon?</Link>
          </div>
         <button
  onClick={() => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
    } else {
      navigate("/Checkout");
    }
  }}
  className="bg-[#368da7] p-2 rounded text-white"
>
  Proceed to checkout
</button>

        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl mb-3">Related Products</h2>
        <ProductSlice related={true} items={6} />
      </div>
    </div>
  );
}
