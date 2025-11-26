import React from "react";
import { LuBaggageClaim } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { IoTrendingDown } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";

// مكون صغير للشارت
const MiniChart = ({ color, height, data }) => {
  const series = [{ data }];

  const options = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth" },
    fill: { opacity: 0.3, colors: [color] },
    tooltip: {
      enabled: true,
      y: { formatter: (val) => `${val} units` },
    },
    colors: [color],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={height}
    />
  );
};

export default function DashBox() {
  const Charts = [
    {
      title: "Total Sales",
      number: "34,945",
      icon: <LuBaggageClaim />,
      percent: "1.56%",
      trend: "up",
      color: "green",
    },
    {
      title: "Total Income",
      number: "$37,802",
      icon: <GiReceiveMoney />,
      percent: "1.56%",
      trend: "down",
      color: "orange",
    },
    {
      title: "Orders Paid",
      number: "34,945",
      icon: <MdOutlineInsertDriveFile />,
      percent: "0.00%",
      trend: "neutral",
      color: "gray",
    },
    {
      title: "Total Visitor",
      number: "34,945",
      icon: <FaRegUser />,
      percent: "1.56%",
      trend: "up",
      color: "blue",
    },
  ];

  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6  ">
      {Charts.map((box, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col  h-auto  !m-0"
        >
          {/* الأعلى */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`icon p-3 rounded-xl  text-${box.color}-500 text-[26px]`}
              >
                {box.icon}
              </div>
              <div>
                <p className="text-gray-500 text-[16px]">{box.title}</p>
                <h6 className="text-[16px] ">{box.number}</h6>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {box.trend === "up" && (
                <IoIosTrendingUp className="text-green-500" />
              )}
              {box.trend === "down" && (
                <IoTrendingDown className="text-red-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  box.trend === "up"
                    ? "text-green-500"
                    : box.trend === "down"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {box.percent}
              </span>
            </div>
          </div>

          {/* الشارت */}
          <div className="mt-3 ">
            <MiniChart
  color={
    box.color === "green"
      ? "#22c55e"
      : box.color === "orange"
      ? "#f97316"
      : box.color === "blue"
      ? "#3b82f6"
      : "#9ca3af"
  }
  height={40}
  data={[100, 44, 20, 35, 40, 85]}
/>

          </div>
        </div>
      ))}
    </div>
  <div className="mt-5 bg-white shadow-md rounded-2xl p-4   "> 
<h3 className="mb-5">Recent Order</h3>
    <MiniChart height={200}   data={[100, 74,55, 50,77, 35, 40, 85]}/>
  </div>
    </>
 
  );
}
