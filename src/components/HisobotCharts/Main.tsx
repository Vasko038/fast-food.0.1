import { Grid } from "@mui/material";
import React from "react";
import { TolovTuriChart } from "./TolovTurlari";
export function MainChartPage() {
  return (
    <>
      <Grid container spacing={2} className="px-[50px] py-6">
        <Grid item xs={6}>
          <TolovTuriChart></TolovTuriChart>
        </Grid>
        <Grid item xs={6}>
          <TolovTuriChart></TolovTuriChart>
        </Grid>
        <Grid item xs={6}>
          <TolovTuriChart></TolovTuriChart>
        </Grid>
        <Grid item xs={6}>
          <TolovTuriChart></TolovTuriChart>
        </Grid>
      </Grid>
    </>
  );
}
