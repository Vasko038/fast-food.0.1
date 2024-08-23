import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export const BuyurtmaForm = () => {
	return (
		<Box sx={{ width: "100%", padding: "40px" }}>
			<Grid container>
				<Grid item xs={8}>
					<Typography variant="h5" component="h4">
						Yangi buyurtma qo'shish
					</Typography>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</Box>
	);
};
