//DashTables
import React from "react";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import api from '../../../api/axios'; // أو المسار اللي فيه إعداد axios

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { IoTrendingDownSharp } from "react-icons/io5";
import { IoTrendingUpOutline } from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PiCoffee } from "react-icons/pi";
import Searchbox from "../../../Client/Component/Header/Searchbox";








export function DahTables({ columns, rows, title,setOrders }) {


  const [openRows, setOpenRows] = React.useState({});
  const handleToggleRow = (rowId) => {
    setOpenRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  return (

    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>

      {/* Title */}
      <h4 style={{ marginBottom: "16px" }}>{title}</h4>
      {
        title === 'All Product' ?

          <div className="flex items-center gap-3 py-3">
            <PiCoffee size={30} />

            <p className="text-[14px] text-[rgba(0,0,0,0.5)] !mb-0">Tip search by Product ID: Each product is provided with a unique ID, which you can rely on to find the exact product you need.</p>
          </div>
          : null
      }

      {title === 'All Product' || title === 'All Categories' ?
        <div className="flex justify-around items-center w-full">
          <div className="w-[30%]">

            <TablePagination

              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <div className="w-[40%]">
            <Searchbox placeholder={'Search Here'} />

          </div>
          <div className="w-[20%]">
            <button className="border-2 border-green-500 rounded-1 text-green-500 px-3 py-2  hover:bg-green-500 hover:text-white hover:border-transparent transition w-full">
              + Add New
            </button>
          </div>


        </div>
        : null
      }



      {columns.map((column) => {



        if (column.id === "Country") {
          return (
            <div className="flex items-center gap-3">
              <span className="font-bold">$37,802</span> <IoTrendingUpOutline color="green" size={20} /><span className="font-bold text-[rgba(0,0,0,0.5)] flex items-center gap-1">1.5% <span className=" text-[rgba(0,0,0,0.3)] text-[12px]">since last weekend</span></span>

            </div>
          );
        }

      })}








      {/* Table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <React.Fragment key={row.id || rowIndex}>
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {title === "All Categories" && (

                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleToggleRow(row.id || rowIndex)}
                      >
                        {openRows[row.id || rowIndex] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>

                    )}
                    {columns.map((column) => {
                      const value = row[column.id];

                      // 🟢 شرط خاص لعمود Product: صورة + اسم
                      if (column.id === "product" || column.id === "Country" || column.id === "Name" || column.id === "User") {
                        console.log("IMAGE for row:", row.image);

                        console.log("row full >>>", row);

                        return (
                          <TableCell key={column.id} align={column.align || "center"} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Box >
                              {row.image && typeof row.image === "string" && (
                                <img
                                  src={row.image?.trim()}
                                  alt={row.product}
                                  style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                                />
                              )}

                            </Box>
                            <Box>

                              <Typography variant="body2">{row.product || row.Country || row.User}</Typography>
                            </Box>
                          </TableCell>
                        );
                      }

                      if (column.id === "image") {
                        console.log("row.image >>>", row.image);

                        return (
                          <TableCell key={column.id} align={column.align || "center"} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Box >
                              <img src={row.image} alt={row.name} className="w-[50px] h-[50px] rounded-full" />

                            </Box>

                          </TableCell>
                        );
                      }

                      if (column.id === "Slide_image" || column.id === "Blog_image") {
                        return (
                          <TableCell key={column.id} align={column.align || "center"} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Box >
                              <img src={row.image} alt={row.product} className="w-[200px] h-[50px] rounded-2" />

                            </Box>

                          </TableCell>
                        );
                      }



if (column.id === "Status") {
  // ألوان لكل حالة
  const statusColors = {
    pending: { color: "#ff9800", bg: "#fff4e5" },
    processing: { color: "#3b82f6", bg: "#eff6ff" },
    shipped: { color: "#3b82f6", bg: "#e0f2fe" },
    completed: { color: "#22c55e", bg: "#f0fdf4" },
    cancelled: { color: "#ef4444", bg: "#fff1f0" },
    default: { color: "#6b7280", bg: "#f3f4f6" },
  };

  // الانتقالات المسموح بها
  const allowedTransitions = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["completed"],
    completed: [],
    cancelled: [],
  };

  const currentStatus = row.status || "pending";

  // دالة التعامل مع تغيير الحالة
  const handleChange = async (e, row) => {
    const newStatus = e.target.value;

    if (!allowedTransitions[row.status]?.includes(newStatus)) {
      alert(`Cannot change status from ${row.status} to ${newStatus}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.patch(`/orders/${row._id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders((prev) =>
        prev.map((o) => (o._id === row._id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <TableCell key={column.id} align="right">
      <select
        value={currentStatus}
        onChange={(e) => handleChange(e, row)}
        style={{
          color: statusColors[currentStatus]?.color || statusColors.default.color,
          backgroundColor: statusColors[currentStatus]?.bg || statusColors.default.bg,
          fontWeight: "bold",
          padding: "4px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
        }}
      >
        {["pending", "processing", "shipped", "completed", "cancelled"].map((status) => (
          <option
            key={status}
            value={status}
            disabled={!allowedTransitions[row.status]?.includes(status) && row.status !== status}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </TableCell>
  );
}



                      if (column.id === "Trending") {
                        return (
                          <TableCell key={column.id} align="center">
                            {row.Trending === "UP" ? (
                              <IoTrendingUpOutline color="green" size={20} />
                            ) : (
                              <IoTrendingDownSharp color="red" size={20} />
                            )}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align || "center"}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value

                          }

                        </TableCell>

                      );
                    })}

                  </TableRow>



              {title === "All Categories" && (
  <TableRow>
    <TableCell
      style={{ paddingBottom: 0, paddingTop: 0 }}
      colSpan={columns.length + 1}
    >
      <Collapse in={openRows[row.id || rowIndex]} timeout="auto" unmountOnExit>
        <Box margin={2}>
          <Typography variant="subtitle1">Sub Categories:</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.subCategories?.map((sub, i) => (
                <TableRow key={i}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.Action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
)}

                </React.Fragment>
              ))}

          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination

        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

/////////////////////////////////////////////////////


const data = [
  { name: "Jan", Revenue: 2400, Profit: 2000 },
  { name: "Feb", Revenue: 3200, Profit: 2500 },
  { name: "Mar", Revenue: 1400, Profit: 1000 },
  { name: "Apr", Revenue: 2100, Profit: 1500 },
  { name: "May", Revenue: 4000, Profit: 3500 },
  { name: "Jun", Revenue: 3100, Profit: 2600 },
  { name: "Jul", Revenue: 1200, Profit: 900 },
  { name: "Aug", Revenue: 2200, Profit: 1700 },
];

export function EarningsChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-[100%] ">
      <h2 className="text-xl font-semibold mb-4">Earnings</h2>
      <div className="flex gap-8 mb-6">
        <div>
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">$37,802</p>
          <span className="text-green-500 text-sm">▲ 0.56%</span>
        </div>
        <div>
          <p className="text-gray-500">Profit</p>
          <p className="text-2xl font-bold">$28,305</p>
          <span className="text-green-500 text-sm">▲ 0.56%</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Revenue" fill="#2563eb" barSize={30} />
          <Bar dataKey="Profit" fill="#60a5fa" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
