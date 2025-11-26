import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../Client/redux/Slices/categorySlice"; // تأكد من المسار
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function AddNewCat() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");
  const [chipData, setChipData] = useState([]);
  const [inputValue, setInputValue] = useState("");
const [image, setImage] = useState(null);

  // handle chips
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleAddChip = () => {
    if (inputValue.trim() === "") return;
    setChipData((chips) => [...chips, { key: Date.now(), label: inputValue.trim() }]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddChip();
    }
  };

  const handleUpload = (e) => {
  const file = e.target.files[0]; // صورة واحدة بس
  if (!file) return;

  setImage({
    url: URL.createObjectURL(file),
    file,
  });
};

const handleRemove = () => {
  setImage(null);
};

// handleSave
const handleSave = () => {
  const formData = new FormData();
  formData.append("name", categoryName);
  if (image) formData.append("image", image.file);
  formData.append("subCategories", JSON.stringify(chipData.map((chip) => chip.label)));
  formData.append("status", "active");

  dispatch(addCategory(formData)).then(() => {
    setCategoryName("");
    setChipData([]);
    setImage(null);
  });
};



  return (
    <div className="flex !pl-[270px] !pt-[100px] gap-3">
      <form
        className="w-full flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave("active");
        }}
      >
        <div className="w-[100%] shadow rounded-2 p-3">
          <div className="flex flex-col gap-3">
            {/* Category Name */}
            <TextField
              label="Category Name"
              variant="outlined"
              className="w-full"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {/* Images */}
            <div
              style={{
                border: "2px dashed #ccc",
                borderRadius: "10px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Category Media
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Photo Category
              </Typography>

             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
  {image && (
    <div style={{ position: "relative" }}>
      <img
        src={image.url}
        alt="category"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
      <button
        type="button"
        onClick={handleRemove}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          width: "24px",
          height: "24px",
        }}
      >
        ×
      </button>
    </div>
  )}

  {!image && (
    <label
      htmlFor="upload-image"
      style={{
        width: "120px",
        height: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #aaa",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#555",
        fontSize: "14px",
      }}
    >
      Upload Image
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />
    </label>
  )}
</div>

            </div>

            {/* Sub Categories */}
            <div>
              <div className="flex justify-between mb-3">
                <TextField
                  label="Add Sub Category"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton color="primary" onClick={handleAddChip}>
                  <AddIcon />
                </IconButton>
              </div>

              <Paper
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                  boxShadow: "none",
                }}
                component="ul"
              >
                {chipData.map((data) => (
                  <ListItem key={data.key}>
                    <Chip label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                ))}
              </Paper>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="py-1 px-2 border-1 border-[rgba(0,0,0,0.1)] rounded-2"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSave("draft")}
                  className="rounded-2 py-1 px-2 bg-[#0000000d]"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="rounded-2 py-1 px-2 bg-[#368da7] text-white"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
