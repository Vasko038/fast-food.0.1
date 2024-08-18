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
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDataContext } from "../../components/Context";
import { Drawer } from "../../components/Drawer";
import { Form, Input, message } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IFilial } from "../../components/Interface";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { v4 as uuidv4 } from "uuid";

export function Filiallar() {
	const { filiallar, setFiliallar } = useDataContext();
	const [openDrawer, setOpenDrawer] = useState(false);

	const [editingFilial, setEditingFilial] =
		useState<IFilial | null>(null);

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

	const onFinish = (values: Omit<IFilial, "id">) => {
		if (editingFilial) {
			const updatedFiliallar = filiallar.map((f) =>
				f.id === editingFilial.id ? { ...f, ...values } : f
			);
			setFiliallar(updatedFiliallar);
			message.success("Updated successfully");
		} else {
			setFiliallar([...filiallar, { ...values, id: uuidv4() }]);
			message.success("Created successfully");
		}
		form.resetFields();
		setEditingFilial(null);
		setOpenDrawer(false);
	};

	const onEdit = (filial: IFilial) => {
		setEditingFilial(filial);
		form.setFieldsValue({
			nameUz: filial.nameUz,
			nameRu: filial.nameRu,
			ishVaqt: filial.ishVaqt,
			moljal: filial.moljal,
		});
		setOpenDrawer(true);
	};

	const onDelete = (id: number | string) => {
		const filteredFilial = filiallar.filter((f) => f.id !== id);
		setFiliallar(filteredFilial);
	};

	let filteredFiliallar: IFilial[] = filiallar;

	if (search) {
		filteredFiliallar = filiallar.filter((f) =>
			f.nameUz
				.toLocaleLowerCase()
				.includes(search.toLocaleLowerCase())
		);
	}

	return (
		<Box className="bg-slate-100 w-full h-full">
			<Box className="h-[90px] bg-white ">
				<Grid container className="h-full ">
					<Grid
						item
						xs={2}
						className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
					>
						<Fab
							onClick={() => {
								setEditingFilial(null);
								form.resetFields();
								setOpenDrawer(true);
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
								className="border-0 outline-none flex-1"
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
					<Box className="px-[38px] bg-white shadow-xl py-5">
						<Grid container>
							<Grid item xs={2} className="ps-6">
								Filial nomi (uz)
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Filial nomi (ru)
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>

							<Grid item xs={2}>
								Mo'ljal
							</Grid>

							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>

							<Grid item xs={2}>
								Ish vaqti
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
							{filteredFiliallar.map((f) => {
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
												className="ps-4 flex items-center"
											>
												{f.nameUz}
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
												{f.nameRu}
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
												{f.moljal}
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
														marginRight:
															"12px",
													}}
													onClick={() => {
														onEdit(f);
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
															f.id
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
				<Drawer setOpen={setOpenDrawer} open={openDrawer}>
					<Box
						sx={{
							display: "flex",
							alignItems: "start",
							justifyContent: "between",
							flexDirection: "column",
							padding: "40px 24px",
						}}
					>
						<Typography
							variant="h5"
							className="font-bold"
						>
							Filial
						</Typography>
						<Form
							layout={"vertical"}
							form={form}
							className="mt-5 w-[100%]"
							onFinish={onFinish}
						>
							<Form.Item
								label="Filial nomi uz"
								name={"nameUz"}
								required
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Filial nomi ru"
								name={"nameRu"}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Ish vaqti"
								name={"ishVaqt"}
								required
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Mo'ljal"
								name={"moljal"}
							>
								<Input />
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
