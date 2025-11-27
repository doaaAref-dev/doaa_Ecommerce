import HomeBanner from "../../Component/HeaderSlider";
import HomeCat from "../../Component/HomeCat";
import BannerSlider from "../../Component/BannerSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { BsWallet2 } from "react-icons/bs";
import { PiGiftThin } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import im1 from '../../../assets/images/banner1.png';
import im2 from '../../../assets/images/banner2.png';
import im3 from '../../../assets/images/banner3.png';
import im4 from '../../../assets/images/banner4.png';



import slide1 from '../../../assets/images/slide1.png'
import slide2 from '../../../assets/images/slide2.png'
import slide3 from '../../../assets/images/slide3.png'
import slide4 from '../../../assets/images/slide4.png'
import img9 from '../../../assets/images/tv.png'
import img10 from '../../../assets/images/iphon.png'
import img11 from '../../../assets/images/redmi.png'
import img12 from '../../../assets/images/lg.png'
import PopularProduct from "../../Component/PopularProduct"
import LatestProduct from "../../Component/LatestProduct"
import Blogs from "../../Component/Blogs";
export default  function Home (){

return(
    <>
  

   <HomeBanner  />

  <HomeCat/>
<PopularProduct/>
  
  <section className="row mt-4 g-4">
  {/* Banner */}
  <div className="col-12 col-md-6">
    <HomeBanner />
  </div>

  {/* Images */}
  <div className="col-12 col-md-6 row g-4 mt-0">
    <div className="col-6 col-sm-6 col-12 gap-2">
      <img src={img9} alt="" className=" h-[200px] w-full "  />
    </div>
    <div className="col-6 col-sm-6 col-12">
      <img src={img10} alt="" className=" h-[200px] w-full " />
    </div>
    <div className="col-6 col-sm-6 col-12 mt-2">
      <img src={img11} alt="" className=" h-[200px] w-full "  />
    </div>
    <div className="col-6 col-sm-6 col-12  mt-2">
      <img src={img12} alt="" className=" h-[200px] w-full "  />
    </div>
  </div>
</section>
<br />
   <section className="mt-4 ">
 <BannerSlider items={4} images={[im1,im2,im3,im4]}/>
   </section>
<LatestProduct/>
  
<BannerSlider items={2}  images={[slide1,slide2,slide3,slide4]}/>
 <Blogs/>
 <section className='features p-6 bg-[#f5f5f5] h-[200px] flex items-center justify-center'>
     
<div className='container '>
<div className='flex items-center justify-between gap-2 mt-4'>

<div className='flex flex-col items-center justify-between gap-2 '>
  <LiaShippingFastSolid />
<h5 className='!text-[20px]'>
free shiping
</h5>
<p className='text-[rgba(0,0,0,0.5)]'>
  for all Order over $100
</p>
</div>
<div className='flex flex-col items-center justify-between gap-2'>
  <GiReturnArrow />
<h5>
30 day return
</h5>
<p className='text-[rgba(0,0,0,0.5)] text-[14px]'>For an Exchange Product</p>

</div>
<div className='flex flex-col items-center justify-between gap-2'>
  <BsWallet2 />
<h5>
secured payment
</h5>
<p className='text-[rgba(0,0,0,0.5)] text-[14px]'>Payment Cards Accepted</p>

</div>
<div className='flex flex-col items-center justify-between gap-2' >
  <PiGiftThin />
<h5>
special gifts
</h5>
 <p className='text-[rgba(0,0,0,0.5)] text-[14px]'>Our First Product Order</p>

</div>
<div className='flex flex-col items-center justify-between gap-2' >
  <BiSupport />
<h5>
support 24/7
</h5>
  <p className='text-[rgba(0,0,0,0.5)] text-[14px]'>Contact us Anytime</p>

</div>
  </div>
  
</div>
<hr className="m-0 text-[20px] "/>
 </section>







 
    </>
)

}