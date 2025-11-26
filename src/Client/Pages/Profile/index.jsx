import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

import { CiShoppingBasket } from "react-icons/ci";
import { TbCancel, TbLockPassword } from "react-icons/tb";
import { MdPayment, MdOutlineReviews } from "react-icons/md";
import { BsBagHeart } from "react-icons/bs";
import { logout } from "../../redux/Slices/AuthSlice";
import PersonalInfo from "../../Component/PersonalInfo";
import Orders from "../Orders";
import Wishlist from "../../Component/Wishlist/index";
import ChangePassword from "../../Component/ChangePassword";
export default function Profile() {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("personalinfo");

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "personalinfo":
        return <PersonalInfo />;
      case "returns":
        return <p>Returns & Cancel Component</p>;
      case "reviews":
        return <p>Reviews Component</p>;
      case "wishlist":
        return   <Wishlist />;;
      case "payment":
        return <p>Payment Component</p>;
      case "password":
        return <ChangePassword />;
      default:
        return <p>Select an option</p>;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // رجوع لصفحة اللوجين
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        {/* Sidebar */}
        <div className="col1 bg-white shadow-md rounded-md w-[25%] h-[500px]">
          <div className="flex items-center gap-3 p-3">
          
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
            <button  onClick={() => setActiveTab("personalinfo")} >{loading ? "Loading..." : user?.name}</button>
          </div>
          <ul className="m-0 p-0">
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "orders" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <CiShoppingBasket /> My Orders
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "returns" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("returns")}
              >
                <TbCancel /> Returns/Cancel
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "reviews" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <MdOutlineReviews /> Rating/Reviews
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "wishlist" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                <BsBagHeart /> My Wishlist
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "payment" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("payment")}
              >
                <MdPayment /> Payment
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full border-b p-3 ${
                  activeTab === "password" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("password")}
              >
                <TbLockPassword /> Change Password
              </button>
            </li>
            <li>
               <button
        onClick={handleLogout}
        className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col2 bg-white shadow-md rounded-md w-[75%] h-auto p-4">
          <h2 className="mb-3">Welcome, {loading ? "..." : user?.name}</h2>
          <p>Email: {user?.email}</p>

          <div className="mt-5">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}
