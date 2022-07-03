import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import axios from "./../axios.js";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "./../redux/slices/posts";
export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts } = useSelector((state) => state.posts);
	const { tags } = useSelector((state) => state.posts);
	const isPostLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";
	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, []);
	console.log(posts);
	// console.log(tags.items);
	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostLoading ? [...Array(5)] : posts.items).map((data, index) =>
						isPostLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={data._id}
								title={data.title}
								imageUrl={data.imageURL ? data.imageURL : ""}
								user={data.author}
								createdAt={data.createdAt}
								viewsCount={data.vievsCount}
								commentsCount={3}
								tags={data.tags}
								isEditable={userData?._id === data.author._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: "Вася Пупкин",
									avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
								},
								text: "Это тестовый комментарий",
							},
							{
								user: {
									fullName: "Иван Иванов",
									avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
								},
								text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
