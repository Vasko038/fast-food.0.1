import * as React from "react";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import { useDataContext } from "../Context";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
export default function KategoriyaTable() {
  const { kategoriyalar, setKategoriyalar, mahsulotlar } = useDataContext();
  function handleDelete(id: number | string) {
    const updateData = kategoriyalar.filter((item) => item.id !== id);
    setKategoriyalar(updateData);
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
      <Box sx={{ overflow: "auto", height: 600 }}>
        {kategoriyalar.map((item) => (
          <Box
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
                  sx={{
                    border: "4px solid #EDEFF3",
                    marginRight: "12px",
                  }}
                >
                  <MdOutlineEdit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    border: "4px solid #EDEFF3",
                  }}
                >
                  <LuTrash2 />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
}
