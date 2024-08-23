import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDataContext } from "../../Context";
import { IMahsulot } from "../../Interface";

export const BuyurtmaFormTableCard = ({
	product,
}: {
	product: IMahsulot;
}) => {
	const { basket, setBasket } = useDataContext();

	const existingItem = basket.find(
		(item) => item.productId === product.id
	);
	const count = existingItem ? existingItem.count : 0;

	const handleIncrement = () => {
		if (existingItem) {
			setBasket(
				basket.map((item) =>
					item.productId === product.id
						? { ...item, count: item.count + 1 }
						: item
				)
			);
		} else {
			setBasket([
				...basket,
				{
					productId: product.id,
					count: 1,
				},
			]);
		}
	};

	const handleDecrement = () => {
		if (existingItem && existingItem.count > 1) {
			setBasket(
				basket.map((item) =>
					item.productId === product.id
						? { ...item, count: item.count - 1 }
						: item
				)
			);
		} else if (existingItem && existingItem.count === 1) {
			setBasket(
				basket.filter((item) => item.productId !== product.id)
			);
		}
	};

	return (
		<Grid item xs={6} className="flex py-4">
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					border: "1px solid gainsboro",
					borderRadius: "20px",
					overflow: "hidden",
				}}
			>
				<Box sx={{ width: "100%" }}>
					<img
						src={product.image}
						alt=""
						style={{
							height: "180px",
							width: "100%",
							objectFit: "cover",
						}}
					/>
				</Box>
				<Box
					sx={{
						textAlign: "center",
						padding: "10px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						height: "100%", // Kartaning balandligi bir xil bo'lishi uchun
					}}
				>
					<Typography
						sx={{ flexGrow: 1 }}
						variant="subtitle1"
						component="h2"
					>
						{product.name}
					</Typography>

					<Box
						sx={{
							marginTop: "auto",
							textAlign: "center",
						}}
					>
						<Typography component="div" variant="h5">
							{product.narx} UZS
						</Typography>
						<div className="btn-container mt-2">
							{count !== 0 ? (
								<div
									className="flex items-center justify-center gap-5 mx-auto px-3"
									style={{
										border: "2px solid #EDEFF3",
										borderRadius: "10px",
										width: "120px",
										height: "40px",
									}}
								>
									<button onClick={handleDecrement}>
										<FaMinus />
									</button>
									<span
										style={{
											fontSize: "22px",
											fontWeight: "bold",
										}}
										className={`${
											count !== 0
												? "card__badge"
												: "card__badge--hidden"
										}`}
									>
										{count}
									</span>
									<button onClick={handleIncrement}>
										<FaPlus />
									</button>
								</div>
							) : (
								<button
									className="bg-[#20D472] hover:bg-[#36b16e]"
									style={{
										borderRadius: "10px",
										color: "white",
										width: "120px",
										height: "40px",
									}}
									onClick={handleIncrement}
								>
									Qo'shish
								</button>
							)}
						</div>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};
