import React, { useEffect, useState } from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import { useNavigate } from "react-router-dom";
export const CommentsBlock = ({ items, isLoading, children }) => {
	const navigate = useNavigate();

	const getPost = (id) => {
		navigate(`/posts/${id}`);
	};
	return (
		<SideBlock title="Комментарии">
			<List 	style={{ width: "98%" }}>
				{(isLoading ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem
							alignItems="flex-start"
							style={!isLoading && obj.postId ? { cursor: "cursor" } :{ cursor: "pointer" } }
							onClick={(e) => getPost(obj.postId)}
						>
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar
										alt={obj.author.fullName}
										src={obj.author.avatarUrl}
									/>
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<ListItemText
									primary={obj.author.fullName}
									secondary={obj.text}
								/>
							)}
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
