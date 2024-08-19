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
import BasicModal from "./LogOutModal";
import React, { useContext } from "react";
import Image from "../components/images/Bitmap.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
const items = [
  {
    key: "buyurtmalar",
    icon: <CheckCircleOutlineIcon />,
    label: <Link to={"/buyurtmalar"}>Buyurtmalar</Link>,
  },
  {
    key: "mahsulotlar",
    icon: <Inventory2OutlinedIcon />,
    label: <Link to={"/mahsulotlar"}>Mahsulotlar</Link>,
  },
  {
    key: "kategoriyalar",
    icon: <CategoryIcon />,
    label: <Link to={"/kategoriyalar"}>Kategoriyalar</Link>,
  },
  {
    key: "filiallar",
    icon: <LocationOnOutlinedIcon />,
    label: <Link to={"/filiallar"}>Filiallar</Link>,
  },
  {
    key: "mijozlar",
    icon: <PeopleAltOutlinedIcon />,
    label: <Link to={"/mijozlar"}>Mijozlar</Link>,
  },
  {
    key: "hisobotlar",
    icon: <BarChartOutlinedIcon />,
    label: <Link to={"/hisobotlar"}>Hisobotlar</Link>,
  },
];
export function AdminDrawer() {
  const [index, setIndex] = React.useState(0);
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
          {items.map((item, i) => (
            <ListItem
              className="relative"
              key={item.key}
              sx={{ padding: "0px" }}
            >
              <Button
                onClick={() => {
                  setIndex(i);
                }}
                fullWidth
                sx={{
                  backgroundColor: index === i ? "orange" : "transparent",
                  padding: "10px 20px",
                  borderRadius: "0px 10px 10px 0px",
                  color: index === i ? "white" : "black",
                  transition: "background-color 0.1s",
                  textTransform: "none",
                  textAlign: "left",
                  "&:hover": {
                    backgroundColor: index === i ? "orange" : "transparent",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: index === i ? "white" : "black", // Iconning rangi tugma holatiga qarab o'zgaradi
                    transition: "color 0.1s", // Icon rangiga o'tish animatsiyasi
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

      <BasicModal buttonText="Chiqish" icon={<LogoutIcon></LogoutIcon>}>
        <Box className="text-center">
          <Typography className=" pb-10" variant="h6">
            Rostan ham chiqishni hohlaysizmi
          </Typography>
        </Box>
      </BasicModal>
    </Box>
  );
}
