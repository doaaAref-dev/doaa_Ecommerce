import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FcGoogle } from "react-icons/fc";
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../../../Client/redux/Slices/AuthSlice';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Sign_In() {
const dispatch =useDispatch();
const { user } = useSelector((state) => state.auth);
 const navigate = useNavigate();
const [form,setform]=useState({email:"",password:"",})
     const [showPassword, setShowPassword] = React.useState(false);
const handleChange=(e)=>{
  setform({...form,[e.target.name]:e.target.value})
}
const handelSubmit=(e)=>{
e.preventDefault()
console.log(form);

dispatch(loginUser(form))

}

 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

 useEffect(() => {
  if (!user?.role) return;

  if (user.role === "admin") navigate("/admin");
  else navigate("/");
}, [user, navigate]);


    return (
        <section className='py-10 mb-4'>

            <div className='container '>
                <div className='shadow-lg rounded-lg bg-white w-[500px] m-auto p-4'>
                    <h3>Login To Your Acount</h3>
                    <form action="" className='w-full ' onSubmit={handelSubmit}>


                        <TextField id="Email" label="Email" variant="standard" className='w-full' onChange={handleChange}name="email"  />
                         <FormControl  variant="standard" className='w-full mt-4'>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
         <Input
         onChange={handleChange}
          className='w-full
          '
           name="password"  
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
                         </FormControl>
                     
       <button className='bg-[#ff6347] p-2 mt-4 rounded-2 w-full text-white '> SIGN IN</button>
              <button className='border-1  p-2 mt-4 rounded-2 w-full flex items-center gap-3 justify-center '>  <FcGoogle />

SIGN IN WITH GOOGLE</button>

                    </form>
                    <div className='flex items-center mt-4 gap-4'>
                    <p >Forget Passoword <Link className='!text-[#368da7]'>Click Here</Link></p>
<p>Don't have an account? <Link className='!text-[#368da7]' to={"/SignUp"}>Sign Up</Link></p>
                    </div>
                </div>

            </div>
            
        </section>
        
    )
}


