import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AvatarStatus from "./AvatarStatus/AvatarStatus";

import styles from "./index.module.scss";
import { faIR } from "@mui/x-data-grid";
import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useContext } from "react";
import { SocketContext } from "../../reactQuery/context/socket";
const ChatUser = ({ users, isLoading }) => {
	const [view, setView] = useState(false);
	const socket = useContext(SocketContext)
	const {data} = useAuth()
	const ref = useRef(null);
	const navigate = useNavigate();
	const startChat = (userId) => {
		console.log(userId);
		console.log("userId",data._id);
	};
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setView(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [ref]);

	return (
		<Paper>
			<List className={clsx(styles.rootChat)}>
				{users.length === 0 && (
					<Typography variant="h6" textAlign="center">
						Немає Користувачів
					</Typography>
				)}{" "}
				<TransitionGroup>
					{!isLoading &&
						Array.isArray(users) &&
						users.map((obj, index) => {
							return (
								<CSSTransition
									key={index}
									in={!isLoading}
									timeout={500}
									classNames={{
										enter: styles.enter,
										enterActive: styles.enterActive,
										enterDone: styles.enterActive,
										exitActive: styles.exitActive,
										exitDone: styles.exitDone,
										exit: styles.exitDone,
									}}
								>
									<React.Fragment key={index}>
										<ListItem
											alignItems="flex-start"
											onClick={() => setView(true)}
										>
											<div className={styles.wrapper}>
												{/* {obj.userId} */}
												<ListItemAvatar
													onClick={(e) => navigate(`/account/${obj.user._id}`)}
												>
													{isLoading ? (
														<Skeleton
															variant="circular"
															width={40}
															height={40}
														/>
													) : (
														<AvatarStatus
															direction={false}
															data={{
																fullName: obj.user.fullName,
																avatar: obj.user.avatar,
															}}
															status={obj.user.status}
														/>
													)}
												</ListItemAvatar>
												<Typography>{obj.user.fullName}</Typography>
											</div>
											{view && (
												<Paper className={styles.toogleConv} ref={ref}>
													{" "}
													<Button onClick={() => startChat(obj.user._id)}>
														Start Chat
													</Button>
												</Paper>
											)}
										</ListItem>
										<Divider
											variant="inset"
											component="li"
											className={styles.divider}
										/>
									</React.Fragment>
								</CSSTransition>
							);
						})}
				</TransitionGroup>
			</List>
		</Paper>
	);
};

export default ChatUser;
