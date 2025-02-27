"use client";

import { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={toggleSidebar} sx={{ position: "absolute", top: 20, left: 20 }}>
        <MenuIcon sx={{ color: "blue" }} />
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open} sx={{ width: open ? 240 : 0 }}>
        <List sx={{ width: 240, bgcolor: "#0A192F", height: "100vh", color: "white" }}>
          <ListItem component="button" onClick={toggleSidebar} sx={{ textAlign: "center", bgcolor: "#0A192F", color: "white", py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Sehat Online</Typography>
          </ListItem>
          {["Home", "Appointments", "Doctors", "Settings"].map((text) => (
            <ListItem component="button" key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
