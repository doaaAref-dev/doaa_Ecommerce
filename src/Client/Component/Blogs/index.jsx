import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import BlogItem from "../../Component/BlogItem"
import { fetchBlogs } from "../../redux/Slices/blogSlice"
import img9 from '../../../assets/images/tv.png'

export default function Blogs() {
  const dispatch = useDispatch()
  const { blogs, loading, error } = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  if (loading) return <p className="text-center py-4">Loading blogs</p>
  if (error) return <p className="text-center text-red-500"> An error occurred: {error}</p>

  return (
    <section className="Blogs py-4">
      <div className="container fluid">
        <h3 className="text-[25px] p-4 font-semibold">Our Blogs</h3>

        {blogs.length === 0 ? (
          <p className="text-center py-4"> No blogs available</p>
        ) : (
          <Swiper
            slidesPerView={4}
            navigation={true}
            spaceBetween={30}
            slidesPerGroup={1}
               breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 }, // صغيرة جدًا
                        480: { slidesPerView: 2, spaceBetween: 15 }, // هواتف
                        768: { slidesPerView: 3, spaceBetween: 20 }, // تابلت
                        1024: { slidesPerView: 4, spaceBetween: 30 }, // لابتوب
                        1280: { slidesPerView: 4, spaceBetween: 60 }, // ديسكتوب كبير
                    }}
            modules={[Navigation]}
            className='blogslider'
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
               

                <BlogItem
  key={blog._id}
  id={blog._id}
  img={blog.image || "/default.jpg"}
  title={blog.title}
  description={blog.description}
  date={new Date(blog.createdAt).toLocaleDateString()}
/>

              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
