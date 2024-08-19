import React, { useState } from "react";
import "./App.css";
import { LoginPage } from "./pages/Login";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AdminPage } from "./pages/Admin";
import { MainRoute } from "./components/Context";

const pages: Record<string, React.ReactNode> = {
	LoginPage: <LoginPage></LoginPage>,
	AdminPage: <AdminPage></AdminPage>,
};

const defaultTheme = createTheme();

function App() {
	const [activePage, setActivePage] = useState("LoginPage");
	return (
		<ThemeProvider theme={defaultTheme}>
			<MainRoute.Provider value={{ activePage, setActivePage }}>
				<CssBaseline>{pages[activePage]}</CssBaseline>
			</MainRoute.Provider>
		</ThemeProvider>
	);
}

export default App;
