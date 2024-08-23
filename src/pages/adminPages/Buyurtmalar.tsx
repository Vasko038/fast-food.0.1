import { Box, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Drawer } from "../../components/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { BuyurtmaTable } from "../../components/tables/buyurtmaTables/Table";
import { Kanban } from "../../components/tables/buyurtmaTables/KanbanBoard";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function Buyurtmalar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabDisabled, setTabDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.includes("yangi")
    ? 0
    : location.pathname.includes("qabul-qilingan")
    ? 1
    : location.pathname.includes("jonatilgan")
    ? 2
    : location.pathname.includes("yopilgan")
    ? 3
    : 0;
  const tabValue2 = location.pathname.includes("/korinish2") ? 1 : 0;

  const handleChange1 = (_event: React.SyntheticEvent, newValue: number) => {
    setTabDisabled(false);
    switch (newValue) {
      case 0:
        navigate("/admin/buyurtmalar/korinish1/yangi");
        break;
      case 1:
        navigate("/admin/buyurtmalar/korinish1/qabul-qilingan");
        break;
      case 2:
        navigate("/admin/buyurtmalar/korinish1/jonatilgan");
        break;
      case 3:
        navigate("/admin/buyurtmalar/korinish1/yopilgan");
        break;
      default:
        navigate("/admin/buyurtmalar/korinish1/yangi");
        break;
    }
  };

  const handleChange2 = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/buyurtmalar/korinish${newValue + 1}`);
    if (location.pathname.includes("/korinish2")) {
      setTabDisabled(false);
    } else {
      setTabDisabled(true);
    }
  };
  return (
    <Box className="bg-slate-100 w-full h-full">
      <Box className="h-[90px]  bg-white ">
        <Grid container className="h-full">
          <Grid
            item
            xs={2}
            className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
          >
            <Fab
              onClick={() => setOpenDrawer(true)}
              sx={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
              }}
              size="small"
              color="success"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
            <Typography variant="body2"> Yangi Buyurtma Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            className="border-l-8 border-solid border-slate-100 h-full  flex align-middle justify-center"
          >
            <Tabs
              value={tabValue}
              className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
              onChange={handleChange1}
              aria-label="first tabs"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white",
                  height: "100%",
                  color: "black",
                  borderRadius: "250px",
                  zIndex: 1,
                },
              }}
            >
              <Tab
                disableRipple
                disabled={tabDisabled}
                sx={{
                  textTransform: "none",
                  width: "140px",
                  paddingY: 1,
                  zIndex: 2,
                }}
                className="bg-white"
                label="Yangi"
              />
              <Tab
                disableRipple
                disabled={tabDisabled}
                sx={{
                  textTransform: "none",
                  width: "140px",
                  paddingY: 1,
                  zIndex: 2,
                }}
                label="Qabul qilingan"
              />
              <Tab
                disableRipple
                disabled={tabDisabled}
                sx={{
                  textTransform: "none",
                  width: "140px",
                  paddingY: 1,
                  zIndex: 2,
                }}
                label="Jonatilgan"
              />
              <Tab
                disableRipple
                disabled={tabDisabled}
                sx={{
                  textTransform: "none",
                  width: "140px",
                  paddingY: 1,
                  zIndex: 2,
                }}
                label="Yopilgan"
              />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={2}
            className="border-l-8 border-solid border-slate-100 h-full  flex align-middle justify-center"
          >
            <Tabs
              value={tabValue2}
              onChange={handleChange2}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white",
                  height: "100%",
                  color: "black",
                  width: "48px",
                  borderRadius: "50% 50%",
                  zIndex: 1,
                },
              }}
              className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
              aria-label="second tabs"
            >
              <Tab
                sx={{
                  textTransform: "none",
                  minWidth: "48px",
                  maxWidth: "48px",
                  paddingY: 1,
                  marginRight: 1,
                  zIndex: 2,
                }}
                disableRipple
                label={<TableRowsIcon></TableRowsIcon>}
              />
              <Tab
                sx={{
                  textTransform: "none",
                  minWidth: "48px",
                  maxWidth: "48px",
                  marginLeft: 1,
                  paddingY: 1,
                  zIndex: 2,
                }}
                disableRipple
                label={<ViewColumnIcon></ViewColumnIcon>}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 90px)",
          boxSizing: "border-box",
        }}
        className="relative"
      >
        <Routes>
          <Route
            path="*"
            element={<Navigate to="admin/buyurtmalar/korinish1/0" replace />}
          />
          <Route path="korinish1/*" element={<Outlet />}>
            <Route index element={<Navigate to="yangi" replace />} />
            <Route path="yangi" element={<BuyurtmaTable status="yangi" />} />
            <Route
              path="qabul-qilingan"
              element={<BuyurtmaTable status="qabul" />}
            />
            <Route
              path="jonatilgan"
              element={<BuyurtmaTable status="jonatilgan" />}
            />
            <Route
              path="yopilgan"
              element={<BuyurtmaTable status="yopilgan" />}
            />
          </Route>
          <Route path="korinish2" element={<Kanban />} />
        </Routes>
        <Drawer setOpen={setOpenDrawer} open={openDrawer}></Drawer>
      </Box>
    </Box>
  );
}
