import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../Client/redux/Slices/blogSlice";
import { Button, TextField } from "@mui/material";
import Editor from "react-simple-wysiwyg";

export default function Add_Blog() {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleRemove = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", html);
    if (image) formData.append("image", image);
    formData.append("status", "published");

    dispatch(createBlog(formData));
    setTitle("");
    setHtml("");
    setImage(null);
  };

  return (
    <section className="py-10 mb-4 !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <div className="shadow-lg rounded-lg bg-white w-full m-auto !p-[70px] flex flex-col gap-3">
        <h3>Add Blog</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <h4>Title</h4>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              className="w-full"
            />
          </div>

          <div>
            <h4>Description</h4>
            <Editor value={html} onChange={(e) => setHtml(e.target.value)} />
          </div>

          <div>
            <h4>Image</h4>
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
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {image ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="user"
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
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="py-1 px-2 border-1 border-[rgba(0,0,0,0.1)] rounded-2"
              onClick={() => {
                setTitle("");
                setHtml("");
                setImage(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2 py-1 px-2 bg-[#368da7] text-white"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
