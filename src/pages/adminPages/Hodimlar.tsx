import {
  Box,
  Button,
  Fab,
  Grid,
  Typography,
  IconButton,
  Divider,
  OutlinedInput,
  FormLabel,
  Popover,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { GrSquare } from "react-icons/gr";
import { BiSquareRounded } from "react-icons/bi";
import AddIcon from "@mui/icons-material/Add";
import { useDataContext } from "../../components/Context";
import { Drawer } from "../../components/Drawer";
import { Form, Input, message } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IHodim } from "../../components/Interface";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export function Hodimlar() {
  const { hodimlar, setHodimlar, rollar } = useDataContext();

  const [form] = Form.useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const [filterRadio, setFilterRadio] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterAdd, setFilterAdd] = useState(false);
  const [filteredHodimlar, setFilteredHodimlar] = useState<IHodim[]>(hodimlar);

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });

  const editingHodim = useMemo(
    () => hodimlar.find((item) => item.id === params.id),
    [hodimlar, params.id]
  );

  const [search, setSearch] = useState<string | null>(null);

  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopover(null);
  };

  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;

  const handleFilterClick = () => {
    setFilterAdd(!filterAdd);
    handleClosePopover();
  };

  const handleCancelFilter = () => {
    setFilterRadio("");
    setFilterRole("all");
    setFilteredHodimlar(hodimlar);
    handleClosePopover();
  };

  const onFinish = async (values: Omit<IHodim, "id">) => {
    if (editingHodim) {
      const updatedHodimlar = hodimlar.map((m) =>
        m.id === editingHodim.id ? { ...m, ...values } : m
      );
      setHodimlar(updatedHodimlar);
      await axios.patch(
        `https://1df7137a16f23f61.mokky.dev/hodimlar/${editingHodim.id}`,
        { ...editingHodim, ...values }
      );
      message.success("Updated successfully");
    } else {
      setHodimlar([...hodimlar, { ...values, id: uuidv4() }]);
      await axios.post(`https://1df7137a16f23f61.mokky.dev/hodimlar`, {
        ...values,
      });
      message.success("Created successfully");
    }
    form.resetFields();
    navigate("?" + queryString.stringify({}));
  };

  useEffect(() => {
    if (editingHodim) form.setFieldsValue(editingHodim);
  }, [editingHodim]);

  const onDelete = async (id: number | string) => {
    const filteredHodimlar = hodimlar.filter((m) => m.id !== id);
    setHodimlar(filteredHodimlar);
    await axios.delete(`https://1df7137a16f23f61.mokky.dev/hodimlar/${id}`);
    message.success("Deleted successfully");
  };

  useEffect(() => {
    let dataToFilter = [...hodimlar];

    if (filterRole !== "all") {
      dataToFilter = dataToFilter.filter(
        (item) => String(item.role) === String(filterRole)
      );
    }

    switch (filterRadio) {
      case "nameAZ":
        dataToFilter = dataToFilter.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        break;
      case "nameZA":
        dataToFilter = dataToFilter.sort((a, b) =>
          b.firstName.localeCompare(a.firstName)
        );
        break;
      default:
        break;
    }

    if (search) {
      dataToFilter = dataToFilter.filter((hodim) =>
        hodim.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    setFilteredHodimlar(dataToFilter);
  }, [filterRole, filterRadio, search, hodimlar]);

  const handleChange = (event: SelectChangeEvent) => {
    form.setFieldsValue({ role: event.target.value });
  };

  return (
    <Box className="w-full h-full bg-slate-100">
      <Box className="h-[90px] bg-white">
        <Grid container className="h-full ">
          <Grid
            item
            xs={2}
            className="flex items-center justify-center h-full gap-3 px-4 border-l-8 border-solid border-slate-100"
          >
            <Fab
              onClick={() => {
                navigate(
                  "?" +
                    queryString.stringify({
                      add: true,
                    })
                );
                form.resetFields();
              }}
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
            <Typography variant="body2">Yangi Hodim Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            className="flex h-full px-5 align-middle border-l-8 border-solid border-slate-100"
          >
            <Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
              <OutlinedInput
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
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
                <IconButton>
                  <SearchOutlinedIcon></SearchOutlinedIcon>
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
                <FormLabel htmlFor="kategoriya">Lavozim</FormLabel>
                <Select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
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
                  {rollar.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
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
                      value="nameAZ"
                      control={
                        <Radio
                          checkedIcon={<GrSquare></GrSquare>}
                          icon={<BiSquareRounded></BiSquareRounded>}
                        />
                      }
                      label="Ism (A-Z)"
                    />
                    <FormControlLabel
                      value="nameZA"
                      control={
                        <Radio
                          checkedIcon={<GrSquare></GrSquare>}
                          icon={<BiSquareRounded></BiSquareRounded>}
                        />
                      }
                      label="Ism (Z-A)"
                    />
                  </RadioGroup>
                </FormControl>
                <Box
                  sx={{
                    "& .MuiButton-root": {
                      textTransform: "none",
                    },
                  }}
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
                    sx={{
                      bgcolor: "orange",
                      "&:hover": {
                        bgcolor: "orange",
                      },
                    }}
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
        sx={{
          height: "calc(100vh - 90px)",
          boxSizing: "border-box",
        }}
        className="relative"
      >
        <Box className="pt-5">
          <Box className="px-[38px] bg-white shadow-xl py-3">
            <Grid container>
              <Grid item xs={3} className="ps-6">
                Hodim
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={3}>
                Telefon raqami
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={2}>
                Lavozim
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={2}>
                Actions
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              paddingInline: "38px",
              height: "525px",
              marginTop: "15px",
              overflowY: "auto",
            }}
          >
            <Box sx={{ width: "100%" }}>
              {filteredHodimlar.map((m) => (
                <Box
                  key={m.id}
                  sx={{
                    marginBlock: "10px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 2px 0px #AEB0B550",
                    padding: "10px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={3} className="flex items-center ps-4">
                      {m.firstName} {m.lastName}
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: 2 }}
                    />
                    <Grid item xs={3} className="flex items-center">
                      {m.phone}
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: 2 }}
                    />
                    <Grid item xs={2} className="flex items-center">
                      {m.role}
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: 2 }}
                    />
                    <Grid item xs={2}>
                      <IconButton
                        sx={{
                          border: "4px solid #EDEFF3",
                          marginRight: "12px",
                        }}
                        onClick={() => {
                          navigate(
                            "?" +
                              queryString.stringify({
                                edit: true,
                                id: m.id,
                              })
                          );
                        }}
                      >
                        <MdOutlineEdit />
                      </IconButton>
                      <IconButton
                        sx={{
                          border: "4px solid #EDEFF3",
                        }}
                        onClick={() => {
                          onDelete(m.id);
                        }}
                      >
                        <LuTrash2 />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Drawer open={(params.add as boolean) || (params.edit as boolean)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "between",
              flexDirection: "column",
              padding: "40px 24px",
            }}
          >
            <Typography variant="h5" className="font-bold">
              Hodim
            </Typography>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Form.Item
                label="Hodim ismi"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Ismni kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Hodim familiyasi"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Familiyani kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Telefon raqam"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamni kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lavozim"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Lavozimni tanlang!",
                  },
                ]}
              >
                <Select
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  placeholder="Lavozimni tanlang"
                  id="demo-simple-select"
                  defaultValue={form.getFieldValue("role") || ""}
                  label="Lavozim"
                  onChange={handleChange}
                >
                  {rollar.map((r) => {
                    return (
                      <MenuItem value={r.name} key={r.id}>
                        {r.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
            <Button
              color="success"
              variant="contained"
              style={{ backgroundColor: "#20D472" }}
              onClick={() => {
                form.submit();
              }}
            >
              Saqlash
            </Button>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
