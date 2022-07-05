import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "./../redux/slices/posts";
import RenderPosts from "../components/RenderPosts/RenderPosts.jsx";
import axios from "./../axios.js";
import { fetchComments } from "../redux/slices/comments";
export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts } = useSelector((state) => state.posts);
	const { tags } = useSelector((state) => state.posts);
	const { comments } = useSelector((state) => state.comments);
	const isPostLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";
	const [sort, setSort] = useState("latest");
	const isLoadingComments = comments.status === "loading";

	useEffect(() => {
		const params = { sort: sort };
		dispatch(fetchPosts(params));
	}, [sort]);

	useEffect(() => {
		dispatch(fetchComments());
	}, []);
	console.log(comments.items);
	const arr = [
		{
			label: "Новые",
			value: "latest",
		},
		{ label: "Популярные", value: "popularity" },
	];
	const configRender = {
		isPostLoading,
		posts,
		userData,
	};
	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={sort}
				aria-label="basic tabs example"
			>
				{arr.map((data, index) => (
					<Tab
						label={data.label}
						value={data.value}
						onClick={(e) => {
							setSort(data.value);
						}}
					/>
				))}
			</Tabs>
			<Grid container spacing={4}>
				<RenderPosts {...configRender} />
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock items={comments.items} isLoading={isLoadingComments} />
				</Grid>
			</Grid>
		</>
	);
};
