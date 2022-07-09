import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { fetchPosts } from "../redux/posts/posts.actions";
import { Grid, Typography, Item } from "@mui/material";
import RenderPosts from "../components/RenderPosts/RenderPosts";

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
		const params = {sort:"latest"}
		dispatch(fetchPosts(params));
	}, []);

	if (isLoading) {
		return <Typography>Laoding...</Typography>;
	}
	const configRender = {
		isPostLoading,
		posts,
		userData,
	};
	return (
		<>
			{isLoading ? (
				<Typography>{id},Laoding</Typography>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Typography>{id},LEFT</Typography>
					</Grid>
					<Grid item spacing={8} >
						<RenderPosts {...configRender} />
					</Grid>
				</Grid>
			)}
		</>
	);
};
