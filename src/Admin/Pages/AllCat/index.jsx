import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
} from "../../../Client/redux/Slices/categorySlice";

import { DahTables } from "../../Components/DashTables";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

export default function AllCat() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  // modal states
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [selectedSubMode, setSelectedSubMode] = useState(false);

  // form states
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [imageFile, setImageFile] = useState(null);
  const [subCats, setSubCats] = useState([]);
  const [newSubInput, setNewSubInput] = useState("");
  const [editingSubValue, setEditingSubValue] = useState("");

  // delete confirm modal states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: "category"|"sub", cat, idx? }

  // load categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (cat) => {
    setSelectedCat(cat);
    setSelectedSubMode(false);
    setSelectedSubIndex(null);
    setName(cat.name || "");
    setStatus(cat.status || "active");
    setImageFile(null);
    setSubCats(Array.isArray(cat.subCategories) ? [...cat.subCategories] : []);
    setNewSubInput("");
    setOpen(true);
  };

  const handleOpenEditSub = (cat, subIndex) => {
    setSelectedCat(cat);
    setSelectedSubMode(true);
    setSelectedSubIndex(subIndex);
    setEditingSubValue(cat.subCategories[subIndex] || "");
    setOpen(true);
  };

  const handleAddSub = () => {
    const val = newSubInput.trim();
    if (!val) return;
    setSubCats((prev) => [...prev, val]);
    setNewSubInput("");
  };

  const startInlineEditSub = (idx) => {
    setSelectedSubIndex(idx);
    setEditingSubValue(subCats[idx]);
  };

  const saveInlineEditSub = () => {
    if (selectedSubIndex === null) return;
    const arr = [...subCats];
    arr[selectedSubIndex] = editingSubValue.trim() || arr[selectedSubIndex];
    setSubCats(arr);
    setSelectedSubIndex(null);
    setEditingSubValue("");
  };

  const cancelInlineEditSub = () => {
    setSelectedSubIndex(null);
    setEditingSubValue("");
  };

  const handleRemoveSubInModal = (idx) => {
    setSubCats((prev) => prev.filter((_, i) => i !== idx));
  };

  // -------------------------
  // Delete sub (with confirm dialog)
  // -------------------------
  const confirmDeleteSub = (cat, idx) => {
    setDeleteTarget({ type: "sub", cat, idx });
    setDeleteDialogOpen(true);
  };

  const handleDeleteSub = (cat, idx) => {
    const updatedSubs = cat.subCategories.filter((_, i) => i !== idx);
    const formData = new FormData();
    formData.append("subCategories", JSON.stringify(updatedSubs));
    dispatch(updateCategory({ id: cat._id, formData }))
      .then(() => dispatch(fetchCategories()));
  };

  // -------------------------
  // Save edited category
  // -------------------------
  const handleSaveCategory = () => {
    if (!selectedCat) return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("subCategories", JSON.stringify(subCats));
    if (imageFile) formData.append("image", imageFile);

    dispatch(updateCategory({ id: selectedCat._id, formData }))
      .then(() => dispatch(fetchCategories()))
      .finally(() => {
        setOpen(false);
        setSelectedCat(null);
        setName("");
        setStatus("active");
        setImageFile(null);
        setSubCats([]);
      });
  };

  // -------------------------
  // Save edited single sub
  // -------------------------
  const handleSaveSubOnly = () => {
    if (!selectedCat || selectedSubIndex === null) return;
    const arr = Array.isArray(selectedCat.subCategories) ? [...selectedCat.subCategories] : [];
    arr[selectedSubIndex] = editingSubValue.trim();
    const formData = new FormData();
    formData.append("subCategories", JSON.stringify(arr));
    dispatch(updateCategory({ id: selectedCat._id, formData }))
      .then(() => dispatch(fetchCategories()))
      .finally(() => {
        setOpen(false);
        setSelectedCat(null);
        setSelectedSubIndex(null);
        setEditingSubValue("");
      });
  };

  // -------------------------
  // Delete whole category (with confirm dialog)
  // -------------------------
  const confirmDeleteCategory = (cat) => {
    setDeleteTarget({ type: "category", cat });
    setDeleteDialogOpen(true);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id)).then(() => dispatch(fetchCategories()));
  };

  const onImageChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    setImageFile(f);
  };

  const CategoryList_columns = [
    { id: "image", label: "Image", minWidth: 150, align: "left" },
    { id: "name", label: "Name", minWidth: 150, align: "left" },
    { id: "Action", label: "Action", minWidth: 150, align: "left" },
  ];

  const CategoryList_rows =
    categories?.map((cat) => ({
      id: cat._id,
      image: cat.image,
      name: cat.name,
      subCategories: (cat.subCategories || []).map((sub, idx) => ({
        name: sub,
        Action: (
          <div className="flex gap-3 items-center">
            <button onClick={() => handleOpenEditSub(cat, idx)}>
              <CiEdit size={18} color="#368da7" />
            </button>
            <button onClick={() => confirmDeleteSub(cat, idx)}>
              <RiDeleteBinLine size={18} color="tomato" />
            </button>
          </div>
        ),
      })),
      Action: (
        <div className="flex gap-3 items-center">
          <button onClick={() => handleEdit(cat)}>
            <CiEdit size={22} color="#368da7" />
          </button>
          <button onClick={() => confirmDeleteCategory(cat)}>
            <RiDeleteBinLine size={22} color="tomato" />
          </button>
        </div>
      ),
    })) || [];

  return (
    <div className="ProductList_Content !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <DahTables columns={CategoryList_columns} rows={CategoryList_rows} title="All Categories" />

      {/* Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedSubMode ? "Edit Sub Category" : "Edit Category"}</DialogTitle>

        <DialogContent className="flex flex-col gap-3 mt-3">
          {selectedSubMode ? (
            <TextField
              label="Sub Category Name"
              value={editingSubValue}
              onChange={(e) => setEditingSubValue(e.target.value)}
              fullWidth
            />
          ) : (
            <TextField
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          )}

          {!selectedSubMode && (
            <>
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Image
                </Typography>
                <input type="file" accept="image/*" onChange={onImageChange} />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Sub Categories</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                  {subCats.map((s, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {selectedSubIndex === idx ? (
                        <>
                          <TextField
                            size="small"
                            value={editingSubValue}
                            onChange={(e) => setEditingSubValue(e.target.value)}
                          />
                          <Button size="small" onClick={saveInlineEditSub}>
                            Save
                          </Button>
                          <Button size="small" onClick={cancelInlineEditSub}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typography sx={{ flex: 1 }}>{s}</Typography>
                          <IconButton size="small" onClick={() => startInlineEditSub(idx)}>
                            <CiEdit />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleRemoveSubInModal(idx)}>
                            <RiDeleteBinLine />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  ))}

                  {/* add new sub */}
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <TextField
                      size="small"
                      placeholder="New sub category"
                      value={newSubInput}
                      onChange={(e) => setNewSubInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSub();
                        }
                      }}
                    />
                    <Button size="small" onClick={handleAddSub}>
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setSelectedSubIndex(null);
              setSelectedSubMode(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedSubMode) handleSaveSubOnly();
              else handleSaveCategory();
            }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            {deleteTarget?.type === "category" ? "this category" : "this subcategory"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (deleteTarget?.type === "category") {
                handleDeleteCategory(deleteTarget.cat._id);
              } else if (deleteTarget?.type === "sub") {
                handleDeleteSub(deleteTarget.cat, deleteTarget.idx);
              }
              setDeleteDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
