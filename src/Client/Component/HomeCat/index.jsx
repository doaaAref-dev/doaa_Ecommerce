
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/Slices/categorySlice";
export default function HomeCat() {
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();
const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
  return (
    <>
        <div className="homecatSection my-4">
            <div className="container">
                <Swiper
                    navigation={true}
                    spaceBetween={20} 
                    slidesPerGroup={1}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 }, 
                        480: { slidesPerView: 2, spaceBetween: 15 }, 
                        768: { slidesPerView: 3, spaceBetween: 20 }, 
                        1024: { slidesPerView: 4, spaceBetween: 30 }, 
                        1280: { slidesPerView: 5, spaceBetween: 60 }, 
                    }}
                >
                    {categories?.map((cat) => (
                        <SwiperSlide key={cat._id}>
                            <div
                                className="item flex items-center flex-col"
                                onClick={() => navigate(`/category/${cat._id}`)}
                            >
                                <img src={cat.image} alt={cat.name} />
                                <h5>{cat.name}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </>
);

}