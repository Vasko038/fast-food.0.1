import React from "react";
import { Box, Typography } from "@mui/material";
export function Xarita() {
  return (
    <Box className="bg-slate-100 w-full h-full ">
      <Box className="h-[90px] bg-white  border-l-8 border-solid border-slate-100"></Box>
      <Box sx={{ height: "calc(100vh - 90px)" }} className="relative">
        <Typography>Xarita</Typography>
      </Box>
    </Box>
  );
}
