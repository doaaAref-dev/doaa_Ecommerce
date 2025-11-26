import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlides } from '../../redux/Slices/homeSliderSlice'; // عدّلي المسار حسب مكان السلايس عندك

export default function HomeBanner() {
  const dispatch = useDispatch();
  const { slides, loading, error } = useSelector((state) => state.homeSlider);
// console.log(slides);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
   
  };

  if (loading) {
    return <div className="text-center py-5 text-gray-500">Loading slides...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="homeBannerSection">
      <Slider {...settings}>
        {slides && slides.length > 0 ? (
          slides.map((slide) => (
            <div key={slide._id} className="relative">
              <img
               src={`http://localhost:5000${slide.imageUrl || slide.image}`}// غيّري المفتاح حسب الـ backend
                alt={slide.title || 'Slide'}
                className="w-full object-cover"
              />
              {/* لو حابة تضيفي عنوان فوق الصورة */}
              {slide.title && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-2xl font-bold">
                  {slide.title}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No slides found</div>
        )}
      </Slider>
    </div>
  );
}
