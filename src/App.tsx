import React from "react";
import "./App.css";
import { LoginPage } from "./pages/Login";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AdminPage } from "./pages/Admin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </CssBaseline>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
