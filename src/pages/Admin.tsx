import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useState } from "react";
import { Buyurtmalar } from "./adminPages/Buyurtmalar";
import { Filiallar } from "./adminPages/Filiallar";
import { Kategoriyalar } from "./adminPages/Kategoriyalar";
import { Mahsulotlar } from "./adminPages/Mahsulotlar";
import { Hisobotlar } from "./adminPages/Hisobot";
import { Mijozlar } from "./adminPages/Mijozlar";
import { AdminRoute } from "../components/Context";
import { AdminDrawer } from "../components/AdminDrawer";
import { IFilial } from "../components/Types";
import { FiliallarData } from "../components/Data";
const pages: Record<string, React.ReactNode> = {
  Buyurtmalar: <Buyurtmalar />,
  Filiallar: <Filiallar />,
  Kategoriyalar: <Kategoriyalar />,
  Mahsulotlar: <Mahsulotlar />,
  Mijozlar: <Mijozlar />,
  Hisobotlar: <Hisobotlar />,
};

export const DataContext = React.createContext<{
  filiallar: IFilial[];
  setFiliallar: (value: IFilial[]) => void;
}>({
  filiallar: [],
  setFiliallar: (value: IFilial[]) => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};

const defaultTheme = createTheme();
export function AdminPage() {
  const [activePage, setActivePage] = useState("Buyurtmalar");
  const [filiallar, setFiliallar] = useState<IFilial[]>(FiliallarData);
  return (
    <ThemeProvider theme={defaultTheme}>
      <AdminRoute.Provider value={{ activePage, setActivePage }}>
        <DataContext.Provider value={{ filiallar, setFiliallar }}>
          <CssBaseline>
            <Box className="flex">
              <AdminDrawer></AdminDrawer>
              <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                {pages[activePage]}
              </Box>
            </Box>
          </CssBaseline>
        </DataContext.Provider>
      </AdminRoute.Provider>
    </ThemeProvider>
  );
}
