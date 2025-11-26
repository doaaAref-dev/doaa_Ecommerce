import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQty, decrementQty, updateQty } from "../../redux/Slices/cartSlice";

export default function Quantity({ value = 1, onChange, productId }) {
  const dispatch = useDispatch();
  const [localQty, setLocalQty] = useState(value);

  const handleChange = (e) => {
    const newQty = Math.max(1, Number(e.target.value) || 1);
    setLocalQty(newQty);

    if (onChange) {
      // الحالة الأولى: مستخدم في صفحة المنتج
      onChange(newQty);
    } else if (productId) {
      // الحالة الثانية: مستخدم في الكارت
      dispatch(updateQty({ productId, qty: newQty }));
    }
  };

  const handleIncrease = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    if (onChange) onChange(newQty);
    else if (productId) dispatch(incrementQty(productId));
  };

  const handleDecrease = () => {
    const newQty = localQty > 1 ? localQty - 1 : 1;
    setLocalQty(newQty);
    if (onChange) onChange(newQty);
    else if (productId) dispatch(decrementQty(productId));
  };

  return (
    <div className="flex items-center border border-[rgba(0,0,0,0.3)] rounded-md w-[80px] justify-between">
      <button
        onClick={handleDecrease}
        className="px-2 text-lg font-bold hover:bg-gray-200"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        value={localQty}
        onChange={handleChange}
        className="text-center w-[35px] outline-none border-none bg-transparent"
      />
      <button
        onClick={handleIncrease}
        className="px-2 text-lg font-bold hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
