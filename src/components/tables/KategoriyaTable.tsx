import * as React from "react";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { Drawer } from "../Drawer";
import { KategoriyaForm } from "../forms/KategoriyaForm";
import BasicModal from "../Modal";
import { IKategoriya } from "../Interface";
import { useDataContext } from "../Context";
export default function KategoriyaTable({ data }: { data: IKategoriya[] }) {
  const { mahsulotlar, setKategoriyalar } = useDataContext();
  const [editId, setEditId] = React.useState<number | string>("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  function handleDelete(id: number | string) {
    const updateData = data.filter((item) => item.id !== id);
    setKategoriyalar(updateData);
  }
  function handleEdit(id: number | string) {
    setEditId(id);
    setOpenDrawer(true);
  }
  return (
    <React.Fragment>
      <Box className="py-5">
        <Box className=" py-3 px-[50px]   shadow-xl  bg-white">
          <Grid container>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              Kategoriya {`(UZ)`}
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Kategoriya {`(RU)`}
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: 2, height: "100%" }}
              />
              Mahsulotlar Soni
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
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
            key={item.id}
            sx={{
              marginBottom: "10px",
              marginInline: "40px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 2px 2px 0px #AEB0B550",
              padding: "10px",
            }}
          >
            <Grid container>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                {item.nameUz}
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {item.nameRu}
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 2, height: "100%" }}
                />
                {mahsulotlar.filter((m) => m.categoryId === item.id).length}
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
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
                  okFunction={() => handleDelete(item.id)}
                  title="Haqiqatdan kategoriya ochirilsinmi"
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
        <KategoriyaForm id={editId} />
      </Drawer>
    </React.Fragment>
  );
}
