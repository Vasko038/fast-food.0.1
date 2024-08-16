import { Box, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Drawer } from "../../components/Drawer";
import BuyurtmaTable from "../../components/tables/BuyurtmaTable";
export function Buyurtmalar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box className="bg-slate-100 w-full h-full">
      <Box className="h-[90px]  bg-white ">
        <Grid container className="h-full">
          <Grid
            item
            xs={2}
            className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
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
            <Typography variant="body2"> Yangi Buyurtma Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            className="border-l-8 border-solid border-slate-100 h-full"
          ></Grid>
          <Grid
            item
            xs={2}
            className="border-l-8 border-solid border-slate-100 h-full"
          >
            a
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ height: "calc(100vh - 90px)", boxSizing: "border-box" }}
        className="relative"
      >
        <BuyurtmaTable />
        <Drawer setOpen={setOpenDrawer} open={openDrawer}></Drawer>
      </Box>
    </Box>
  );
}
