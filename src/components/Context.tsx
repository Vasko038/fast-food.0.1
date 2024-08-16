import { createContext } from "react";

export const MainRoute = createContext<{
  activePage: string;
  setActivePage: (value: string) => void;
}>({
  activePage: "LoginPage",
  setActivePage: (value: string) => {},
});

export const AdminRoute = createContext({
  activePage: "Buyurtmalar",
  setActivePage: (value: string) => {},
});
