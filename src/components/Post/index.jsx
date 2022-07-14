import React, { useState, useEffect } from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ThumbUp from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpFill from "@mui/icons-material/ThumbUpAlt";
import ThumbDown from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownFill from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/posts/posts.actions";
import { Button } from "@mui/material";
import {
	setUserLike,
	getDataUser,
	selectIsAuth,
	setUserDisLike,
} from "../../redux/auth/auth.actions";
import axios from "./../../axios";
export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
	likesCount,
	disLikesCount,
}) => {
	const dispatch = useDispatch();
	const data = useSelector(getDataUser);
	const isLoadingUser = useSelector(selectIsAuth);
	const [disLikesCounter, setDisLikesCounter] = useState(0);
	const [likesCounter, setLikesCounter] = useState(0);
	
	const addLikePost = (id) => {
		const fields = {
			postId: id,
			userId: data._id,
		};
		dispatch(setUserLike(fields));
		setLikesCounter(likesCounter + 1);
		setDisLikesCounter(disLikesCounter - 1);
	};
	const addDisLikePost = (id) => {
		const fields = {
			postId: id,
			userId: data._id,
		};
		dispatch(setUserDisLike(fields));
		setLikesCounter(likesCounter - 1);
		setDisLikesCounter(disLikesCounter + 1);
	};
	const onClickRemove = async (id) => {
		if (window.confirm("Ви точно хочете видалити статтю?"))
			await dispatch(deletePost(id));
	};

	if (isLoading) {
		return <PostSkeleton />;
	}
	console.log("disLikesCount", disLikesCount);
	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton
						onClick={(e) => {
							onClickRemove(id);
						}}
						color="secondary"
					>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={imageUrl}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((name) => (
							<li key={name}>
								<Link to={`/tag/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
						<li>
							<Button
								className={styles.likes}
								onClick={(e) => addLikePost(id)}
								disabled={isLoadingUser && data.likesPostArray.includes(id)}
							>
								{isLoadingUser && data.likesPostArray.includes(id) ? (
									<ThumbUpFill />
								) : (
									<ThumbUp />
								)}
							</Button>
							<span>{likesCount + likesCounter}</span>
						</li>
						<li>
							<Button
							
								className={styles.likes}
								onClick={(e) => addDisLikePost(id)}
								disabled={isLoadingUser && data.disLikesPostArray.includes(id)}
							>
								{isLoadingUser && data.disLikesPostArray.includes(id) ? (
									<ThumbDownFill />
								) : (
									<ThumbDown />
								)}
							</Button>
							<span>{disLikesCount + disLikesCounter}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
