import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDataContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import { IKategoriya } from "../Interface";
import { Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
export function KategoriyaForm({ id }: { id?: number | string }) {
  const { kategoriyalar, setKategoriyalar } = useDataContext();
  const kategoriya: IKategoriya | undefined = kategoriyalar.find(
    (item) => item.id === id
  );
  const [form] = useForm();
  if (kategoriya) {
    form.setFieldsValue({
      nameUz: kategoriya.nameUz,
      nameRu: kategoriya.nameRu,
    });
  }
  function handleSave(values: Omit<IKategoriya, "id">) {
    if (kategoriya) {
      const updateData = kategoriyalar.map((item) =>
        item.id === kategoriya.id ? { ...item, ...values } : item
      );
      setKategoriyalar(updateData);
      message.success("kategoriya ozgartirildi");
    } else {
      const newKategoriya = { id: uuidv4(), ...values };
      setKategoriyalar([...kategoriyalar, newKategoriya]);
      message.success("kategoriya qoshildi");
    }
  }
  return (
    <Box className="flex flex-col justify-between h-full px-4 py-5">
      <Form onFinish={handleSave} layout="vertical" form={form}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Iltimos kategoriya nomini kiriting",
            },
          ]}
          name="nameUz"
          label="Kategoriya Uz"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Iltimos kategoriya nomini kiriting",
            },
          ]}
          name="nameRu"
          label="Kategoriya Ru"
        >
          <Input></Input>
        </Form.Item>
      </Form>
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
