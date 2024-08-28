import { Box, Grid, IconButton, Divider } from "@mui/material";
import React from "react";
import { useDataContext } from "../Context";
import { message } from "antd";
import { LuTrash2 } from "react-icons/lu";
import { IBuyurtma } from "../Interface";
import axios from "axios";
import BasicModal from "../Modal";

export function HisobotTable({
	filteredBuyurtmalar,
}: {
	filteredBuyurtmalar: IBuyurtma[];
}) {
	const {
		filiallar,
		mijozlar,
		hodimlar,
		mahsulotlar,
		buyurtmalar,
		setBuyurtmalar,
	} = useDataContext();

	const onDelete = async (id: number | string) => {
		const previousBuyurtmalar = buyurtmalar;
		const updatedBuyurtmalar = buyurtmalar.filter(
			(m) => m.id !== id
		);
		setBuyurtmalar(updatedBuyurtmalar);

		try {
			await axios.delete(
				`https://1df7137a16f23f61.mokky.dev/buyurtmalar/${id}`
			);
			message.success("Deleted successfully");
		} catch (error) {
			setBuyurtmalar(previousBuyurtmalar);
			message.error(
				"Failed to delete the item. Please try again."
			);
		}
	};

	return (
		<Box className="bg-slate-100 w-full h-full">
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
								Filial
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Buyurtma summasi
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Mijoz
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Sana
							</Grid>
							<Divider
								orientation="vertical"
								flexItem
								sx={{ marginX: 2 }}
							/>
							<Grid item xs={2}>
								Action
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
						<Box sx={{ width: "100%" }}>
							{filteredBuyurtmalar.map((m) => {
								const filial = filiallar.find(
									(f) => f.id === m.filialId
								);
								const user = mijozlar.find(
									(f) => f.id === m.userId
								);
								const operator = hodimlar.find(
									(f) => f.id === m.hodimId
								);

								const price = m.mahsulotlar.reduce(
									(total, mahsulot) => {
										const res = mahsulotlar.find(
											(m) =>
												m.id ===
												mahsulot.mahsulotId
										);

										return (
											total +
											(res
												? mahsulot.count *
												  res.narx
												: 0)
										);
									},
									0
								);

								return (
									<Box
										key={m.id}
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
												className="flex items-center"
											>
												<div>
													<p className="text-md">
														{
															filial?.nameUz
														}
													</p>
													<p className="text-sm text-gray-500">
														Operator:{" "}
														{
															operator?.lastName
														}{" "}
														{operator?.firstName.charAt(
															0
														)}
													</p>
												</div>
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
												<div>
													<p className="text-md">
														{price.toLocaleString(
															"en-Us"
														)}{" "}
														UZS
													</p>
													<div className="flex items-center gap-2">
														<div
															style={{
																width: "10px",
																height: "10px",
																backgroundColor:
																	m.tolovTuri ===
																	"payme"
																		? "#14E5E4"
																		: m.tolovTuri ===
																		  "naqd"
																		? "#4ADE80"
																		: "orange",
																borderRadius:
																	"50%",
															}}
														></div>
														<p className="text-sm text-gray-500">
															{m.tolovTuri
																.charAt(
																	0
																)
																.toUpperCase() +
																m.tolovTuri.slice(
																	1
																)}
														</p>
													</div>
												</div>
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
												<div>
													<p className="text-md">
														{user?.name}
													</p>
													<p className="text-sm text-gray-500">
														{user?.phone}
													</p>
												</div>
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
												{m.date}
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
												sx={{ marginX: 2 }}
											/>
											<Grid
												item
												xs={2}
												sx={{
													display: "flex",
													justifyContent:
														"center",
												}}
											>
												<BasicModal
													okFunction={() => {
														onDelete(
															m.id
														);
													}}
													title="Haqiqatdan buyurtma ochirilsinmi"
													button={
														<IconButton
															sx={{
																border: "4px solid #EDEFF3",
															}}
														>
															<LuTrash2 />
														</IconButton>
													}
												></BasicModal>
											</Grid>
										</Grid>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
