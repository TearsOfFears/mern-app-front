import React, { useEffect, useState } from "react";

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
import { deleteComment, fetchComments } from "../../redux/slices/comments";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CommentsBlock.module.scss";
import { fetchPosts } from "../../redux/slices/posts";
import { selectIsAuth } from "../../redux/slices/auth";
export const CommentsBlock = ({ items, isLoading, children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const onClickRemoveComment = async (id) => {
		await dispatch(deleteComment(id));
		await dispatch(fetchComments());
	};

	return (
		<SideBlock title="Комментарии">
			<List className={clsx(styles.root)}>
				{(isLoading ? [...Array(5)] : items).map((obj, index) => {
					
					const isEditable = !isLoading && userData?._id === obj.author._id
				
					return (
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
								<div
									onClick={(e) => navigate(`/posts/${obj.postId}`)}
									className={styles.wrapper}
								>
									<ListItemAvatar>
										{isLoading ? (
											<Skeleton variant="circular" width={40} height={40} />
										) : (
											<Avatar
												alt={obj.author.fullName}
												src={obj.author.avatarUrl}
											/>
										)}
									</ListItemAvatar>
									{isLoading ? (
										<div style={{ display: "flex", flexDirection: "column" }}>
											<Skeleton variant="text" height={25} width={120} />
											<Skeleton variant="text" height={18} width={230} />
										</div>
									) : (
										<ListItemText
											primary={obj.author.fullName}
											secondary={obj.text}
										/>
									)}
								</div>
								{!isLoading && isEditable && (
									<div className={styles.editButtons}>
										<Link to={`/posts/${obj._id}/edit`}>
											<IconButton color="primary">
												<EditIcon />
											</IconButton>
										</Link>
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
					);
				})}
			</List>
			{children}
		</SideBlock>
	);
};
