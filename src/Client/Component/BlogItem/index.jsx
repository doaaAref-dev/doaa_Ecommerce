import React from 'react'
import { CiTimer } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function BlogItem({ img, title, description, date, id }) {
  console.log("ggggggggggggggggggggg",img);
  
  return (
    <div className='Blog_Item group'>
      {/* الصورة */}
      <div className='img_wrapper overflow-hidden rounded-2 w-full relative'>
        <img
          className='w-full transition-all duration-300 group-hover:scale-105 group-hover:rotate-1'
         src={
    img
      ? img.startsWith("/uploads")
        ? `http://localhost:5000${img}`
        : img
      : "/default.jpg"
  }// في حالة مفيش صورة
          alt={title}
        />
      </div>

      {/* النصوص */}
      <div className='info_wrapper p-4'>
        <div className='flex gap-2 items-center mb-1'>
          <CiTimer />
          <p className='mb-0 text-[14px] text-[rgb(255,99,71)]'>
            {date || "—"}
          </p>
        </div>

        <h6 className='text-[14px] font-semibold mb-2'>
          {title?.length > 60 ? title.slice(0, 60) + "..." : title}
        </h6>

        <p className='text-[14px] text-[rgba(0,0,0,0.5)] mb-2'>
          {description?.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>

        <Link
          to={`/blog/${id}`} // صفحة التفاصيل حسب الـ id
          className='text-[rgb(255,99,71)] font-medium hover:underline'
        >
          Read more →
        </Link>
        
      </div>
    </div>
  );
}
