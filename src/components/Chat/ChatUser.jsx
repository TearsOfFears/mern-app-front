import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AvatarStatus from "./AvatarStatus/AvatarStatus";

import styles from "./index.module.scss";
import { faIR } from "@mui/x-data-grid";
const ChatUser = ({ users, isLoading }) => {
	const navigate = useNavigate();
	console.log(users);
	return (
		<Paper>
			<List className={clsx(styles.rootChat)}>
				{!isLoading && users === 0 && (
					<Typography variant="h6" textAlign="center">
						Немає повідомлень
					</Typography>
				)}{" "}
				<TransitionGroup>
					{!isLoading &&
						Array.isArray(users) &&
						users.map((obj, index) => {
							console.log(obj.user);
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
										<ListItem alignItems="flex-start">
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
