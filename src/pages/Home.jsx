import React, { useEffect, useLayoutEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./../redux/posts/posts.actions";
import RenderPosts from "../components/RenderPosts/RenderPosts.jsx";
import axios from "./../axios.js";
import { fetchComments } from "../redux/comments/comments.actions";
import { Typography } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useMemo } from "react";
export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts } = useSelector((state) => state.posts);
	const { tags } = useSelector((state) => state.posts);
	const { comments } = useSelector((state) => state.comments);
	const isPostLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";

	const isLoadingComments = comments.status === "loading";
	const [searchParams, setSearchParams] = useSearchParams();
	const [sort, setSort] = useState(
		searchParams.get("sort") === null ? "latest" : searchParams.get("sort")
	);
	const search = useLocation().search;
	const queryStringSeach = queryString.parse(useLocation().search);
	const getTag = useMemo(() => {
		const tag = searchParams.get("tag");
		if (tag === null || tag === "") {
			return "Всі";
		} else {
			return `#${tag}`;
		}
	});
	useEffect(() => {
		searchParams.set("sort", sort);
		setSearchParams(searchParams);
	}, [sort]);
	useEffect(() => {
		if (searchParams) {
			console.log(queryStringSeach);
			dispatch(fetchPosts(queryStringSeach));
		}
	}, [searchParams]);

	useEffect(() => {
		dispatch(fetchComments());
	}, []);
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
			<Typography variant="h4" gutterBottom={false}>
				{getTag}
			</Typography>
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
