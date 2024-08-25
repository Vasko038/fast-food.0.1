import { Box, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { Drawer } from "../../components/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { BuyurtmaTable } from "../../components/tables/buyurtmaTables/Table";
import { Kanban } from "../../components/tables/buyurtmaTables/KanbanBoard";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { BuyurtmaForm } from "../../components/forms/BuyurtmaForm";
import queryString from "query-string";

export function Buyurtmalar() {
	const [tabDisabled, setTabDisabled] = useState(false);
	const [active, setActive] = useState("yangi");
	const [index, setIndex] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		location.pathname.includes("table/yangi")
			? setIndex(0)
			: location.pathname.includes("table/qabul-qilingan")
			? setIndex(1)
			: location.pathname.includes("table/jonatilgan")
			? setIndex(2)
			: location.pathname.includes("table/yopilgan")
			? setIndex(3)
			: setIndex(0);
	}, [location.pathname]);

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	const handleChange1 = (
		_event: React.SyntheticEvent,
		newValue: number
	) => {
		switch (newValue) {
			case 0:
				navigate("/admin/buyurtmalar/table/yangi");
				setActive("yangi");
				console.log(active);
				break;
			case 1:
				navigate("/admin/buyurtmalar/table/qabul-qilingan");
				setActive("qabul-qilingan");
				console.log(active);
				break;
			case 2:
				navigate("/admin/buyurtmalar/table/jonatilgan");
				setActive("jonatilgan");
				console.log(active);
				break;
			case 3:
				navigate("/admin/buyurtmalar/table/yopilgan");
				setActive("yopilgan");
				console.log(active);
				break;
			default:
				navigate("/admin/buyurtmalar/table/yangi");
				console.log(active);
				break;
		}
	};
	const tabValue2 = location.pathname.includes("board") ? 1 : 0;

	const handleChange2 = (
		_event: React.SyntheticEvent,
		newValue: number
	) => {
		if (newValue === 1) {
			navigate(`/admin/buyurtmalar/board`);
			setTabDisabled(true);
		} else if (newValue === 0) {
			navigate(`/admin/buyurtmalar/table/yangi`);
			setTabDisabled(false);
		}
	};

	return (
		<Box className="bg-slate-100 w-full h-full">
			<Box className="h-[90px]  bg-white ">
				<Grid container className="h-full">
					<Grid
						item
						xs={2}
						className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
					>
						<Fab
							onClick={() =>
								// setOpenDrawer(true)
								navigate(
									"?" +
										queryString.stringify({
											add: true,
										})
								)
							}
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
							{" "}
							Yangi Buyurtma Qoshish
						</Typography>
					</Grid>
					<Grid
						item
						xs={8}
						className="border-l-8 border-solid border-slate-100 h-full  flex align-middle justify-center"
					>
						<Tabs
							value={index}
							className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
							onChange={handleChange1}
							aria-label="first tabs"
							TabIndicatorProps={{
								style: {
									backgroundColor: "white",
									height: "100%",
									color: "black",
									borderRadius: "250px",
									zIndex: 1,
								},
							}}
						>
							<Tab
								disableRipple
								disabled={tabDisabled}
								sx={{
									textTransform: "none",
									width: "140px",
									paddingY: 1,
									zIndex: 2,
								}}
								className="bg-white"
								label="Yangi"
							/>
							<Tab
								disableRipple
								disabled={tabDisabled}
								sx={{
									textTransform: "none",
									width: "140px",
									paddingY: 1,
									zIndex: 2,
								}}
								label="Qabul qilingan"
							/>
							<Tab
								disableRipple
								disabled={tabDisabled}
								sx={{
									textTransform: "none",
									width: "140px",
									paddingY: 1,
									zIndex: 2,
								}}
								label="Jonatilgan"
							/>
							<Tab
								disableRipple
								disabled={tabDisabled}
								sx={{
									textTransform: "none",
									width: "140px",
									paddingY: 1,
									zIndex: 2,
								}}
								label="Yopilgan"
							/>
						</Tabs>
					</Grid>
					<Grid
						item
						xs={2}
						className="border-l-8 border-solid border-slate-100 h-full  flex align-middle justify-center"
					>
						<Tabs
							value={tabValue2}
							onChange={handleChange2}
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
							className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
							aria-label="second tabs"
						>
							<Tab
								sx={{
									textTransform: "none",
									minWidth: "48px",
									maxWidth: "48px",
									paddingY: 1,
									marginRight: 1,
									zIndex: 2,
								}}
								disableRipple
								label={
									<TableRowsIcon></TableRowsIcon>
								}
							/>
							<Tab
								sx={{
									textTransform: "none",
									minWidth: "48px",
									maxWidth: "48px",
									marginLeft: 1,
									paddingY: 1,
									zIndex: 2,
								}}
								disableRipple
								label={
									<ViewColumnIcon></ViewColumnIcon>
								}
							/>
						</Tabs>
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
				<Routes>
					<Route
						path="/"
						element={
							<Navigate
								to={`table/${active}`}
								replace
							/>
						}
					/>
					<Route path="table">
						<Route
							index
							element={<Navigate to={active} replace />}
						/>
						<Route
							path="yangi"
							element={<BuyurtmaTable status="yangi" />}
						/>
						<Route
							path="qabul-qilingan"
							element={<BuyurtmaTable status="qabul" />}
						/>
						<Route
							path="jonatilgan"
							element={
								<BuyurtmaTable status="jonatilgan" />
							}
						/>
						<Route
							path="yopilgan"
							element={
								<BuyurtmaTable status="yopilgan" />
							}
						/>
					</Route>
					<Route path="board" element={<Kanban />} />
				</Routes>
				<Drawer width="1000px" open={params.add as boolean}>
					<BuyurtmaForm />
				</Drawer>
			</Box>
		</Box>
	);
}
