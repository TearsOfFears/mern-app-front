import React, { useState,useEffect } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "./../../axios";
import { useParams } from "react-router-dom";
import { createComment,fetchCommentsById } from "../../redux/slices/comments";
export const Index = () => {
	// const {user} = useSelector(state=>state.user)
	const [text, setText] = useState("");
	const { id } = useParams();
	const dispatch = useDispatch();
	const handleSendComment = async() => {
		const params = {
			postId: id,
			text,
		};
		await dispatch(createComment(params));
    setText("")
    await dispatch(fetchCommentsById(id));
	};

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
