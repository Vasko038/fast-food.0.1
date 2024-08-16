import * as React from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { MahsulotData } from "../Data";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

export default function MahsulotTable() {
  return (
    <React.Fragment>
      <Box className="py-5 flex">
        <Box className="py-3 pl-[50px] pr-[65px]   flex-1 shadow-xl  bg-white">
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
      <Box sx={{ overflow: "auto", height: 600 }}>
        {MahsulotData.map((item) => (
          <Box
            sx={{
              marginBottom: "10px",
              marginInline: "40px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 2px 2px 0px #AEB0B550",
              padding: "10px",
            }}
          >
            <Grid container>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                {item.name}
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {item.categoryId}
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {item.narx.toLocaleString("uz-UZ")} UZS
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                <Typography
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.malumot}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                <IconButton
                  sx={{
                    border: "4px solid #EDEFF3",
                    marginRight: "12px",
                  }}
                >
                  <MdOutlineEdit />
                </IconButton>
                <IconButton
                  sx={{
                    border: "4px solid #EDEFF3",
                  }}
                >
                  <LuTrash2 />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
}
