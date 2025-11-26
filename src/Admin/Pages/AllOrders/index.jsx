import React, { useEffect, useState } from "react";
import { DahTables } from "../../Components/DashTables";
import api from "../../../api/axios"; // أو المسار اللي فيه إعداد axios

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
console.log(orders);

  const Order_columns = [
    { id: "product", label: "Product", minWidth: 150 },
    { id: "Customer", label: "Customer", minWidth: 150 },
    { id: "Date", label: "Date", minWidth: 150 },
    { id: "category", label: "Category", minWidth: 150 },
    { id: "Product_ID", label: "Product ID", minWidth: 100 },
    { id: "Price", label: "Price", minWidth: 100, align: "right" },
    { id: "Quantity", label: "Quantity", minWidth: 100 },
    { id: "Status", label: "Status", minWidth: 70, align: "right" },
  ];

  // 🧠 2. اجلب البيانات من الـ backend
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // أو من Redux لو بتخزّنيه هناك
      const res = await api.get("/orders/all_order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    }
  };

  fetchOrders();
}, []);


  // 🧮 3. حضّري الـ rows بالشكل اللي الـ DahTables متوقعه
const Order_rows = orders.map((order) => ({
  _id: order._id,
  product: order.items?.[0]?.productId?.name || "N/A",
  category: order.items?.[0]?.productId?.category?.name || "N/A",
  image: order.items?.[0]?.productId?.images?.[0],
  Customer: order.userId?.name || "Unknown",
  Date: new Date(order.createdAt).toLocaleDateString(),
  Product_ID: order.items?.[0]?.productId?._id || order._id,
  Price: `${order.items?.[0]?.total || order.totalPrice || 0}$`,
  Quantity: order.items?.[0]?.qty || 1,
  status: order.status || "pending", // ✅ lowercase
}));


  return (
    <div className="ProductList_Content !pl-[350px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <DahTables columns={Order_columns} rows={Order_rows} setOrders={setOrders} title="All Orders" />
    </div>
  );
}
