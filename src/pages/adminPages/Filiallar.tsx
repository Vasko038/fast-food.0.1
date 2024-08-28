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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { GrSquare } from "react-icons/gr";
import { BiSquareRounded } from "react-icons/bi";
import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDataContext } from "../../components/Context";
import { Drawer } from "../../components/Drawer";
import { Form, Input, message } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IFilial } from "../../components/Interface";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { v4 as uuidv4 } from "uuid";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const getIcon = (color: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.15 6.5 11 7 11s7-6.85 7-11c0-3.87-3.13-7-7-7zm0 13c-1.93 0-3.5-2.07-3.5-3.5S10.07 8 12 8s3.5 2.07 3.5 3.5S13.93 15 12 15zm0-5.5c-1.03 0-1.88.85-1.88 1.88S10.97 13 12 13s1.88-.85 1.88-1.88S13.03 8.5 12 8.5z" fill="${color}"/>
</svg>
`;

const svgString = getIcon("#FF0000");
const encodedIcon = btoa(svgString);

// Yangi ikonkani yaratish
export const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${encodedIcon}`,
  iconSize: [54, 54],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export interface DraggableMarkerProps {
  position: [number, number];
  setPosition: (value: [number, number]) => void;
}

export function DraggableMarker({
  position,
  setPosition,
}: DraggableMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker
      position={position}
      icon={customIcon}
      draggable={true}
      eventHandlers={{
        dragend: (event) => {
          const latlng = (event.target as L.Marker).getLatLng();
          setPosition([latlng.lat, latlng.lng]);
        },
      }}
    ></Marker>
  );
}

export function Filiallar() {
  const { filiallar, setFiliallar } = useDataContext();

  const location = useLocation();

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });

  const editingFilial = filiallar.find((item) => item.id === params.id);

  const [position1, setPosition1] = useState<[number, number]>(
    editingFilial ? editingFilial.cardinate : [41.31115, 69.27951]
  );
  const navigate = useNavigate();

  const [filterRadio, setFilterRadio] = useState("");
  const [filterAdd, setFilterAdd] = useState(false);
  const [filteredFiliallar, setFilteredFiliallar] =
    useState<IFilial[]>(filiallar);

  const [form] = Form.useForm();
  const [search, setSearch] = useState<string | null>(null);

  const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopover(event.currentTarget);
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
    setFilteredFiliallar(filiallar);
    handleClosePopover();
  };

  const openPopover = Boolean(popover);
  const PopoverId = openPopover ? "simple-popover" : undefined;

  const onFinish = async (values: Omit<IFilial, "id">) => {
    if (editingFilial) {
      const updatedFiliallar = filiallar.map((f) =>
        f.id === editingFilial.id
          ? { ...f, ...values, cardinate: position1 }
          : f
      );

      await axios.patch(
        `https://1df7137a16f23f61.mokky.dev/filiallar/${editingFilial.id}`,
        { ...editingFilial, ...values, cardinate: position1 }
      );
      setFiliallar(updatedFiliallar);
      message.success("Updated successfully");
    } else {
      await axios.post(`https://1df7137a16f23f61.mokky.dev/filiallar`, {
        ...values,
        cardinate: position1,
      });
      setFiliallar([
        ...filiallar,
        { ...values, id: uuidv4(), cardinate: position1 },
      ]);
      message.success("Created successfully");
    }
    form.resetFields();
    navigate("?" + queryString.stringify({}));
  };

  useEffect(() => {
    if (editingFilial) {
      form.setFieldsValue(editingFilial);
      setPosition1(editingFilial.cardinate);
    } else {
      setPosition1([41.31115, 69.27951]);
    }
  }, [editingFilial]);

  useEffect(() => {
    let dataToFilter = [...filiallar];

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

    if (search) {
      dataToFilter = dataToFilter.filter((hodim) =>
        hodim.nameUz.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    setFilteredFiliallar(dataToFilter);
  }, [filterRadio, search, filiallar]);

  const onDelete = async (id: number | string) => {
    const filteredFilial = filiallar.filter((f) => f.id !== id);
    await axios.delete(`https://1df7137a16f23f61.mokky.dev/filiallar/${id}`);
    setFiliallar(filteredFilial);
  };

  return (
    <Box className="w-full h-full bg-slate-100">
      <Box className="h-[90px] bg-white ">
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
            <Typography variant="body2">Yangi Filial Qoshish</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            className="flex h-full px-5 align-middle border-l-8 border-solid border-slate-100"
          >
            <Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
              <OutlinedInput
                className="flex-1 border-0 outline-none"
                id="search"
                name="search"
                type="name"
                placeholder="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
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
                      label="Filial nomi (A-Z)"
                    />
                    <FormControlLabel
                      value="nameZA"
                      control={
                        <Radio
                          checkedIcon={<GrSquare></GrSquare>}
                          icon={<BiSquareRounded></BiSquareRounded>}
                        />
                      }
                      label="Filial nomi (Z-A)"
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
              <Grid item xs={2} className="ps-6">
                Filial nomi (uz)
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={2}>
                Filial nomi (ru)
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={2}>
                Mo'ljal
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
              <Grid item xs={2}>
                Ish vaqti
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
            <Box
              sx={{
                width: "100%",
              }}
            >
              {filteredFiliallar.map((f) => {
                return (
                  <Box
                    sx={{
                      marginBlock: "10px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 2px 0px #AEB0B550",
                      padding: "10px",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={2} className="flex items-center ps-4">
                        {f.nameUz}
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ marginX: 2 }}
                      />
                      <Grid item xs={2} className="flex items-center">
                        {f.nameRu}
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ marginX: 2 }}
                      />
                      <Grid item xs={2} className="flex items-center">
                        {f.moljal}
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ marginX: 2 }}
                      />
                      <Grid item xs={2} className="flex items-center">
                        {f.ishVaqt}
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
                        >
                          <LocationOnIcon />
                        </IconButton>
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
                                  id: f.id,
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
                            onDelete(f.id);
                          }}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
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
              padding: "24px",
            }}
          >
            <Typography variant="h5" className="font-bold">
              Filial
            </Typography>
            <Form
              layout={"vertical"}
              form={form}
              className="mt-5 w-[100%]"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[{ required: true, message: "Nomini tanlang!" }]}
                label="Filial nomi uz"
                name={"nameUz"}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Nomini tanlang!" }]}
                label="Filial nomi ru"
                name={"nameRu"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "ish Vaqt oraligini tanlang!" },
                ]}
                label="Ish vaqti"
                name={"ishVaqt"}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Moljalni tanlang!" }]}
                label="Mo'ljal"
                name={"moljal"}
              >
                <Input />
              </Form.Item>
            </Form>
            <MapContainer
              key={position1.toString()}
              center={position1}
              zoom={20}
              style={{ height: "180px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <DraggableMarker
                position={position1}
                setPosition={setPosition1}
              ></DraggableMarker>
            </MapContainer>
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
