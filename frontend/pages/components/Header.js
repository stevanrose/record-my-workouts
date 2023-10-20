import React from "react";
import { Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 8, pb: 6 }}
    >
      {" "}
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        The Sweatshop
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        Quickly build an effective exercise programme.
      </Typography>
    </Container>
  );
};

export default Header;
