import {
	Box,
	Button,
	Fab,
	Grid,
	Typography,
	IconButton,
	Divider,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDataContext } from "../../components/Context";
import { Drawer } from "../../components/Drawer";
import { Form, Input, message } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IFilial } from "../../components/Interface";
import { v4 as uuidv4 } from "uuid";

export function Filiallar() {
	const { filiallar, setFiliallar } = useDataContext();
	const [openDrawer, setOpenDrawer] = useState(false);

	const [editingFilial, setEditingFilial] =
		useState<IFilial | null>(null);

	const [form] = Form.useForm();

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

	return (
		<Box className="bg-slate-100 w-full h-full">
			<Box className="h-[90px] bg-white ">
				<Grid container className="h-full">
					<Grid
						item
						xs={2}
						className="border-l-8 border-solid border-slate-100 h-full px-4 flex gap-3 items-center justify-center"
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
							onClick={() => {
								setEditingFilial(null);
								setOpenDrawer(true);
							}}
						>
							<AddIcon />
						</Fab>
						<Typography variant="body2">
							{" "}
							Yangi Filial Qoshish
						</Typography>
					</Grid>
					<Grid
						item
						xs={10}
						className="border-l-8 border-solid border-slate-100 h-full"
					>
						Search
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
							{filiallar.map((f) => {
								return (
									<Box
										sx={{
											marginBlock: "10px",
											backgroundColor: "white",
											borderRadius: "10px",
											boxShadow:
												"0px 2px 2px 0px #AEB0B550",
											padding: "20px 10px",
										}}
									>
										<Grid container>
											<Grid
												item
												xs={2}
												className="ps-4"
											>
												{f.nameUz}
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>
											<Grid item xs={2}>
												{f.nameRu}
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>

											<Grid item xs={2}>
												{f.moljal}
											</Grid>

											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>

											<Grid item xs={2}>
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
