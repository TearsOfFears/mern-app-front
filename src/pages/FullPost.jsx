import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "./../axios.js";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import {
	fetchComments,
	fetchCommentsById,
} from "../redux/comments/comments.actions";

export const FullPost = () => {
	const { id, idEdit } = useParams();
	const [post, setPost] = useState();
	const [isloading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { currentComments } = useSelector((state) => state.comments);
	const isLoadingComments = currentComments.status === "loading";
	useEffect(() => {
		if (idEdit) {
			dispatch(fetchCommentsById(idEdit));
			const params = {
				id: idEdit,
			};
			axios
				.get(`/getPosts`, { params })
				.then((res) => {
					setPost(res.data);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		} else {
			const params = {
				id: id,
			};
			dispatch(fetchCommentsById(id));
			axios
				.get(`/getPosts`, { params })
				.then((res) => {
					setPost(res.data);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	if (isloading) {
		return <Post isLoading={isloading} isFullPost />;
	}

	return (
		<>
			<Post
				id={post._id}
				title={post.title}
				imageUrl={post.imageURL}
				user={post.author}
				createdAt={post.createdAt}
				viewsCount={post.vievsCount}
				likesCount={post.likesCount}
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
