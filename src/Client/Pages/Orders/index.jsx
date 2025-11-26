import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import OrderItem from "../../Component/OrderItem";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/myorders"); // ✅ التوكن بيضاف تلقائي من interceptor
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setError("Failed to load orders. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-10">You have no orders yet.</p>;
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-[#ff6347]">My Orders</h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">
                  Order ID:{" "}
                  <span className="text-gray-600">{order._id.slice(-6)}</span>
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* منتجات الأوردر */}
              {/* <div className="flex flex-wrap gap-3">
                {order.items.map((item) => (
  <OrderItem key={item._id} item={item} />
))}
              </div> */}

              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <span className="text-gray-700">Total:</span>
                <span className="font-bold text-[#ff6347]">
                  {order.totalPrice.toFixed(2)} EGP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
