import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "./../axios.js";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { fetchComments, fetchCommentsById } from "../redux/slices/comments";

export const FullPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState();
	const [isloading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { currentComments } = useSelector((state) => state.comments);
	const isLoadingComments = currentComments.status === "loading";

	useEffect(() => {
		dispatch(fetchCommentsById(id));
		const params = {
			id: id,
		};
		axios
			.post(`/getPosts`, params)
			.then((res) => {
				setPost(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (isloading) {
		return <Post isLoading={isloading} isFullPost />;
	}
	console.log(currentComments);
	return (
		<>
			<Post
				id={post._id}
				title={post.title}
				imageUrl={post.imageURL}
				user={post.author}
				createdAt={post.createdAt}
				viewsCount={post.vievsCount}
				commentsCount={post.commentsCount}
				tags={post.tags}
				isFullPost
			>
				<ReactMarkdown children={post.text} />
			</Post>
			<CommentsBlock
				items={currentComments.items}
				isLoading={isLoadingComments}
				// isEditable={userData?._id === data.author._id}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
