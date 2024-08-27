import {
	Box,
	Grid,
	IconButton,
	MenuItem,
	Select,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDataContext } from "../Context";
import { Form, message } from "antd";
import { BuyurtmaFormTableCard } from "../tables/buyurtmaTables/BuyurtmaCard";
import { v4 as uuidv4 } from "uuid";
import { PresentDay } from "../tables/buyurtmaTables/Functions";
import { IBuyurtma } from "../Interface";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export const BuyurtmaForm = () => {
	const {
		buyurtmalar,
		setBuyurtmalar,
		mahsulotlar,
		mijozlar,
		kategoriyalar,
		filiallar,
		hodimlar,
		basket,
		setBasket,
		yetkazish,
	} = useDataContext();

	const [form] = Form.useForm();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const navigate = useNavigate();

	const totalSum = basket.reduce((acc, item) => {
		const mahsulot = mahsulotlar.find(
			(m) => m.id === item.mahsulotId
		);
		if (mahsulot) {
			return acc + mahsulot.narx * item.count;
		}
		return acc;
	}, 0);

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ pt: 2 }}>{children}</Box>
				)}
			</div>
		);
	}

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const [tabValue, setTabValue] = React.useState(0);

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: number
	) => {
		setTabValue(newValue);
	};

	const onFinish = async () => {
		if (isSubmitting) return;
		if (!basket.length) {
			message.error("Iltimos mahsulot tanlang");
			return;
		}

		setIsSubmitting(true);

		const values = form.getFieldsValue();

		try {
			const response = await axios.get(
				"https://1df7137a16f23f61.mokky.dev/buyurtmaSoni"
			);

			console.log({ response });

			const buyurtmaSoni = response.data[0].number as number;

			console.log({ buyurtmaSoni });

			await axios.patch(
				"https://1df7137a16f23f61.mokky.dev/buyurtmaSoni/1",
				{
					number: buyurtmaSoni + 1,
				}
			);

			const newBuyurtma: IBuyurtma = {
				...values,
				manzil: "",
				status: "yangi",
				saqlangan: false,
				mahsulotlar: [...basket],
				date: PresentDay(),
				buyurtmaSoni: buyurtmaSoni + 1,
			};

			setBuyurtmalar([...buyurtmalar, newBuyurtma]);

			await axios.post(
				"https://1df7137a16f23f61.mokky.dev/buyurtmalar",
				newBuyurtma
			);

			message.success("Buyurtma muvaffaqiyatli qo'shildi!");

			// Resetting the form and state
			setBasket([]);
			form.resetFields();
			navigate("?" + queryString.stringify({}));
		} catch (error) {
			message.error("Buyurtma yaratishda xatolik yuz berdi!");
			console.error("Error fetching data:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const deleteFormAndBasket = () => {
		form.resetFields();
		setBasket([]);
	};

	return (
		<Box sx={{ width: "100%", height: "100%", padding: "30px" }}>
			<Grid container spacing={3}>
				<Grid item xs={8}>
					<Typography variant="h6" component="h4">
						Yangi buyurtma qo'shish
					</Typography>
					<Tabs
						value={tabValue}
						className="items-center bg-slate-100 my-3 mt-[14px] rounded-full p-2"
						onChange={handleChange}
						variant="scrollable"
						scrollButtons="auto"
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
						{kategoriyalar.map((k, index) => (
							<Tab
								key={k.id} // Added key prop
								disableRipple
								{...a11yProps(index)}
								sx={{
									textTransform: "none",
									width: "140px",
									paddingY: 1,
									zIndex: 2,
								}}
								className="bg-white"
								label={k.nameUz}
							/>
						))}
					</Tabs>
					<div>
						{kategoriyalar.map((k, index) => {
							const products = mahsulotlar.filter(
								(m) => m.categoryId === k.id
							);
							return (
								<CustomTabPanel
									key={k.id} // Added key prop
									value={tabValue}
									index={index}
								>
									<Box
										sx={{
											height: "calc(100vh - 90px - 200px)",
											overflowY: "auto",
										}}
									>
										<Grid container spacing={2}>
											{products.map((m) => (
												<BuyurtmaFormTableCard
													product={m}
													key={m.id}
												/>
											))}
										</Grid>
									</Box>
								</CustomTabPanel>
							);
						})}
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="flex items-center justify-between">
						<Typography variant="h6" component="h4">
							Buyurtma ro'yxati
						</Typography>
						<IconButton
							sx={{ bgcolor: "grey.200" }}
							onClick={() => {
								deleteFormAndBasket();
							}}
						>
							<LuTrash2 />
						</IconButton>
					</div>
					<Box
						sx={{
							border: "1px solid #EDEFF3",
							borderRadius: "15px",
							width: "100%",
							padding: "15px",
						}}
					>
						{basket.map((b) => {
							const mahsulot = mahsulotlar.find(
								(m) => m.id === b.mahsulotId
							);

							return (
								<div
									className="flex items-center justify-between mb-2"
									key={b.mahsulotId}
								>
									<p>{mahsulot?.name}</p>
									<p>
										{b.count}*
										{mahsulot?.narx.toLocaleString(
											"en-US"
										)}{" "}
										UZS
									</p>
								</div>
							);
						})}
						<div
							className="bg-[#EDEFF3] w-[90%] mx-auto"
							style={{
								borderRadius: "10px",
								padding: "10px",
							}}
						>
							<p>Umumiy summa</p>
							<p className="text-xl">
								<span className="font-bold">
									{totalSum.toLocaleString("en-US")}
								</span>{" "}
								UZS
							</p>
						</div>
					</Box>
					<Form
						onFinish={onFinish}
						form={form}
						layout="vertical"
						className="mt-3"
					>
						<Form.Item
							label="Mijoz"
							name="userId"
							rules={[
								{
									required: true,
									message:
										"Iltimos mijozni tanlang",
								},
							]}
						>
							<Select
								id="demo-simple-select"
								label=" "
								style={{
									width: "100%",
									height: "40px",
								}}
								onChange={(event) => {
									form.setFieldsValue({
										userId: event.target.value,
									});
								}}
							>
								{mijozlar
									.filter((f) => f.active)
									.map((m) => (
										<MenuItem
											key={m.id}
											value={m.id}
										>
											{m.name}
										</MenuItem>
									))}
							</Select>
						</Form.Item>
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
								label=" "
								style={{
									width: "100%",
									height: "40px",
								}}
								onChange={(event) => {
									form.setFieldsValue({
										filialId: event.target.value,
									});
								}}
							>
								{filiallar.map((m) => (
									<MenuItem key={m.id} value={m.id}>
										{m.nameUz}
									</MenuItem>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							label="Operator"
							name="hodimId"
							rules={[
								{
									required: true,
									message:
										"Iltimos operatorni tanlang",
								},
							]}
						>
							<Select
								label=" "
								style={{
									width: "100%",
									height: "40px",
								}}
								onChange={(event) => {
									form.setFieldsValue({
										hodimId: event.target.value,
									});
								}}
							>
								{hodimlar.map((m) => (
									<MenuItem key={m.id} value={m.id}>
										{m.lastName}{" "}
										{m.firstName.charAt(0)}
									</MenuItem>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							label="Tolov turi"
							name="tolovTuri"
							rules={[
								{
									required: true,
									message:
										"Iltimos tolov turini tanlang",
								},
							]}
						>
							<Select
								label=" "
								style={{
									width: "100%",
									height: "40px",
								}}
								onChange={(event) => {
									form.setFieldsValue({
										tolovTuri: event.target.value,
									});
								}}
							>
								<MenuItem value={"payme"}>
									Payme
								</MenuItem>
								<MenuItem value={"naqd"}>
									Naqd tolov
								</MenuItem>
								<MenuItem value={"terminal"}>
									Terminal
								</MenuItem>
							</Select>
						</Form.Item>
						<Form.Item
							label="Yetkazish"
							name="yetkazishId"
							rules={[
								{
									required: true,
									message:
										"Iltimos yetkazishni tanlang",
								},
							]}
						>
							<Select
								label=" "
								style={{
									width: "100%",
									height: "40px",
								}}
								onChange={(event) => {
									form.setFieldsValue({
										yetkazishId:
											event.target.value,
									});
								}}
							>
								{yetkazish.map((y) => {
									const filial = filiallar.find(
										(f) => f.id === y.filialId
									);
									return (
										<MenuItem
											key={y.id}
											value={y.id}
										>
											<div className="flex items-center justify-start">
												<p>
													{filial?.nameUz}
												</p>
												<p className="ms-3">
													{y.price} UZS
												</p>
											</div>
										</MenuItem>
									);
								})}
							</Select>
						</Form.Item>
						<button
							onClick={() => {
								form.submit();
							}}
							className="bg-[#20D472] hover:bg-[#36b16e]"
							style={{
								borderRadius: "10px",
								padding: "10px",
								width: "100%",
								color: "white",
								fontWeight: "bold",
								fontSize: "14px",
							}}
						>
							Buyurtma qilish
						</button>
					</Form>
				</Grid>
			</Grid>
		</Box>
	);
};
