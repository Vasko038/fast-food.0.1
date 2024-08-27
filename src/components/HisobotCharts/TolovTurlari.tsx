import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import React from "react";

export function TolovTuriChart() {
  return (
    <Paper elevation={2} sx={{ borderRadius: "10px", overflow: "hidden" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center "}
        className="px-5 py-3"
        sx={{ boxShadow: 1 }}
      >
        <Typography>Tolov Turlari | Xadra</Typography>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Typography>Date</Typography>
          <Button
            sx={{
              minWidth: "40px",
              maxWidth: "40px",
              minHeight: "40px",
              maxHeight: "40px",
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
            variant="contained"
          >
            <CalendarTodayOutlinedIcon></CalendarTodayOutlinedIcon>
          </Button>
          <Button
            sx={{
              minWidth: "40px",
              maxWidth: "40px",
              minHeight: "40px",
              maxHeight: "40px",
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
            variant="contained"
          >
            <FilterAltIcon></FilterAltIcon>
          </Button>
        </Stack>
      </Stack>
      <Box className="px-5 py-3">
        <Grid container spacing={2} className="w-full py-3">
          <Grid item xs={12} className="flex">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-orange-400 aspect-square rounded-full me-1 h-[13px]"></Box>
              <Typography>Terminal</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box className="w-[31%]  h-full bg-orange-400"></Box>
              </Box>
              <Typography>31%</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className="flex items-center">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-green-400 aspect-square rounded-full  me-1 h-[13px]"></Box>
              <Typography>Naqd</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box className="w-[27%]  h-full bg-green-400"></Box>
              </Box>
              <Typography>27%</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className="flex">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-blue-400 aspect-square rounded-full me-1 h-[13px]"></Box>
              <Typography>Payme</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box className="w-[42%]  h-full bg-blue-400"></Box>
              </Box>
              <Typography>42%</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Paper elevation={0} sx={{ bgcolor: "grey.200", p: 1 }}>
          123,123 UZS
        </Paper>
      </Box>
    </Paper>
  );
}
