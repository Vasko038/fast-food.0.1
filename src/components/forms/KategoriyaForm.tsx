import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDataContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import { IKategoriya } from "../Interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
export function KategoriyaForm({ id }: { id?: number | string }) {
  const { kategoriyalar, setKategoriyalar } = useDataContext();
  const kategoriya: IKategoriya | undefined = kategoriyalar.find(
    (item) => item.id === id
  );
  const [form] = useForm();

  return (
    <Box className="flex flex-col justify-between h-full px-4 py-5">
      <Form layout="vertical" form={form}>
        <Form.Item label="Kategoriya Uz">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Kategoriya Ru">
          <Input></Input>c
        </Form.Item>
      </Form>
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
