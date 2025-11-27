import React, { useState,useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  addTag,
  removeTag,
  addProduct,
} from "../../../Client/redux/Slices/productSlice"; // عدل المسار
import { fetchCategories } from "../../../Client/redux/Slices/categorySlice";
import {
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Colors = ["Black", "White", "Purple", "Green"];
const Size = ["Small", "Medium", "Large", "X Large"];

export default function AddNewProduct() {
  const dispatch = useDispatch();
  const {
    title,
    brand,
    description,
    price,
    discount,
    categoryId,
    colors,
    sizes,
    tags,
    loading,
     subcategoryId,
     Quantity,
countInStock
  } = useSelector((state) => state.products);
  
  const { categories,CatLoading} = useSelector((state) => state.category);
 

  // الصور فقط تبقى محلية
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Tags
  const handleAddChip = () => {
    if (inputValue.trim() === "") return;
    dispatch(addTag(inputValue.trim()));
    setInputValue("");
  };

  const handleDeleteChip = (chip) => {
    dispatch(removeTag(chip));
  };

  // Images
  const handleUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // حد أقصى 4 صور
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
 const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", title);
  formData.append("brand", brand);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("discount", discount);
  formData.append("categoryId", categoryId);
  // optional: add countInStock input if you have it; else default on backend
  formData.append("countInStock", countInStock);
  formData.append("Quantity", Quantity);

  // append arrays — use same key multiple times
  colors.forEach((c) => formData.append("colors", c));
  sizes.forEach((s) => formData.append("sizes", s));
  tags.forEach((t) => formData.append("tags", t));

  // images: use the same key 'images' for multer upload.array('images', ...)
  images.forEach((img) => formData.append("images", img));

  const token = localStorage.getItem("token"); // or from authSlice
  dispatch(addProduct({ formData, token }));
  console.log([...formData]);
};

 useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
const selectedCat = categories?.find((cat) => cat._id === categoryId);
  return (
    <div className="flex !pl-[270px] !pt-[100px] gap-3">
      <form className="w-full flex gap-3" onSubmit={handleSubmit}>
        {/* الشمال */}
        <div className="w-[65%] shadow rounded-2 p-3 flex-col gap-3">
          <h2>General Information</h2>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 ">
              <div className="w-[50%]">
                <TextField
                  label="Product Title"
                  variant="outlined"
                  className="w-full"
                  value={title}
                  onChange={(e) =>
                    dispatch(setField({ field: "title", value: e.target.value }))
                  }
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  label="Brand"
                  variant="outlined"
                  className="w-full"
                  value={brand}
                  onChange={(e) =>
                    dispatch(setField({ field: "brand", value: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <TextField
                label="Description"
                multiline
                rows={4}
                className="w-full"
                value={description}
                onChange={(e) =>
                  dispatch(
                    setField({ field: "description", value: e.target.value })
                  )
                }
              />
            </div>

            <div className="flex gap-3">
              <div className="w-[50%]">
                <TextField
                  label="Price"
                  variant="outlined"
                  className="w-full"
                  value={price}
                  onChange={(e) =>
                    dispatch(setField({ field: "price", value: e.target.value }))
                  }
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  label="Discount Percentage %"
                  variant="outlined"
                  className="w-full"
                  value={discount}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "discount", value: e.target.value })
                    )
                  }
                />
              </div>
            </div>
  <div className="flex gap-3">
              <div className="w-[50%]">
                <TextField
                  label="count InStock"
                  variant="outlined"
                  className="w-full"
                  value={countInStock}
                  onChange={(e) =>
                    dispatch(setField({ field: "countInStock", value: e.target.value }))
                  }
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  label="Quantity
"
                  variant="outlined"
                  className="w-full"
                  value={Quantity
}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "Quantity", value: e.target.value })
                    )
                  }
                />
              </div>
            </div>
            {/* Colors & Sizes */}
            <div className="flex gap-3 w-full">
              <div className="w-[50%]">
                <FormControl className="w-full">
                  <InputLabel>Color</InputLabel>
                  <Select
                    multiple
                    value={colors}
                    onChange={(e) =>
                      dispatch(setField({ field: "colors", value: e.target.value }))
                    }
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {Colors.map((Color) => (
                      <MenuItem key={Color} value={Color}>
                        <Checkbox checked={colors.includes(Color)} />
                        <ListItemText primary={Color} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-[50%]">
                <FormControl className="w-full">
                  <InputLabel>Size</InputLabel>
                  <Select
                    multiple
                    value={sizes}
                    onChange={(e) =>
                      dispatch(setField({ field: "sizes", value: e.target.value }))
                    }
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {Size.map((size) => (
                      <MenuItem key={size} value={size}>
                        <Checkbox checked={sizes.includes(size)} />
                        <ListItemText primary={size} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
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
                  className="rounded-2 py-1 px-2 bg-[#0000000d]"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2 py-1 px-2 bg-[#368da7] text-white"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* اليمين */}
        <div className="w-[35%] shadow rounded-2 p-3">
          <div className="flex flex-col gap-3">
            {/* Tags */}
            <div>
              <div className="flex justify-between mb-3">
                <TextField
                  label="Add Tag"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddChip();
                    }
                  }}
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
                {tags.map((data, index) => (
                  <ListItem key={index}>
                    <Chip
                      label={data}
                      onDelete={() => handleDeleteChip(data)}
                    />
                  </ListItem>
                ))}
              </Paper>
            </div>

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
                Product Media
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Photo Product
              </Typography>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {images.map((img, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="product"
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
                      onClick={() => handleRemove(index)}
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
                ))}

                {images.length < 4 && (
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
                    Add More Image
                    <input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Categories */}
    <div>
 {/* Category Dropdown */}
<Box sx={{ minWidth: 120, mb: 2 }}>
  <FormControl fullWidth>
    <InputLabel>Category</InputLabel>
    <Select
      value={categoryId || ""}
      onChange={(e) => {
        const selectedCatId = e.target.value;

        dispatch(setField({ field: "categoryId", value: selectedCatId }));

        // Reset subcategory on change
        dispatch(setField({ field: "subcategoryId", value: "" }));

        // Find subcategories of selected category
        const selectedCat = categories.find((c) => c._id === selectedCatId);

        dispatch(
          setField({
            field: "subcategories",
            value: selectedCat?.subcategories || [],
          })
        );
      }}
    >
      {categories?.map((cat) => (
        <MenuItem key={cat._id} value={cat._id}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* Subcategory Dropdown */}
{categoryId && (
  <Box sx={{ minWidth: 120, mt: 3 }}>
    <FormControl fullWidth>
      <InputLabel>Subcategory</InputLabel>
      <Select
        value={subcategoryId || ""}
        onChange={(e) =>
          dispatch(setField({ field: "subcategoryId", value: e.target.value }))
        }
      >
        {selectedCat && selectedCat.subCategories.length > 0 ? (
          selectedCat.subCategories.map((sub, index) => (
            <MenuItem key={index} value={sub}>
              {sub}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No subcategories available</MenuItem>
        )}
      </Select>
    </FormControl>
  </Box>
)}



</div>

          </div>
        </div>
      </form>
    </div>
  );
}
