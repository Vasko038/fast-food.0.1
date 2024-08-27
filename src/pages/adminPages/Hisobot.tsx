import {
	Box,
	Button,
	Fab,
	FormLabel,
	Grid,
	IconButton,
	MenuItem,
	OutlinedInput,
	Popover,
	Select,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { IoMdArchive } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";

import {
	Navigate,
	Route,
	Routes,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { MainChartPage } from "../../components/HisobotCharts/Main";
import { HisobotTable } from "../../components/HisobotCharts/HisobotTable";
import { IBuyurtma } from "../../components/Interface";
import { useDataContext } from "../../components/Context";

export function Hisobotlar() {
	const { buyurtmalar, filiallar, mijozlar } = useDataContext();

	const [popover, setPopover] =
		React.useState<HTMLButtonElement | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		if (location.pathname.includes("/chart")) {
			setTabValue(0);
		} else if (location.pathname.includes("/table")) {
			setTabValue(1);
		}
	}, [location.pathname]);
	const handleClickPopover = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setPopover(null);
	};

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: number
	) => {
		setTabValue(newValue);
		navigate(
			newValue === 0
				? "/admin/hisobotlar/chart"
				: "/admin/hisobotlar/table"
		);
	};

	const openPopover = Boolean(popover);
	const PopoverId = openPopover ? "simple-popover" : undefined;

	const yopilganBuyurtmalar: IBuyurtma[] = useMemo(() => {
		return buyurtmalar.filter((f) => f.status === "yopilgan");
	}, [buyurtmalar]);

	const [filterFilial, setFilterFilial] = useState("all");
	const [filterTolovTuri, setFilterTolovTuri] = useState("all");
	const [filterMijoz, setFilterMijoz] = useState("all");
	const [filteredBuyurtmalar, setFilteredBuyurtmalar] = useState<
		IBuyurtma[]
	>(yopilganBuyurtmalar);

	const [search, setSearch] = useState<string | null>(null);

	const handleCancelFilter = () => {
		setFilterFilial("all");
		setFilterTolovTuri("all");
		setFilterMijoz("all");
		setFilteredBuyurtmalar(yopilganBuyurtmalar);
		handleClosePopover();
	};

	useEffect(() => {
		let dataToFilter = [...yopilganBuyurtmalar];

		if (filterFilial !== "all") {
			dataToFilter = dataToFilter.filter(
				(item) =>
					String(item.filialId) === String(filterFilial)
			);
		}

		if (filterTolovTuri !== "all") {
			dataToFilter = dataToFilter.filter(
				(item) =>
					String(item.tolovTuri) === String(filterTolovTuri)
			);
		}

		if (filterMijoz !== "all") {
			dataToFilter = dataToFilter.filter(
				(item) => String(item.userId) === String(filterMijoz)
			);
		}

		if (search) {
			dataToFilter = dataToFilter.filter((item) => {
				const filial = filiallar.find(
					(f) => f.id === item.filialId
				);
				const user = mijozlar.find(
					(m) => m.id === item.userId
				);

				console.log({ search });
				console.log({ filial });
				console.log({ user });

				return (
					(user?.name &&
						user.name
							.toLowerCase()
							.includes(search.toLowerCase())) ||
					(filial?.nameUz &&
						filial.nameUz
							.toLowerCase()
							.includes(search.toLowerCase()))
				);
			});
		}

		setFilteredBuyurtmalar(dataToFilter);
	}, [filterFilial, filterMijoz, filterTolovTuri, search]);

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
						>
							<AutorenewOutlinedIcon />
						</Fab>
						<Typography variant="body2">
							Malumotlarni Yangilash
						</Typography>
					</Grid>
					<Grid
						item
						xs={8}
						className="flex h-full px-5 align-middle border-l-8 border-solid border-slate-100"
					>
						<Box className="rounded-full bg-slate-100 w-[300px] flex justify-between items-center px-2 my-4 ">
							<OutlinedInput
								disabled={
									tabValue === 1 ? false : true
								}
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
							<FormLabel htmlFor="scccearch">
								<IconButton
									disabled={
										tabValue === 1 ? false : true
									}
								>
									<SearchOutlinedIcon></SearchOutlinedIcon>
								</IconButton>
							</FormLabel>
						</Box>
						<Button
							disabled={tabValue === 1 ? false : true}
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
								<FormLabel>Filial</FormLabel>
								<Select
									value={filterFilial}
									onChange={(e) =>
										setFilterFilial(
											e.target.value
										)
									}
									sx={{
										"&.Mui-focused .MuiOutlinedInput-notchedOutline":
											{
												borderColor: "orange",
											},
									}}
									className="mb-3"
									size="small"
									fullWidth
								>
									<MenuItem value="all">
										Hammasi
									</MenuItem>
									{filiallar.map((item) => (
										<MenuItem
											key={item.id}
											value={item.id}
										>
											{item.nameUz}
										</MenuItem>
									))}
								</Select>
								<FormLabel>Tolov turi</FormLabel>
								<Select
									value={filterTolovTuri}
									onChange={(e) =>
										setFilterTolovTuri(
											e.target.value
										)
									}
									sx={{
										"&.Mui-focused .MuiOutlinedInput-notchedOutline":
											{
												borderColor: "orange",
											},
									}}
									className="mb-3"
									size="small"
									fullWidth
								>
									<MenuItem value="all">
										Hammasi
									</MenuItem>
									<MenuItem value="payme">
										Payme
									</MenuItem>
									<MenuItem value="terminal">
										Terminal
									</MenuItem>
									<MenuItem value="naqd">
										Naqd
									</MenuItem>
								</Select>
								<FormLabel>Mijoz</FormLabel>
								<Select
									value={filterMijoz}
									onChange={(e) =>
										setFilterMijoz(e.target.value)
									}
									sx={{
										"&.Mui-focused .MuiOutlinedInput-notchedOutline":
											{
												borderColor: "orange",
											},
									}}
									className="mb-3"
									size="small"
									fullWidth
								>
									<MenuItem value="all">
										Hammasi
									</MenuItem>
									{mijozlar.map((item) => (
										<MenuItem
											key={item.id}
											value={item.id}
										>
											{item.name}
										</MenuItem>
									))}
								</Select>

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
										onClick={handleClosePopover}
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
					<Grid
						className="flex h-full px-5 border-l-8 border-solid border-slate-100"
						item
						xs={2}
					>
						<Tabs
							value={tabValue}
							onChange={handleChange}
							TabIndicatorProps={{
								style: {
									backgroundColor: "white",
									height: "100%",
									color: "black",
									width: "48px",
									borderRadius: "50% 50%",
									zIndex: 1,
								},
							}}
							className="align-middle bg-slate-100 my-3 mx-auto mt-[14px] rounded-full p-2"
							aria-label="second tabs"
						>
							<Tab
								sx={{
									textTransform: "none",
									minWidth: "48px",
									maxWidth: "48px",
									paddingY: 1,
									fontSize: "20px",
									marginRight: 1,
									zIndex: 2,
								}}
								disableRipple
								label={<FaChartPie />}
							/>
							<Tab
								sx={{
									textTransform: "none",
									minWidth: "48px",
									maxWidth: "48px",
									marginLeft: 1,
									fontSize: "20px",
									paddingY: 1,
									zIndex: 2,
								}}
								disableRipple
								label={<IoMdArchive />}
							/>
						</Tabs>
					</Grid>
				</Grid>
			</Box>
			<Box
				sx={{ height: "calc(100vh - 90px)" }}
				className="relative"
			>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="chart" replace />}
					/>
					<Route
						path="chart"
						element={<MainChartPage></MainChartPage>}
					/>
					<Route
						path="table"
						element={
							<HisobotTable
								filteredBuyurtmalar={
									filteredBuyurtmalar
								}
							></HisobotTable>
						}
					/>
				</Routes>
			</Box>
		</Box>
	);
}
