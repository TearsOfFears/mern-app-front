import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	fetchAuthData,
	selectIsAuth,
	userRegister,
} from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

export const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: "Nazar123",
			email: "nazarTest6@gmail.com",
			password: "nazar12345",
		},
		mode: "onChange",
	});
	const onSubmit = async (values) => {
		console.log(values);
		const data = await dispatch(userRegister(values));
		if (!data.payload) {
			return alert("Не вдалось зареєестурватись");
		}
		if ("token" in data.payload)
			window.localStorage.setItem("token", data.payload.token);
	};
	if (isAuth) {
		return navigate("/");
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Полное имя"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register("fullName", { required: "Вкажіть повне імя" })}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					type="email"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "Вкажіть пошту" })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
          type="password"
					fullWidth
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Вкажіть пароль" })}
				/>
				<Button
					size="large"
					variant="contained"
					fullWidth
					type="submit"
					disabled={!isValid}
				>
					Зарегистрироваться
				</Button>

			</form>
      
		</Paper>
	);
};
