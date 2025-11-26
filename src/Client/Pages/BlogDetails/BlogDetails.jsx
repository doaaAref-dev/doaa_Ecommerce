import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../../redux/Slices/blogSlice";
import { CiTimer } from "react-icons/ci";
import { CircularProgress } from "@mui/material";

export default function BlogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // نحاول نجيب المقال من الstate مباشرة قبل طلب السيرفر
  const blog = blogs.find((b) => b._id === id);

  useEffect(() => {
    if (!blog) {
      dispatch(fetchBlogById(id));
    }
  }, [id, blog, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <CircularProgress />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  if (!blog)
    return (
      <p className="text-center text-gray-500 py-10">
        المقال غير موجود أو تم حذفه
      </p>
    );

  return (
    <section className="container mx-auto py-10 px-4 md:px-10">
    

      {/* الصورة */}
      <div className="w-full h-[400px] overflow-hidden rounded-2xl shadow-lg mb-6">
        <img
          src={
            blog.image
              ? blog.image.startsWith("/uploads")
                ? `http://localhost:5000${blog.image}`
                : blog.image
              : "/default.jpg"
          }
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* العنوان والتاريخ */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {blog.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <CiTimer className="text-[tomato]" />
          <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>

        {/* المحتوى */}
        <div
          className="text-gray-700 leading-8 text-[17px]"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* فاصل أنيق */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} E-Shop Blog</p>
        </div>
      </div>
    </section>
  );
}
