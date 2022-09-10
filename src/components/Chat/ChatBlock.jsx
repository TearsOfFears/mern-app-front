import React, { useEffect, useState, useContext } from "react";

import { SideBlock } from "../SideBlock";
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
import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import UserContext from "../../reactQuery/context/context";
import { chatService } from "../../reactQuery/chat/chat.service";
import { useMutation } from "react-query";
import axios from "./../../axios";
import { useRefresh } from "../../hooks/useRefresh";
import { useAuth } from "../../hooks/useAuth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AvatarStatus from "./AvatarStatus/AvatarStatus";
import { SocketContext } from "../../reactQuery/context/socket";
import moment from "moment/moment";

export const ChatBlock = ({ items, isLoading, children, refScroll }) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const { data, isAuth } = useAuth();
	const { id, conversId } = useParams();
	const refresh = useRefresh();
	const onClickRemoveComment = async (id) => {
		socket.emit("deleteMessage", id, (res) => {
			res.status === "ok" && refresh("fetch Messages");
		});
	};
	if (isLoading) {
		return <h3>Loading...</h3>;
	}
	if (!conversId) {
		return (
			<SideBlock
				title="Повідомлення:"
				style={{ display: "flex", flexDirection: "row" }}
			>
				{" "}
				<List className={clsx(styles.root)} ref={refScroll}>
					{" "}
					Відкрийте чат
				</List>
			</SideBlock>
		);
	}
	return (
		<SideBlock
			title="Повідомлення:"
			style={{ display: "flex", flexDirection: "row" }}
		>
			<List className={clsx(styles.root)} ref={refScroll}>
				{!isLoading && items.length === 0 && (
					<Typography variant="h6" textAlign="center">
						Немає повідомлень
					</Typography>
				)}{" "}
				<TransitionGroup>
					{!isLoading &&
						Array.isArray(items) &&
						items.map((obj, index) => {
							const isEditable = !isLoading && user?._id === obj.author._id;
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
											className={
												obj.author._id === user?._id
													? [styles.item, styles.itemReverse]
													: [styles.item, styles.itemDisable]
											}
											style={
												!isLoading && obj.postId
													? { cursor: "cursor" }
													: { cursor: "pointer" }
											}
										>
											<div className={styles.wrapper}>
												<ListItemAvatar
													onClick={(e) =>
														navigate(`/account/${obj.author._id}`)
													}
												>
													{isLoading ? (
														<Skeleton
															variant="circular"
															width={40}
															height={40}
														/>
													) : (
														<AvatarStatus
															direction={obj.author._id === user?._id}
															data={obj.author}
															status={obj.author.status}
														/>
													)}
												</ListItemAvatar>
												{isLoading ? (
													<div
														style={{
															display: "flex",
															flexDirection: "column",
														}}
													>
														<Skeleton variant="text" height={25} width={120} />
														<Skeleton variant="text" height={18} width={230} />
													</div>
												) : (
													<ListItemText
														primary={obj.author.fullName}
														secondary={obj.text}
														className={clsx({
															[styles.noClick]: obj.author._id !== user?._id,
															[styles.reverseTest]:
																obj.author._id === user?._id,
														})}
														onClick={(e) => navigate(`/chat/${obj._id}`)}
													/>
												)}
												{
													<h6>
														{moment(obj.createdAt).format("DD.MM, HH:MM")}
													</h6>
												}
											</div>
											{!isLoading && isEditable && (
												<div className={styles.editButtons}>
													<IconButton
														onClick={(e) => {
															onClickRemoveComment(obj._id);
														}}
														color="secondary"
													>
														<DeleteIcon />
													</IconButton>
												</div>
											)}
										</ListItem>
										<Divider
											variant="inset"
											component="li"
											className={
												obj.author._id === user?._id
													? styles.dividerReverse
													: styles.divider
											}
										/>
									</React.Fragment>
								</CSSTransition>
							);
						})}
				</TransitionGroup>
			</List>
			{children}
		</SideBlock>
	);
};
