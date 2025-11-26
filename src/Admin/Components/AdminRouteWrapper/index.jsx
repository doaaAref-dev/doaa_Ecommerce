import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Header";
import SideBar from "../SideBar";
import Login from "../../../Client/Pages/Register/Sign_In";
import Sign_Up from "../../../Client/Pages/Register/Sign_UP";
import AdminDashboard from "../../Pages/Dashboard";
import ProductList from "../../Pages/ProductList";
import AddNewProduct from "../../Pages/AddNewProduct";
import AllCat from "../../Pages/AllCat";
import AddNewCat from "../../Pages/AddNewCat";
import AllOrders from "../../Pages/AllOrders";
import AllUsers from "../../Pages/AllUsers";
import AddUser from "../../Pages/AddNewUser";
import Home_Banner_List from "../../Pages/All_Home_Banner_Slide";
import AddNew_HomeSlide from "../../Pages/AddNew_HomeSlide";
import Banner1 from "../../Pages/Banner1";
import Banner2 from "../../Pages/Banner2";
import Add_Banner1 from "../../Pages/AddBanner1";
import Add_Banner2 from "../../Pages/AddBanner2";
import Blogs from "../../Pages/Blogs";
import Add_Blog from "../../Pages/AddBlogs";
import ManageLogo from "../../Pages/ManageLogo";

export default function AdminRouteWrapper() {


  return (
    <>
      <Header />
      <SideBar />

      <Routes>
        <Route path="/SignUp" element={<Sign_Up />} />
                <Route path="/Login" element={<Login />} />
  <Route index element={<AdminDashboard />} />
          <Route path="product/list" element={<ProductList />} />
        <Route path="product/add" element={<AddNewProduct />} />
       
  <Route path="products/edit/:id" element={<AddNewProduct />} />


        <Route path="category" element={<AllCat />} />
        <Route path="category/add" element={<AddNewCat />} />
        <Route path="AllOrders" element={<AllOrders />} />
        <Route path="AllUsers" element={<AllUsers />} />
        <Route path="AddUser" element={<AddUser />} />
        <Route path="Home_Banner_List" element={<Home_Banner_List />} />
        <Route path="AddNew_HomeSlide" element={<AddNew_HomeSlide />} />
        <Route path="Banner1" element={<Banner1 />} />
        <Route path="Banner2" element={<Banner2 />} />
        <Route path="Add_Banner1" element={<Add_Banner1 />} />
        <Route path="Add_Banner2" element={<Add_Banner2 />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="AddBlogs" element={<Add_Blog />} />
        <Route path="ManageLogo" element={<ManageLogo />} />
      </Routes>
    </>
  );
}
