import React, { useState, useEffect, useRef, useContext } from "react";
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
import { useMemo } from "react";
import UserContext from "../../reactQuery/context";
import { services } from "../../reactQuery/service";
function AccountEdit({ userData, isLoading, isFetched }) {
	const [email, setEmail] = useState("");
	const [edit, setEdit] = useState(false);
	const [enable, setEnable] = useState(false);
	const { id } = useParams();
	const inputFileRef = useRef(null);
	const {
		data,
		isLoading: isLoadingImage,
		mutateAsync,
	} = useMutation(services.postImage);
	const { user: authUserData, isLoading: isLoadingUserData } =
		useContext(UserContext);
	const [fullName, setFullname] = useState("");
	const [avatar, setAvatarURL] = useState({});
	const changeInfo = useMutation(userService.changeUserInfo);
	const [errMsg, setErrMsg] = useState("");

	const handleFileInputChange = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			const params = { data: reader.result, dest: "users" };
			if (edit) {
				await onClickRemoveImage();
			}

			await mutateAsync(params);
		};
		reader.onerror = () => {
			setErrMsg("something went wrong!");
		};
	};

	const onClickRemoveImage = async () => {
		const params = { public_id: avatar.public_id };
		axios
			.delete(`/upload`, { data: params })
			.then((res) => {
				setAvatarURL("");
				return res.data;
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		if (!isLoadingUserData && authUserData) {
			setEnable(true);
		} else {
			setEdit(false);
		}
		if (data) {
			setAvatarURL({ image: data?.url, public_id: data?.public_id });
			setEmail(userData.email);
			setFullname(userData.fullName);
		} else {
			setEmail(userData.email);
			setFullname(userData.fullName);
			setAvatarURL(userData.avatar);
		}
	}, [id,data, isLoadingUserData, authUserData]);

	if (isLoading) return <h3>Loading..</h3>;

	const updateUserInfoSubmit = async (e) => {
		e.preventDefault();
		const fields = {
			email,
			fullName,
			avatar: avatar,
		};
		const passProps = {
			fields,
			id,
		};
		changeInfo.mutateAsync(passProps);
		setEdit(false);
	};
	console.log(userData.avatar);
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
							src={avatar.image}
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
