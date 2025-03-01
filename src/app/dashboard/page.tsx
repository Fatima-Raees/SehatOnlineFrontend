"use client";
import { useState } from "react";
import { Box, Typography, Button, Tooltip, Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"; // Boss Icon

const SidebarItems = [
  { title: "Dashboard", icon: <DashboardIcon /> },
  { title: "Doctors", icon: <LocalHospitalIcon /> },
  { title: "Reports", icon: <DescriptionIcon /> },
];

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: open ? 240 : 100,
          bgcolor: "#112D4E",
          color: "white",
          height: "100vh",
          transition: "width 0.3s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          gap: 0.5,
        }}
      >
        {/* Sidebar Header */}
        <Button
          onClick={() => setOpen(!open)}
          sx={{
            color: "black",
            fontWeight: "bold",
            fontFamily: "cursive",
            bgcolor: "white",
            "&:hover": {
              bgcolor: "#F9F9F9",
              transition: "0.3s ease",
            },
          }}
        >
          ☰ Stay Healthy
        </Button>

        {/* Profile Card */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1,
            width: "100%",
            paddingTop: 0,
            borderBottom: "1px solid #ffffff55",
          }}
        >
          <Avatar sx={{ bgcolor: "#F9F9F9", width: 50, height: 50 }}>
            <SupervisorAccountIcon />
          </Avatar>
          {open && (
            <Typography sx={{ fontWeight: "bold", fontFamily: "cursive" }}>
              Admin Panel
            </Typography>
          )}
        </Box>

        {/* Sidebar Items */}
        {SidebarItems.map((item, index) => (
          <Tooltip title={open ? "" : item.title} placement="right" key={index}>
            <Button
              sx={{
                color: "white",
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingTop: "0.4px",

                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                  transition: "0.3s ease",
                },
              }}
            >
              {item.icon}
              {open && item.title}
            </Button>
          </Tooltip>
        ))}

        {/* Logout Button */}
        <Button
          sx={{
            color: "white",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            "&:hover": {
              bgcolor: "white",
              color: "black",
              transition: "0.3s ease",
            },
          }}
        >
          <LogoutIcon />
          {open && "Logout"}
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", fontFamily: "cursive" }}
          >
            Welcome to Admin Panel
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "70%",
              margin: "0 auto",
            }}
          >
            {["Stay Healthy, Stay Happy",
             "Your Health, Our Priority",
             "Sehat Online, The Ultimate Solution to Your Health Problems",
              "Prevention is Better than Cure"].map((quote, index) => (
              <Box
                key={index}
                sx={{
                  height: 200,
                  bgcolor: "#112D4E",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h5">{quote}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
