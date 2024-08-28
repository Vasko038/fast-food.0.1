import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { GrSquare } from "react-icons/gr";
import { BiSquareRounded } from "react-icons/bi";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import KategoriyaTable from "../../components/tables/KategoriyaTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Popover from "@mui/material/Popover";
import { KategoriyaForm } from "../../components/forms/KategoriyaForm";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../components/Context";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
export function Kategoriyalar() {
  const [search, setSearch] = React.useState<string>("");
  const [iconSearch, setIconSearch] = useState(false);
  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);
  const [selectRadio, setSelectRadio] = useState("");
  const [filterRadio, setFilterRadio] = useState("");
  const { kategoriyalar } = useContext(DataContext);
  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;
  const [filterAdd, setFilterAdd] = useState(false);
  const [filteredData, setFilteredData] = useState(kategoriyalar);
  const [searchData, setSearchData] = useState(kategoriyalar);
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });
  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
    setSearch("");
  };
  const handleFilterClick = () => {
    setFilterAdd(!filterAdd);
    handleClosePopover();
  };

  const handleCancelFilter = () => {
    setFilterRadio("");
    setFilteredData(kategoriyalar);
    setSearchData(kategoriyalar);
    handleClosePopover();
  };

  useEffect(() => {
    let dataToFilter = [...kategoriyalar];
    switch (filterRadio) {
      case "nameAZ":
        dataToFilter = dataToFilter.sort((a, b) =>
          a.nameUz.localeCompare(b.nameUz)
        );
        break;
      case "nameZA":
        dataToFilter = dataToFilter.sort((a, b) =>
          b.nameUz.localeCompare(a.nameUz)
        );
        break;
      default:
        break;
    }

    setFilteredData(dataToFilter);
  }, [filterAdd, kategoriyalar]);

  useEffect(() => {
    const dataToSearch = filteredData.filter((item) =>
      item.nameUz.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchData(dataToSearch);
  }, [search, filteredData]);

  const handleClosePopover = () => {
    setPopover(null);
  };
  useEffect(() => {
    if (search !== "") {
      setIconSearch(true);
    } else {
      setIconSearch(false);
    }
  }, [search]);
  return (
    <Box className="w-full h-full bg-slate-100">
      <Box className="h-[90px] bg-white ">
        <Grid container className="h-full">
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
              onClick={() =>
                navigate(
                  "?" +
                    queryString.stringify({
                      add: true,
                    })
                )
              }
            >
              <AddIcon />
            </Fab>
            <Typography variant="body2"> Yangi Kategoriya Qoshish</Typography>
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
              <Box sx={{ p: 2 }}>
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
                    value={selectRadio}
                    onChange={(e) => setSelectRadio(e.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="nameAZ"
                      control={
                        <Radio
                          checkedIcon={<GrSquare></GrSquare>}
                          icon={<BiSquareRounded></BiSquareRounded>}
                        />
                      }
                      label="nom bo'yicha (A-Z)"
                    />
                    <FormControlLabel
                      value="nameZA"
                      control={
                        <Radio
                          checkedIcon={<GrSquare></GrSquare>}
                          icon={<BiSquareRounded></BiSquareRounded>}
                        />
                      }
                      label="nom bo'yicha (Z-A)"
                    />
                  </RadioGroup>
                </FormControl>
                <Box
                  sx={{ "& .MuiButton-root": { textTransform: "none" } }}
                  className="flex justify-end gap-4"
                >
                  <Button
                    variant="contained"
                    onClick={handleCancelFilter}
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
      <Box
        sx={{ height: "calc(100vh - 90px)", boxSizing: "border-box" }}
        className="relative"
      >
        <KategoriyaTable data={searchData}></KategoriyaTable>
        <Drawer open={params.add as boolean}>
          <KategoriyaForm></KategoriyaForm>
        </Drawer>
      </Box>
    </Box>
  );
}
