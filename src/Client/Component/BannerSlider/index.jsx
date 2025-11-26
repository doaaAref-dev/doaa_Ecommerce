import React from 'react'
import Slider from 'react-slick';
import BannerBox from '../BannerBox';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules'
export default function BannerSlider({ items, images }) {
console.log(images);

    return (
   <div className="w-full py-10">
  <Swiper
    navigation={true}
    slidesPerGroup={1}
    spaceBetween={50}
    modules={[Navigation]}
    className="mySwiper2"
    breakpoints={{
      320: { slidesPerView: 1, spaceBetween: 10 },   // هواتف صغيرة
      480: { slidesPerView: 1, spaceBetween: 20 },   // هواتف كبيرة
      768: { slidesPerView: 2, spaceBetween: 30 },   // تابلت
      1024: { slidesPerView: 3, spaceBetween: 40 },  // لابتوب
      1280: { slidesPerView: items, spaceBetween: 50 } // ديسكتوب كبير
    }}
  >
    {images?.map((img, index) => (
      <SwiperSlide key={index}>
        <BannerBox img={img} />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    )
}
