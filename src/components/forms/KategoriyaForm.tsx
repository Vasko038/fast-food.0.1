import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDataContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
export function KategoriyaForm({ id }: { id?: number | string }) {
  const { kategoriyalar, mahsulotlar, setMahsulotlar } = useDataContext();

  function handleSave() {}

  return (
    <Box className="px-4 py-5 flex flex-col h-full justify-between">
      <Box
        sx={{
          "& .MuiTextField-root": {
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "orange",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "orange",
              },
            },
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "orange", // Focus bo'lganda chiziqni orange rangga o'zgartirish
            },
          },
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: "700" }}>
          {id
            ? "mahsulot malumotlarini ozgartirish"
            : "yangi mahsulot qo'shish"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField required fullWidth label="NameUz"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth label="Name Ru"></TextField>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={6}>
        <Button
          onClick={handleSave}
          sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" }, mb: 3 }}
          variant="contained"
        >
          Saqlash
        </Button>
      </Grid>
    </Box>
  );
}
