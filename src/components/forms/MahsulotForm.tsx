import { Box, Button, Grid, Typography, Select, MenuItem } from "@mui/material";
import React from "react";
import { useDataContext } from "../Context";
import { IMahsulot } from "../Interface";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
export function MahsulotForm({ id }: { id?: number | string }) {
  const { kategoriyalar, mahsulotlar, setMahsulotlar } = useDataContext();
  const [form] = useForm();
  const mahsulot: IMahsulot | undefined = mahsulotlar.find(
    (item) => item.id === id
  );
  if (mahsulot) {
    form.setFieldsValue({
      name: mahsulot.name,
      categoryId: mahsulot.categoryId,
      narx: mahsulot.narx,
      malumot: mahsulot.malumot,
    });
  }
  function handleSave(values: Omit<IMahsulot, "id">) {
    if (mahsulot) {
      const updateMahuslotlar = mahsulotlar.map((item) =>
        item.id === mahsulot.id ? { ...item, ...values } : item
      );
      setMahsulotlar(updateMahuslotlar);
      message.success("mahsulot ozgartirildi");
    } else {
      const newMahsulot = { id: uuidv4(), ...values };
      setMahsulotlar([...mahsulotlar, newMahsulot]);
      message.success("mahsulot qoshildi");
    }
  }
  return (
    <Box className="flex flex-col justify-between h-full p-6">
      <Box>
        <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: "700" }}>
          {id
            ? "mahsulot malumotlarini ozgartirish"
            : "yangi mahsulot qo'shish"}
        </Typography>
        <Form
          onFinish={handleSave}
          layout={"vertical"}
          form={form}
          className="mt-5 w-[100%]"
        >
          <Form.Item label="Maxsulot nomi" name={"name"} required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Kategoriya"
            name="categoryId"
            rules={[{ required: true, message: "Kategoriya tanlang!" }]}
          >
            <Select sx={{ height: "32px" }} fullWidth label=" ">
              {kategoriyalar.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameUz}
                </MenuItem>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Maxsulot narxi" name={"narx"} required>
            <Input />
          </Form.Item>
          <Form.Item label="Qoshimcha ma'lumot" name={"malumot"} required>
            <Input />
          </Form.Item>
        </Form>
      </Box>
      <Grid item xs={6}>
        <Button
          onClick={() => form.submit()}
          sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" }, mb: 3 }}
          variant="contained"
        >
          Saqlash
        </Button>
      </Grid>
    </Box>
  );
}
