import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import { userService } from "../../reactQuery/auth/user.service";
import { useRefresh } from "./../../hooks/useRefresh";
const EditToolBar = ({ outputArr, editRowsModel, cell, arrDelete }) => {
	const refresh = useRefresh();
	const { mutateAsync, isSuccess } = useMutation(
		["delete user"],
		userService.deleteUser,
		{
			onSuccess: () => {
				refresh("fetch Users");
			},
		}
	);
	const { mutateAsync: change } = useMutation(
		["editUserProfile"],
		userService.editUserProfile,
		{
			onSuccess: () => {
				refresh("fetch Users");
			},
		}
	);
	const handleMouseDown = (e) => {
		e.preventDefault();
	};
	const handleDelete = async () => {
		await arrDelete.map((data) => mutateAsync(data._id));
	};
	const handleSaveOrEdit = async () => {
		console.log(outputArr);

		await outputArr.map((data) => {
			const fields = {
				fullName:data.fullName,
				roles:data.roles,
			};
			const passProps = {
				fields,
				id:data._id
			};
			 return change(passProps);
		});
	};
	return (
		<Box
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				p: 1,
			}}
		>
			<Button
				onClick={handleSaveOrEdit}
				//   onMouseDown={handleMouseDown}
				disabled={editRowsModel.length === 0}
				variant="outlined"
			>
				{editRowsModel && "Save"}
			</Button>
			<Button
				//   onClick={handleCancel}
				//   onMouseDown={handleMouseDown}
				disabled={cell === "view"}
				variant="outlined"
				sx={{ ml: 1 }}
			>
				Cancel
			</Button>
			<Button
				onClick={handleDelete}
				//   onMouseDown={handleMouseDown}
				disabled={arrDelete.length === 0}
				variant="outlined"
				sx={{ ml: 1 }}
			>
				Delete
			</Button>
		</Box>
	);
};

export default EditToolBar;
