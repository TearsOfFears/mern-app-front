import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AddMessage } from "../components/Chat/AddMessage";
import { ChatBlock } from "../components/Chat/ChatBlock";
import { useAuth } from "../hooks/useAuth";
import { chatService } from "../reactQuery/chat/chat.service";
import { useComments } from "../reactQuery/comments/comments.hooks";
import UserContext from "../reactQuery/context/context";
import { socket } from "../reactQuery/socket.js";
import { io } from "socket.io-client";
import { useRef } from "react";
import { SocketContext } from "../reactQuery/context/socket";
import { Grid } from "@mui/material";
import ChatUser from "../components/Chat/ChatUser";
const Chat = () => {
	const { data, isLoading } = useAuth();
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [arrivalMessages, setArrivalMessages] = useState([]);
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);
	// const socket = useRef();
	const allMessages = useQuery(["fetch Messages"], () =>
		chatService.getAllMessages()
	);
	useEffect(() => {
		user && socket.emit("addUser", user._id);
	}, []);
	useEffect(() => {
		socket.on("getUsers", (data) => {
			setUsers(data);
		});
	}, []);
	useEffect(() => {
		const handleSetMessage = (data) => {
			console.log("MESAGE", data);
			setArrivalMessages(data);
		};
		socket.on("getMessage", handleSetMessage);
		return () => {
			socket.off("getMessage", handleSetMessage);
		};
	}, []);
	useEffect(() => {
		const handleSetMessageUpdated = (data) => {
			setMessages((prev) =>
				prev.map((obj) => (obj._id === data._id ? data : obj))
			);
			allMessages.refetch();
		};
		socket.on("getUpdatedMessage", handleSetMessageUpdated);
		return () => {
			socket.off("getUpdatedMessage", handleSetMessageUpdated);
		};
	}, []);
	useEffect(() => {
		const handleSetMessageUpdated = (data) => {
			setMessages((prev) => prev.filter((obj) => obj._id !== data._id));
		};
		socket.on("getDelatedMessage", handleSetMessageUpdated);
		return () => {
			socket.off("getDelatedMessage", handleSetMessageUpdated);
		};
	}, []);

	useEffect(() => {
		if (!allMessages.isLoading && allMessages.data.length > 0) {
			setMessages(allMessages.data);
		}
	}, [allMessages.data]);

	useEffect(() => {
		Object.keys(arrivalMessages).length > 0 &&
			setMessages((prev) => [...prev, arrivalMessages]);
	}, [arrivalMessages]);

	return (
		<Grid container columnGap={2}>
			<Grid sm={3}>
				<ChatUser users={users} isLoading={allMessages.isLoading} />{" "}
			</Grid>
			<Grid sm={8}>
				<ChatBlock items={messages} isLoading={allMessages.isLoading}>
				<AddMessage socket={socket} />
			</ChatBlock>
			</Grid>
		
		</Grid>
	);
};

export default Chat;
