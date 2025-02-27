"use client";


import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  "/images/HeroBanner.jpg",
  "/images/HeroBanner2.jpg",
  "/images/HeroBanner3.jpg",
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        border: "4px solid #0A192F",
        backgroundColor: "#112240",
        position: "relative",
      }}
    >
      <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 10, color: "white" }}>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Welcome to Sehat Online
      </Typography>
      <IconButton onClick={handleNext} sx={{ position: "absolute", right: 10, color: "white" }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
