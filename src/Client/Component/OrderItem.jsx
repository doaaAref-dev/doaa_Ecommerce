// src/Component/Orders/OrderItem.jsx
import React from "react";

export default function OrderItem({ item }) {
  const product = item;
  console.log(product);
  
  return (
    <div className="flex gap-3 border-b pb-3 items-center">
      <img
        
        alt={product.name}
        className="w-[90px] h-[90px] object-cover rounded-md"
      />
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
        <p className="text-[#368da7] font-semibold">
          {(product.price * item.qty).toFixed(2)} EGP
        </p>
      </div>
    </div>
  );
}
