import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Quantity from "../../Component/QtyBox";
import { Link, useNavigate } from "react-router-dom";
import ProductSlice from "../../Component/ProductSlider";
import axios from "axios";
import { clearCart } from "../../redux/Slices/cartSlice";

export default function MyCart() {
  const { items, totalPrice, totalQty } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user); // لو عندك auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        discount: item.discount || 0,
        total: item.qty * (item.price - (item.price * item.discount) / 100),
      })),
      totalQty,
      totalPrice,
      status: "pending",
      date: new Date(),
    };

    try {
       console.log("🟢 Sending orderData:", orderData);
  console.log("🟢 Token before request:", localStorage.getItem("token"));

      await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
       console.log("✅ Order response:", response.data);
      alert("Order placed successfully!");
      dispatch(clearCart());
      navigate("/orders"); // أو صفحة الشكر بعد الدفع
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

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
