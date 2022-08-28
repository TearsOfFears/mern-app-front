import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Grid, Typography, Item, Input } from "@mui/material";
import RenderPosts from "../components/RenderPosts/RenderPosts";
import AccountEdit from "../components/AccountEdit/index.jsx";
import { useQuery } from "react-query";
import { postsService } from "../reactQuery/posts/posts.service.js";
import { useAuth } from "../hooks/useAuth.js";
import { userService } from "../reactQuery/auth/user.service.js";
import { CSSTransition } from 'react-transition-group';
export const Account = () => {
	const { id } = useParams();

	const {
		data: userData,
		isFetched,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery(["fetch Current user", id], () =>
		userService.getCurrentUserProfile(id)
	);
	const { data: posts, isLoading: isPostLoading } = useQuery(
		["fetch post user", id],
		() => postsService.getPostByUser(id)
	);

	const configRender = {
		isPostLoading,
		posts,
		userData,
		isUser:true,
	};
	const configRenderAccount = {
		userData,
		isLoading,
		isFetched,
	};
	return (
		<>
			<Grid container spacing={3}>
				{!isLoading && userData && isSuccess ? (
					<AccountEdit {...configRenderAccount} />
				) : (
					<h1>Loading...</h1>
				)}
				<RenderPosts {...configRender} />
			</Grid>
		</>
	);
};
