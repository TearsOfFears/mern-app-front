import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { userService } from "../../reactQuery/auth/user.service";
import { useContext } from "react";
import UserContext from "../../reactQuery/context";
import { useAuth } from "../../hooks/useAuth";
import { useFetchUser, useLogin } from "../../reactQuery/auth/user.hooks";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Modal } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Loader from "../../components/Loader";
export const Login = () => {
	const navigate = useNavigate();
	const [errorsPayload, setErrorsPayload] = useState("");
	const { user, setUser } = useContext(UserContext);
	const [values, setValues] = useState("");
	const { isAuth } = useAuth();
	const { refetch } = useFetchUser();
	const { data, isLoading, isSuccess, mutateAsync } = useLogin();
	const loginGoogle = useMutation(userService.loginGoogle);
	const loginGoogleHook = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
			loginGoogle.mutateAsync(codeResponse.code);
		},
	});
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

	if (!isLoading && isSuccess && Object.keys(data).length > 0) {
		if (!data.payload) {
			return alert("Не вдалось увійти");
		}
		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
			setUser(data);
			refetch();
		}
	}

	const onSubmit = (values) => {
		mutateAsync(values);
	};
	if (loginGoogle.isLoading || isLoading) {
		if (!isAuth) {
			return (
				<Modal open={true}>
					<Loader />
				</Modal>
			);
		} else {
			return navigate("/");
		}
	}

	// if (loginGoogle.isError || isError) {
	// 	return (
	// 		<Modal open={true}>
	// 			<Typography>{loginGoogle.error || error}</Typography>
	// 		</Modal>
	// 	);

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вхід в аккаунт
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
				<Button
					type="submit"
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
					style={{ marginBottom: "20px" }}
				>
					Ввійти
				</Button>
				<Button
					type="submit"
					size="large"
					variant="contained"
					fullWidth
					onClick={() => loginGoogleHook()}
				>
					Увійти з <GoogleIcon style={{ marginLeft: "5px" }} />
				</Button>
			</form>
		</Paper>
	);
};
