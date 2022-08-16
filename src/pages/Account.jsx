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
	const {data:userData,isAuth} = useAuth();
	const {data:posts,isLoading:isPostLoading} = useQuery(["fetch post user",id],()=>postsService.getPostByUser(id))
	// const {data,isLoading} = useQuery(["fetch user",id],()=>userService.authUser))

	const configRender = {
		isPostLoading,
		posts,
		userData,
	};
	const configRenderAccount = {
		userData,
	};
	if (!isAuth) {
		return <Typography>Loading All...</Typography>;
	}

	return (
		<>
			<Grid container spacing={3}>
				<AccountEdit {...configRenderAccount} />
				<RenderPosts {...configRender} />
			</Grid>
		</>
	);
};
