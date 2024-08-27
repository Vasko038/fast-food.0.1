import {
  Box,
  Button,
  Fab,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Popover,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { IoMdArchive } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { MainChartPage } from "../../components/HisobotCharts/Main";

export function Hisobotlar() {
  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (location.pathname.includes("/chart")) {
      setTabValue(0);
    } else if (location.pathname.includes("/table")) {
      setTabValue(1);
    }
  }, [location.pathname]);
  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopover(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    navigate(
      newValue === 0 ? "/admin/hisobotlar/chart" : "/admin/hisobotlar/table"
    );
  };

  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;

  return (
    <Box className="w-full h-full bg-slate-100">
      <Box className="h-[90px] bg-white ">
        <Grid container className="h-full">
          <Grid
            item
            xs={2}
            className="flex items-center justify-center h-full gap-3 px-4 border-l-8 border-solid border-slate-100"
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
            >
              <AutorenewOutlinedIcon />
            </Fab>
            <Typography variant="body2">Malumotlarni Yangilash</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            className="flex h-full px-5 align-middle border-l-8 border-solid border-slate-100"
          >
            <Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
              <OutlinedInput
                disabled={tabValue === 1 ? false : true}
                className="flex-1 border-0 outline-none"
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
              <FormLabel htmlFor="scccearch">
                <IconButton disabled={tabValue === 1 ? false : true}>
                  <SearchOutlinedIcon></SearchOutlinedIcon>
                </IconButton>
              </FormLabel>
            </Box>
            <Button
              disabled={tabValue === 1 ? false : true}
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
              <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
          </Grid>
          <Grid
            className="flex h-full px-5 border-l-8 border-solid border-slate-100"
            item
            xs={2}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white",
                  height: "100%",
                  color: "black",
                  width: "48px",
                  borderRadius: "50% 50%",
                  zIndex: 1,
                },
              }}
              className="align-middle bg-slate-100 my-3 mx-auto mt-[14px] rounded-full p-2"
              aria-label="second tabs"
            >
              <Tab
                sx={{
                  textTransform: "none",
                  minWidth: "48px",
                  maxWidth: "48px",
                  paddingY: 1,
                  fontSize: "20px",
                  marginRight: 1,
                  zIndex: 2,
                }}
                disableRipple
                label={<FaChartPie />}
              />
              <Tab
                sx={{
                  textTransform: "none",
                  minWidth: "48px",
                  maxWidth: "48px",
                  marginLeft: 1,
                  fontSize: "20px",
                  paddingY: 1,
                  zIndex: 2,
                }}
                disableRipple
                label={<IoMdArchive />}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "calc(100vh - 90px)" }} className="relative">
        <Routes>
          <Route path="/" element={<Navigate to="chart" replace />} />
          <Route path="chart" element={<MainChartPage></MainChartPage>} />
          <Route path="table" element={<>Saaxcvxvlloodsdmm</>} />
        </Routes>
      </Box>
    </Box>
  );
}
