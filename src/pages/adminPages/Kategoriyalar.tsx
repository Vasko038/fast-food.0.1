import { Box, Fab, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import KategoriyaTable from "../../components/tables/KategoriyaTable";
export function Kategoriyalar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box className="bg-slate-100 w-full h-full">
      <Box className="h-[90px] bg-white ">
        <Grid container className="h-full">
          <Grid
            item
            xs={2}
            className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
          >
            <Fab
              sx={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
              }}
              size="small"
              color="success"
              aria-label="add"
              onClick={() => setOpenDrawer(true)}
            >
              <AddIcon />
            </Fab>
            <Typography variant="body2"> Yangi Kategoriya Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            className="border-l-8 border-solid border-slate-100 h-full"
          ></Grid>
        </Grid>
      </Box>
      <Box
        sx={{ height: "calc(100vh - 90px)", boxSizing: "border-box" }}
        className="relative"
      >
        <KategoriyaTable></KategoriyaTable>
        <Drawer setOpen={setOpenDrawer} open={openDrawer}></Drawer>
      </Box>
    </Box>
  );
}
