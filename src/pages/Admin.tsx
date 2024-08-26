import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Buyurtmalar } from "./adminPages/Buyurtmalar";
import { Filiallar } from "./adminPages/Filiallar";
import { Kategoriyalar } from "./adminPages/Kategoriyalar";
import { Hisobotlar } from "./adminPages/Hisobot";
import { Hodimlar } from "./adminPages/Hodimlar";
import { Mijozlar } from "./adminPages/Mijozlar";
import { YetkazishNarxi } from "./adminPages/YetkazishNarxi";
import { Xarita } from "./adminPages/Xaritalar";
import { AdminDrawer } from "../components/AdminDrawer";
import { TizimSozlamalari } from "./adminPages/TizimSozlamalari";
import {
  IBasket,
  IBuyurtma,
  IFilial,
  IHodim,
  IKategoriya,
  IMahsulot,
  IMijoz,
  IRole,
  IYetkazish,
} from "../components/Interface";
import { BasketData, RoleData } from "../components/Data";
import { DataContext } from "../components/Context";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
const Mahsulotlar = lazy(() => import("./adminPages/Mahsulotlar"));
const defaultTheme = createTheme();
export function AdminPage() {
  const [filiallar, setFiliallar] = useState<IFilial[]>([]);
  const [mahsulotlar, setMahsulotlar] = useState<IMahsulot[]>([]);
  const [kategoriyalar, setKategoriyalar] = useState<IKategoriya[]>([]);
  const [buyurtmalar, setBuyurtmalar] = useState<IBuyurtma[]>([]);
  const [hodimlar, setHodimlar] = useState<IHodim[]>([]);
  const [mijozlar, setMijozlar] = useState<IMijoz[]>([]);
  const [yetkazish, setYetkazish] = useState<IYetkazish[]>([]);
  const [rollar, setRollar] = useState<IRole[]>(RoleData);
  const [basket, setBasket] = useState<IBasket[]>(BasketData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filiallarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/filiallar"
        );
        setFiliallar(filiallarRes.data);

        const mahsulotlarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/mahsulotlar"
        );
        setMahsulotlar(mahsulotlarRes.data);

        const kategoriyalarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/kategoriyalar"
        );
        setKategoriyalar(kategoriyalarRes.data);

        const buyurtmalarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/buyurtmalar"
        );
        setBuyurtmalar(buyurtmalarRes.data);

        const hodimlarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/hodimlar"
        );
        setHodimlar(hodimlarRes.data);

        const mijozlarRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/mijozlar"
        );
        setMijozlar(mijozlarRes.data);

        const yetkazishRes = await axios.get(
          "https://1df7137a16f23f61.mokky.dev/yetkazish"
        );
        setYetkazish(yetkazishRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <DataContext.Provider
          value={{
            filiallar,
            setFiliallar,
            mahsulotlar,
            setMahsulotlar,
            kategoriyalar,
            setKategoriyalar,
            mijozlar,
            setMijozlar,
            buyurtmalar,
            setBuyurtmalar,
            hodimlar,
            setHodimlar,
            rollar,
            setRollar,
            basket,
            setBasket,
            yetkazish,
            setYetkazish,
          }}
        >
          <CssBaseline>
            <Box className="flex">
              <AdminDrawer></AdminDrawer>
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "auto",
                }}
              >
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/admin/buyurtmalar" replace />}
                  />
                  <Route path="buyurtmalar/*" element={<Buyurtmalar />} />
                  <Route path="mahsulotlar" element={<Mahsulotlar />} />
                  <Route path="kategoriyalar" element={<Kategoriyalar />} />
                  <Route path="filiallar" element={<Filiallar />} />
                  <Route path="mijozlar" element={<Mijozlar />}></Route>
                  <Route path="hisobotlar" element={<Hisobotlar />} />
                  <Route path="hodimlar" element={<Hodimlar />} />
                  <Route path="yetkazish-narxi" element={<YetkazishNarxi />} />
                  <Route path="xarita" element={<Xarita />} />
                  <Route
                    path="tizim-sozlamalari"
                    element={<TizimSozlamalari />}
                  />
                </Routes>
              </Box>
            </Box>
          </CssBaseline>
        </DataContext.Provider>
      </Suspense>
    </ThemeProvider>
  );
}
