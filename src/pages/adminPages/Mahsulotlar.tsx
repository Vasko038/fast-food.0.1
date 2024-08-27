import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import MahsulotTable from "../../components/tables/MahsulotTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Popover from "@mui/material/Popover";
import { useDataContext } from "../../components/Context";
import { MahsulotForm } from "../../components/forms/MahsulotForm";
import CloseIcon from "@mui/icons-material/Close";

function Mahsulotlar() {
  const { mahsulotlar, kategoriyalar } = useDataContext();
  const [iconSearch, setIconSearch] = useState(false);
  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [filterRadio, setFilterRadio] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("all");
  const [filteredData, setFilteredData] = useState(mahsulotlar);
  const [searchData, setSearchData] = useState(mahsulotlar);
  const [filterAdd, setFilterAdd] = useState(false);

  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
    setSearch("");
  };

  const handleClosePopover = () => {
    setPopover(null);
  };
  const handleFilterClick = () => {
    setFilterAdd(!filterAdd);
    handleClosePopover();
  };

  const handleCancelFilter = () => {
    setFilterRadio("");
    setFilterCategoryId("all");
    setFilteredData(mahsulotlar);
    setSearchData(mahsulotlar);
    handleClosePopover();
  };

  useEffect(() => {
    let dataToFilter = [...mahsulotlar];
    if (filterCategoryId !== "all") {
      dataToFilter = mahsulotlar.filter(
        (item) => String(item.categoryId) === String(filterCategoryId)
      );
    }
    switch (filterRadio) {
      case "narxO":
        dataToFilter = dataToFilter.sort((a, b) => a.narx - b.narx);
        break;
      case "narxK":
        dataToFilter = dataToFilter.sort((a, b) => b.narx - a.narx);
        break;
      case "nameAZ":
        dataToFilter = dataToFilter.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "nameZA":
        dataToFilter = dataToFilter.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      default:
        break;
    }

    setFilteredData(dataToFilter);
  }, [filterAdd, mahsulotlar]);

  useEffect(() => {
    const dataToSearch = filteredData.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.narx
          .toString()
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        item.malumot.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchData(dataToSearch);
  }, [search, filteredData]);

  useEffect(() => {
    if (search !== "") {
      setIconSearch(true);
    } else {
      setIconSearch(false);
    }
  }, [search]);
  return (
    <Box className="w-full h-full bg-slate-100 ">
      <Box className="h-[90px] bg-white ">
        <Grid container className="h-full ">
          <Grid
            item
            xs={2}
            className="flex items-center justify-center h-full gap-3 px-4 border-l-8 border-solid border-slate-100"
          >
            <Fab
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
            <Typography variant="body2">Yangi Mahsulot Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            className="flex h-full px-5 align-middle border-l-8 border-solid border-slate-100"
          >
            <Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border-0 outline-none"
                id="search"
                name="search"
                type="name"
                placeholder="Search"
                sx={{
                  border: "none",
                  outline: "none",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                }}
              />
              <FormLabel htmlFor="search">
                <IconButton
                  onClick={() => {
                    if (!iconSearch) {
                      document.getElementById("search")?.blur();
                    } else {
                      setTimeout(() => {
                        document.getElementById("search")?.blur();
                      }, 0);
                      setSearch("");
                    }
                    setIconSearch(!iconSearch);
                  }}
                >
                  {iconSearch || search !== "" ? (
                    <CloseIcon />
                  ) : (
                    <SearchOutlinedIcon />
                  )}
                </IconButton>
              </FormLabel>
            </Box>
            <Button
              sx={{
                minWidth: "50px",
                maxWidth: "50px",
                minHeight: "50px",
                maxHeight: "50px",
                bgcolor: "white",
                color: "gray",
                borderRadius: "50% 50%",
                border: "4px solid  rgb(241 245 249)",
                boxShadow: "0 0 0 0",
                marginY: "auto",
                marginX: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: "0 0 0 0",
                },
              }}
              aria-describedby={PopoverId}
              variant="contained"
              onClick={handleClickPopover}
            >
              <FilterAltIcon></FilterAltIcon>
            </Button>
            <Popover
              id={PopoverId}
              open={openPopover}
              anchorEl={popover}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, width: "300px" }}>
                <FormLabel htmlFor="kategoriya">Kategoriyalar</FormLabel>
                <Select
                  value={filterCategoryId}
                  onChange={(e) => setFilterCategoryId(e.target.value)}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "orange",
                    },
                  }}
                  className="mb-3"
                  size="small"
                  fullWidth
                  id="kategoriyda"
                >
                  <MenuItem value="all">Hammasi</MenuItem>
                  {kategoriyalar.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameUz}
                    </MenuItem>
                  ))}
                </Select>
                <FormControl
                  sx={{
                    "& .MuiRadio-root": {
                      "& .MuiSvgIcon-root": {
                        borderRadius: "none",
                      },
                      "&.Mui-checked": {
                        color: "orange",
                      },
                    },
                  }}
                >
                  <RadioGroup
                    value={filterRadio}
                    onChange={(e) => setFilterRadio(e.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="narxO"
                      control={<Radio />}
                      label="Narx bo'yicha (o'sish)"
                    />
                    <FormControlLabel
                      value="narxK"
                      control={<Radio />}
                      label="Narx bo'yicha (kamayish)"
                    />
                    <FormControlLabel
                      value="nameAZ"
                      control={<Radio />}
                      label="nom bo'yicha (A-Z)"
                    />
                    <FormControlLabel
                      value="nameZA"
                      control={<Radio />}
                      label="nom bo'yicha (Z-A)"
                    />
                  </RadioGroup>
                </FormControl>
                <Box
                  sx={{ "& .MuiButton-root": { textTransform: "none" } }}
                  className="flex justify-end gap-4"
                >
                  <Button
                    onClick={handleCancelFilter}
                    variant="contained"
                    color="inherit"
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    onClick={handleFilterClick}
                    sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" } }}
                    variant="contained"
                  >
                    Filter
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "calc(100vh - 90px)" }} className="relative">
        <MahsulotTable data={searchData}></MahsulotTable>
        <Drawer open={false}>
          <MahsulotForm></MahsulotForm>
        </Drawer>
      </Box>
    </Box>
  );
}
export default Mahsulotlar;
