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
import { useParams } from "react-router-dom";
const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [allowScroll, setAllowScroll] = useState(true);
	const [arrivalMessages, setArrivalMessages] = useState([]);
	const { data } = useAuth();
	const { conversId } = useParams();
	const ref = useRef(null);
	const { socket, userOnline } = useContext(SocketContext);
	const getConvers = useQuery(["fetch Convers", data], () =>
		chatService.getAllConversUser(data)
	);

	const handleScroll = useCallback(() => {
		if (ref && ref.current && allowScroll) {
			const scroll = ref.current.clientHeight - ref.current.scrollHeight;
			ref.current.scrollTo({
				top: -scroll,
				behavior: "smooth",
			});
		}
	}, [allowScroll]);

	return (
		<Grid container columnGap={1}>
			<Grid sm={3}>
				<ChatUser
					users={getConvers.data}
					isLoading={getConvers.isLoading}
					isChat={true}
					isOnlineBlock={false}
					sideBlockChat={true}
				/>
			</Grid>
			<Grid sm={6}>
				<ChatBlock refScroll={ref}>
					<AddMessage socket={socket} handleScroll={handleScroll} />
				</ChatBlock>
			</Grid>
			<Grid sm={2}>
				<ChatUser
					users={userOnline.map((obj) => obj.user)}
					isOnlineBlock={true}
					isChat={false}
				/>
			</Grid>
		</Grid>
	);
};

export default Chat;
