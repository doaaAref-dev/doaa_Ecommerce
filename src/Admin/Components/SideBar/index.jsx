import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../assets/images/logo-removebg-preview (1).png';
import { RxDashboard } from "react-icons/rx";
import { IoImagesSharp } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineCategory, MdArrowDropDown } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { TbLetterB } from "react-icons/tb";
import { logout } from "../../../Client/redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IoIosLogOut } from "react-icons/io";

export default function SideBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const handleLogout = () => {
    dispatch(logout());        // يمسح التوكن من redux + localStorage
    navigate("/Login");        // يرجعك لصفحة اللوجين
  };

// console.log('openDropdown'+openDropdown)
  const toggleDropdown = (name) => {
   
    setOpenDropdown(prev => (prev === name ? null : name));
     
  };

const menuItems = [
  { name: 'Dashboard', icon: <RxDashboard />, path: '/admin' }, // /admin
  {
    name: 'Home Slides', icon: <IoImagesSharp />, subItems: [
      { name: 'Home Banner List', path: '/admin/Home_Banner_List' },
      { name: 'Add Home Banner Slide', path: '/admin/AddNew_HomeSlide' },
    ]
  },
  {
    name: 'Users', icon: <LuUsersRound />, subItems: [
      { name: 'All Users', path: '/admin/AllUsers' },
      { name: 'Add Users', path: '/admin/AddUser' },
    ]
  },
  {
    name: 'Product', icon: <TbBrandProducthunt />, subItems: [
      { name: 'Product List', path: '/admin/product/list' },
      { name: 'Add Product', path: '/admin/product/add' },
    ]
  },
  {
    name: 'Category', icon: <MdOutlineCategory />, subItems: [
      { name: 'All Categories', path: '/admin/category' },
      { name: 'Add Category', path: '/admin/category/add' }
    ]
  },
  { name: 'Orders', icon: <SlBasket />, path: '/admin/AllOrders' },
  // {
  //   name: 'Banners', icon: <IoImagesSharp />, subItems: [
  //     { name: 'Banner1', path: '/admin/Banner1' },
  //     { name: 'Add_Banner1', path: '/admin/Add_Banner1' },
  //     { name: 'Banner2', path: '/admin/Banner2' },
  //     { name: 'Add_Banner2', path: '/admin/Add_Banner2' }
  //   ]
  // },
  {
    name: 'Blogs', icon: <TbLetterB />, subItems: [
      { name: 'Blogs', path: '/admin/blogs' },
      { name: 'AddBlogs', path: '/admin/AddBlogs' }
    ]
  },
  // { name: 'Manage Logo', icon: <TbLetterB />, path: '/admin/ManageLogo' },
];




  return (
<div className="Dash_Sidebar fixed top-0 left-0 z-20 h-screen w-[240px] bg-[#fafafa] border-r border-gray-200 flex flex-col">

  {/* Logo */}
  <div className="h-[70px] px-6 flex items-center border-b border-gray-200">
    <img src={Logo} alt="logo" className="h-[40px] opacity-90" />
  </div>

  {/* Navigation */}
  <div className="flex-1 overflow-y-auto scrollbar-hide">
    <ul className="p-3 space-y-2">

      {menuItems.map((item) => (
        <li key={item.name} className="">

          {/* If item has subitems */}
          {item.subItems ? (
            <>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[18px]">{item.icon}</span>
                  {item.name}
                </span>

                <MdArrowDropDown
                  className={`transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown === item.name && (
                <ul className="mt-1 ml-3 space-y-1 border-l pl-3 border-gray-300">

                  {item.subItems.map((sub) => (
                    <li key={sub.name}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          `block text-sm py-1 transition-colors
                          ${
                            isActive
                              ? "text-white bg-[#368da7] px-2 rounded"
                              : "!text-[tomato] hover:!text-[#b83224]"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}

                </ul>
              )}
            </>

          ) : (
            /* Single Item */
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md
                ${isActive ? "bg-[#368da7] text-white" : "!text-gray-700 hover:!bg-gray-100"}`
              }
            >
              <span className="text-[18px]">{item.icon}</span>
              {item.name}
            </NavLink>
          )}

        </li>
      ))}

      {/* Logout */}
      <li className="pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <IoIosLogOut className="text-[18px]" />
          Logout
        </button>
      </li>

    </ul>
  </div>

</div>



  );
}
