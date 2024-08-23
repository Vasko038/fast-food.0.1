import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Buyurtmalar } from "./adminPages/Buyurtmalar";
import { Filiallar } from "./adminPages/Filiallar";
import { Kategoriyalar } from "./adminPages/Kategoriyalar";
import { Mahsulotlar } from "./adminPages/Mahsulotlar";
import { Hisobotlar } from "./adminPages/Hisobot";
import { Hodimlar } from "./adminPages/Hodimlar";
import { AdminDrawer } from "../components/AdminDrawer";
import {
  IBasket,
  IBuyurtma,
  IFilial,
  IHodim,
  IKategoriya,
  IMahsulot,
  IMijoz,
  IRole,
} from "../components/Interface";
import {
  BasketData,
  BuyurtmalarData,
  FiliallarData,
  HodimlarData,
  KategoriyaData,
  MahsulotData,
  MijozlarData,
  RoleData,
} from "../components/Data";
import { DataContext } from "../components/Context";
import { Navigate, Route, Routes } from "react-router-dom";
import { Mijozlar } from "./adminPages/Mijozlar";
import { Kanban } from "../components/tables/buyurtmaTables/KanbanBoard";

const defaultTheme = createTheme();
export function AdminPage() {
  const [filiallar, setFiliallar] = useState<IFilial[]>(FiliallarData);
  const [mahsulotlar, setMahsulotlar] = useState<IMahsulot[]>(MahsulotData);
  const [kategoriyalar, setKategoriyalar] =
    useState<IKategoriya[]>(KategoriyaData);
  const [buyurtmalar, setBuyurtmalar] = useState<IBuyurtma[]>(BuyurtmalarData);
  const [hodimlar, setHodimlar] = useState<IHodim[]>(HodimlarData);
  const [mijozlar, setMijozlar] = useState<IMijoz[]>(MijozlarData);
  const [rollar, setRollar] = useState<IRole[]>(RoleData);
  const [basket, setBasket] = useState<IBasket[]>(BasketData);

  return (
    <ThemeProvider theme={defaultTheme}>
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
              </Routes>
            </Box>
          </Box>
        </CssBaseline>
      </DataContext.Provider>
    </ThemeProvider>
  );
}
