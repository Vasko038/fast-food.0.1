import * as React from "react";
import { Box, Grid } from "@mui/material";

export default function BuyurtmaTable() {
  return (
    <Box className="py-5">
      <Box className="py-5 bg-white">
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
    </Box>
  );
}
