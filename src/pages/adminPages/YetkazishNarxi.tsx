import { Box, Fab, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";

export function YetkazishNarxi() {
  return (
    <Box className="w-full h-full bg-slate-100 ">
      <Box className="h-[90px] bg-white ">
        <Grid container className="h-full ">
          <Grid
            item
            xs={2}
            className="flex items-center justify-center h-full gap-3 px-4 border-solid border-x-8 border-slate-100"
          >
            <Fab
              onClick={() => setOpenDrawer(true)}
              sx={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
              }}
              size="small"
              color="success"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
            <Typography variant="body2">Yangi qo'shish</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "calc(100vh - 90px)" }} className="relative">
        <Drawer></Drawer>
      </Box>
    </Box>
  );
}
