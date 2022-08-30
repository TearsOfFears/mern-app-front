import React, { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { userService } from "../reactQuery/auth/user.service";
import { Avatar, Box, Skeleton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditToolBar from "../components/Table/EditToolBar";
import { useState } from "react";
import { useGridApiRef } from "@mui/x-data-grid/hooks/utils/useGridApiRef";
import { useMemo } from "react";

const columns = [
	{ field: "_id", editable: true, hide: true },
	{ field: "id", headerName: "ID", width: 30 },
	{
		field: "avatar",
		headerName: "Avatar",
		minWidth: 50,
		width: 60,
		maxWidth: 250,
		renderCell: (params) => {
			return <Avatar alt={params.row.avatar} src={params.row.avatar} />;
		},
	},
	{
		field: "email",
		headerName: "Email",
		minWidth: 50,
		width: 200,
		maxWidth: 350,
		editable: false,
	},
	{
		field: "fullName",
		headerName: "Fullname",
		minWidth: 50,
		width: 200,
		maxWidth: 350,
		editable: true,

		// valueGetter: ({ value }) => {
		// 	console.log(value);
		// 	return value;
		// },
	},
	{
		field: "roles",
		headerName: "roles",
		sorting: "disable",
		minWidth: 50,
		maxWidth: 350,
		width: 140,
		editable: true,
	},
	{
		field: "typeRegist",
		headerName: "Method Registr",
		minWidth: 50,
		maxWidth: 150,
	},
];

const Admin = () => {
	const apiRef = useGridApiRef();
	const [selectedCellParams, setSelectedCellParams] = React.useState(null);
	const [cell, setEditCell] = React.useState(false);
	const [arrDelete, setArr] = useState([]);
	const [outputArr, setOut] = useState([]);
	const [editRowsModel, setEditRowsModel] = React.useState([]);
	const { data, isLoading,isFetching } = useQuery(["fetch Users"], () =>
		userService.getAllUsers()
	);

	const rows = useMemo(() => {
		return (
			!isLoading &&
			data.map((data, key) => {
				const { email, fullName, roles, avatar, typeRegist, _id } = data;
				return {
					id: key + 1,
					_id,
					avatar: avatar.image,
					email,
					fullName,
					roles,
					typeRegist,
				};
			})
		);
	}, [data]);
	const handleCellFocus = React.useCallback((event) => {}, []);
	const onRowsSelectionHandler = async (ids) => {
		console.log(ids);
		setArr(ids.map((id) => rows.find((row) => row.id === id)));
	};
	const handleEditRowsModelChange = React.useCallback((model) => {
		let arr = [];
		for (let [key, value] of Object.entries(model)) {
			arr.push(value);
		}
		const arrNew = arr.map((data) =>
			Object.entries(data).map((obj) => {
				return Object.assign({ [obj[0]]: obj[1].value });
			})
		).map((data) => {
			return Object.assign({},...data);
		});
		setOut(arrNew)
		setEditRowsModel(model);
	}, []);
console.log(outputArr);
	return (
		<Box sx={{ width: "100%", background: "#fff" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
				autoHeight={true}
				loading={isFetching}
				editMode="row"
				// apiRef={apiRef}
				editRowsModel={editRowsModel}
				onEditRowsModelChange={handleEditRowsModelChange}
				// onCellEditStart={setEditCell(true)}
				components={{
					Toolbar: EditToolBar,
				}}
				componentsProps={{
					toolbar: {
						cell,
						arrDelete,
						outputArr,
						editRowsModel,
					},
				}}
				onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
			/>
		</Box>
	);
};

export default Admin;
