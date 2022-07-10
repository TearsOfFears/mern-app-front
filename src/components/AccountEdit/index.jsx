import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Avatar, Input, Box, Button } from "@mui/material";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./AccountEdit.module.scss";
function AccountEdit({ data, isLoading }) {
	const [fullName, setFullname] = useState("");
	const [avatarURL, setAvatarURL] = useState("");
	const [email, setEmail] = useState("");
	const [edit, setEdit] = useState(true);
	const { id } = useParams();
	const inputFileRef = useRef(null);
	
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

	const updateUserInfo = () => {
		console.log(avatarURL);
		const fields = {
			email,
			fullName,
			avatarURL,
		};
		axios.patch(`/auth/${id}`, fields);
		setEdit(true);
	};

	if (isLoading) {
		return <Typography>Laoding User Info</Typography>;
	}
	console.log(data);
	return (
		<Grid item xs={5} spacing={2}>
			<Box className={clsx(styles.root)}>
				<div>
					<Avatar
						alt={fullName}
						src={avatarURL}
						sx={{ width: 150, height: 150 }}
					/>
					{!edit && (
						<Button
							variant="outlined"
							size="large"
							onClick={() => inputFileRef.current.click()}
						>
							Завантажити інше фото
						</Button>
					)}
					<input
						type="file"
						ref={inputFileRef}
						onChange={handleChangeFile}
						hidden
					/>{" "}
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
						onChange={(e) => setEmail(e.target.value)}
					/>
					{edit && (
						<Button onClick={(e) => setEdit(false)} variant="contained">
							Оновити
						</Button>
					)}
					{!edit && (
						<div>
							<Button onClick={(e) => updateUserInfo()} variant="contained">
								Зберегти
							</Button>
							<Button onClick={(e) => setEdit(true)} variant="contained">
								Скасувати
							</Button>
						</div>
					)}
				</div>
			</Box>
		</Grid>
	);
}

export default AccountEdit;
