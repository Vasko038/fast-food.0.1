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
	Select,
	MenuItem,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDataContext } from "../../components/Context";
import { Drawer } from "../../components/Drawer";
import { Form, Input, message } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IFilial, IYetkazish } from "../../components/Interface";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { v4 as uuidv4 } from "uuid";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
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
const customIcon = new L.Icon({
	iconUrl: `data:image/svg+xml;base64,${encodedIcon}`,
	iconSize: [54, 54],
	iconAnchor: [12, 24],
	popupAnchor: [0, -24],
});

interface DraggableMarkerProps {
	position: [number, number];
	setPosition: (value: [number, number]) => void;
}

function DraggableMarker({
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
					const latlng = (
						event.target as L.Marker
					).getLatLng();
					setPosition([latlng.lat, latlng.lng]);
				},
			}}
		>
			<Popup>
				Marker <br /> O'zbekiston
			</Popup>
		</Marker>
	);
}

export function YetkazishNarxi() {
	const { yetkazish, setYetkazish, filiallar, hodimlar } =
		useDataContext();

	const location = useLocation();

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	const editingYetkazish = useMemo(
		() => yetkazish.find((item) => item.id === params.id),
		[yetkazish, params.id]
	);

	const navigate = useNavigate();

	const [filteredYetkazish, setFilteredYetkazish] =
		useState<IYetkazish[]>(yetkazish);

	const [form] = Form.useForm();

	const [search, setSearch] = useState<string | null>(null);

	const [popover, setPopover] =
		React.useState<HTMLButtonElement | null>(null);

	const handleClickPopover = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setPopover(null);
	};

	const openPopover = Boolean(popover);
	const PopoverId = openPopover ? "simple-popover" : undefined;

	const onFinish = async (values: Omit<IYetkazish, "id">) => {
		const processedValues = {
			...values,
			price: Number(values.price),
		};

		if (editingYetkazish) {
			const updatedYetkazish = yetkazish.map((f) =>
				f.id === editingYetkazish.id
					? { ...f, ...processedValues }
					: f
			);
			await axios.patch(
				`https://1df7137a16f23f61.mokky.dev/yetkazish/${editingYetkazish.id}`,
				{ ...editingYetkazish, ...processedValues }
			);
			setYetkazish(updatedYetkazish);
			message.success("Updated successfully");
		} else {
			await axios.post(
				`https://1df7137a16f23f61.mokky.dev/yetkazish`,
				{ ...processedValues }
			);
			setYetkazish([
				...yetkazish,
				{ ...processedValues, id: uuidv4() },
			]);
			message.success("Created successfully");
		}
		form.resetFields();
		navigate("?" + queryString.stringify({}));
	};

	useEffect(() => {
		const filialSelect = document.querySelector(
			"#filialSelect"
		) as HTMLSelectElement;
		const operatorSelect = document.querySelector(
			"#operatorSelect"
		) as HTMLSelectElement;
		if (editingYetkazish) {
			form.setFieldsValue(editingYetkazish);
			filialSelect.value = String(editingYetkazish.filialId);
			operatorSelect.value = String(
				editingYetkazish.operatorId
			);
		}
	}, [editingYetkazish]);

	useEffect(() => {
		let dataToFilter = [...yetkazish];

		if (search) {
			dataToFilter = dataToFilter.filter((h) => {
				const filial = filiallar.find(
					(f) => f.id === h.filialId
				);
				return filial?.nameUz
					.toLowerCase()
					.includes(search.toLowerCase());
			});
		}

		setFilteredYetkazish(dataToFilter);
	}, [search, yetkazish]);

	const onDelete = async (id: number | string) => {
		const filteredYetkazish = yetkazish.filter(
			(f) => f.id !== id
		);
		await axios.delete(
			`https://1df7137a16f23f61.mokky.dev/yetkazish/${id}`
		);
		setYetkazish(filteredYetkazish);
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
						<Typography variant="body2">
							Yangi Yetkazish Qoshish
						</Typography>
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
							<Typography sx={{ p: 2 }}>
								The content of the Popover.
							</Typography>
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
								Filial nomi
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Operator
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Narxi (1 km uchun)
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Minimal narx
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
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
							{filteredYetkazish.map((y) => {
								const filial = filiallar.find(
									(f) => f.id === y.filialId
								);
								const operator = hodimlar.find(
									(h) => h.id === y.operatorId
								);
								return (
									<Box
										sx={{
											marginBlock: "10px",
											backgroundColor: "white",
											borderRadius: "10px",
											boxShadow:
												"0px 2px 2px 0px #AEB0B550",
											padding: "10px",
										}}
									>
										<Grid container>
											<Grid
												item
												xs={2}
												className="flex items-center ps-3"
											>
												{filial?.nameUz}
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>
											<Grid
												item
												xs={2}
												className="flex items-center"
											>
												{operator?.lastName}{" "}
												{operator?.firstName.charAt(
													0
												)}
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>
											<Grid
												item
												xs={2}
												className="flex items-center"
											>
												{y.price.toLocaleString(
													"en-Us"
												)}{" "}
												UZS
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>
											<Grid
												item
												xs={2}
												className="flex items-center ps-4"
											>
												{(
													y.price * 5
												).toLocaleString(
													"en-Us"
												)}{" "}
												UZS
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
														marginRight:
															"12px",
													}}
													onClick={() => {
														navigate(
															"?" +
																queryString.stringify(
																	{
																		edit: true,
																		id: y.id,
																	}
																)
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
														onDelete(
															y.id
														);
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
				<Drawer
					open={
						(params.add as boolean) ||
						(params.edit as boolean)
					}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "start",
							justifyContent: "between",
							flexDirection: "column",
							padding: "24px",
						}}
					>
						<Typography
							variant="h5"
							className="font-bold"
						>
							Yetkazish
						</Typography>
						<Form
							layout={"vertical"}
							form={form}
							className="mt-5 w-[100%]"
							onFinish={onFinish}
						>
							<Form.Item
								label="Filial"
								name="filialId"
								rules={[
									{
										required: true,
										message:
											"Iltimos filialni tanlang",
									},
								]}
							>
								<Select
									id="filialSelect"
									label=" "
									style={{
										width: "100%",
										height: "40px",
									}}
									onChange={(event) => {
										form.setFieldsValue({
											filialId:
												event.target.value,
										});
									}}
								>
									{filiallar.map((f) => {
										return (
											<MenuItem
												key={f.id}
												value={f.id}
											>
												{f.nameUz}
											</MenuItem>
										);
									})}
								</Select>
							</Form.Item>
							<Form.Item
								label="Operator"
								name="operatorId"
								rules={[
									{
										required: true,
										message:
											"Iltimos operatorni tanlang",
									},
								]}
							>
								<Select
									id="operatorSelect"
									label=" "
									style={{
										width: "100%",
										height: "40px",
									}}
									onChange={(event) => {
										form.setFieldsValue({
											operatorId:
												event.target.value,
										});
									}}
								>
									{hodimlar
										.filter(
											(f) =>
												f.role === "Operator"
										)
										.map((f) => {
											return (
												<MenuItem
													key={f.id}
													value={f.id}
												>
													{f.lastName}{" "}
													{f.firstName.charAt(
														0
													)}
												</MenuItem>
											);
										})}
								</Select>
							</Form.Item>
							<Form.Item
								label="Narx (1 km uchun)"
								name="price"
								rules={[
									{
										required: true,
										message:
											"Iltimos narxni kiriting",
									},
								]}
							>
								<Input type="number" />
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
