import React, { useState } from "react";
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
import { Button } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../reactQuery/context";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQuery } from "react-query";
import { commentsSevice } from "../../reactQuery/comments/comments.service";
import { useRefresh, mutateAsync } from "../../hooks/useRefresh";
import { useFetchUser } from "../../reactQuery/auth/user.hooks";
import { postsService } from "../../reactQuery/posts/posts.service";

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	authorData,
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
	const [disLikesCounter, setDisLikesCounter] = useState(0);
	const [likesCounter, setLikesCounter] = useState(0);
	const { isAuth } = useAuth();
	const { user: data } = useContext(UserContext);
	const user = useFetchUser();
	const refresh = useRefresh();
	const setLikeUser = useMutation(commentsSevice.setUserLike, {
		onSuccess: () => {
			user.refetch();
		},
	});
	const deletePost = useMutation(postsService.deleteCurrentPost, {
		onSuccess: () => {
			refresh("fetch Posts");
		},
	});

	const setDisLikeUser = useMutation(commentsSevice.setUserDisLike, {
		onSuccess: () => {
			user.refetch();
		},
	});
	const addLikePost = async (id) => {
		const fields = {
			postId: id,
			userId: data._id,
		};
		console.log(fields);
		await setLikeUser.mutateAsync(fields);

		if (!data.disLikesPostArray.includes(id)) {
			setLikesCounter(likesCounter + 1);
		} else {
			setLikesCounter(likesCounter + 1);
			setDisLikesCounter(disLikesCounter - 1);
		}
	};
	const addDisLikePost = async (id) => {
		const fields = {
			postId: id,
			userId: data._id,
		};
		await setDisLikeUser.mutateAsync(fields);

		if (!data.likesPostArray.includes(id)) {
			setDisLikesCounter(disLikesCounter + 1);
		} else {
			setLikesCounter(likesCounter - 1);
			setDisLikesCounter(disLikesCounter + 1);
		}
	};

	const onClickRemove = async (id) => {
		if (window.confirm("Ви точно хочете видалити статтю?"))
			await deletePost.mutateAsync(id);
	};

	if (isLoading) {
		return <PostSkeleton />;
	}
	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={() => onClickRemove(id)} color="secondary">
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
				<UserInfo {...authorData} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((name) => (
							<li key={name}>
								<a href={`/tag/${name}`}>#{name}</a>
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
								className={isAuth ? styles.likes : styles.likesDisabled}
								onClick={(e) => addLikePost(id)}
								disabled={
									data !== null
										? isAuth && data.likesPostArray.includes(id)
										: true
								}
							>
								{isAuth && data.likesPostArray.includes(id) ? (
									<ThumbUpFill />
								) : (
									<ThumbUp />
								)}
							</Button>
							<span>{likesCount + likesCounter}</span>
						</li>
						<li>
							<Button
								className={isAuth ? styles.likes : styles.likesDisabled}
								onClick={(e) => addDisLikePost(id)}
								disabled={
									data !== null
										? isAuth && data.disLikesPostArray.includes(id)
										: true
								}
							>
								{isAuth && data.disLikesPostArray.includes(id) ? (
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
