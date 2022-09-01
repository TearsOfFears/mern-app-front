import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../../axios";
import UserContext from "../../reactQuery/context/context";
import { useRefresh } from "../../hooks/useRefresh";
import { useMutation, useQuery } from "react-query";
import { commentsSevice } from "../../reactQuery/comments/comments.service";
import { useCommentsById } from "../../reactQuery/comments/comments.hooks";
import { Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { chatService } from "../../reactQuery/chat/chat.service";
export const AddMessage = ({ textEdit, socket }) => {
	const { data, isAuth } = useAuth();
	const [text, setText] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
	const allMessages = useQuery(["fetch Messages"], () =>
		chatService.getAllMessages()
	);
	const createMessage = useMutation(chatService.createMessage, {
		onSuccess: () => {
			allMessages.refetch();
		},
	});
	const handleSendMessage = async () => {
		setText("");
		if (id) {
			const fields = { id: id, text };
			axios.patch(`api/messages/update/${id}`, fields).then(() => {
				setText("");
				navigate("/chat");
				allMessages.refetch();
			});
		} else {
			const params = {
				text,
				userId: data._id,
			};
			socket.emit("sendMessage", {
				author: data._id,
				text,
			});
			// await createMessage.mutateAsync(params);
		}
	};

	useEffect(() => {
		if (id) {
			allMessages.data
				.filter((obj) => id === obj._id)
				.map((data) => setText(data.text));
		} else {
			setText("");
		}
	}, [id]);
	if (allMessages.isLoading) return <Typography> Loading...</Typography>;

	return (
		<>
			<div className={styles.rootWrite}>
				{isAuth ? (
					<>
						<Avatar classes={{ root: styles.avatar }} src={data.avatar.image} />
						<div className={styles.form}>
							<TextField
								label="Введіть текст тут..."
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
								onClick={(e) => handleSendMessage()}
							>
								{id ? "Оновити" : "Відравити"}
							</Button>
						</div>
					</>
				) : (
					<Typography variant="h6">
						Увійдіть щоб написати повідомлення
					</Typography>
				)}
			</div>
		</>
	);
};
