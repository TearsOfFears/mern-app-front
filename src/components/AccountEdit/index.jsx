import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Avatar, Input, Box, Button } from "@mui/material";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./AccountEdit.module.scss";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import { theme } from "./../../theme";
import { useMutation } from "react-query";
import { userService } from "../../reactQuery/auth/user.service";
import { useAuth } from "../../hooks/useAuth";
function AccountEdit({ userData, isLoading,isFetched }) {
	const { data: authUserData, isAuth } = useAuth();
	const [fullName, setFullname] = useState("");
	const [avatarURL, setAvatarURL] = useState("");
	const [email, setEmail] = useState("");
	const [edit, setEdit] = useState(false);
	const [enable, setEnable] = useState(false);
	const { id } = useParams();
	const inputFileRef = useRef(null);
	const changeInfo = useMutation(userService.changeUserInfo);
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");
	const [selectedFile, setSelectedFile] = useState();
	const [successMsg, setSuccessMsg] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			setErrMsg("something went wrong!");
		};
		setFileInputState(e.target.value);
	};

	const uploadImage = async (base64EncodedImage) => {
		try {
			const { data } = await axios.post("/upload", {
				data: base64EncodedImage,
				dest: "users",
			});
			setAvatarURL(data);
			setFileInputState("");
			setPreviewSource("");
		} catch (err) {
			console.error(err);
			setErrMsg("Something went wrong!");
		}
	};
	const test = Boolean(userData._id === authUserData._id);
	useEffect(() => {
		if (test) {
			console.log("edit");
			setEnable(true);
		}
		else{
			setEdit(false)
		}
		setEmail(userData.email);
		setFullname(userData.fullName);
		setAvatarURL(userData.avatarURL);
	}, [id]);
	const updateUserInfoSubmit = async (e) => {
		e.preventDefault();
		const fields = {
			email,
			fullName,
			avatarURL,
		};
		const passProps = {
			fields,
			id,
		};

		changeInfo.mutateAsync(passProps);
		setEdit(false);
	};

	if (isLoading) return <h3>Loading..</h3>;

	return (
		<Grid item xs={5} spacing={2}>
			<Typography variant="h4" marginBottom={2}>
				Профіль
			</Typography>
			<Box className={clsx(styles.root)}>
				<form onSubmit={updateUserInfoSubmit}>
					<div className={edit ? styles.avatarWrapper : ""}>
						<Avatar
							alt={fullName}
							src={avatarURL}
							sx={{ width: 150, height: 150 }}
							className={!edit ? styles.avatar : ""}
						/>
						<div className={styles.avatarChange}>
							<Button
								onClick={() => inputFileRef.current.click()}
								variant="text"
								style={{ backgroundColor: "transparent" }}
								disableRipple={true}
								color="white"
							>
								<AddPhotoIcon color="inherit" fontSize="large" />
							</Button>
						</div>
					</div>
					{edit && (
						<input
							type="file"
							ref={inputFileRef}
							onChange={handleFileInputChange}
							hidden
						/>
					)}
					<Input
						value={fullName}
						disabled={!edit}
						className={styles.input}
						onChange={(e) => setFullname(e.target.value)}
					/>
					<Input
						value={email}
						disabled={!edit}
						className={styles.input}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					{enable ? (
						<div>
							{!edit && (
								<Button onClick={(e) => setEdit(true)} variant="contained">
									Оновити
								</Button>
							)}
							{edit && (
								<div className={styles.wrapperUpdate}>
									<Button variant="contained" type="submit">
										Зберегти
									</Button>
									<Button onClick={(e) => setEdit(false)} variant="contained">
										Скасувати
									</Button>
								</div>
							)}
						</div>
					) : null}
				</form>
			</Box>
		</Grid>
	);
}

export default AccountEdit;
