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
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "../../components/Drawer";
import MahsulotTable from "../../components/tables/MahsulotTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Popover from "@mui/material/Popover";
import { useDataContext } from "../../components/Context";
import { MahsulotForm } from "../../components/forms/MahsulotForm";

export function Mahsulotlar() {
	const { mahsulotlar, kategoriyalar } = useDataContext();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [popover, setPopover] =
		React.useState<HTMLButtonElement | null>(null);
	const [search, setSearch] = React.useState<string>("");
	const [selectRadio, setSelectRadio] = useState("");
	const handleClickPopover = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setPopover(null);
	};

	let searchData = mahsulotlar;
	if (search !== "") {
		searchData = filteredData().filter(
			(item) =>
				item.name
					.toLocaleLowerCase()
					.includes(search.toLocaleLowerCase()) ||
				item.narx
					.toString()
					.toLocaleLowerCase()
					.includes(search.toLocaleLowerCase()) ||
				item.malumot
					.toLocaleLowerCase()
					.includes(search.toLocaleLowerCase())
		);
	}
	function filteredData() {
		switch (selectRadio) {
			case "narxO":
				return searchData.sort((a, b) => a.narx - b.narx);
			case "narxK":
				return searchData.sort((a, b) => b.narx - a.narx);
			case "nameAZ":
				return searchData.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			case "nameZA":
				return searchData.sort((a, b) =>
					b.name.localeCompare(a.name)
				);
			default:
				return searchData;
		}
	}

	const openPopover = Boolean(popover);
	const PopoverId = openPopover ? "simple-popover" : undefined;

	return (
		<Box className="bg-slate-100 w-full h-full ">
			<Box className="h-[90px] bg-white ">
				<Grid container className="h-full ">
					<Grid
						item
						xs={2}
						className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
					>
						<Fab
							onClick={() => setOpenDrawer(true)}
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
						<Typography variant="body2">
							Yangi Mahsulot Qoshish
						</Typography>
					</Grid>
					<Grid
						item
						xs={10}
						className="border-l-8 border-solid border-slate-100 h-full  flex align-middle  px-5"
					>
						<Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
							<OutlinedInput
								onChange={(e) =>
									setSearch(e.target.value)
								}
								className="border-0 outline-none flex-1"
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
								<IconButton disableRipple>
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
								<FormLabel htmlFor="kategoriya">
									Kategoriyalar
								</FormLabel>
								<Select
									defaultValue={"all"}
									sx={{
										"&.Mui-focused .MuiOutlinedInput-notchedOutline":
											{
												borderColor: "orange",
											},
									}}
									className="mb-3"
									size="small"
									fullWidth
									id="kategoriyda"
								>
									<MenuItem value="all">
										Hammasi
									</MenuItem>
									{kategoriyalar.map((item) => (
										<MenuItem
											key={item.id}
											value={item.id}
										>
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
										value={selectRadio}
										onChange={(e) =>
											setSelectRadio(
												e.target.value
											)
										}
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
									sx={{
										"& .MuiButton-root": {
											textTransform: "none",
										},
									}}
									className="flex gap-4 justify-end"
								>
									<Button
										variant="contained"
										color="inherit"
									>
										Bekor qilish
									</Button>
									<Button
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
				sx={{ height: "calc(100vh - 90px)" }}
				className="relative"
			>
				<MahsulotTable
					searchData={searchData}
					filterData={filteredData}
				></MahsulotTable>
				<Drawer setOpen={setOpenDrawer} open={openDrawer}>
					<MahsulotForm
						setOpenDrawer={setOpenDrawer}
					></MahsulotForm>
				</Drawer>
			</Box>
		</Box>
	);
}
