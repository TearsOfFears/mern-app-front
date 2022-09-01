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
const { REACT_APP_API_URL } = process.env;
const Chat = () => {
	const { data, isLoading } = useAuth();
	const [messages, setMessages] = useState([]);
	const [arrivalMessages, setArrivalMessages] = useState([]);
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext)
	// const socket = useRef();
	const allMessages = useQuery(
		["fetch Messages"],
		() => chatService.getAllMessages(),
	);
	useEffect(() => {
		socket.on("getUsers", (data) => {
				console.log(data);
			});
	}, [isLoading]);

	useEffect(() => {
		const handleSetMessage = (data) => {
			console.log("MESAGE",data);
			setArrivalMessages(data);
		}
		socket.on("getMessage",handleSetMessage );
		return () => {
			socket.off("getMessage", handleSetMessage);
		  };
	}, []);
	useEffect(() => {
		if(!allMessages.isLoading && allMessages.data.length>0){
			setMessages(allMessages.data);
		}
	}, [allMessages.data]);

	useEffect(() => {
		Object.keys(arrivalMessages).length>0 && setMessages((prev) => [...prev,arrivalMessages]);
	}, [arrivalMessages]);
	return (
		<ChatBlock items={messages} isLoading={allMessages.isFetching}>
			<AddMessage socket={socket} />
		</ChatBlock>
	);
};

export default Chat;
