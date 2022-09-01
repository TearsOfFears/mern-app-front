import React, { useState, useEffect, useContext } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import UserContext from "../../reactQuery/context/context";
import { useRefresh } from "../../hooks/useRefresh";
import { useMutation } from "react-query";
import { commentsSevice } from "../../reactQuery/comments/comments.service";
import { useCommentsById } from "../../reactQuery/comments/comments.hooks";
import { Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
export const Index = ({ textEdit }) => {
	const { data, isAuth } = useAuth();
	const [text, setText] = useState("");
	const { id, commentId } = useParams();
	const navigate = useNavigate();
	const currentComments = useCommentsById(id);
	const createComments = useMutation(commentsSevice.createComment, {
		onSuccess: () => {
			currentComments.refetch();
		},
	});

	const handleSendComment = async () => {
		setText("");
		if (commentId) {
			const fields = { postId: id, text };
			axios.patch(`/comment/${commentId}`, fields).then(() => {
				setText("");
				navigate(`/posts/${id}`);
				currentComments.refetch();
			});
		} else {
			const params = {
				postId: id,
				text,
			};
			await createComments.mutateAsync(params);
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
	if (currentComments.isLoading) return <Typography> Loading...</Typography>;

	return (
		<>
			<div className={styles.root}>
				{isAuth ? (
					<>
						<Avatar classes={{ root: styles.avatar }} src={data.avatar.image} />
						<div className={styles.form}>
							<TextField
								label="Написати коментар"
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
								Відравити
							</Button>
						</div>
					</>
				) : (
					<Typography variant="h6">Увійдіть щоб написати коментар</Typography>
				)}
			</div>
		</>
	);
};
