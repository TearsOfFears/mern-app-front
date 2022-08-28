import React from "react";
import { useQuery } from "react-query";
import { userService } from "../reactQuery/auth/user.service";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Admin = () => {
	const { data, isLoading } = useQuery(["fetch Users"], () =>
		userService.getAllUsers()
	);

	console.log(data);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="left">Calories</TableCell>
						<TableCell align="left">Fat&nbsp;(g)</TableCell>
						<TableCell align="left">Carbs&nbsp;(g)</TableCell>
						<TableCell align="left">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(isLoading ? [...Array(3)] : data).map((obj, key) =>
						isLoading ? (
							<TableRow key={key}>
								<TableCell component="th" scope="row">
									Laoaing...
								</TableCell>
							</TableRow>
						) : (
							<TableRow key={key}>
								<TableCell component="th" scope="row">
									{key + 1}
								</TableCell>
								<TableCell component="th" scope="row">
									{obj.email}
								</TableCell>
								<TableCell align="left">{obj.fullName}</TableCell>
								<TableCell align="left">{obj.roles}</TableCell>
								<TableCell align="left">{obj.typeRegist}</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Admin;
