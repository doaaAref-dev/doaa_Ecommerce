import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DahTables } from "../../Components/DashTables";
import { fetchUsers, updateUser, deleteUser } from "../../../Client/redux/Slices/UsersSlice";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // فتح المودال مع البيانات
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // حفظ التعديلات
  const handleSave = () => {
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser._id, updates: selectedUser }));
    }
    setOpen(false);
  };

  // الحذف
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      dispatch(deleteUser(id));
    }
  };

  const AllUsers_columns = [
    { id: "User", label: "User", minWidth: 100 },
    { id: "Phone", label: "Phone", minWidth: 100 },
    { id: "Email", label: "Email", minWidth: 100 },
    { id: "Action", label: "Action", minWidth: 100 },
  ];

  const AllUsers_rows = list.map((u) => ({
    User: u.name,
    Phone: u.phone,
    Email: u.email,
    image: u.image
      ? u.image.startsWith("http")
        ? u.image
        : `http://localhost:5000${u.image}`
      : "https://via.placeholder.com/100x100?text=No+Image",
    Action: (
      <div className="flex gap-3 items-center">
        <button onClick={() => handleEditClick(u)}>
          <CiEdit size={25} color="#368da7" />
        </button>
        <button onClick={() => handleDelete(u._id)}>
          <RiDeleteBinLine size={25} color="tomato" />
        </button>
      </div>
    ),
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="!pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <DahTables columns={AllUsers_columns} rows={AllUsers_rows} />

      {/* مودال التعديل */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User Data</DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <TextField
            label="Name"
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <TextField
            label="Phone"
            value={selectedUser?.phone || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
