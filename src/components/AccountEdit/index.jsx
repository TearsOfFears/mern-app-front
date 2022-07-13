import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Avatar, Input, Box, Button } from "@mui/material";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./AccountEdit.module.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {theme} from "./../../theme";
import { useDispatch } from "react-redux";
import { fetchAuthUser,updateUserInfo } from "../../redux/auth/auth.actions";
function AccountEdit({ data, isLoading }) {
	const [fullName, setFullname] = useState("");
	const [avatarURL, setAvatarURL] = useState("");
	const [email, setEmail] = useState("");
	const [edit, setEdit] = useState(true);
	const { id } = useParams();
	const inputFileRef = useRef(null);
	const dispatch = useDispatch();
	useEffect(() => {
		setEmail(data.email);
		setFullname(data.fullName);
		setAvatarURL(data.avatarURL);
	}, []);

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			const { data } = await axios.post("upload", formData);
			setAvatarURL(`http://localhost:4444${data.url}`);
		} catch (err) {
			console.log(err);
			alert("Помилка при загрузці картинки");
		}
	};

	const updateUserInfoSubmit = (e) => {
		e.preventDefault();
		const fields = {
			email,
			fullName,
			avatarURL,
		};
		dispatch(updateUserInfo(id,fields))
		setEdit(true);
		
	};

	if (isLoading) {
		return <Typography>Laoding User Info</Typography>;
	}

	return (
		<Grid item xs={5} spacing={2}>
			<Typography variant="h4" marginBottom={2}>
				Профіль
			</Typography>
			<Box className={clsx(styles.root)}>
				<form onSubmit={updateUserInfoSubmit}>
					<div className={!edit ? styles.avatarWrapper : ""}>
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
								<AddAPhotoIcon color="inherit" fontSize="large" />
							</Button>
						</div>
					</div>

					{!edit && (
						<input
							type="file"
							ref={inputFileRef}
							onChange={handleChangeFile}
							hidden
						/>
					)}
					<Input
						value={fullName}
						disabled={edit}
						className={styles.input}
						onChange={(e) => setFullname(e.target.value)}
					/>
					<Input
						value={email}
						disabled={edit}
						className={styles.input}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					{edit && (
						<Button onClick={(e) => setEdit(false)} variant="contained">
							Оновити
						</Button>
					)}
					{!edit && (
						<div className={styles.wrapperUpdate}>
							<Button variant="contained" type="submit">
								Зберегти
							</Button>
							<Button onClick={(e) => setEdit(true)} variant="contained">
								Скасувати
							</Button>
						</div>
					)}
				</form>
			</Box>
		</Grid>
	);
}

export default AccountEdit;
