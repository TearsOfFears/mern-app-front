import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AddMessage } from "../components/Chat/AddMessage";
import { ChatBlock } from "../components/Chat/ChatBlock";
import { useAuth } from "../hooks/useAuth";
import { chatService } from "../reactQuery/chat/chat.service";
import { useComments } from "../reactQuery/comments/comments.hooks";
import UserContext from "../reactQuery/context";
import { socket } from "../reactQuery/socket.js";
import { io } from "socket.io-client";
import { useRef } from "react";
const { REACT_APP_API_URL } = process.env;
const Chat = () => {
	const { data, isLoading } = useAuth();
	const [messages, setMessages] = useState([]);
	const [arrivalMessages, setArrivalMessages] = useState([]);
	// const { user } = useContext(UserContext);
	const socket = useRef();
	const allMessages = useQuery(
		["fetch Messages"],
		() => chatService.getAllMessages(),
		{
			onSuccess: (data) => {
				setMessages(data);
			},
		}
	);
	useEffect(() => {
		socket.current = io(REACT_APP_API_URL);
		!isLoading && data && socket.current.emit("addUser", data._id);
		socket.current.on("getUsers", (data) => {
			console.log(data);
		});
	}, [data, isLoading]);
	
	useEffect(() => {
		socket.current.on("getMessage", (data) => {
			setArrivalMessages(data);
		});
	}, [data,]);
	useEffect(() => {
		arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
	}, [arrivalMessages]);
	return (
		<ChatBlock items={messages} isLoading={allMessages.isLoading}>
			<AddMessage socket={socket}/>
		</ChatBlock>
	);
};

export default Chat;
