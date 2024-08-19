import {
	Box,
	createTheme,
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { Buyurtmalar } from "./adminPages/Buyurtmalar";
import { Filiallar } from "./adminPages/Filiallar";
import { Kategoriyalar } from "./adminPages/Kategoriyalar";
import { Mahsulotlar } from "./adminPages/Mahsulotlar";
import { Hisobotlar } from "./adminPages/Hisobot";
import { Mijozlar } from "./adminPages/Mijozlar";
import { AdminRoute } from "../components/Context";
import { AdminDrawer } from "../components/AdminDrawer";
import {
	IFilial,
	IKategoriya,
	IMahsulot,
	IMijoz,
} from "../components/Interface";
import {
	FiliallarData,
	KategoriyaData,
	MahsulotData,
	MijozlarData,
} from "../components/Data";
import { DataContext } from "../components/Context";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
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
	const [filiallar, setFiliallar] =
		useState<IFilial[]>(FiliallarData);
	const [mahsulotlar, setMahsulotlar] =
		useState<IMahsulot[]>(MahsulotData);
	const [kategoriyalar, setKategoriyalar] =
		useState<IKategoriya[]>(KategoriyaData);

	const [mijozlar, setMijozlar] = useState<IMijoz[]>(MijozlarData);

	return (
		<BrowserRouter>
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
										element={
											<Navigate
												to="/buyurtmalar"
												replace
											/>
										}
									/>
									<Route
										path="/"
										element={<Outlet />}
									>
										<Route
											path="/buyurtmalar"
											element={<Buyurtmalar />}
										></Route>
										<Route
											path="/mahsulotlar"
											element={<Mahsulotlar />}
										></Route>
										<Route
											path="/kategoriyalar"
											element={
												<Kategoriyalar />
											}
										></Route>
										<Route
											path="/filiallar"
											element={<Filiallar />}
										></Route>
										<Route
											path="/mijozlar"
											element={<Mijozlar />}
										></Route>
										<Route
											path="/hisobotlar"
											element={<Hisobotlar />}
										></Route>
									</Route>
								</Routes>
							</Box>
						</Box>
					</CssBaseline>
				</DataContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
