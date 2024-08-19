import React, { useContext } from "react";
import { createContext } from "react";
import { IFilial, IMahsulot, IKategoriya, IMijoz } from "./Interface";

export const MainRoute = createContext<{
  activePage: string;
  setActivePage: (value: string) => void;
}>({
  activePage: "LoginPage",
  setActivePage: (value: string) => {},
});

export const DataContext = React.createContext<{
  filiallar: IFilial[];
  setFiliallar: (value: IFilial[]) => void;
  mahsulotlar: IMahsulot[];
  setMahsulotlar: (value: IMahsulot[]) => void;
  kategoriyalar: IKategoriya[];
  setKategoriyalar: (value: IKategoriya[]) => void;
  mijozlar: IMijoz[];
  setMijozlar: (value: IMijoz[]) => void;
}>({
  filiallar: [],
  setFiliallar: (value: IFilial[]) => {},
  mahsulotlar: [],
  setMahsulotlar: (value: IMahsulot[]) => {},
  kategoriyalar: [],
  setKategoriyalar: (value: IKategoriya[]) => {},
  mijozlar: [],
  setMijozlar: (value: IMijoz[]) => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};
