import * as React from "react";
import { Box } from "@mui/material";
import { IBuyurtma } from "../Interface";

export const BuyurtmaTable = ({ table }: { table: IBuyurtma[] }) => {
	return (
		<div>
			{table.map((t) => {
				return <Box>{t.status}</Box>;
			})}
		</div>
	);
};
