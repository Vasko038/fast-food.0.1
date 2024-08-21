import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import Image from "../components/images/3390.png";
import { AdminData } from "../components/Data";
import { useNavigate } from "react-router-dom";
export function LoginPage() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    severity: "error" | "success";
  } | null>(null);
  const data: { email: string; password: string } = {
    password: password,
    email: email,
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAlertMessage(null);
    if (!email || !password) {
      setAlertMessage({
        message: "Malumotlar to'liq kiritilmagan.",
        severity: "error",
      });
    } else if (AdminData.filter((item) => item === data)) {
      setAlertMessage({ message: "Xush kelibsiz!", severity: "success" });
      navigation("/admin");
    } else {
      setAlertMessage({
        message: "Malumotlar xato kiritildi.",
        severity: "error",
      });
    }
  };
  return (
    <Fragment>
      <Grid container className="relative" style={{ width: "100%" }}>
        <Grid item xs={12} md={7} lg={8}>
          <img
            className="h-[100vh] w-[100%] object-cover object-center"
            src={Image}
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Box className="flex flex-col font-bold justify-center px-10 h-full ">
            <Typography variant="h5" component={"h1"} gutterBottom>
              Tizimga xush kelibsiz !
            </Typography>
            <Typography
              color="inherit"
              variant="body1"
              component="h1"
              gutterBottom
            >
              Tizimga kirish uchun, login va parol orqali autentifikatsiya
              jarayonidan oting
            </Typography>
            <Box component={"form"} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    label="Enter Email"
                    autoFocus
                    className="mb-5"
                    type="email"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    label="Enter Password"
                    autoFocus
                    className="mb-5"
                    type="password"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    size="large"
                  >
                    Tizimga kirish
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {alertMessage && (
          <Alert
            className="absolute top-0 right-0"
            sx={{ mt: 2 }}
            severity={alertMessage.severity}
          >
            {alertMessage.message}
          </Alert>
        )}
      </Grid>
    </Fragment>
  );
}
