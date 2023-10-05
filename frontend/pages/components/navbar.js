import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Record my workouts
        </Typography>
        <Button href="/" color="inherit">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}
