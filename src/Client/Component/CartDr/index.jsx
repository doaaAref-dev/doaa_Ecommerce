import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { RiDeleteBin6Line } from "react-icons/ri";
import Quantity from '../QtyBox';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/Slices/cartSlice";
export function Info({
  imgSize,
  style,
  Qnt,
  customgap,
  Font,
  orders,
   // 🟢 بنستقبل المنتجات اللي في الكارت
}) {
    const { items, totalPrice, totalQty } = useSelector((state) => state.cart);
  
  const defaultStyle = "flex flex-col gap-[50px]";
  const defaultgap = "flex gap-3";
  const defaultImageSize = "w-[200px] h-[200px]";
  const defaultFont = "text-[16px]";

  // 🟡 لو الكارت فاضي
  if (!items.length)
    return (
      <p className="text-center mt-5 text-gray-500">
        Your cart is empty 🛒
      </p>
    );

  return (
    <div className="CartItems scrollbar overflow-y-auto h-[400px] overflow-x-hidden">
      {/* 🟢 نعرض المنتجات اللي في الكارت */}
      {items.map((item) => (
        <div
          key={item.product?._id || item._id}
          className="Item mt-4 border-b border-[rgba(0,0,0,0.12)] p-4 flex gap-2"
        >
          <img
            className={imgSize || defaultImageSize}
            src={item.product?.images?.[0] || "/placeholder.jpg"}
            alt={item.product?.name}
          />

          <div className={style || defaultStyle}>
            <div className="flex gap-3 items-center justify-between">
              <p className={Font || defaultFont}>{item.product?.name}</p>

              {/* 🗑️ أيقونة الحذف */}
              <RiDeleteBin6Line
                className="cursor-pointer text-red-500  text-[20px]"
                title="Remove from cart"
              />
            </div>

            <div className={`${customgap || defaultgap} items-center`}>
              <Quantity productId={item._id} value={item.qty} />

              <span className="text-[#368da7] font-semibold">
                  {totalPrice.toFixed(2)} EGP
                </span>

             
              {Qnt || null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}




export function CartDrawer({ open, setOpen }) {
  const { items ,totalPrice} = useSelector((state) => state.cart);
  items.map((item) => (console.log("kkkkkkkkkkkkkk"+item.qty)))
  
  
  const dispatch = useDispatch();


  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md bg-white shadow-xl py-6">
              <div className="px-4 sm:px-6">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
                <div className="flex items-center justify-between border-b pb-2">
                  <DialogTitle className="text-[20px] font-semibold text-gray-900">
                    Your Cart
                  </DialogTitle>
                  <span>
                    Total:{" "}
                    <span className="text-[#368da7] font-semibold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>

              <div className="CartWrapper relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto h-[400px]">
                {items.length === 0 ? (
                  <p className="text-center text-gray-500 mt-10">
                    Your cart is empty 🛍️
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 border-b py-3 items-center"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-[80px] h-[80px] object-cover"
                      />
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-[15px]">{item.name}</p>
                          <RiDeleteBin6Line
                            className="cursor-pointer text-red-500"
                            onClick={() => dispatch(clearCart(item._id))}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Quantity productId={item._id} value={item.qty} />
                          <span className="text-[#368da7] font-semibold">
                            ${item.price * item.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <div className="flex justify-between mt-4">
                  <Link
                    to="/Cart"
                    className="bg-[#ff6347] rounded w-[160px] text-center text-white py-2"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/Checkout"
                    className="bg-[#368da7] rounded w-[160px] text-center text-white py-2"
                  >
                    Checkout Now
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}


















// <div className='Item mt-4 border-b  border-[rgba(0,0,0,0.12)] p-4    items-center'>
          
//             <div className='m-3 flex gap-2 items-center'>
//  <button className=' bg-[#ff6347] rounded-5 w-[100px] p-1 text-white'>In Progress</button>| <span className='text-[14px]'>14-May-2025</span>

//             </div>
          
          
//           <div >
            
//             <div className='flex  gap-3' >
//              <img className='w-[100px] h-[100px]'
//             src="https://www.dresscodeme.com/wp-content/uploads/2024/03/Untitleddesign-2025-05-21T170434.21.jpeg" alt="" />

//          <div className='flex flex-col gap-2'>


//               {/* <RiDeleteBin6Line /> */}
//               <div className='flex gap-10'>
//  <p className={Font  defaultFont}>Lorem ipsum dolor sit ame. Sapiente.</p>
//                <p className='text-[#ff6347]'>Order ID : <span>#1823k84bakeh</span></p>
               
//          </div>
//              <div className={customgap  defaultgap +' items-center'}>
//               <span className={Font  defaultFont}>Quantity <span  className={`${Font  defaultFont} text-[#368da7] font-[600]`}  >1</span></span>
//               <span className={Font  defaultFont}>price <span  className={`${Font  defaultFont} text-[#368da7] font-[600]`} >$1000</span></span>
//               { Qnt||null}
             
//             </div>
//             </div>

//             </div>

          
          
//           </div>


//         </div>