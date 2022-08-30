import React from "react";
import { useQuery } from "react-query";
import { AddMessage } from "../components/Chat/AddMessage";
import { ChatBlock } from "../components/Chat/ChatBlock";
import { chatService } from "../reactQuery/chat/chat.service";
import { useComments } from "../reactQuery/comments/comments.hooks";

const Chat = () => {
	const allMessages = useQuery(["fetch Messages"], () =>
		chatService.getAllMessages()
	);
	return (
		<ChatBlock items={allMessages.data} isLoading={allMessages.isLoading}>
			<AddMessage />
		</ChatBlock>
	);
};

export default Chat;
