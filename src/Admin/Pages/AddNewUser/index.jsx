import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormField,
  updatePermission,
  updateImage,
  resetForm,
  addUser,
} from "../../../Client/redux/Slices/UsersSlice";

import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

export default function AddUser() {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.users);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.image) formData.append("image", form.image);

    Object.keys(form.permissions).forEach((key) => {
      formData.append(`permissions[${key}]`, form.permissions[key]);
    });

    dispatch(addUser(formData));
    dispatch(resetForm());
  };

  return (
    <section className="py-10 mb-4 !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]">
      <div className="shadow-lg rounded-lg bg-white w-full m-auto !p-[70px]">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="w-full flex gap-5">
            <div className="w-[50%]">
              <TextField
                label="User Name"
                variant="standard"
                name="name"
                value={form.name}
                onChange={(e) =>
                  dispatch(updateFormField({ field: "name", value: e.target.value }))
                }
                className="w-full"
              />
              <TextField
                label="Email"
                variant="standard"
                name="email"
                value={form.email}
                onChange={(e) =>
                  dispatch(updateFormField({ field: "email", value: e.target.value }))
                }
                className="w-full"
              />
              <TextField
                label="Phone"
                variant="standard"
                name="phone"
                value={form.phone}
                onChange={(e) =>
                  dispatch(updateFormField({ field: "phone", value: e.target.value }))
                }
                className="w-full"
              />
              <TextField
                label="Create Password"
                variant="standard"
                type="password"
                name="password"
                value={form.password}
                onChange={(e) =>
                  dispatch(updateFormField({ field: "password", value: e.target.value }))
                }
                className="w-full"
              />
              <TextField
                label="Confirm Password"
                variant="standard"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) =>
                  dispatch(
                    updateFormField({ field: "confirmPassword", value: e.target.value })
                  )
                }
                className="w-full"
              />
            </div>

            {/* صورة المستخدم */}
            <div
              className="w-[50%]"
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
                User Photo
              </Typography>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {form.image ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(form.image)}
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
                      onClick={() => dispatch(updateImage(null))}
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
                      onChange={(e) => dispatch(updateImage(e.target.files[0]))}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* الصلاحيات */}
          <div>
            <h2>Permission</h2>
            <div className="flex justify-between my-3 flex-wrap gap-4">
              {[
                { key: "addProduct", label: "Add product" },
                { key: "updateProduct", label: "Update product" },
                { key: "deleteProduct", label: "Delete product" },
                { key: "applyDiscount", label: "Apply discount" },
              ].map((perm) => (
                <FormControl key={perm.key}>
                  <FormLabel>{perm.label}</FormLabel>
                  <RadioGroup
                    row
                    value={form.permissions[perm.key] ? "Allow" : "Deny"}
                    onChange={(e) =>
                      dispatch(
                        updatePermission({
                          key: perm.key,
                          value: e.target.value === "Allow",
                        })
                      )
                    }
                  >
                    <FormControlLabel value="Allow" control={<Radio />} label="Allow" />
                    <FormControlLabel value="Deny" control={<Radio />} label="Deny" />
                  </RadioGroup>
                </FormControl>
              ))}
            </div>
          </div>

          <Button variant="contained" type="submit" className="!bg-[#368da7]">
            Save User
          </Button>
        </form>
      </div>
    </section>
  );
}
