import React, { useState, useEffect, useContext } from "react";
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
import UserContext from "../../reactQuery/context";
import { useRefresh } from "../../hooks/useRefresh";
import { useMutation } from "react-query";
import { commentsSevice } from "../../reactQuery/comments/comments.service";
import { useCommentsById } from "../../reactQuery/comments/comments.hooks";
import { Typography } from "@mui/material";
export const Index = ({ textEdit }) => {
  const {user} = useContext(UserContext);
	const [text, setText] = useState("");
	const { id, commentId } = useParams();
	const navigate = useNavigate();
  const refresh = useRefresh();
  const currentComments = useCommentsById(id);
  const createComments = useMutation(commentsSevice.createComment)

	const handleSendComment = async () => {
		setText("");
		if (commentId) {
			const fields = { postId: id, text };
			axios.patch(`/comment/${commentId}`, fields).then(() => {
				setText("");
				navigate(`/posts/${id}`);
			}).then(()=> refresh("fetch comments by ID Post"))
		} else {
			const params = {
				postId: id,
				text,
			};
      await createComments.mutateAsync(params);
      refresh("fetch comments by ID Post");
		}
	};

	useEffect(() => {
		if (commentId) {
			currentComments.data
				.filter((obj) => commentId === obj._id)
				.map((data) => setText(data.text));
		} else {
			setText("");
		}
	}, [commentId]);
if(currentComments.isLoading)
return <Typography> Loading...</Typography>

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={user.avatarURL}
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
