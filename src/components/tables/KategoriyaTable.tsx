import * as React from "react";
import { Box, Divider, Grid } from "@mui/material";

export default function KategoriyaTable() {
  return (
    <React.Fragment>
      <Box className="py-6">
        <Box className="py-3 shadow-xl px-5 bg-white">
          <Grid container>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              Kategoriya {`(UZ)`}
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Kategoriya {`(RU)`}
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
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
    </React.Fragment>
  );
}
