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
import { SignalCellularNullSharp } from "@mui/icons-material";
import { useMemo } from "react";
import { useCallback } from "react";
const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [allowScroll, setAllowScroll] = useState(true);
	const [arrivalMessages, setArrivalMessages] = useState([]);
	const { user } = useContext(UserContext);
	const ref = useRef(null);
	const { socket, userOnline, setOnline } = useContext(SocketContext);
	const allMessages = useQuery(["fetch Messages"], () =>
		chatService.getAllMessages()
	);

	// useEffect(() => {
	// 	const handleGetUser = (data) => {
	// 		setOnline(data);
	// 	};
	// 	socket.on("getUsers", handleGetUser);
	// 	return () => {
	// 		socket.off("getUsers", handleGetUser);
	// 	};
	// }, [userOnline,user]);

	const handleScroll = useCallback(() => {
		if (ref && ref.current && allowScroll) {
			const scroll = ref.current.clientHeight - ref.current.scrollHeight;
			ref.current.scrollTo({
				top: -scroll,
				behavior: "smooth",
			});
		}
	}, [allowScroll]);
	useEffect(() => {
		const handleSetMessage = (data) => {
			setArrivalMessages(data);
			handleScroll();
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
		const handleHoverInSide = () => {
			if (ref.current) {
				setAllowScroll(false);
			}
		};
		const handleHoverOutSide = () => {
			if (ref.current) {
				setAllowScroll(true);
			}
		};
		if (ref.current && ref) {
			ref.current.addEventListener("mouseover", handleHoverInSide);
			ref.current.addEventListener("mouseout", handleHoverOutSide);
		}
		return () => {
			if (ref.current && ref) {
				ref.current.removeEventListener("mouseover", handleHoverInSide, false);
				ref.current.removeEventListener("mouseout", handleHoverOutSide, false);
			}
		};
	}, [ref]);
	useEffect(() => {
		handleScroll();
	}, [arrivalMessages, messages]);
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
				<ChatUser users={userOnline} isLoading={allMessages.isLoading} />
			</Grid>
			<Grid sm={8}>
				<ChatBlock
					items={messages}
					isLoading={allMessages.isLoading}
					refScroll={ref}
				>
					<AddMessage socket={socket} handleScroll={handleScroll} />
				</ChatBlock>
			</Grid>
		</Grid>
	);
};

export default Chat;
