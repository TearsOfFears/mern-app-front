import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../reactQuery/auth/user.service";
import { Box, IconButton, InputAdornment, Modal } from "@mui/material";
import Loader from "../../components/Loader";
import { useLogin } from "../../reactQuery/auth/user.hooks";
import { useState } from "react";
import { useEffect } from "react";
import UserContext from "../../reactQuery/context";
import ModalCustom from "../../components/ModalCustom/ModalCustom";

export const Registration = () => {
	const [show, setShow] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const [dataReg, setDataReg] = useState({});
	const navigate = useNavigate();
	const { isAuth } = useAuth();
	const { user, setUser } = useContext(UserContext);
	const registUser = useMutation(userService.registrUser);
	const { data, isError, error, isLoading, isSuccess, mutateAsync } =
		useLogin();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			fullName: "nazartest123",
			password: "nazartest123",
			email: "nazardemchan@gmail.com",
		},
	});

	const onSubmit = async (values) => {
		await registUser.mutateAsync(values);
		setDataReg(values);
	};
	useEffect(() => {
		if (registUser.isError) {
			setOpen(true);
		}
	}, [registUser.isError]);
	console.log(isOpen);
	const handleClickShowPassword = () => {
		setShow(!show);
	};
	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};
	if (registUser.isLoading || isLoading) {
		if (!isAuth) {
			return <ModalCustom isLoader={true} />;
		}
	}

	if (registUser.isSuccess) {
		return (
			<ModalCustom message="Перейдіть на пошту, яку ви вказали при регістрації" />
		);
	}
	if (isAuth) return navigate("/");

	return (
		<Paper classes={{ root: styles.root }}>
			{registUser.isError && (
				<ModalCustom isOpen={isOpen}>
					{registUser.error.response.data}
					<Button
						onClick={() => {
							navigate("/register");
							setOpen(false);
						}}
					>
						{" "}
						Back
					</Button>
				</ModalCustom>
			)}

			<Typography classes={{ root: styles.title }} variant="h5">
				Створити аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Повне ім`я"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register("fullName", { required: "Вкажіть повне ім`я" })}
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
					type={show ? "text" : "password"}
					fullWidth
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
					size="large"
					variant="contained"
					fullWidth
					type="submit"
					disabled={!isValid}
				>
					Зареєструватися
				</Button>
			</form>
		</Paper>
	);
};
