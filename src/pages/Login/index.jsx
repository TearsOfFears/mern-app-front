import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthData, selectIsAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "nazarTest1@gmail.com",
			password: "nazar12345",
		},
		mode: "onChange",
	});
	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuthData(values));
		if (!data.payload) {
			return alert("Не вдалось увійти");
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
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
					type="email"
					{...register("email", { required: "Вкажіть пошту" })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					fullWidth
					type="password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Вкажіть пароль" })}
				/>
				<Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
			<Button
			style={{marginTop:"15px"}}
					size="large"
					variant="contained"
					fullWidth
					type="submit"
					disabled={!isValid}
				>
					Відновити пароль
				</Button>
		</Paper>
	);
};
