import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen flex justify-center items-start p-10 bg-gray-50">
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
        
          padding: "40px",
          borderRadius: "20px",
         
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#368da7", marginBottom: "20px" }}
        >
          About Us
        </Typography>

        <Typography sx={{ color: "#555", fontSize: "17px", lineHeight: "1.8", marginBottom: "30px" }}>
          Welcome to our e-commerce platform! We are dedicated to providing a seamless and enjoyable
          online shopping experience. Our mission is to deliver high-quality products, competitive prices,
          and exceptional customer service.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#ff6347", marginBottom: "15px" }}
            >
              Our Mission
            </Typography>
            <Typography sx={{ color: "#555", fontSize: "16px", lineHeight: "1.7" }}>
              We aim to make online shopping simple, fast, and reliable. From product selection to
              delivery, we focus on ensuring that every step meets the highest standards.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#ff6347", marginBottom: "15px" }}
            >
              Why Choose Us?
            </Typography>
            <Typography sx={{ color: "#555", fontSize: "16px", lineHeight: "1.7" }}>
              • Fast and secure checkout <br />
              • High‑quality products from trusted suppliers <br />
              • Excellent customer support <br />
              • Easy returns and refunds <br />
              • Great deals and competitive pricing
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "40px", padding: "20px", background: "#f7fafa", borderRadius: "15px" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#368da7", marginBottom: "10px" }}
          >
            Our Vision
          </Typography>
          <Typography sx={{ color: "#555", fontSize: "16px", lineHeight: "1.7" }}>
            To become one of the leading online shopping destinations, offering an unmatched customer
            experience with a wide variety of products and continuous innovation.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
