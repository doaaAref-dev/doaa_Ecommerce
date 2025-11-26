import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Info } from "../../Component/CartDr";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, totalPrice, totalQty } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      shippingInfo: formData,
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
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("✅ Order placed successfully!");
      dispatch(clearCart());
      navigate("/orders"); // أو صفحة نجاح الدفع
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <section className="py-10 bg-[#dcd0d0]">
      <div className="container flex gap-4 py-4">
        {/* ================= LEFT SIDE (FORM) ================= */}
        <div className="LeftSide w-[70%]">
          <div className="Card bg-white p-4 shadow-md w-full">
            <h1 className="text-2xl font-bold mb-3">Billing Details</h1>
            <form onSubmit={handlePlaceOrder} className="w-full flex flex-col">
              <div className="flex items-center gap-3 w-full mb-2">
                <div className="w-[50%]">
                  <TextField
                    name="fullName"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>

              <h6>Street Address*</h6>
              <div className="w-[100%] mb-3">
                <TextField
                  name="address"
                  label="House Number And Street Name"
                  value={formData.address}
                  onChange={handleChange}
                  variant="outlined"
                  className="w-full"
                />
              </div>

              <div className="w-[100%] mb-3">
                <TextField
                  name="apartment"
                  label="Apartment No, Floor No (Optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                  variant="outlined"
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3 w-full mb-2">
                <div className="w-[50%]">
                  <TextField
                    name="city"
                    label="Town / City"
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    name="state"
                    label="State / Country"
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>

              <h6>Postcode / ZIP*</h6>
              <div className="w-[100%] mb-3">
                <TextField
                  name="zip"
                  label="ZIP Code"
                  value={formData.zip}
                  onChange={handleChange}
                  variant="outlined"
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3 w-full mb-2">
                <div className="w-[50%]">
                  <TextField
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="p-3 bg-[#ff6347] rounded-2 text-white !text-[25px] font-600 m-4"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>

        {/* ================= RIGHT SIDE (SUMMARY) ================= */}
        <div className="RightSide w-[30%]">
          <div className="Card bg-white p-4 shadow-md w-full">
            <h6 className="font-semibold text-lg mb-2">YOUR ORDER</h6>
            <div className="flex items-center justify-between ">
              <span>Product</span>
            </div>
            <div>
              <Info
                imgSize={"w-[120px] h-[120px]"}
                style={"flex flex-col gap-[10px]"}
                Font={"text-[13px]"}
              />
              <div>
                <div className="flex items-center justify-between my-4">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {totalPrice.toFixed(2)} EGP
                  </span>
                </div>
                <div className="flex items-center justify-between my-4">
                  <span>Delivery</span>
                  <span className="font-bold">75.00 EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
