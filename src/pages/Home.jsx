import React, { useState, useEffect, useMemo, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useLocation, useSearchParams } from "react-router-dom";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useQuery, QueryCache } from "react-query";
import { postsService } from "../reactQuery/posts/posts.service";
import { commentsSevice } from "../reactQuery/comments/comments.service";
import { Typography } from "@mui/material";
import queryString from "query-string";
import UserContext from "../reactQuery/context";
import { useFetchPosts, useFetchTags } from "../reactQuery/posts/posts.hooks";
import { useComments } from "../reactQuery/comments/comments.hooks";
import { useLayoutEffect } from "react";
import { useFetchUser } from "../reactQuery/auth/user.hooks";

export const Home = () => {
	const params = { sort: "latest" };
	const search = useLocation().search;
	const queryStringSeach = queryString.parse(useLocation().search);
	const [searchParams, setSearchParams] = useSearchParams();
	const { user, setUser } = useContext(UserContext);
	const posts = useFetchPosts(queryStringSeach);
	const tags = useFetchTags();
	const userRefresh = useFetchUser();
	const getAllComments = useComments();
	const [dataComments, setState] = useState([]);
	const [sort, setSort] = useState(
		searchParams.get("sort") === null ? "latest" : searchParams.get("sort")
	);

	const getTag = useMemo(() => {
		const tag = searchParams.get("tag");
		if (tag === null || tag === "") {
			return "Всі";
		} else {
			return `#${tag}`;
		}
	});
	useEffect(() => {
		userRefresh.refetch();
	}, []);
	useEffect(() => {
		searchParams.set("sort", sort);
		setSearchParams(searchParams);
	}, [sort]);

	const arr = [
		{
			label: "Нові",
			value: "latest",
		},
		{ label: "Популярні", value: "popularity" },
	];

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
				<Grid xs={8} item style={{ maxWidth: "100%" }}>
					{(posts.isLoading ? [...Array(5)] : posts?.data).map((data, index) =>
						posts.isLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={data._id}
								title={data.title}
								imageUrl={data.imageURL.image ? data.imageURL.image : null}
								authorData={data.author}
								createdAt={data.createdAt}
								viewsCount={data.vievsCount}
								commentsCount={data.commentsCount}
								likesCount={data.likesCount}
								disLikesCount={data.disLikesCount}
								tags={data.tags}
								isLoading={posts.isLoading}
								isEditable={user?._id === data.author._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.data} isLoading={tags.isLoading} />
					<CommentsBlock
						items={getAllComments.data}
						isLoading={getAllComments.isLoading}
					/>
				</Grid>
			</Grid>
		</>
	);
};
