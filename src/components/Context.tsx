import { useContext } from "react";
import { createContext } from "react";
import {
	IFilial,
	IMahsulot,
	IKategoriya,
	IMijoz,
	IBuyurtma,
	IHodim,
	IRole,
	IBasket,
	IYetkazish,
} from "./Interface";

export const DataContext = createContext<{
	filiallar: IFilial[];
	setFiliallar: (value: IFilial[]) => void;
	mahsulotlar: IMahsulot[];
	setMahsulotlar: (value: IMahsulot[]) => void;
	kategoriyalar: IKategoriya[];
	setKategoriyalar: (value: IKategoriya[]) => void;
	mijozlar: IMijoz[];
	setMijozlar: (value: IMijoz[]) => void;
	buyurtmalar: IBuyurtma[];
	setBuyurtmalar: (value: IBuyurtma[]) => void;
	hodimlar: IHodim[];
	setHodimlar: (value: IHodim[]) => void;
	rollar: IRole[];
	setRollar: (value: IRole[]) => void;
	basket: IBasket[];
	setBasket: (value: IBasket[]) => void;
	yetkazish: IYetkazish[];
	setYetkazish: (value: IYetkazish[]) => void;
}>({
	filiallar: [],
	setFiliallar: (value: IFilial[]) => {},
	mahsulotlar: [],
	setMahsulotlar: (value: IMahsulot[]) => {},
	kategoriyalar: [],
	setKategoriyalar: (value: IKategoriya[]) => {},
	mijozlar: [],
	setMijozlar: (value: IMijoz[]) => {},
	buyurtmalar: [],
	setBuyurtmalar: (value: IBuyurtma[]) => {},
	hodimlar: [],
	setHodimlar: (value: IHodim[]) => {},
	rollar: [],
	setRollar: (value: IRole[]) => {},
	basket: [],
	setBasket: (value: IBasket[]) => {},
	yetkazish: [],
	setYetkazish: (value: IYetkazish[]) => {},
});

export const useDataContext = () => {
	return useContext(DataContext);
};
