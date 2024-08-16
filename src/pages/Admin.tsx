import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Buyurtmalar } from "./adminPages/Buyurtmalar";
import { Filiallar } from "./adminPages/Filiallar";
import { Kategoriyalar } from "./adminPages/Kategoriyalar";
import { Mahsulotlar } from "./adminPages/Mahsulotlar";
import { Hisobotlar } from "./adminPages/Hisobot";
import { Mijozlar } from "./adminPages/Mijozlar";
import { AdminRoute } from "../components/Context";
import { AdminDrawer } from "../components/AdminDrawer";
const pages: Record<string, React.ReactNode> = {
  Buyurtmalar: <Buyurtmalar />,
  Filiallar: <Filiallar />,
  Kategoriyalar: <Kategoriyalar />,
  Mahsulotlar: <Mahsulotlar />,
  Mijozlar: <Mijozlar />,
  Hisobotlar: <Hisobotlar />,
};
const defaultTheme = createTheme();
export function AdminPage() {
  const [activePage, setActivePage] = useState("Buyurtmalar");
  return (
    <ThemeProvider theme={defaultTheme}>
      <AdminRoute.Provider value={{ activePage, setActivePage }}>
        <CssBaseline>
          <Box className="flex">
            <AdminDrawer></AdminDrawer>
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              {pages[activePage]}
            </Box>
          </Box>
        </CssBaseline>
      </AdminRoute.Provider>
    </ThemeProvider>
  );
}
