import * as React from "react";
import { Box, Grid } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BuyurtmaTable() {
  return (
    <>
      <Box className="my-5 py-3 bg-white">
        <Grid container>
          <Grid item xs={3}>
            Mahsulot
          </Grid>
          <Grid item xs={3}>
            kategoriya
          </Grid>
          <Grid item xs={3}>
            narxi
          </Grid>
          <Grid item xs={3}>
            qoshimcha
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
