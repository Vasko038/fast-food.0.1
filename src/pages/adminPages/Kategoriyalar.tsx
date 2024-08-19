import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import KategoriyaTable from "../../components/tables/KategoriyaTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Popover from "@mui/material/Popover";
import { KategoriyaForm } from "../../components/forms/KategoriyaForm";
export function Kategoriyalar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);
  const [selectRadio, setSelectRadio] = useState("");
  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;
  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopover(null);
  };

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
            <Button
              sx={{
                minWidth: "50px",
                maxWidth: "50px",
                minHeight: "50px",
                maxHeight: "50px",
                bgcolor: "white",
                color: "gray",
                borderRadius: "50% 50%",
                border: "4px solid  rgb(241 245 249)",
                boxShadow: "0 0 0 0",
                marginY: "auto",
                marginX: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: "0 0 0 0",
                },
              }}
              aria-describedby={PopoverId}
              variant="contained"
              onClick={handleClickPopover}
            >
              <FilterAltIcon></FilterAltIcon>
            </Button>
            <Popover
              id={PopoverId}
              open={openPopover}
              anchorEl={popover}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2 }}>
                <FormControl
                  sx={{
                    "& .MuiRadio-root": {
                      "& .MuiSvgIcon-root": {
                        borderRadius: "none",
                      },
                      "&.Mui-checked": {
                        color: "orange",
                      },
                    },
                  }}
                >
                  <RadioGroup
                    value={selectRadio}
                    onChange={(e) => setSelectRadio(e.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="narxO"
                      control={<Radio />}
                      label="Narx bo'yicha (o'sish)"
                    />
                    <FormControlLabel
                      value="narxK"
                      control={<Radio />}
                      label="Narx bo'yicha (kamayish)"
                    />
                    <FormControlLabel
                      value="nameAZ"
                      control={<Radio />}
                      label="nom bo'yicha (A-Z)"
                    />
                    <FormControlLabel
                      value="nameZA"
                      control={<Radio />}
                      label="nom bo'yicha (Z-A)"
                    />
                  </RadioGroup>
                </FormControl>
                <Box
                  sx={{ "& .MuiButton-root": { textTransform: "none" } }}
                  className="flex gap-4 justify-end"
                >
                  <Button variant="contained" color="inherit">
                    Bekor qilish
                  </Button>
                  <Button
                    sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" } }}
                    variant="contained"
                  >
                    Filter
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ height: "calc(100vh - 90px)", boxSizing: "border-box" }}
        className="relative"
      >
        <KategoriyaTable></KategoriyaTable>
        <Drawer setOpen={setOpenDrawer} open={openDrawer}>
          <KategoriyaForm></KategoriyaForm>
        </Drawer>
      </Box>
    </Box>
  );
}
