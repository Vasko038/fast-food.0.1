import {
  Box,
  Divider,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GoClock } from "react-icons/go";
import { HiOutlineX } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import { LuClipboard } from "react-icons/lu";
import { LuTruck } from "react-icons/lu";
import React, { useContext } from "react";
import { DataContext } from "../../Context";
import { RxPerson } from "react-icons/rx";
import { IBuyurtma } from "../../Interface";

export function KanbanDescription({
  id,
  closeDrawer,
}: {
  id: number | string;
  closeDrawer: (value: boolean) => void;
}) {
  const {
    buyurtmalar,
    filiallar,
    setBuyurtmalar,
    hodimlar,
    mijozlar,
    mahsulotlar,
  } = useContext(DataContext);
  const buyurtma = buyurtmalar.find((item) => item.id === id);

  function canculatePrice(id: number | string) {
    const buyurtma = buyurtmalar.find((item) => item.id === id);
    let summa = 0;
    if (buyurtma) {
      buyurtma.mahsulotlar.forEach((item) => {
        const mahsulot = mahsulotlar.find(
          (jtem) => jtem.id === item.mahsulotId
        );
        if (mahsulot) {
          summa += mahsulot.narx * item.count;
        }
      });
    }
    return summa.toLocaleString("en-US");
  }

  type Status = "yangi" | "qabul" | "jonatilgan" | "yopilgan";
  function handlePrev(id: string | number) {
    const updatedBuyurtmalar = buyurtmalar
      .map((item) => {
        if (item.id === id) {
          if (item.status === "yangi") {
            return null;
          } else {
            let newStatus: Status = item.status;

            switch (newStatus) {
              case "qabul":
                newStatus = "yangi";
                break;
              case "jonatilgan":
                newStatus = "qabul";
                break;
              case "yopilgan":
                newStatus = "jonatilgan";
                break;
              default:
                break;
            }

            return { ...item, status: newStatus };
          }
        }
        return item;
      })
      .filter((item): item is IBuyurtma => item !== null);
    setBuyurtmalar(updatedBuyurtmalar);
    closeDrawer(false);
  }
  function handleNext(id: string | number) {
    const updatedBuyurtmalar = buyurtmalar.map((item) => {
      if (item.id === id) {
        let newStatus = item.status;

        switch (item.status) {
          case "yangi":
            newStatus = "qabul";
            break;
          case "qabul":
            newStatus = "jonatilgan";
            break;
          case "jonatilgan":
            newStatus = "yopilgan";
            break;
          case "yopilgan":
            newStatus = "yopilgan";
            break;
          default:
            break;
        }

        return { ...item, status: newStatus };
      }
      return item;
    });
    setBuyurtmalar(updatedBuyurtmalar);
    closeDrawer(false);
  }
  return (
    <Stack
      className="h-[100%]"
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Box className="flex-grow">
        <Box className="p-6 ">
          <Stack
            direction={"row"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"space-between"}
            className="mb-3"
          >
            <Box
              sx={{
                bgcolor: " #22c55e ",
                color: "white",
                height: "40px",
              }}
              className="w-[70px] bg-green-500 rounded-full flex justify-center items-center"
            >
              7777
            </Box>
            <div className="flex items-center justify-start gap-2">
              <GoClock />
              <div>
                <Typography sx={{ display: "blok" }} variant={"body2"}>
                  {buyurtma?.date.split(" ")[0]}
                </Typography>
                <Typography sx={{ textAlign: "right" }} variant={"body2"}>
                  {buyurtma?.date.split(" ")[1]}
                </Typography>
              </div>
            </div>
          </Stack>
          <Paper sx={{ bgcolor: "grey.200", p: 2, mb: 3 }} elevation={0}>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <Box sx={{ fontSize: "25px", color: "gray" }}>
                <RxPerson></RxPerson>
              </Box>
              <Box>
                <Typography variant="h6">
                  {mijozlar.find((item) => item.id === buyurtma?.userId)?.name}
                </Typography>
                <Typography>
                  {mijozlar.find((item) => item.id === buyurtma?.userId)?.phone}
                </Typography>
              </Box>
            </Stack>
          </Paper>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <div>
              <Typography>Operator</Typography>
              <Typography variant="body2" color="inherit">
                {(() => {
                  const operator = hodimlar.find(
                    (item) => item.id === buyurtma?.hodimId
                  );
                  if (operator)
                    return `${operator.lastName} ${operator.firstName[0]}`;
                  else return "-";
                })()}
              </Typography>
            </div>
            <div>
              <Typography>Filial</Typography>
              <Typography variant="body2" color="inherit">
                {(() => {
                  const filial = filiallar.find(
                    (item) => item.id === buyurtma?.filialId
                  );
                  if (filial) return filial.nameUz;
                  else return "-";
                })()}
              </Typography>
            </div>
          </Stack>
          <Divider sx={{ mt: 3 }}></Divider>
        </Box>

        <Grid
          container
          className="px-6 py-2"
          sx={{ boxShadow: 1, bgcolor: "grey.200" }}
        >
          <Grid item xs={6}>
            <Typography>Mahsulotlar</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Narxlar</Typography>
          </Grid>
        </Grid>
        <Box className="px-6 pt-4">
          <Box
            sx={{ height: "calc(100vh - 663px)" }}
            className="overflow-y-auto"
          >
            <Grid container>
              {buyurtma &&
                buyurtma.mahsulotlar.map((jtem) => {
                  const mahsulot = mahsulotlar.find(
                    (item) => item.id === jtem.mahsulotId
                  );
                  if (mahsulot) {
                    return (
                      <React.Fragment key={mahsulot.id}>
                        <Grid item xs={6} sx={{ minHeight: "30px" }}>
                          <Typography>{mahsulot.name}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ minHeight: "30px" }}>
                          <Typography>{`${jtem.count} * ${mahsulot.narx} UZS`}</Typography>
                        </Grid>
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                })}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="p-6">
        <Paper sx={{ bgcolor: "grey.200", p: 2, mb: 3 }}>
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <LuClipboard />{" "}
              <p className="text-lg">
                {buyurtma ? canculatePrice(buyurtma.id) : "-"} UZS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LuTruck />
              <p className="text-lg">
                {buyurtma ? buyurtma.dostavka : "-"} UZS
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 me-4">
            <p className="text-lg">Payme</p>
          </div>
        </Paper>
        <Stack direction={"row"} spacing={3}>
          <Fab
            onClick={() => (buyurtma ? handlePrev(buyurtma.id) : "")}
            sx={{
              boxShadow: "none",
              border: "5px solid #EDEFF3",
              bgcolor: "white",
              minWidth: "50px",
              minHeigth: "50px",
              fontWeight: "700",
              aspectRatio: "1/1",
              fontSize: "25px",
              color: "gray",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            <HiOutlineX></HiOutlineX>
          </Fab>
          <Fab
            disabled={buyurtma?.status === "yopilgan" ? true : false}
            onClick={() => (buyurtma ? handleNext(buyurtma.id) : "")}
            sx={{
              boxShadow: "none",
              border: "5px solid #EDEFF3",
              bgcolor: "white",
              minWidth: "50px",
              minHeigth: "50px",
              fontWeight: "700",
              aspectRatio: "1/1",
              fontSize: "25px",
              color: "gray",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            <IoMdCheckmark></IoMdCheckmark>
          </Fab>
        </Stack>
      </Box>
    </Stack>
  );
}
