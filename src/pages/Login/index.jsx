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
import { IconButton, InputAdornment, Modal } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Loader from "../../components/Loader";
import { useRefresh } from "../../hooks/useRefresh";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ModalCustom from "../../components/ModalCustom/ModalCustom";
export const Login = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const [errorsPayload, setErrorsPayload] = useState("");
	const { user, setUser } = useContext(UserContext);
	const [values, setValues] = useState("");
	const { isAuth } = useAuth();
	const { data, isError, error, isLoading, isSuccess, mutateAsync } =
		useLogin();
	const loginGoogle = useMutation(userService.loginGoogle);
	const loginGoogleHook = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			loginGoogle.mutateAsync(codeResponse.code);
		},
	});
	const handleClickShowPassword = () => {
		setShow(!show);
	};
	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "admin@gmail.com",
			password: "admin12345",
		},
		mode: "onChange",
	});
	useEffect(() => {
		if (data && isSuccess) {
			if (!data) {
				return alert("Не вдалось увійти");
			}
			if ("tokens" in data) {
				window.localStorage.setItem("token", data.tokens.access);
				setUser(data);
			}
		}
	}, [data]);
	useEffect(() => {
		if (loginGoogle.data && loginGoogle.isSuccess) {
			if (!loginGoogle.data) {
				return alert("Не вдалось увійти");
			}
			if ("tokens" in loginGoogle.data) {
				window.localStorage.setItem("token", loginGoogle.data.tokens.access);
				setUser(loginGoogle.data);
			}
		}
		if (loginGoogle.isError) {
			setOpen(true);
		}
	}, [loginGoogle.data, loginGoogle.isError]);

	const onSubmit = async (values) => {
		await mutateAsync(values);
	};
	if (loginGoogle.isLoading || isLoading) {
		if (!isAuth) {
			return (
				<Modal open={true}>
					<Loader />
				</Modal>
			);
		}
	}
	if (isAuth) return navigate("/");
	return (
		<Paper classes={{ root: styles.root }}>
			{loginGoogle.isError && (
				<ModalCustom isOpen={isOpen}>
					{loginGoogle.error.response.data.message || error.response.data}
					<Button
						onClick={() => {
							navigate("/login");
							setOpen(false);
						}}
					>
						{" "}
						Back
					</Button>
				</ModalCustom>
			)}
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
					type={show ? "text" : "password"}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Вкажіть пароль" })}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{show ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					type="submit"
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
					style={{ marginBottom: "10px" }}
				>
					Ввійти
				</Button>
			</form>
			<Button
				type="submit"
				size="large"
				variant="contained"
				fullWidth
				onClick={() => loginGoogleHook()}
			>
				Увійти з <GoogleIcon style={{ marginLeft: "5px" }} />
			</Button>
		</Paper>
	);
};
