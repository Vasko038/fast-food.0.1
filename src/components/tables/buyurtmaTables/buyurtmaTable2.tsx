import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../Context";
export function BuyurtmaTable2() {
  const { buyurtmalar, mahsulotlar } = useContext(DataContext);
  function canculateAllPrice(status: string) {
    const statusData = buyurtmalar.filter((item) => item.status === status);
    let allAmount = 0;
    statusData.map((item) => {
      item.mahsulotlar.map((jtem) => {
        const mahsulot = mahsulotlar.find(
          (item) => item.id === jtem.mahsulotId
        );
        if (mahsulot) allAmount += mahsulot.narx * jtem.count;
      });
    });
    return allAmount.toLocaleString("uz-UZ");
  }
  return (
    <Box className="p-[50px] ">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack direction={"row"} className="mb-3" spacing={2}>
            <Typography>Yangi </Typography>
            <Chip
              sx={{ bgcolor: "white" }}
              label={
                buyurtmalar.filter((item) => item.status === "yangi").length
              }
              size="small"
            />
          </Stack>
          <Paper
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="aspect-square h-[15px] bg-green-500"
              sx={{ borderRadius: "50% 50%" }}
            ></Box>
            <Typography>{canculateAllPrice("yangi")} UZS</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} className="mb-3" spacing={2}>
            <Typography> Qabul qilingan</Typography>
            <Chip
              sx={{ bgcolor: "white" }}
              label={
                buyurtmalar.filter((item) => item.status === "qabul").length
              }
              size="small"
            />
          </Stack>
          <Paper
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="aspect-square h-[15px] bg-blue-500"
              sx={{ borderRadius: "50% 50%" }}
            ></Box>
            <Typography>{canculateAllPrice("qabul")} UZS</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} className="mb-3" spacing={2}>
            <Typography>Jonatilgan </Typography>
            <Chip
              sx={{ bgcolor: "white" }}
              label={
                buyurtmalar.filter((item) => item.status === "jonatilgan")
                  .length
              }
              size="small"
            />
          </Stack>
          <Paper
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="aspect-square h-[15px] bg-yellow-500"
              sx={{ borderRadius: "50% 50%" }}
            ></Box>
            <Typography>{canculateAllPrice("jonatilgan")} UZS</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} className="mb-3" spacing={2}>
            <Typography> Yopilgan</Typography>
            <Chip
              sx={{ bgcolor: "white" }}
              label={
                buyurtmalar.filter((item) => item.status === "yopilgan").length
              }
              size="small"
            />
          </Stack>
          <Paper
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="aspect-square h-[15px] bg-purple-500"
              sx={{ borderRadius: "50% 50%" }}
            ></Box>
            <Typography>{canculateAllPrice("yopilgan")} UZS</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
