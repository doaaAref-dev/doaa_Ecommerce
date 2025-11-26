import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../../../assets/images/logo-removebg-preview (1).png';
import { Link ,useNavigate} from 'react-router-dom';
import CountryDropDown from './ContryDropDown';
import Searchbox from './Searchbox';
import { FaUserAlt } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import {CartDrawer} from '../CartDr/index';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/Slices/categorySlice";
import { logout } from "../../../Client/redux/Slices/AuthSlice";

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hoveredCat, setHoveredCat] = useState(null); // الكاتيجوري اللي متحوفر عليها
  const dispatch = useDispatch();
const navigate = useNavigate();
  const { user} = useSelector((state) => state.auth);

  const { categories, loading } = useSelector((state) => state.category);

console.log(categories);

 const { items } = useSelector((state) => state.cart);
  const cartCount = items?.reduce((total, item) => total + item.qty, 0) || 0;
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const handleClickOutside = (e) => {
    if (!e.target.closest(".catwrapper")) {
      setOpenCat(false);
      setHoveredCat(null);
    }
  };

  useEffect(() => {
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const handleLogout = () => {
      dispatch(logout());        // يمسح التوكن من redux + localStorage
      navigate("/Login");        // يرجعك لصفحة اللوجين
    };

  return (
    <>
      <header className=" Header_wrapper">
        <div className="top-strip">
          <div className="container">
            <p className="text-center my-0"> the best way to get orders</p>
          </div>

        </div>
        <div className="header">
          <div className="container">
<div className="flex items-center justify-between w-full px-4 sm:px-8 py-2 gap-2">
  {/* Logo */}
  <div className="flex items-center">
    <Link to={'/'}>
      <img src={Logo} alt="Logo" className="h-10 sm:h-12 object-contain" />
    </Link>
  </div>

  {/* Country DropDown */}
  <div className="flex items-center">
    <CountryDropDown />
  </div>

  {/* SearchBox - يظهر على الديسكتوب فقط */}
  <div className="hidden sm:flex items-center flex-grow max-w-md">
    <Searchbox placeholder="Search For Your Product . . ." />
  </div>

  {/* Profile + Cart */}
  <div className="flex items-center gap-3">
    <div className="profile-wrapper relative inline-block">
      <button className="profile-button">
        <FaUserAlt />
      </button>
      <ul className="registerList shadow-lg">
        {user ? (
          <>
            <li><Link to={'/Profile'}>My Account</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to={'/Login'}>Login</Link></li>
            <li><Link to={'/SignUp'}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </div>

    <div className="cart-wrapper relative">
      <button className="cart-button relative" onClick={() => setOpen(true)}>
        {cartCount > 0 && (
          <span className="count absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <CiShoppingCart className="text-2xl" />
      </button>
    </div>

    <CartDrawer open={open} setOpen={setOpen} />
  </div>
</div>



          </div>
        </div>
      </header>
      <nav>
        <div className="container">
    <div className="flex items-center justify-between w-full px-4 sm:px-8 py-2 gap-2 ">

            <div className="all-categories hidden sm:flex flex-row items-center gap-2">
              <div className='catwrapper'>

                <button className='allcat_btn' >

                  <CiMenuFries />

                  <span className='text'>All Categories</span>
                  <MdKeyboardArrowDown />

                </button>
                    <div className='sidebar'>

                 <ul className="relative ">
                {categories?.map((cat) => (
                  <li
                    key={cat._id}
                    className="relative group"
                    onMouseEnter={() => setHoveredCat(cat._id)}
                    onMouseLeave={() => setHoveredCat(null)}
                  >
                    <div className="flex justify-between items-center  py-2 hover:bg-gray-100">
                      <button className="!text-left font-medium px-0"   onClick={() => navigate(`/category/${cat._id}`)}>
                        {cat.name}
                        
                      </button>
                      {cat.subCategories?.length > 0 && (
                        <IoIosArrowForward className="text-gray-500" />
                      )}
                    </div>

                    {/* المينيو الجانبية للسوب كاتيجوري */}
                    {hoveredCat === cat._id && cat.subCategories?.length > 0 && (
                      <div className="absolute top-0 left-full bg-white shadow-lg p-3 w-56  min-h-full">
                        {cat.subCategories.map((sub, idx) => (
                            <button className="block w-full text-left px-2 py-1 text-gray-600 hover:text-black hover:bg-gray-50 rounded"  onClick={() => navigate(`/category/${sub}`)}>
                              {sub}
                            </button>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>



                </div>
            
              </div>

            </div>
            <div className='navlist col-8  '>
              <ul className='list list-inline mt-3'>
                <li className='list-inline-item'>


                  <Link to='/'>
                    <GoHome />

                    Home</Link>

                </li>

              
                {/* <li className='list-inline-item'>
                  <Link to='/'>electronics</Link>
                  <div className='sub-menu shadow'>
                    <Link to='/'><button>clothing</button></Link>
                    <Link to='/'><button>watches</button></Link>
                    <Link to='/'> <button>footwear</button></Link>
                    <Link to='/'>  <button>sheos</button></Link>
                  </div>
                </li> */}

                
    {/* عرض باقي الكاتيجوريز ديناميكياً */}
  {categories
      ?.filter(cat => ["cat1"].includes(cat.name))
      .map((cat) => (
        <li key={cat._id} className='list-inline-item position-relative'>
          <Link to={`/category/${cat._id}`}>{cat.name}</Link>

          {cat.subCategories?.length > 0 && (
            <div className='sub-menu shadow'>
              {cat.subCategories.map((sub, idx) => (
                <Link to={`/products/${sub}`} key={idx}>
                  <button>{sub}</button>
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}

               
                <li className='list-inline-item'>
                  <Link to='/blog'>blog</Link>

                </li>
                <li className='list-inline-item'>
                  <Link to='/contact'>contact</Link>

                </li>
                <li className='list-inline-item'>
                  <Link to='/About'>about us</Link>

                </li>
              </ul>
            </div>
          </div>

        </div>


      </nav>
    </>
  )
}