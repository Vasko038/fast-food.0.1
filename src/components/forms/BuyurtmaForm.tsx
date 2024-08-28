import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDataContext } from "../Context";
import { Form, message } from "antd";
import { BuyurtmaFormTableCard } from "../tables/buyurtmaTables/BuyurtmaCard";
import { MapContainer, TileLayer } from "react-leaflet";
import { PresentDay } from "../tables/buyurtmaTables/Functions";
import { IBuyurtma } from "../Interface";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { DraggableMarker } from "../../pages/adminPages/Filiallar";

export const BuyurtmaForm = () => {
  const {
    buyurtmalar,
    setBuyurtmalar,
    mahsulotlar,
    mijozlar,
    kategoriyalar,
    filiallar,
    hodimlar,
    basket,
    setBasket,
  } = useDataContext();

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const [position1, setPosition1] = useState<[number, number]>([
    41.31115, 69.27951,
  ]);
  const totalSum = basket.reduce((acc, item) => {
    const mahsulot = mahsulotlar.find((m) => m.id === item.mahsulotId);
    if (mahsulot) {
      return acc + mahsulot.narx * item.count;
    }
    return acc;
  }, 0);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onFinish = async () => {
    if (isSubmitting) return;
    if (!basket.length) {
      message.error("Iltimos mahsulot tanlang");
      return;
    }

    setIsSubmitting(true);

    const values = form.getFieldsValue();

    try {
      const response = await axios.get(
        "https://1df7137a16f23f61.mokky.dev/buyurtmaSoni"
      );

      console.log({ response });

      const buyurtmaSoni = response.data[0].number as number;

      console.log({ buyurtmaSoni });

      await axios.patch("https://1df7137a16f23f61.mokky.dev/buyurtmaSoni/1", {
        number: buyurtmaSoni + 1,
      });

      const newBuyurtma: IBuyurtma = {
        ...values,
        manzil: "",
        status: "yangi",
        saqlangan: false,
        dostavka: 5000,
        mahsulotlar: [...basket],
        date: PresentDay(),
        buyurtmaSoni: buyurtmaSoni + 1,
      };

      setBuyurtmalar([...buyurtmalar, newBuyurtma]);

      await axios.post(
        "https://1df7137a16f23f61.mokky.dev/buyurtmalar",
        newBuyurtma
      );

      message.success("Buyurtma muvaffaqiyatli qo'shildi!");

      // Resetting the form and state
      setBasket([]);
      form.resetFields();
      navigate("?" + queryString.stringify({}));
    } catch (error) {
      message.error("Buyurtma yaratishda xatolik yuz berdi!");
      console.error("Error fetching data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteFormAndBasket = () => {
    form.resetFields();
    setBasket([]);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6" component="h4" sx={{ marginBottom: "18px" }}>
            Yangi buyurtma qo'shish
          </Typography>
          <Tabs
            value={tabValue}
            sx={{ height: "30px" }}
            className="items-center p-2 mb-3 mt-[8px] rounded-full bg-slate-100 box-content"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="first tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                height: "100%",
                marginBlock: "auto",
                color: "black",

                borderRadius: "250px",
                zIndex: 1,
              },
            }}
          >
            {kategoriyalar.map((k, index) => (
              <Tab
                key={k.id} // Added key prop
                disableRipple
                {...a11yProps(index)}
                sx={{
                  textTransform: "none",
                  width: "140px",
                  zIndex: 2,
                }}
                className="bg-white"
                label={k.nameUz}
              />
            ))}
          </Tabs>
          <div>
            {kategoriyalar.map((k, index) => {
              const products = mahsulotlar.filter((m) => m.categoryId === k.id);
              return (
                <CustomTabPanel
                  key={k.id} // Added key prop
                  value={tabValue}
                  index={index}
                >
                  <Box
                    sx={{
                      height: "calc(100vh - 90px - 198px)",
                      overflowY: "auto",
                    }}
                  >
                    <Grid container spacing={2}>
                      {products.map((m) => (
                        <BuyurtmaFormTableCard product={m} key={m.id} />
                      ))}
                    </Grid>
                  </Box>
                </CustomTabPanel>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              height: "calc(100vh - 90px - 55px)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                className="mb-3"
              >
                <Typography variant="h6" component="h4">
                  Buyurtma ro'yxati
                </Typography>
                <IconButton
                  sx={{ bgcolor: "grey.200" }}
                  onClick={() => {
                    deleteFormAndBasket();
                  }}
                >
                  <LuTrash2 />
                </IconButton>
              </Stack>

              <Paper
                square={false}
                elevation={0}
                variant="outlined"
                sx={{
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    overflowY: "auto",
                    height: "calc(100vh - 90px - 610px)",
                    marginBottom: "10px",
                  }}
                >
                  <Box sx={{ marginRight: "10px" }}>
                    {basket.length === 0 ? "Royxat bo'sh" : ""}
                    {basket.map((b) => {
                      const mahsulot = mahsulotlar.find(
                        (m) => m.id === b.mahsulotId
                      );

                      return (
                        <Grid container key={b.mahsulotId}>
                          <Grid item xs={6}>
                            <Typography noWrap variant="body2">
                              {mahsulot?.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography noWrap align="right" variant="body2">
                              {b.count} *{" "}
                              {mahsulot?.narx.toLocaleString("en-US")} UZS
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Box>
                </Box>

                <Paper
                  square={false}
                  sx={{ bgcolor: "grey.200", p: 1 }}
                  elevation={0}
                >
                  <Typography variant="body2" color="inherit">
                    Umumiy summa
                  </Typography>
                  <Typography variant="h6">
                    <span className="font-bold">
                      {totalSum.toLocaleString("en-US")}
                    </span>{" "}
                    UZS
                  </Typography>
                </Paper>
              </Paper>
              <Form
                onFinish={onFinish}
                form={form}
                layout="vertical"
                className="mt-3"
              >
                <Form.Item
                  label="Mijoz"
                  name="userId"
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos mijozni tanlang",
                    },
                  ]}
                >
                  <Select
                    fullWidth
                    label=" "
                    size="small"
                    onChange={(event) => {
                      form.setFieldsValue({
                        userId: event.target.value,
                      });
                    }}
                  >
                    {mijozlar
                      .filter((f) => f.active)
                      .map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                          {m.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Filial"
                  name="filialId"
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos filialni tanlang",
                    },
                  ]}
                >
                  <Select
                    label=" "
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      form.setFieldsValue({
                        filialId: event.target.value,
                      });
                    }}
                  >
                    {filiallar.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.nameUz}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Operator"
                  name="hodimId"
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos operatorni tanlang",
                    },
                  ]}
                >
                  <Select
                    label=" "
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      form.setFieldsValue({
                        hodimId: event.target.value,
                      });
                    }}
                  >
                    {hodimlar.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.lastName} {m.firstName.charAt(0)}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tolov turi"
                  name="tolovTuri"
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos tolov turini tanlang",
                    },
                  ]}
                >
                  <Select
                    label=" "
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      form.setFieldsValue({
                        tolovTuri: event.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"payme"}>Payme</MenuItem>
                    <MenuItem value={"naxt"}>Naxt tolov</MenuItem>
                    <MenuItem value={"terminal"}>Terminal</MenuItem>
                  </Select>
                </Form.Item>
              </Form>
              <MapContainer
                key={position1.toString()}
                center={position1}
                zoom={20}
                style={{ height: "180px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <DraggableMarker
                  position={position1}
                  setPosition={setPosition1}
                ></DraggableMarker>
              </MapContainer>
            </Box>

            <button
              onClick={() => {
                form.submit();
              }}
              className="bg-[#20D472] hover:bg-[#36b16e]"
              style={{
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Buyurtma qilish
            </button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
