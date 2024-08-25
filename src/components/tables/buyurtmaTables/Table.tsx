import * as React from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
} from "@mui/material";
import { IBuyurtma, IStatus } from "../../Interface";
import { CiBookmark } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { DataContext } from "../../Context";
import { RxPerson } from "react-icons/rx";
import { BsTelephone } from "react-icons/bs";
import { LuClipboard } from "react-icons/lu";
import { LuTruck } from "react-icons/lu";
import { HiOutlineX } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";

export const BuyurtmaTable = ({ status }: { status: IStatus }) => {
	const {
		mijozlar,
		mahsulotlar,
		filiallar,
		buyurtmalar,
		setBuyurtmalar,
		hodimlar,
	} = React.useContext(DataContext);

	const table: IBuyurtma[] = buyurtmalar.filter(
		(b) => b.status === status
	);
	console.log(buyurtmalar);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [itemToDelete, setItemToDelete] = React.useState<
		number | string | null
	>(null);

	const handleIncrement = (id: number | string) => {
		const buyurtmaIndex = buyurtmalar.findIndex(
			(b) => b.id === id
		);

		if (buyurtmaIndex !== -1) {
			const currentStatus = buyurtmalar[buyurtmaIndex].status;
			let newStatus: IBuyurtma["status"] = currentStatus;

			console.log({ currentStatus });

			if (currentStatus === "yangi") {
				newStatus = "qabul";
			} else if (currentStatus === "qabul") {
				newStatus = "jonatilgan";
			} else if (currentStatus === "jonatilgan") {
				newStatus = "yopilgan";
			}

			console.log({ newStatus });

			const updatedBuyurtma: IBuyurtma = {
				...buyurtmalar[buyurtmaIndex],
				status: newStatus,
			};

			const updatedBuyurtmalar: IBuyurtma[] = [
				...buyurtmalar.slice(0, buyurtmaIndex),
				updatedBuyurtma,
				...buyurtmalar.slice(buyurtmaIndex + 1),
			];

			setBuyurtmalar(updatedBuyurtmalar);
		}
	};

	const handleDecrement = (id: number | string) => {
		const buyurtmaIndex = buyurtmalar.findIndex(
			(b) => b.id === id
		);

		if (buyurtmaIndex !== -1) {
			const currentStatus = buyurtmalar[buyurtmaIndex].status;

			console.log({ currentStatus });

			if (currentStatus === "yangi") {
				setItemToDelete(id);
				setOpenDialog(true);
			} else {
				let newStatus: IBuyurtma["status"] = currentStatus;

				if (currentStatus === "yopilgan") {
					newStatus = "jonatilgan";
				} else if (currentStatus === "jonatilgan") {
					newStatus = "qabul";
				} else if (currentStatus === "qabul") {
					newStatus = "yangi";
				}

				console.log({ newStatus });

				const updatedBuyurtma: IBuyurtma = {
					...buyurtmalar[buyurtmaIndex],
					status: newStatus,
				};

				const updatedBuyurtmalar: IBuyurtma[] = [
					...buyurtmalar.slice(0, buyurtmaIndex),
					updatedBuyurtma,
					...buyurtmalar.slice(buyurtmaIndex + 1),
				];

				setBuyurtmalar(updatedBuyurtmalar);
			}
		}
	};

	const confirmDelete = () => {
		if (itemToDelete !== null) {
			const buyurtmaIndex = buyurtmalar.findIndex(
				(b) => b.id === itemToDelete
			);

			if (buyurtmaIndex !== -1) {
				const updatedBuyurtmalar = [
					...buyurtmalar.slice(0, buyurtmaIndex),
					...buyurtmalar.slice(buyurtmaIndex + 1),
				];

				setBuyurtmalar(updatedBuyurtmalar);
			}

			setItemToDelete(null);
			setOpenDialog(false);
		}
	};

	const cancelDelete = () => {
		setItemToDelete(null);
		setOpenDialog(false);
	};

	return (
		<Box className=" pt-7 ">
			<Box
				sx={{ height: "calc(100vh - 90px - 28px)" }}
				className="overflow-y-auto ps-9 pe-11"
			>
				{table.map((t, index) => {
					const user = mijozlar.find(
						(m) => m.id === t.userId
					);

					let firstName = "";
					let lastName = "";

					if (user) {
						[firstName = "", lastName = ""] =
							user.name.split(" ") || [];
					}

					const price = t.mahsulotlar.reduce(
						(total, mahsulot) => {
							const res = mahsulotlar.find(
								(m) => m.id === mahsulot.mahsulotId
							);

							return (
								total +
								(res ? mahsulot.count * res.narx : 0)
							);
						},
						0
					);

					const filial = filiallar.find(
						(f) => f.id === t.filialId
					);

					const hodim = hodimlar.find(
						(h) => h.id === t.hodimId
					);

					return (
						<div
							key={t.id}
							style={{
								marginBottom: "12px",
								backgroundColor: "white",
								borderRadius: "15px",
								width: "100%",
							}}
							className="shadow-lg"
						>
							<Grid container>
								<Grid
									item
									xs={6}
									lg={3}
									sx={{ padding: "20px 35px" }}
								>
									<div className="flex">
										<div
											className="bg-green-400 text-white text-xl flex items-center justify-center"
											style={{
												width: "90px",
												height: "36px",
												borderRadius: "18px",
												marginRight: "16px",
											}}
										>
											{index + 1}
										</div>
										<IconButton>
											<CiBookmark />
										</IconButton>
									</div>
									<Divider
										sx={{ marginBlock: "18px" }}
									/>
									<div className="flex items-center justify-start gap-4">
										<IconButton disabled>
											<GoClock />
										</IconButton>
										<p className="text-xl">
											{t.date}
										</p>
									</div>
								</Grid>
								<Grid
									item
									xs={6}
									lg={3}
									sx={{
										borderInline:
											"2px solid #EDEFF3",
										padding: "20px 35px",
										display: "flex",
										flexDirection: "column",
										justifyContent:
											"space-between",
									}}
								>
									<div className="flex gap-4">
										<RxPerson
											style={{
												fontSize: "24px",
											}}
										/>
										<div>
											<p className="text-xl">
												{firstName}
											</p>
											<p className="text-xl">
												{lastName}
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<BsTelephone
											style={{
												fontSize: "24px",
											}}
										/>
										<p className="text-lg">
											{user?.phone}
										</p>
									</div>
								</Grid>
								<Grid
									item
									xs={6}
									lg={3}
									sx={{
										borderRight:
											"2px solid #EDEFF3",
										padding: "20px 25px",
									}}
								>
									<div className="flex justify-between">
										<div className="">
											<div className="flex gap-2">
												<LuClipboard />{" "}
												<p className="text-lg">
													{price} UZS
												</p>
											</div>
											<div className="flex gap-2">
												<LuTruck />
												<p className="text-lg">
													{t.dostavka} UZS
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div
												style={{
													width: "10px",
													height: "10px",
													backgroundColor:
														"#14E5E4",
													borderRadius:
														"50%",
												}}
											></div>
											<p className="text-lg">
												Payme
											</p>
										</div>
									</div>
									<p className="text-md text-gray-600 mt-3">
										Umumiy summa
									</p>
									<p className="text-xl text-gray-800">
										<span className="text-2xl text-black">
											{price + t.dostavka}
										</span>{" "}
										UZS
									</p>
								</Grid>
								<Grid
									item
									xs={6}
									lg={3}
									sx={{
										padding: "20px 35px",
										position: "relative",
									}}
								>
									<div className="mb-4">
										<p className="text-gray-600">
											Operator:
										</p>
										<p className="text-xl">
											{hodim?.lastName}{" "}
											{hodim?.firstName.charAt(
												0
											)}
										</p>
									</div>
									<div>
										<p className="text-gray-600">
											Filial:
										</p>
										<p className="text-xl font-semibold">
											{filial?.nameUz}
										</p>
									</div>
									<div
										style={{
											position: "absolute",
											top: "50%",
											right: "-25px",
											transform:
												"translateY(-50%)",
										}}
									>
										<div
											style={{
												width: "50px",
												height: "50px",
												backgroundColor:
													"#FFFFFF",
												borderRadius: "50%",
												border: "5px solid #EDEFF3",
												marginBottom: "10px",
											}}
											className="flex items-center justify-center"
										>
											<IconButton
												onClick={() => {
													handleDecrement(
														t.id
													);
												}}
											>
												<HiOutlineX />
											</IconButton>
										</div>
										<div
											style={{
												width: "50px",
												height: "50px",
												backgroundColor:
													"#FFFFFF",
												borderRadius: "50%",
												border: "5px solid #EDEFF3",
												marginBottom: "10px",
											}}
											className="flex items-center justify-center"
										>
											<IconButton
												disabled={
													t.status ===
													"yopilgan"
														? true
														: false
												}
												onClick={() => {
													handleIncrement(
														t.id
													);
												}}
											>
												<IoMdCheckmark />
											</IconButton>
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
					);
				})}
				<Dialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Confirm delete"}
					</DialogTitle>
					<DialogActions style={{ width: "300px" }}>
						<Button
							onClick={cancelDelete}
							variant="outlined"
							color="primary"
						>
							Cancel
						</Button>
						<Button
							onClick={confirmDelete}
							variant="outlined"
							color="error"
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Box>
	);
};
