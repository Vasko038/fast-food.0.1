import {
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDataContext } from "../Context";
import { IMahsulot } from "../Interface";
import { v4 as uuidv4 } from "uuid";
import UploadButton from "../UploadButton";
export function MahsulotForm({
  id,
  setOpenDrawer,
}: {
  id?: number | string;
  setOpenDrawer: Function;
}) {
  const { kategoriyalar, mahsulotlar, setMahsulotlar } = useDataContext();
  const mahsulot: IMahsulot | undefined = mahsulotlar.find(
    (item) => item.id === id
  );
  const [name, setName] = useState(mahsulot ? mahsulot.name : "");
  const [categoryId, setCategoryId] = useState(
    mahsulot ? mahsulot.categoryId : ""
  );
  const [price, setPrice] = useState(mahsulot ? mahsulot.narx : "");
  const [desc, setDesc] = useState(mahsulot ? mahsulot.malumot : "");

  function handleSave() {
    if (id) {
      // Mavjud mahsulotni yangilash
      const updatedData: IMahsulot = {
        id: id, // Yangilanayotgan mahsulotning ID sini saqlash
        name: name,
        categoryId: categoryId,
        narx: Number(price),
        malumot: desc,
      };

      const updatedMahsulotlar = mahsulotlar.map((item) =>
        item.id === id ? updatedData : item
      );

      setMahsulotlar(updatedMahsulotlar);
    } else {
      // Yangi mahsulot qo'shish
      const newData: IMahsulot = {
        id: uuidv4(), // Yangi ID yaratish
        name: name,
        categoryId: categoryId,
        narx: Number(price),
        malumot: desc,
      };

      if (name !== "" && price !== "" && categoryId !== "") {
        setMahsulotlar([newData, ...mahsulotlar]);
      }
    }
    setOpenDrawer(false);
  }

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
        <Grid container className="flex align-middle" spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              label="Mahsulot nomi"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormLabel
              required
              onClick={() => document.getElementById("select")?.focus()}
              htmlFor="select"
            >
              Kategoriya
            </FormLabel>
            <Select
              id="select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              fullWidth
            >
              {kategoriyalar.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameUz}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              fullWidth
              label="Mahsulot narxi"
              InputProps={{
                inputProps: { min: 0, max: 5 }, // 'inputProps' orqali min va max atributlarini qo'shish
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
              label="Qoshimcha ma'lumot"
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <UploadButton></UploadButton>
          </Grid>
          <Grid item xs={3}>
            <Paper className="h-full  w-full">
              <img src="" alt="" />
            </Paper>
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
