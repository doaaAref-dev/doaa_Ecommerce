import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DahTables } from "../../Components/DashTables";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  fetchSlides,
  deleteSlide,
  updateSlide,
} from "../../../Client/redux/Slices/homeSliderSlice";; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function Home_Banner_List() {
  const dispatch = useDispatch();
  const { slides = [], loading } = useSelector((state) => state.homeSlider || {});

  const [openDelete, setOpenDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  const handleOpenDelete = (id) => {
    setToDeleteId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    if (toDeleteId) {
      dispatch(deleteSlide(toDeleteId));
    }
    setOpenDelete(false);
    setToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
    setToDeleteId(null);
  };

  const handleOpenEdit = (slide) => {
    setEditingSlide(slide);
    const imgUrl = slide.image
      ? slide.image.startsWith("http")
        ? slide.image
        : `http://localhost:5000${slide.image}`
      : null;
    setPreview(imgUrl);
    setNewFile(null);
    setOpenEdit(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    if (f) {
      setNewFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
    setEditingSlide(null);
    setPreview(null);
    setNewFile(null);
  };

  const handleSaveEdit = () => {
    if (!editingSlide) return;
    const formData = new FormData();
    if (newFile) {
      formData.append("image", newFile);
    } else {
    }

    dispatch(updateSlide({ id: editingSlide._id, formData }));
    setOpenEdit(false);
    setEditingSlide(null);
    setPreview(null);
    setNewFile(null);
  };

  const columns = [
    { id: "Slide_image", label: "Image", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  const rows =
    slides?.map((slide) => {
      const imageUrl = slide.image
        ? slide.image.startsWith("http")
          ? slide.image
          : `http://localhost:5000${slide.image}`
        : "https://via.placeholder.com/120x120?text=No+Image";

      return {
        id: slide._id,
        image: imageUrl,
        action: (
          <div className="flex gap-3 items-center">
            

            <button title="Edit" onClick={() => handleOpenEdit(slide)}>
              <CiEdit size={20} color="#368da7" />
            </button>

            <button title="Delete" onClick={() => handleOpenDelete(slide._id)}>
              <RiDeleteBinLine size={20} color="tomato" />
            </button>
          </div>
        ),
      };
    }) || [];

  return (
    <div className="ProductList_Content !pl-[300px] !py-[50px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <h2 className="text-xl font-semibold">Home Slider Banners</h2>

      <DahTables columns={columns} rows={rows} title="Home Slider Banners" loading={loading} />

      <Dialog open={openDelete} onClose={handleCancelDelete}>
        <DialogTitle> Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this image from the slider?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>  Edit Slide Image</DialogTitle>
        <DialogContent className="flex flex-col items-start gap-4 mt-2">
          <div style={{ width: "100%", display: "flex", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Preview</div>
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 6 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/160x100?text=No+Image";
                  }}
                />
              ) : (
                <div style={{ width: 160, height: 100, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>
                  No image
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "inline-block", marginBottom: 8, fontWeight: 600 }}>  Choose a new image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div style={{ marginTop: 8 }}>
                <Button variant="outlined" onClick={() => { setPreview(null); setNewFile(null); }}>
                 Clear Selection
                </Button>
              </div>
              <div style={{ marginTop: 12 }}>
                <small style={{ color: "#666" }}>If you do not choose a new image, the current image will be kept.</small>
              </div>
            </div>
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
