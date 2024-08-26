import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDataContext } from "../Context";
import { IMahsulot } from "../Interface";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
export function MahsulotForm({
  id,
  setOpenDrawer,
}: {
  id?: number | string;
  setOpenDrawer: Function;
}) {
  const { kategoriyalar, mahsulotlar, setMahsulotlar } = useDataContext();
  const [form] = useForm();
  const mahsulot: IMahsulot | undefined = mahsulotlar.find(
    (item) => item.id === id
  );

  return (
    <Box className="flex flex-col justify-between h-full p-6">
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
        <Form layout={"vertical"} form={form} className="mt-5 w-[100%]">
          <Form.Item label="Maxsulot nomi" name={"name"} required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Kategoriya"
            name="kategoryId"
            rules={[{ required: true, message: "Kategoriya tanlang!" }]}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Form.Item>
          <Form.Item label="Maxsulot narxi" name={"narx"} required>
            <Input />
          </Form.Item>
          <Form.Item label="Qoshimcha ma'lumot" name={"qoshimcha"} required>
            <Input />
          </Form.Item>
        </Form>
      </Box>
      <Grid item xs={6}>
        <Button
          sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" }, mb: 3 }}
          variant="contained"
        >
          Saqlash
        </Button>
      </Grid>
    </Box>
  );
}
