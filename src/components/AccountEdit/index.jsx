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
function AccountEdit({ userData }) {
	const [fullName, setFullname] = useState("");
	const [avatarURL, setAvatarURL] = useState("");
	const [email, setEmail] = useState("");
	const [edit, setEdit] = useState(true);
	const { id } = useParams();
	const inputFileRef = useRef(null);
	const changeInfo = useMutation(userService.changeUserInfo);
	const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');


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
            setErrMsg('something went wrong!');
        };
        setFileInputState(e.target.value);
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
			const {data} = 	await axios.post("/upload", {data:base64EncodedImage,dest:"users"});
			setAvatarURL(data);
            setFileInputState('');
            setPreviewSource('');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

	useEffect(() => {
		setEmail(userData.email);
		setFullname(userData.fullName);
		setAvatarURL(userData.avatarURL);
	}, []);

	// const handleChangeFile = async (e) => {
	// 	try {
	// 		const formData = new FormData();
	// 		formData.append("image", e.target.files[0]);
	// 		const { data } = await axios.post("upload", formData);
	// 		setAvatarURL(`http://localhost:4444${data.url}`);
	// 	} catch (err) {
	// 		console.log(err);
	// 		alert("Помилка при загрузці картинки");
	// 	}
	// };

	const updateUserInfoSubmit = async (e) => {
		e.preventDefault();
		const fields = {
			email,
			fullName,
			avatarURL,
		};
		const passProps = {
			fields,
			id
		}
		
		changeInfo.mutateAsync(passProps);
		setEdit(true);
	};

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
								<AddPhotoIcon color="inherit" fontSize="large" />
							</Button>
						</div>
					</div>
					{!edit && (
						<input
							type="file"
							ref={inputFileRef}
							onChange={handleFileInputChange}
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
