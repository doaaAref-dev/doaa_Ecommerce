import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetUserState } from "../../redux/Slices/AuthSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("كلمة السر الجديدة غير متطابقة");
      return;
    }

    dispatch(
      changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
    );
  };

  useEffect(() => {
    if (success) {
      alert("✅ تم تغيير كلمة المرور بنجاح");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setEditMode(false);
      dispatch(resetUserState());
    }
  }, [success, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start w-full max-w-md"
    >
      <TextField
        id="oldPassword"
        label="Old Password"
        type="password"
        className="w-[70%] m-3"
        value={formData.oldPassword}
        onChange={handleChange}
        InputProps={{ readOnly: !editMode }}
      />

      <TextField
        id="newPassword"
        label="New Password"
        type="password"
        className="w-[70%] m-3"
        value={formData.newPassword}
        onChange={handleChange}
        InputProps={{ readOnly: !editMode }}
      />

      <TextField
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        className="w-[70%] m-3"
        value={formData.confirmPassword}
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
            e.preventDefault();
            setEditMode(true);
          }}
        >
          Change Password
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

      {error && (
        <p className="text-red-500 mt-2 ml-3 text-sm">{error}</p>
      )}
    </form>
  );
}
