import React from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

export default function ContactUs() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-10 bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start  ">
     
        <div>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#368da7", marginBottom: "15px" }}
          >
            Contact Us
          </Typography>

          <Typography sx={{ color: "#555", fontSize: "16px", lineHeight: "1.7" }}>
            Need to get in touch with us? Fill out the form with your inquiry and our team
            will get back to you as soon as possible.
          </Typography>
        </div>

        {/* Right Form Section */}
        <Box
          sx={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name*"
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#368da7 !important" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#368da7 !important",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#368da7 !important" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#368da7 !important",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email*"
                variant="outlined"
                type="email"
                sx={{
                  "& label.Mui-focused": { color: "#368da7 !important" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#368da7 !important",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What can we help you with?"
                variant="outlined"
                multiline
                rows={5}
                sx={{
                  "& label.Mui-focused": { color: "#368da7 !important" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#368da7 !important",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#ff6347 !important",
                  color: "white",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#e5533a !important" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
