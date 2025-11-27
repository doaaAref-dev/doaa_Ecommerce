import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../Client/redux/Slices/productSlice";
import { DahTables } from "../../Components/DashTables";

import { RiDeleteBinLine } from "react-icons/ri";
import { deleteProduct } from "../../../Client/redux/Slices/productSlice"; // تأكدي من المسار
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ProductList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null); // المنتج اللي هيتحذف

const confirmDelete = (product) => {
  setDeleteTarget(product);
  setDeleteDialogOpen(true);
};




  const ProductList_columns = [
    { id: "Name", label: "Name", minWidth: 150 },
    { id: "Product_ID", label: "Product ID", minWidth: 100 },
    { id: "Price", label: "Price", minWidth: 100, align: "right" },
    { id: "Quantity", label: "Quantity", minWidth: 100 },
    { id: "Sale", label: "Sale", minWidth: 100 },
    { id: "Stoke", label: "Stoke", minWidth: 70, align: "right" },
    { id: "Action", label: "Action", minWidth: 70, align: "right" },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const ProductList_rows = products.map((p) => ({
    product: p.name,
    image: p.images?.length
  ? p.images[0].startsWith("http")
    ? p.images[0]  // لو رابط كامل
    : `http://localhost:5000/${p.images[0]}` // لو path بس
  : "https://via.placeholder.com/100x100?text=No+Image",

    Product_ID: p._id,
    Price: `$${p.price}`,
    Quantity: p.countInStock || 0,
    Sale: p.discount ? `${p.discount}%` : "--/--",
    Stoke: p.countInStock > 0 ? "In Stock" : "Out of Stock",
       Action: (
          <div className="flex gap-3 items-center">
        {/* <button onClick={() => navigate(`/admin/products/edit/${p._id}`)}>
  <CiEdit size={18} color="#22c55e" />
</button> */}
   

<button onClick={() => confirmDelete(p)}>
  <RiDeleteBinLine size={18} color="#ff5200" />
</button>


          </div>
        ),
  }));

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="ProductList_Content !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <DahTables
        columns={ProductList_columns}
        rows={ProductList_rows}
        title="All Product"
      />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <Typography>
      Are you sure you want to delete this product: <b>{deleteTarget?.name}</b>?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
    <Button
      color="error"
      variant="contained"
      onClick={() => {
        if (deleteTarget) {
          const token = localStorage.getItem("token"); // أو من authSlice
          dispatch(deleteProduct({ productId: deleteTarget._id, token }));
        }
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}
