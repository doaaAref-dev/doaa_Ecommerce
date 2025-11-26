import React ,{useState} from 'react'

import { Button, Typography } from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
export default function Add_Banner2() {


const [image, setImages] = useState([]);

   const handleUpload = (e) => {
    const file = e.target.files[0]; // صورة واحدة فقط
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImages(newImage);
    }
  };

  const handleRemove = () => {
    setImages(null);
  };
  return (
    <section className='py-10 mb-4 !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]'>

        <div className='shadow-lg rounded-lg bg-white w-full m-auto !p-[70px]'>
          <h3>Add Home Slide</h3>
          <form action=""  className='flex flex-col gap-5'>
           

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
              src={image}
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
           

          



         <div className='flex justify-between'>
<div>    <button className='py-1 px-2 border-1  border-[rgba(0,0,0,0.1)] rounded-2 '>Cancel</button>
</div>
<div className='flex items-center gap-3'>

    <button className='rounded-2 py-1 px-2 bg-[#368da7]'>Publish</button>

</div>
    </div>
   

          </form>
         
        </div>


    </section>

  )
}


