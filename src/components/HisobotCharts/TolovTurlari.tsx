import {
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import React, { useMemo, useState } from "react";
import { useDataContext } from "../Context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import { IBuyurtma } from "../Interface";
const buttonStyles = {
  minWidth: "40px",
  maxWidth: "40px",
  minHeight: "40px",
  maxHeight: "40px",
  bgcolor: "white",
  color: "gray",
  borderRadius: "50% 50%",
  border: "4px solid rgb(241 245 249)",
  boxShadow: "0 0 0 0",
  marginY: "auto",
  marginX: 2,
  "&:hover": {
    bgcolor: "white",
    boxShadow: "0 0 0 0",
  },
};

const allowedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const allowedMonths = [1, 2, 3];

function shouldDisableDate(date: Dayjs | null) {
  if (!date) return true;

  const day = date.date();
  const month = date.month() + 1;

  return !(allowedDays.includes(day) && allowedMonths.includes(month));
}

export function TolovTuriChart() {
  const { buyurtmalar, filiallar, mahsulotlar, yetkazish } = useDataContext();
  const [filial, setFilial] = useState<string | number>("hammasi");
  const [anchorEl, setAnchorEl] = React.useState<{
    [key: string]: HTMLButtonElement | null;
  }>({
    calendar: null,
    filter: null,
  });
  const filterBuyurtmalar = useMemo(() => {
    const data = buyurtmalar.filter((item) => item.filialId === filial);
    if (data.length !== 0) {
      return data;
    } else return buyurtmalar;
  }, [filial, buyurtmalar]);
  function allPrice(data: IBuyurtma[]) {
    let AllPrice = 0;
    data.forEach((item) => {
      item.mahsulotlar.forEach((jtem) => {
        const mahsulot = mahsulotlar.find(
          (ftem) => ftem.id === jtem.mahsulotId
        );
        if (mahsulot) {
          AllPrice += mahsulot.narx * jtem.count;
        }
      });
      const yetkazishNarxi = yetkazish.find(
        (ytem) => ytem.id === item.yetkazishId
      );
      if (yetkazishNarxi) {
        AllPrice += yetkazishNarxi.price * 5;
      }
    });

    return AllPrice;
  }
  function getPersentage(type: "naqd" | "terminal" | "payme") {
    const TolovTuriData = filterBuyurtmalar.filter(
      (item) => item.tolovTuri === type
    );
    let percentage =
      (allPrice(TolovTuriData) / allPrice(filterBuyurtmalar)) * 100;
    return `${percentage.toFixed(2)}`;
  }
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handlePopoverClose = (type: string) => {
    setAnchorEl((prev) => ({ ...prev, [type]: null }));
  };

  const isOpen = (type: string) => Boolean(anchorEl[type]);
  const popoverId = (type: string) =>
    isOpen(type) ? `${type}-popover` : undefined;

  return (
    <Paper elevation={2} sx={{ borderRadius: "10px", overflow: "hidden" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center "}
        className="px-5 py-3"
        sx={{ boxShadow: 1 }}
      >
        <Typography>
          Tolov Turlari |
          {(() => {
            const filialTuri = filiallar.find((item) => item.id === filial);
            if (filialTuri) {
              return filialTuri.nameUz;
            }
            return "Hammasi";
          })()}
        </Typography>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Typography>Date</Typography>
          <Button
            sx={buttonStyles}
            variant="contained"
            aria-describedby={popoverId("calendar")}
            onClick={(event) => handlePopoverOpen(event, "calendar")}
          >
            <CalendarTodayOutlinedIcon />
          </Button>

          <Popover
            id={popoverId("calendar")}
            open={isOpen("calendar")}
            anchorEl={anchorEl.calendar}
            onClose={() => handlePopoverClose("calendar")}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar shouldDisableDate={shouldDisableDate} />
              </LocalizationProvider>
            </Box>
          </Popover>

          <Button
            sx={buttonStyles}
            variant="contained"
            aria-describedby={popoverId("filter")}
            onClick={(event) => handlePopoverOpen(event, "filter")}
          >
            <FilterAltIcon />
          </Button>

          <Popover
            id={popoverId("filter")}
            open={isOpen("filter")}
            anchorEl={anchorEl.filter}
            onClose={() => handlePopoverClose("filter")}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ p: 2, width: "300px" }}>
              <FormLabel htmlFor="filial">Filiallar</FormLabel>
              <Select
                id="filial"
                onChange={(e) => setFilial(e.target.value)}
                value={filial}
                size="small"
                fullWidth
              >
                <MenuItem value="hammasi">Hammasi</MenuItem>
                {filiallar.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nameUz}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Popover>
        </Stack>
      </Stack>
      <Box className="px-5 py-3">
        <Grid container spacing={2} className="w-full py-3">
          <Grid item xs={12} className="flex">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-orange-400 aspect-square rounded-full me-1 h-[13px]"></Box>
              <Typography>Terminal</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box
                  sx={{ width: `${getPersentage("terminal")}%` }}
                  className={`h-full bg-orange-400`}
                ></Box>
              </Box>
              <Typography>{getPersentage("terminal")}&nbsp;%</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className="flex items-center">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-green-400 aspect-square rounded-full  me-1 h-[13px]"></Box>
              <Typography>Naqd</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box
                  sx={{ width: `${getPersentage("naqd")}%` }}
                  className="h-full bg-green-400 "
                ></Box>
              </Box>
              <Typography>{getPersentage("naqd")}&nbsp;%</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className="flex">
            <Grid item xs={5} className="flex items-center gap-1">
              <Box className=" bg-blue-400 aspect-square rounded-full me-1 h-[13px]"></Box>
              <Typography>Payme</Typography>
            </Grid>
            <Grid item xs={7} className="flex items-center gap-2">
              <Box className="w-full h-[12px] overflow-hidden rounded-full bg-slate-100">
                <Box
                  sx={{ width: `${getPersentage("payme")}%` }}
                  className="h-full bg-blue-400"
                ></Box>
              </Box>
              <Typography>{getPersentage("payme")}&nbsp;%</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Paper elevation={0} sx={{ bgcolor: "grey.200", p: 1 }}>
          {allPrice(filterBuyurtmalar).toLocaleString("en-US")} UZS
        </Paper>
      </Box>
    </Paper>
  );
}
