import { Stack, Typography } from "@mui/material";
import React from "react";
export function NotFound() {
  return (
    <Stack
      className="h-screen bg-gradient-to-r-[ #b7355d, #c23c5c, #cc445a, #d54d58, #de5656] ]"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h1">404</Typography>

      <Typography variant="h4">Not Page Found</Typography>
    </Stack>
  );
}
