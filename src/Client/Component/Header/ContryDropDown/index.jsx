import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";

import Dialog from '@mui/material/Dialog';
import Searchbox from '../Searchbox/index'
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

export default function CountryDropDown(){


    const [isOpenModal,setisOpenModal]=useState(false)
return(
    <>
        <Button className='country ' onClick={()=>{setisOpenModal(true)}}>
            <div className=' info d-flex flex-column  ' >
                <span className='label'> Your Location</span>
                <span className='name'>Egypt</span>
            </div>
            <span className='ml-auto'> <FaAngleDown/> </span>
        </Button>
        <Dialog open={isOpenModal} className='Location_modal ' onClose={()=>{setisOpenModal(false)}}>
            <h4>Choose Your Delivery Location</h4>
            <p>Enter Your Adress And We Will Specify The Offer For Your Area</p>
            
            <IoClose className='close' onClick={()=>{setisOpenModal(false)}} />

            <Searchbox placeholder='Search For Your Area'/>
            <ul className='country_list'>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Asuit</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Cairo</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Beni Suef</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Dakahlia:</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Sharqia:</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Alexandria</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Giza</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Qalyubia</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>sohag</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Alexandria</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Giza</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>Qalyubia</button></li>
                <li><button  onClick={()=>{setisOpenModal(false)}}>sohag</button></li>
            </ul>
        </Dialog>
    </>
)

}