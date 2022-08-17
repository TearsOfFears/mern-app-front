import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsByUser } from "../redux/posts/posts.actions";
import { Grid, Typography, Item, Input } from "@mui/material";
import RenderPosts from "../components/RenderPosts/RenderPosts";
import AccountEdit from "../components/AccountEdit/index.jsx";
import { useQuery } from "react-query";
import { postsService } from "../reactQuery/posts/posts.service.js";
import { useAuth } from "../hooks/useAuth.js";
import { userService } from "../reactQuery/auth/user.service.js";
export const Account = () => {
	const { id } = useParams();

	const { data: userData, isFetched,isLoading,refetch } = useQuery(
		["fetch Current user", id],
		() => userService.getCurrentUserProfile(id)
	);
	const { data: posts, isLoading: isPostLoading } = useQuery(
		["fetch post user", id],
		() => postsService.getPostByUser(id)
	);
	
	if (isLoading) return <h3>Loading..</h3>;
	const configRender = {
		isPostLoading,
		posts,
		userData,
	};
	const configRenderAccount = {
		userData,
		isLoading,
		isFetched
	};
	
	

	return (
		<>
			<Grid container spacing={3}>
				<AccountEdit {...configRenderAccount} />
				<RenderPosts {...configRender} />
			</Grid>
		</>
	);
};
