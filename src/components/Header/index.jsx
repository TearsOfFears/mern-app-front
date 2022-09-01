import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "./../../reactQuery/auth/user.service";
import { useRefresh } from "../../hooks/useRefresh";
import UserContext from "../../reactQuery/context/context";
import { useFetchUser } from "../../reactQuery/auth/user.hooks";
import AccountCircle from "@mui/icons-material/AccountCircle";
export const Header = () => {
	const refresh = useRefresh();
	const navigate = useNavigate();
	const { refetch, isError } = useFetchUser();
	const { data, isAuth, setUser, isUser, isAdmin, isWritter } = useAuth();
	const { isLoading } = useContext(UserContext);
	const onClickLogout = () => {
		userService.logout();
		setUser(null);
		refetch();
		navigate("/?sort=latest");
		if (!window.localStorage.getItem("token") || isError) {
			setUser(null);
			refetch();
		}
	};
	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>Nazar BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth && !isLoading ? (
							<>
								{isUser && (
									<Button
										variant="contained"
										style={{ background: "black" }}
										onClick={(e) => navigate(`/account/${data._id}`)}
									>
										{data.avatar ? (
											<img
												src={data.avatar.image}
												alt=""
												style={{
													width: "1.8em",
													height: "1.8em",
													borderRadius: "100%",
												}}
											/>
										) : (
											<AccountCircle color="inherit" />
										)}
									</Button>
								)}

								<Link to="/chat">
									<Button variant="contained">Чат</Button>
								</Link>

								{isWritter && (
									<Link to="/addPost">
										<Button variant="contained">Написати статтю</Button>
									</Link>
								)}
								{isAdmin && (
									<Link to="/admin">
										<Button variant="contained">Адмінка </Button>
									</Link>
								)}
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Вийти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Ввійти</Button>
								</Link>
								<Link to="/chat">
									<Button variant="contained">Чат</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Створити аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
