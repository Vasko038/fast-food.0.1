import React, { useContext } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Fab,
  Typography,
} from "@mui/material";
import { DataContext } from "../../Context";
import { IBuyurtma, IStatus } from "../../Interface";
import { CiBookmark } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { RxPerson } from "react-icons/rx";
import { HiOutlineX } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";

type KanbanColumnProps = {
  status: IStatus;
  children: React.ReactNode;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, children }) => {
  const [, dropRef] = useDrop({
    accept: "kanbanItem",
    drop: () => ({ name: status }),
    collect: (monitor) => ({}),
  });

  return (
    <Box
      ref={dropRef}
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: 1,
        height: "calc(100vh - 125px)",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
};

type KanbanItemProps = {
  id: number | string;
  onDrop: (id: number | string, status: IStatus) => void;
  children: React.ReactNode;
};

const KanbanItem: React.FC<KanbanItemProps> = ({ id, onDrop, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "kanbanItem",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ name: IStatus }>();
      if (item && dropResult) {
        onDrop(item.id, dropResult.name);
      }
    },
  });

  return (
    <Paper
      ref={dragRef}
      sx={{
        padding: 2,
        marginBottom: "10px",
        cursor: "pointer",
        backgroundColor: "white",
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transform: isDragging ? "scale(1.05)" : "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {children}
    </Paper>
  );
};

const channels: IStatus[] = ["yangi", "qabul", "jonatilgan", "yopilgan"];
const labelsMap: Record<IStatus, string> = {
  yangi: "Yangi",
  qabul: "Qabul qilingan",
  jonatilgan: "Jontillgan",
  yopilgan: "Yopilgan",
};
const colorMap: Record<IStatus, string> = {
  yangi: "bg-green-500",
  qabul: "bg-purple-500",
  jonatilgan: "bg-yellow-500",
  yopilgan: "bg-purple-500",
};

export function Kanban() {
  const { buyurtmalar, setBuyurtmalar, mahsulotlar, filiallar, mijozlar } =
    useContext(DataContext);
  function canculateAllPrice(status: string) {
    const statusData = buyurtmalar.filter((item) => item.status === status);
    let allAmount = 0;
    statusData.forEach((item) => {
      item.mahsulotlar.forEach((jtem) => {
        const mahsulot = mahsulotlar.find(
          (item) => item.id === jtem.mahsulotId
        );
        if (mahsulot) allAmount += mahsulot.narx * jtem.count;
      });
    });
    return allAmount.toLocaleString("en-US");
  }
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
  }
  type Status = "yangi" | "qabul" | "jonatilgan" | "yopilgan";

  function handlePrev(id: string | number) {
    const updatedBuyurtmalar = buyurtmalar
      .map((item) => {
        if (item.id === id) {
          if (item.status === "yangi") {
            return null; // "yangi" statusidagi mahsulotni o'chirib tashlash uchun null qaytaradi
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
      .filter((item): item is IBuyurtma => item !== null); // null qiymatlarni olib tashlaydi

    setBuyurtmalar(updatedBuyurtmalar);
  }

  const updateTaskStatus = (id: number | string, status: IStatus) => {
    const buyurtma = buyurtmalar.find((task) => task.id === id);
    if (buyurtma) {
      const taskIndex = buyurtmalar.indexOf(buyurtma);
      const newTasks = update(buyurtmalar, {
        [taskIndex]: { $set: { ...buyurtma, status } },
      });
      setBuyurtmalar(newTasks);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          display: "flex",
          margin: "0 auto",
          paddingTop: "35px",
          paddingX: "35px",
        }}
      >
        {channels.map((channel) => (
          <KanbanColumn key={channel} status={channel}>
            <>
              <Stack direction={"row"} className="mb-3" spacing={2}>
                <Typography>{labelsMap[channel]}</Typography>
                <Chip
                  sx={{ bgcolor: "white" }}
                  label={
                    buyurtmalar.filter((item) => item.status === channel).length
                  }
                  size="small"
                />
              </Stack>
              <Paper
                sx={{
                  width: "100%",
                  padding: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <Box
                  className={`aspect-square h-[15px] ${colorMap[channel]}`}
                  sx={{ borderRadius: "50% 50%" }}
                ></Box>
                <Typography>{canculateAllPrice(channel)} UZS</Typography>
              </Paper>
            </>

            <Box
              sx={{
                height: " calc(100vh - 125px - 46px - 48px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none", // IE and Edge
                "scrollbar-width": "none", // Firefox
              }}
            >
              {buyurtmalar
                .filter((item) => item.status === channel)
                .map((item) => (
                  <KanbanItem
                    key={item.id}
                    id={item.id}
                    onDrop={updateTaskStatus}
                  >
                    <>
                      <Stack
                        direction={"row"}
                        alignContent={"center"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        className="mb-3"
                      >
                        <Stack
                          spacing={2}
                          direction={"row"}
                          alignItems={"center"}
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
                          <IconButton sx={{ bgcolor: "gainsboro" }}>
                            <CiBookmark />
                          </IconButton>
                        </Stack>
                        <div className="flex items-center justify-start gap-2">
                          <GoClock />
                          <p className="text-xl">00:24</p>
                        </div>
                      </Stack>
                      <Divider></Divider>
                      <Stack
                        direction={"row"}
                        className="my-3"
                        spacing={3}
                        alignItems={"center"}
                      >
                        <Box sx={{ fontSize: "25px", color: "gray" }}>
                          <RxPerson></RxPerson>
                        </Box>

                        <div>
                          <Typography variant="h6">
                            {mijozlar.find((i) => i.id === item.userId)?.name}
                          </Typography>
                          <Typography variant="body1">
                            {mijozlar.find((i) => i.id === item.userId)?.phone}
                          </Typography>
                        </div>
                      </Stack>
                      <Stack
                        direction="row"
                        className="my-3"
                        justifyContent={"space-between"}
                      >
                        <div>
                          <Typography
                            display={"block"}
                            variant="body2"
                            color="inherit"
                          >
                            umumiy summa
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight={"700"}
                            color="ActiveBorder"
                          >
                            {canculatePrice(item.id)} UZS
                          </Typography>
                        </div>
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          letterSpacing={2}
                        >
                          <Box className="bg-blue-400 aspect-square rounded-full me-1 h-[13px]"></Box>
                          <Typography>Payme</Typography>
                        </Stack>
                      </Stack>
                      <Divider></Divider>
                      <Stack
                        direction={"row"}
                        className="mt-3"
                        justifyContent={"space-between"}
                      >
                        <div className="mb-4">
                          <p className="text-gray-600">Operator:</p>
                          <p className="text-xl">Komilova M</p>
                        </div>

                        <Fab
                          onClick={() => handlePrev(item.id)}
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
                            "&:hover": { boxShadow: "none" },
                          }}
                        >
                          <HiOutlineX></HiOutlineX>
                        </Fab>
                      </Stack>
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <div>
                          <Typography className="text-gray-600">
                            Filial:
                          </Typography>
                          <Typography className="text-xl font-semibold">
                            {
                              filiallar.find((i) => i.id === item?.filialId)
                                ?.nameUz
                            }
                          </Typography>
                        </div>
                        <Fab
                          disabled={item.status === "yopilgan" ? true : false}
                          onClick={() => handleNext(item.id)}
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
                            "&:hover": { boxShadow: "none" },
                          }}
                        >
                          <IoMdCheckmark></IoMdCheckmark>
                        </Fab>
                      </Stack>
                    </>
                  </KanbanItem>
                ))}
            </Box>
          </KanbanColumn>
        ))}
      </Box>
    </DndProvider>
  );
}
