import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DahTables } from "../../Components/DashTables";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  fetchBlogs,
  deleteBlog,
  updateBlog,
} from "../../../Client/redux/Slices/blogSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

export default function Blogs() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  // state للحذف
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // state للتعديل
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // فتح بوباب الحذف
  const handleOpenDelete = (id) => {
    setSelectedBlogId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBlog(selectedBlogId));
    setOpenDelete(false);
  };

  const handleCancelDelete = () => {
    setSelectedBlogId(null);
    setOpenDelete(false);
  };

  // فتح بوباب التعديل
  const handleOpenEdit = (blog) => {
    setSelectedBlogId(blog._id);
    setEditData({
      title: blog.title,
      description: blog.description,
      status: blog.status || "",
    });
    setEditImage(null);
    setOpenEdit(true);
  };

  // حفظ التعديل
  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    formData.append("status", editData.status);
    if (editImage) {
      formData.append("image", editImage);
    }

    dispatch(updateBlog({ id: selectedBlogId, formData }));
    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setSelectedBlogId(null);
    setOpenEdit(false);
  };

  const BlogList_columns = [
    { id: "image", label: "Image", minWidth: 150 },
    { id: "title", label: "TITLE", minWidth: 150 },
    { id: "description", label: "DESCRIPTION", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  const BlogList_rows =
    blogs?.map((blog) => ({
      id: blog._id,
      image: blog.image
        ? blog.image.startsWith("http")
          ? blog.image
          : `http://localhost:5000${blog.image}`
        : "https://via.placeholder.com/100x100?text=No+Image",
      title: blog.title,
      description:
        blog.description?.length > 100
          ? blog.description.slice(0, 100) + "..."
          : blog.description,
      action: (
        <div className="flex gap-3 items-center">
         
          <button onClick={() => handleOpenEdit(blog)}>
            <CiEdit size={22} color="#368da7" />
          </button>
          <button onClick={() => handleOpenDelete(blog._id)}>
            <RiDeleteBinLine size={22} color="tomato" />
          </button>
        </div>
      ),
    })) || [];

  return (
    <div className="ProductList_Content !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <DahTables
        columns={BlogList_columns}
        rows={BlogList_rows}
        title="All Blogs"
        loading={loading}
      />

      {/* Dialog حذف */}
      <Dialog open={openDelete} onClose={handleCancelDelete}>
        <DialogTitle> Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this blog</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog تعديل */}
      <Dialog open={openEdit} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Blog </DialogTitle>
        <DialogContent className="flex flex-col gap-3 mt-2">
          <TextField
            label="Title"
            fullWidth
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <TextField
            label="Status"
            fullWidth
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          />
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-medium">New Image (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files[0])}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
