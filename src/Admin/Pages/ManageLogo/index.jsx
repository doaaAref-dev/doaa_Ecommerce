import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogo, uploadLogo, removeLogo, revertLogo } from "../../../Client/redux/Slices/logoSlice";

export default function ManageLogo() {
  const { url, loading } = useSelector((state) => state.logo);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchLogo());
  }, [dispatch]);

  function handleFile(f) {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result);
    reader.readAsDataURL(f);
  }

  function onFileChange(e) {
    handleFile(e.target.files?.[0]);
  }

  function onDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function handleUpload() {
    if (!file) return;
    await dispatch(uploadLogo(file));
    setFile(null);
    setPreviewSrc(null);
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Logo</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Current logo */}
        <div className="flex-1 p-4 border rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Current</h2>
          <div className="flex flex-col items-center gap-3">
            <div className="w-36 h-20 bg-gray-50 flex items-center justify-center overflow-hidden border rounded">
              {url? (
                <img src={`http://localhost:5000${url}`} alt="Current logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-sm text-gray-400">No logo</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Change</button>
              <button onClick={() => dispatch(removeLogo())} disabled={!url || loading} className="px-3 py-1 border rounded text-sm">Remove</button>
              <button onClick={() => dispatch(revertLogo())} disabled={loading} className="px-3 py-1 border rounded text-sm">Default</button>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="flex-1 p-4 border rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Upload</h2>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            {previewSrc ? (
              <div className="flex flex-col items-center gap-3">
                <img src={previewSrc} alt="Preview" className="max-h-36 object-contain" />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // fix هنا
                      handleUpload();
                    }}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Upload
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // fix هنا
                      setPreviewSrc(null);
                      setFile(null);
                    }}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Drop or click to select</span>
            )}
          </div>
        </div>
      </div>

      {loading && <div className="mt-4 text-sm text-gray-500">Processing...</div>}
    </div>
  );
}
