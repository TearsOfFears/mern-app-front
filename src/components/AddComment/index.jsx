import React, { useState, useEffect } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	createComment,
	fetchCommentsById,
} from "../../redux/comments/comments.actions";
import { fetchPosts } from "../../redux/posts/posts.actions";
import axios from "./../../axios";
export const Index = ({ textEdit }) => {
	const [text, setText] = useState("");
	const { id, commentId } = useParams();
	const navigate = useNavigate();
	const { currentComments } = useSelector((state) => state.comments);
	const isLoadingComments = currentComments.status === "loading";
	const dispatch = useDispatch();
	const handleSendComment = async () => {
		setText("");
		if (commentId) {
			const fields = { postId: id, text };

			axios.patch(`/comment/${commentId}`, fields).then(() => {
				setText("");
				navigate(`/posts/${id}`);
			});
		} else {
			const params = {
				postId: id,
				text,
			};
			await dispatch(createComment(params));
		}

		await dispatch(fetchCommentsById(id));
		await dispatch(fetchPosts(id));
	};
	useEffect(() => {
		if (commentId) {
			currentComments.items
				.filter((obj) => commentId === obj._id)
				.map((data) => setText(data.text));
		} else {
			setText("");
		}
	}, [commentId]);
	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src="https://mui.com/static/images/avatar/5.jpg"
				/>
				<div className={styles.form}>
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<Button
						variant="contained"
						type="submit"
						onClick={(e) => handleSendComment()}
					>
						Отправить
					</Button>
				</div>
			</div>
		</>
	);
};
