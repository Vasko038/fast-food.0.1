import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { useDataContext } from "../Context";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { MahsulotForm } from "../forms/MahsulotForm";
import { Drawer } from "../Drawer";
import { IMahsulot } from "../Interface";
import BasicModal from "../Modal";
export default function MahsulotTable({ data }: { data: IMahsulot[] }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | string>("");
  const { mahsulotlar, setMahsulotlar, kategoriyalar } = useDataContext();
  function handleDelete(id: number | string) {
    const UpdateData = mahsulotlar.filter((item) => item.id !== id);
    setMahsulotlar(UpdateData);
  }
  function handleEdit(id: number | string) {
    setSelectedId(id);
    setOpenDrawer(true);
  }
  return (
    <React.Fragment>
      <Box className="py-5 flex">
        <Box className="py-3 pl-[50px] pr-[65px]   flex-1 shadow-xl  bg-white">
          <Grid container>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              Mahsulot
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Kategoriya
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Narxi
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Qoshimcha
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Action
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ overflow: "auto", height: "calc(100vh - 180px)" }}>
        {data.map((item) => (
          <Box
            sx={{
              marginBottom: "10px",
              marginInline: "40px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 2px 2px 0px #AEB0B550",
              padding: "10px",
              //   "&:hover": {
              //     transform: "scale(1.03)",
              //     boxShadow: "0px 4px 4px 0px #AEB0B550",
              //   },
            }}
          >
            <Grid container>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={item.image}></Avatar>
                <Typography className="ps-2"> {item.name}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {kategoriyalar.find((k) => k.id === item.categoryId)
                  ? kategoriyalar.find((k) => k.id === item.categoryId)?.nameUz
                  : "-"}
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {item.narx.toLocaleString("uz-UZ")} UZS
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                <Typography
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.malumot}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                <IconButton
                  onClick={() => handleEdit(item.id)}
                  sx={{
                    border: "4px solid #EDEFF3",
                    marginRight: "12px",
                  }}
                >
                  <MdOutlineEdit />
                </IconButton>
                <BasicModal
                  okFunction={() => {
                    handleDelete(item.id);
                  }}
                  title="Haqiqatdan mahsulot ochirilsinmi"
                  button={
                    <IconButton
                      sx={{
                        border: "4px solid #EDEFF3",
                      }}
                    >
                      <LuTrash2 />
                    </IconButton>
                  }
                ></BasicModal>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
      <Drawer setOpen={setOpenDrawer} open={openDrawer}>
        <MahsulotForm setOpenDrawer={setOpenDrawer} id={selectedId} />
      </Drawer>
    </React.Fragment>
  );
}
