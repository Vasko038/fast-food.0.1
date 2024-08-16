import {
  Box,
  Fab,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import KategoriyaTable from "../../components/tables/KategoriyaTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
            className="border-l-8 border-solid border-slate-100 h-full  flex align-middle px-5"
          >
            <Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
              <OutlinedInput
                className="border-0 outline-none flex-1"
                id="search"
                name="search"
                type="name"
                placeholder="Search"
                sx={{
                  border: "none",
                  outline: "none",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                }}
              />
              <FormLabel htmlFor="search">
                <IconButton>
                  <SearchOutlinedIcon></SearchOutlinedIcon>
                </IconButton>
              </FormLabel>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ height: "calc(100vh - 90px)", boxSizing: "border-box" }}
        className="relative"
      >
        <KategoriyaTable></KategoriyaTable>
        <Drawer setOpen={setOpenDrawer} open={openDrawer}>
          dsfsd
        </Drawer>
      </Box>
    </Box>
  );
}
