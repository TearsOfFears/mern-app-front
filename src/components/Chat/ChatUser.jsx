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
import axios from "./../../axios.js";
const ChatUser = ({ users, isLoading, isOnlineBlock, sideBlockChat,isOnlineConvers,isChat }) => {
	const [view, setView] = useState({ id: "", isOpen: false });
	const socket = useContext(SocketContext);
	const { data } = useAuth();
	const ref = useRef([]);
	const navigate = useNavigate();
	const startChat = async (userId) => {
		await axios
			.post(`api/conversation/create/${data._id}/${userId}`)
			.then((res) => navigate(`/chat/convers/${res.data._id}`));
	};
	const handleSetView = (id) => {
		setView({ id: id, isOpen: true });
	};
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setView({ id: "", isOpen: false });
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [ref]);

	return (
		<Paper>
			<Typography variant="h6" textAlign="left" pt={2} pl={2}>
				{isOnlineBlock && "Користувачі онлайн:"}
				{isChat && "Чати:"}
				{isOnlineConvers && "Користувачів в бесіді:"}
			</Typography>
			<List className={clsx(styles.rootChat)}>
				{!isLoading && Array.isArray(users) && users.length === 0 && (
					<Typography variant="h6" textAlign="center">
						Немає чатів
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
											style={{ paddingLeft: "10px" }}
											alignItems="flex-start"
											onClick={() => handleSetView(obj._id)}
											className={clsx({
												[styles.noClick]: obj._id === data._id,
												// [styles.noClick]: !sideBlockChat,
											})}
										>
											<div className={styles.wrapper}>
												<ListItemAvatar
													onClick={(e) => navigate(`/account/${obj._id}`)}
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
																fullName: obj.fullName,
																avatar: obj.avatar,
															}}
															status={obj.status}
														/>
													)}
												</ListItemAvatar>
												<Typography>
													{obj.fullName.length > 11
														? obj.fullName.slice(0, 10) + "..."
														: obj.fullName}
													{obj._id === data._id && " (you)"}
												</Typography>
											</div>
											{view.isOpen && view.id === obj._id && (
												<Paper className={styles.toogleConv} ref={ref}>
													{" "}
													<Button onClick={() => startChat(obj._id)}>
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
