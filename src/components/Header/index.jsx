import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAuthUser,
	getDataUser,
	logout,
	selectIsAuth,
} from "../../redux/auth/auth.actions";
import AccountCircle from "@mui/icons-material/AccountCircle";
export const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const data = useSelector(getDataUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onClickLogout = () => {
		if (window.confirm("Ви точно хочете вийти?")) {
			dispatch(logout());
			dispatch(fetchAuthUser());
		}
	};
	console.log("data",);
	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>Nazar BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
							
									<Button variant="contained" style={{background:"black"}} onClick={e=>navigate(`/account/${data._id}`)}>
										<AccountCircle color="inherit" />
									</Button>
							
								<Link to="/addPost">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
