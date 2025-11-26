import React from 'react'
import { Link } from 'react-router-dom';
export default function BannerBox(props) {
  
  return (
    <div  className='group rounded-lg overflow-hidden h-[200px]'>
        <Link to="/">
         <img src={props.img} alt='banner' className='w-full  group-hover:scale-105
         group-hover:rotate-1'/>
        </Link>
     
    </div>
  )
}
