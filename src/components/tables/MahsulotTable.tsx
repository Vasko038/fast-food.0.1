import * as React from "react";
import { Box, Card, Divider, Grid } from "@mui/material";
import { MahsulotData } from "../Data";

export default function MahsulotTable() {
  return (
    <React.Fragment>
      <Box className="py-6">
        <Box className="py-3 px-5  shadow-xl  bg-white">
          <Grid container>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              Mahsulot
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Kategoriya
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Narxi
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Qoshimcha
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Action
            </Grid>
          </Grid>
        </Box>
      </Box>
      {MahsulotData.map((item) => (
        <Grid
          container
          className="bg-white p-5 mx-5 mb-3 rounded-lg  box-shadow-md w-full"
        >
          <Grid item>{item.name}</Grid>
          <Grid item>{item.categoryId}</Grid>
          <Grid item>{item.narx}</Grid>
          <Grid item>{item.malumot}</Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
}
