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
import styles from "./CommentsBlock.module.scss";
import { Typography } from "@mui/material";
import UserContext from "../../reactQuery/context/context";
import {
	useComments,
	useCommentsById,
	useDeleteComment,
} from "./../../reactQuery/comments/comments.hooks";
import { useMutation } from "react-query";
import { commentsSevice } from "../../reactQuery/comments/comments.service";
import axios from "./../../axios";
import { useRefresh } from "../../hooks/useRefresh";
import { useAuth } from "../../hooks/useAuth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AvatarStatus from "../Chat/AvatarStatus/AvatarStatus";

export const CommentsBlock = ({ items, isLoading, children }) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const { data, isAuth } = useAuth();
	const { id } = useParams();
	const refresh = useRefresh();
	const commentById = useCommentsById(id);
	const removeComment = useMutation(commentsSevice.deleteComment);
	const onClickRemoveComment = async (id) => {
		await removeComment.mutateAsync(id);
		refresh("fetch comments");
		await commentById.refetch();
	};
	return (
		<SideBlock title="Коментарі">
			<List className={clsx(styles.root)}>
				{!isLoading && items.length === 0 && (
					<Typography variant="h6" textAlign="center">
						Немає коментарів
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
									}}
								>
									<React.Fragment key={index}>
										<ListItem
											alignItems="flex-start"
											className={styles.item}
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
														<AvatarStatus data={obj.author} status={obj.author.status}/>
													)}
												</ListItemAvatar>
												{isLoading ? (
													<div
														style={{ display: "flex", flexDirection: "column" }}
													>
														<Skeleton variant="text" height={25} width={120} />
														<Skeleton variant="text" height={18} width={230} />
													</div>
												) : (
													<ListItemText
														primary={obj.author.fullName}
														secondary={obj.text}
														onClick={(e) => navigate(`/posts/${obj.postId}`)}
													/>
												)}
											</div>
											{!isLoading && isEditable && (
												<div className={styles.editButtons}>
													{id && (
														<Link to={`/posts/${obj.postId}/${obj._id}`}>
															<IconButton color="primary">
																<EditIcon />
															</IconButton>
														</Link>
													)}

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
											className={styles.divider}
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
