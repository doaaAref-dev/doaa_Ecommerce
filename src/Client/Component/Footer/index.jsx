import React from 'react'

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineMessage } from "react-icons/ai";

import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";

import { FaPinterestP } from "react-icons/fa";

import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import img1 from '../../../assets/images/mastercard.png'
import img2 from '../../../assets/images/paypal.png'
import img3 from '../../../assets/images/visa.png'
export default function Footer() {
  return (

<>
<footer className=' p-4 bg-[#f5f5f5] border-top border-[rgba(0,0,0,0.3)]'>
    <div className=' contact flex  row'>
<div className='part col-4'>
<h4>Contact Us </h4>
<p className='p1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
  Placeat maxime quas provident voluptate<br/>
   recusandae quia.</p>
<Link >
company@ecomm.com
</Link>
<p className='!text-[#ff6347]' > 01143783446</p>
<div className='flex items-center gap-1'>
<AiOutlineMessage />
<span className='text-[20px] font-[500px]'>online chat</span>
</div>

</div>
<div className='part col-2'>
<h4>Products </h4>
<ul>
  <li>
<Link>Best Seller</Link>
  </li>
    <li>
<Link> Popular Product</Link>
  </li>
    <li>
<Link>New Product</Link>
  </li>
    <li>
<Link>Price Drop</Link>
  </li>
</ul>
</div>
<div className='part col-2'>
<h4>Our Company </h4>
<ul>
  <li>
<Link>Delivery</Link>
  </li>
    <li>
<Link> Legal Notice</Link>
  </li>
    <li>
<Link>Terms And Conditions Of Use</Link>
  </li>
    <li>
<Link>About Us</Link>
  </li>
      <li>
<Link>Secure Paymen</Link>
  </li>
</ul>
</div>
<div className='part !border-none col-4'>
<h4>Subscribe To Newsletter</h4>
<p className='p1'>

Subscribe to our latest newsletter to get news about special discounts.
</p>
<form>
<input type="email" name="email" placeholder="Your Email Address" required className='border outline-none focus-border-[rgba(0,0,0,0.3)]w-full h-[45px] px-4'></input>
<br></br>
<button className='bg-[#ff6347] p-2 !rounded-sm text-white m-2'>SUBSCRIBE</button>
 <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to the terms and conditions and the privacy policy" />
</form>

</div>
</div>



</footer>
<div className='bottomStrip border-t border-[rgba(0,0,0,0.3)] pt-2'>
<div className='container   d-flex  items-center  row'>
  <div className='col-4'>
<ul className=' social-list d-flex  items-center'>
  <li><Link to='/' target='_blank'><FaFacebook />
</Link></li>
  <li><Link to='/' target='_blank'><FaYoutube />

</Link></li>
  <li><Link to='/' target='_blank'><FaXTwitter />

</Link></li>
  <li><Link to='/' target='_blank'><FaInstagram />

</Link></li>
  <li><Link to='/' target='_blank'>< FaPinterestP/>
</Link></li>
</ul>
  </div>
  <div className='col-4 text-center'>
<p>2025 - Ecommerce React-Project</p>

  </div>
<div className='col-4 flex items-center !justify-around'>
<img src={img1} alt="" />
<img src={img2} alt="" />
<img src={img3} alt="" />
</div>
</div>
</div>
</>
  )
}
