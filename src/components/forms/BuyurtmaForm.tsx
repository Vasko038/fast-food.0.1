import {
	Box,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDataContext } from "../Context";
import { Form, Input } from "antd";

export const BuyurtmaForm = () => {
	const { setBuyurtmalar, mahsulotlar, mijozlar, kategoriyalar } =
		useDataContext();

	const [form] = Form.useForm();

	const [basket, setBasket] = useState<
		{
			mahsulotId: number | string;
			count: number;
		}[]
	>([
		{ mahsulotId: 1, count: 3 },
		{ mahsulotId: 3, count: 1 },
	]);

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
					<Box sx={{ p: 3 }}>{children}</Box>
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

	return (
		<Box sx={{ width: "100%", padding: "40px" }}>
			<Grid container>
				<Grid item xs={8}>
					<Typography variant="h6" component="h4">
						Yangi buyurtma qo'shish
					</Typography>
					<Tabs
						value={tabValue}
						className="items-center bg-slate-100 my-3 mt-[14px] rounded-full py-1 px-2"
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
						{kategoriyalar.map((k, index) => {
							return (
								<Tab
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
							);
						})}
					</Tabs>
					<div>
						{kategoriyalar.map((k, index) => {
							return (
								<CustomTabPanel
									value={tabValue}
									index={index}
								>
									{k.nameUz}
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
						<IconButton>
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
										{b.count}*{mahsulot?.narx} UZS
									</p>
								</div>
							);
						})}
						<div
							className="bg-[#EDEFF3] w-[90%] mx-auto mt-4"
							style={{
								borderRadius: "10px",
								padding: "10px",
							}}
						>
							<p>Umumiy summa</p>
							<p className="text-xl">
								<span className="font-bold">
									{totalSum}
								</span>{" "}
								UZS
							</p>
						</div>
						<Form
							form={form}
							layout="vertical"
							className="mt-3"
						>
							<Form.Item
								label="Mijoz"
								name="userId"
								required
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
											userId: event.target
												.value,
										});
										const user = mijozlar.find(
											(m) =>
												m.id ===
												event.target.value
										);
										console.log({ user });

										const inp =
											document.getElementById(
												"phone-input"
											) as HTMLInputElement;

										console.log({ inp });

										if (user && inp)
											inp.value = user.phone;
									}}
								>
									{mijozlar.map((m) => {
										return (
											<MenuItem
												key={m.id}
												value={m.id}
											>
												{m.name}
											</MenuItem>
										);
									})}
								</Select>
							</Form.Item>
							<Form.Item label="Telefon raqam">
								<Input
									readOnly
									id="phone-input"
								></Input>
							</Form.Item>
						</Form>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
