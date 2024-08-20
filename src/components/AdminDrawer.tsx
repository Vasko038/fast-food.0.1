import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BasicModal from "./Modal";
import React from "react";
import Image from "../components/images/Bitmap.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { Link, useLocation, useNavigate } from "react-router-dom";
const items = [
  {
    key: "buyurtmalar",
    icon: <CheckCircleOutlineIcon />,
    path: "/buyurtmalar",
    label: "Buyurtmalar",
  },
  {
    key: "mahsulotlar",
    icon: <Inventory2OutlinedIcon />,
    path: "/mahsulotlar",
    label: "Mahsulotlar",
  },
  {
    key: "kategoriyalar",
    icon: <CategoryIcon />,
    path: "/kategoriyalar",
    label: "Kategoriyalar",
  },
  {
    key: "filiallar",
    icon: <LocationOnOutlinedIcon />,
    path: "/filiallar",
    label: "Filiallar",
  },
  {
    key: "mijozlar",
    icon: <PeopleAltOutlinedIcon />,
    path: "/mijozlar",
    label: "Mijozlar",
  },
  {
    key: "hisobotlar",
    icon: <BarChartOutlinedIcon />,
    path: "/hisobotlar",
    label: "Hisobotlar",
  },
  {
    key: "Hodimlar",
    icon: <BarChartOutlinedIcon />,
    path: "/hodimlar",
    label: "Hodimlar",
  },
];

export function AdminDrawer() {
  const navigation = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{ width: "280px", flexShrink: 0 }}
      className="h-screen flex flex-col justify-between "
    >
      <Box>
        <Box className="p-3 flex align-middle gap-3">
          <img src={Image} alt="" />
          <Box className="flex flex-col justify-center">
            <Typography variant="h6">Fast Food</Typography>{" "}
            <Typography variant="body2" color="inherit">
              Online maxsulot sotuvi
            </Typography>
          </Box>
        </Box>

        <List
          sx={{
            "--ListItem-paddingLeft": "0px",
            "--ListItemDecorator-size": "64px",
            "--ListItem-minHeight": "32px",
            "--List-nestedInsetStart": "13px",
            '& [role="button"]': {
              borderRadius: "0 10px 10px 0",
            },
            marginTop: 5,
            padding: "0px",
            borderLeft: "10px solid orange",
            paddingRight: "20px",
          }}
        >
          {items.map((item) => (
            <ListItem key={item.key} sx={{ padding: 0 }}>
              <Button
                component={Link}
                to={`/admin${item.path}`}
                fullWidth
                sx={{
                  backgroundColor:
                    location.pathname === `/admin${item.path}`
                      ? "orange"
                      : "transparent",
                  padding: "10px 20px",
                  borderRadius: "0px 10px 10px 0px",
                  color:
                    location.pathname === `/admin${item.path}`
                      ? "white"
                      : "black",
                  textTransform: "none",
                  textAlign: "left",
                  "&:hover": {
                    backgroundColor:
                      location.pathname === `/admin${item.path}`
                        ? "orange"
                        : "transparent",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === `/admin${item.path}`
                        ? "white"
                        : "black",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <BasicModal
        okFunction={() => {
          navigation("/login");
        }}
        title="Rostan ham chiqishni hohlaysizmi"
        button={
          <Button fullWidth sx={{ textTransform: "none" }}>
            <LogoutIcon></LogoutIcon>Chiqish
          </Button>
        }
      ></BasicModal>
    </Box>
  );
}
