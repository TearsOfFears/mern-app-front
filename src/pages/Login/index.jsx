import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { userSevice } from "../../reactQuery/auth/user.service";
import { useContext } from "react";
import UserContext from "../../reactQuery/context";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../reactQuery/auth/user.hooks";
// import { userLogin } from "../../reactQuery/services/auth/user.actions";

export const Login = () => {
	const [errorsPayload, setErrorsPayload] = useState("");
	const [values, setValues] = useState();
	const {isAuth} = useAuth()
	// const { isLoading, data, refetch } = useQuery(
	// 	["login user", values],
	// 	() => userSevice.loginUser(values),
	// 	{ enabled: false }
	// );
	const {data,refetch} = useLogin(values)
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
	
	const { user, setUser } = useContext(UserContext);
	if (data) {
		setUser(data);
	}
	const onSubmit = (values) => {
		setValues(values);
		refetch();
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
				{/* {isError && (
					<Typography variant="h6" textAlign="center" marginBottom={1}>
						{errorsPayload}
					</Typography>
				)} */}
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
		</Paper>
	);
};
