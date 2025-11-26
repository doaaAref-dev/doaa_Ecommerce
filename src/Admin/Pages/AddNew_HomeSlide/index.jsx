import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSlide } from  "../../../Client/redux/Slices/homeSliderSlice";

export default function AddNew_HomeSlide() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    dispatch(addSlide(formData));

    setImage(null);
    setPreview(null);
  };

  return (
    <section className="py-10 mb-4 !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <div className="shadow-lg rounded-lg bg-white w-full m-auto !p-[70px]">
        <h3 className="text-lg font-semibold mb-4">Add Home Slide</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div
            className="w-[100%]"
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
              Slide Photo
            </Typography>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {preview ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={preview}
                    alt="slide"
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
              ) : (
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

          <div className="flex justify-between">
            <button
              type="button"
              className="py-1 px-3 border border-[rgba(0,0,0,0.1)] rounded"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded py-1 px-4 bg-[#368da7] text-white"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
