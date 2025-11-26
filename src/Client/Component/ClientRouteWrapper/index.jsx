import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import ClientHeader from "../Header";
import Footer from "../Footer";

import Home from "../../Pages/Home";
// import ProductListing from "../../Pages/ProductListing";
import ProductDetails from "../../Pages/ProductDetails";
import Login from "../../Pages/Register/Sign_In";
import Sign_Up from "../../Pages/Register/Sign_UP";
import MyBag from "../../Pages/Cart";
import Checkout from "../../Pages/CheckOut";
import Profile from "../../Pages/Profile";
import MyOrders from "../../Pages/Orders";
import BlogDetails from "../../Pages/BlogDetails/BlogDetails";
import CategoryProducts from "../../Pages/CategoryProducts";
import SearchResults from "../../Pages/SearchResults";
import Blogs from "../Blogs";
import ContactUs from "../../Pages/ContactUs";
import AboutUs from "../../Pages/About";
function ClientRouteWrapper() {
 

  return (
    <>
      <ClientHeader />
      <Routes>
        {/* الصفحات العامة */}
        <Route path="/SignUp" element={<Sign_Up />} />
        <Route path="/Login" element={<Login />} />

        {/* الصفحات للـ User العادي */}
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/ProductListing" element={<ProductListing />} /> */}
        <Route path="/Card/:productId" element={<ProductDetails />} />
        <Route path="/Cart" element={<MyBag />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/subcategory/:name" element={<CategoryProducts />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/blog" element={ <Blogs/>
                } />
                

 <Route path="/contact" element={ <ContactUs/>} />
  <Route path="/about" element={ <AboutUs/>} />


      </Routes>
      <Footer />
    </>
  );
}

export default ClientRouteWrapper;
