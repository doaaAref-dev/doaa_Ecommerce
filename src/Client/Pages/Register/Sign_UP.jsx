import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/Slices/AuthSlice";

export default function Sign_Up() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    
    setForm({ ...form, [e.target.name]: e.target.value });
    
    
  };

  const handleSubmit = (e) => {


    e.preventDefault();
    
    dispatch(registerUser(form));
  };

  return (
    <section className='py-10 mb-4'>
      <div className='container'>
        <div className='shadow-lg rounded-lg bg-white w-[500px] m-auto p-4'>
          <h3>Create Your Account</h3>
          <form onSubmit={handleSubmit} className='w-full'>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={form.name}
              onChange={handleChange}
              className='w-full border p-2 mb-3'
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={handleChange}
              className='w-full border p-2 mb-3'
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              className='w-full border p-2 mb-3'
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className='w-full border p-2 mb-3'
            />

            {/* لو في Error من السيرفر */}
            {error && (
              <p className="text-red-500 mb-2">{error}</p>
            )}

           <button 
  type="submit" 
  className={`bg-[#ff6347] p-2 mt-4 rounded-2 w-full text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={loading}
>
  SIGN UP
</button>


            <button
              type="button"
              className='border-1 p-2 mt-4 rounded-2 w-full flex items-center gap-3 justify-center'
            >
              <FcGoogle /> SIGN UP WITH GOOGLE
            </button>
          </form>
          <div className='flex items-center mt-4 gap-4'>
            <p>
              Already have an account? 
              <Link to="/Login" className='!text-[#368da7]'> Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
