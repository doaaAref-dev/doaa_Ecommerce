import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/Slices/AuthSlice";

export default function PersonalInfo() {
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);
  
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  console.log(editMode);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // أول ما user يتغير يتعمل setFormData
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  return (
    <section className="PersonalInfo py-10">
      <div className="m-3">
        <h4>Personal Information</h4>
        <img
          className="w-[70px] h-[70px]"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          className="w-[70%] m-3"
          value={formData.name}
          onChange={handleChange}
          InputProps={{ readOnly: !editMode }}
        />

        <TextField
          id="email"
          label="Email"
          className="w-[70%] m-3"
          value={formData.email}
          onChange={handleChange}
          InputProps={{ readOnly: !editMode }}
        />

        <TextField
          id="phone"
          label="Phone Number"
          className="w-[70%] m-3"
          value={formData.phone}
          onChange={handleChange}
          InputProps={{ readOnly: !editMode }}
        />

        {!editMode ? (
          <Button
            type="button" 
            variant="outlined"
            color="primary"
            className="m-3"
           onClick={(e) => {
    e.preventDefault(); // يمنع أي submit بالخطأ
    setEditMode(true);
  }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="success"
            className="m-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        )}
      </form>
    </section>
  );
}
