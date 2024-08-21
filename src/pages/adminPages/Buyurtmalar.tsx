import { Box, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Drawer } from "../../components/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { useDataContext } from "../../components/Context";
import { IBuyurtma } from "../../components/Interface";
import { BuyurtmaTable } from "../../components/tables/BuyurtmaTable";
import { BuyurtmaTable2 } from "../../components/tables/buyurtmaTables/buyurtmaTable2";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function Buyurtmalar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue1, setTabValue1] = useState(0);
  const [tabValue2, setTabValue2] = useState(0);
  const [tabDisabled, setTabDisabled] = useState(false);

  const { buyurtmalar, setBuyurtmalar } = useDataContext();

  const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue1(newValue);
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue2(newValue);

    if (newValue === 1) {
      setTabDisabled(true);
    } else {
      setTabDisabled(false);
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
              value={tabValue1}
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
                {...a11yProps(0)}
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
                {...a11yProps(1)}
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
                {...a11yProps(2)}
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
                {...a11yProps(3)}
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
                {...a11yProps(0)}
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
                {...a11yProps(1)}
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
        <CustomTabPanel value={tabValue2} index={0}>
          <CustomTabPanel value={tabValue1} index={0}>
            <BuyurtmaTable status={"yangi"}></BuyurtmaTable>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue1} index={1}>
            <BuyurtmaTable status={"qabul"}></BuyurtmaTable>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue1} index={2}>
            <BuyurtmaTable status={"jonatilgan"}></BuyurtmaTable>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue1} index={3}>
            <BuyurtmaTable status={"yopilgan"}></BuyurtmaTable>
          </CustomTabPanel>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue2} index={1}>
          <>
            <BuyurtmaTable2></BuyurtmaTable2>
          </>
        </CustomTabPanel>

        <Drawer setOpen={setOpenDrawer} open={openDrawer}></Drawer>
      </Box>
    </Box>
  );
}
