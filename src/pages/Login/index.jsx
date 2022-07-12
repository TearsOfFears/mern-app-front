import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	clearState,
	loginUser,
	selectIsAuth,
} from "../../redux/auth/auth.actions";
import { useNavigate } from "react-router-dom";
export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const data = useSelector((state) => state.auth);
	const [errorsPayload, setErrorsPayload] = useState("");
	// const [isError, setErrorAuth] = useState(false);
	const isError = data.statusAuth === "error";
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "nazarTest6@gmail.com",
			password: "nazar12345",
		},
		mode: "onChange",
	});
	useEffect(() => {
		if (isError && data.errorsAuth.response.data.message.length>0) {
			setErrorsPayload(`Не вдалось увійти ${data.errorsAuth.response.data.message}`);
		}
	}, [isError]);
	const onSubmit = async (values) => {
		await dispatch(loginUser(values));
	};
	if (isAuth) {
		return navigate("/");
	}

	console.log("isError", isError);
	console.log("errorsPayload", errorsPayload);
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
				{isError && (
					<Typography variant="h6" textAlign="center" marginBottom={1}>
						{" "}
						{errorsPayload}
					</Typography>
				)}
				<Button
					type="submit"
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
				>
					Войти
				</Button>
			</form>
			<Button
				style={{ marginTop: "15px" }}
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
