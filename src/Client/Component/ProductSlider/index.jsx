import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ProductItem from '../ProductItem'

export default function Productslice({ items = [] }) {
console.log("items =>", items);

  
return (
  <div className="Productslider mb-4">
    <div className="container">
      <Swiper
        slidesPerGroup={1}
        navigation
        spaceBetween={20}
        modules={[Navigation]}
        className="mySwiper2"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },   // صغيرة جدًا
          480: { slidesPerView: 2, spaceBetween: 15 },   // هواتف
          768: { slidesPerView: 3, spaceBetween: 20 },   // تابلت
          1024: { slidesPerView: 4, spaceBetween: 20 },  // لابتوب
          1280: { slidesPerView: 4, spaceBetween: 20 },  // ديسكتوب كبير
        }}
      >
        {items.length > 0 ? (
          items.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center w-full py-10">No products found.</p>
        )}
      </Swiper>
    </div>
  </div>
);

}
