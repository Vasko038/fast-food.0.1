import React from "react";
import "./App.css";
import { LoginPage } from "./pages/Login";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AdminPage } from "./pages/Admin";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { NotFound } from "./pages/NotFound";

const defaultTheme = createTheme();

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin/*" element={<AdminPage />} />
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Route>
    )
  );
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline>
        <RouterProvider router={routes}></RouterProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
