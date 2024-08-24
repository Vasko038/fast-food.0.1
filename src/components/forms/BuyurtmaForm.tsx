import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDataContext } from "../Context";
import { Form } from "antd";
import { BuyurtmaFormTableCard } from "../tables/buyurtmaTables/BuyurtmaCard";
import { v4 as uuidv4 } from "uuid";
import { PresentDay } from "../tables/buyurtmaTables/Functions";
import { IBuyurtma } from "../Interface";

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

  const onFinish = () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set the flag to true to prevent further submissions

    const values = form.getFieldsValue();

    const newBuyurtma: IBuyurtma = {
      id: uuidv4(),
      ...values,
      manzil: "",
      status: "yangi",
      saqlangan: false,
      dostavka: 5000,
      mahsulotlar: [...basket],
      date: PresentDay(),
    };

    setBuyurtmalar([...buyurtmalar, newBuyurtma]);
    setBasket([]);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  const deleteFormAndBasket = () => {
    form.resetFields();
    setBasket([]);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "30px" }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6" component="h4">
            Yangi buyurtma qo'shish
          </Typography>
          <Tabs
            value={tabValue}
            className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="first tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                height: "100%",
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
                  paddingY: 1,
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
                      height: "calc(100vh - 90px - 200px)",
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
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" component="h4">
              Buyurtma ro'yxati
            </Typography>
            <IconButton
              onClick={() => {
                deleteFormAndBasket();
              }}
            >
              <LuTrash2 />
            </IconButton>
          </div>
          <Box
            sx={{
              border: "1px solid #EDEFF3",
              borderRadius: "15px",
              width: "100%",
              padding: "15px",
            }}
          >
            {basket.map((b) => {
              const mahsulot = mahsulotlar.find((m) => m.id === b.mahsulotId);

              return (
                <div
                  className="flex items-center justify-between mb-2"
                  key={b.mahsulotId}
                >
                  <p>{mahsulot?.name}</p>
                  <p>
                    {b.count}*{mahsulot?.narx} UZS
                  </p>
                </div>
              );
            })}
            <div
              className="bg-[#EDEFF3] w-[90%] mx-auto mt-4"
              style={{
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <p>Umumiy summa</p>
              <p className="text-xl">
                <span className="font-bold">{totalSum}</span> UZS
              </p>
            </div>
          </Box>
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            className="mt-3"
          >
            <Form.Item label="Mijoz" name="userId" required>
              <Select
                id="demo-simple-select"
                label=" "
                style={{
                  width: "100%",
                  height: "40px",
                }}
                onChange={(event) => {
                  form.setFieldsValue({
                    userId: event.target.value,
                  });
                }}
              >
                {mijozlar.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Filial" name="filialId" required>
              <Select
                label=" "
                style={{
                  width: "100%",
                  height: "40px",
                }}
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
            <Form.Item label="Operator" name="hodimId" required>
              <Select
                label=" "
                style={{
                  width: "100%",
                  height: "40px",
                }}
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
          </Form>
        </Grid>
      </Grid>
    </Box>
  );
};
