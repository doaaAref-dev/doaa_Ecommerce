import React, { useRef } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductZoom({ images = [] }) {
  const mainSwiperRef = useRef(null);

  const goto = (index) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  }

  // لو مفيش صور في الداتا، نحط صورة افتراضية
  const validImages = images.length > 0 ? images : ["/default.jpg"];

  return (
    <div className='flex gap-8'>
      {/* الصور الجانبية */}
      <div className='w-[15%] py-10 h-[500px] overflow-hidden'>
        <Swiper
          direction='vertical'
          slidesPerView={4}
          navigation={true}
          spaceBetween={20}
          slidesPerGroup={1}
          modules={[Navigation]}
          className='zoomslider h-[500px]'
        >
          {validImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className='item overflow-hidden cursor-pointer group'
                onClick={() => goto(index)}
              >
                <img
                  src={img.startsWith("http") ? img : `http://localhost:5000/${img}`}
                  alt=""
                  className='w-full transition-all group-hover:scale-105'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* الصورة الرئيسية */}
      <div className='zoomContainer w-[85%] h-[500px] overflow-hidden'>
        <Swiper
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          slidesPerView={1}
          navigation={false}
          spaceBetween={0}
        >
          {validImages.map((img, index) => (
            <SwiperSlide key={index}>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={img.startsWith("http") ? img : `http://localhost:5000/${img}`}
                alt={`Product image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
