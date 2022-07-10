import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.actions";
import { Grid, Typography, Item, Input } from "@mui/material";
import RenderPosts from "../components/RenderPosts/RenderPosts";
import AccountEdit from "../components/AccountEdit/index.jsx";
export const Account = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { data, status } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.posts);
	const { comments } = useSelector((state) => state.comments);
	const isPostLoading = posts.status === "loading";
	const isLoadingComments = comments.status === "loading";
	const isLoading = status === "loading";

	useEffect(() => {
		const params = { sort: "latest" };
		dispatch(fetchPosts(params));
	}, []);

	const configRender = {
		isPostLoading,
		posts,
		userData,
	};
	const configRenderAccount = {
		data,
		isLoading
	};
	if (isLoading) {
		return <Typography>Laoding All...</Typography>;
	}
	return (
		<>
			<Grid container spacing={3}>
				<AccountEdit {...configRenderAccount} />
				<Grid item xs={7}>
					<RenderPosts {...configRender} />
				</Grid>
			</Grid>
		</>
	);
};
