import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";
import { useFetchCurrentPost } from "../reactQuery/posts/posts.hooks";
import { useCommentsById } from "../reactQuery/comments/comments.hooks";
import UserContext from "../reactQuery/context";

export const FullPost = () => {
	const { id, idEdit } = useParams();

	const params = {
		id: id,
	};

	const post = useFetchCurrentPost({ params });
	const comments = useCommentsById(id);
	const { user } = useContext(UserContext);
	useEffect(() => {
		if (idEdit) {
			// dispatch(fetchCommentsById(idEdit));
			const params = {
				id: idEdit,
			};
			//  const {data,isLoading} =  useFetchCurrentPost()
			// axios
			// 	.get(`/getCurrentPost`, { params })
			// 	.then((res) => {
			// 		setPost(res.data);
			// 		setLoading(false);
			// 	})
			// 	.catch((err) => console.log(err));
		} else {
			// dispatch(fetchCommentsById(id));
			// axios
			// 	.get(`/getCurrentPost`, { params })
			// 	.then((res) => {
			// 		setPost(res.data);
			// 		setLoading(false);
			// 	})
			// 	.catch((err) => console.log(err));
		}
	}, []);

	if (post.isLoading) {
		return <Post isLoading={post.isLoading} isFullPost />;
	}

	return (
		<>
			<Post
				id={post.data.id}
				title={post.data.title}
				imageUrl={post.data.imageURL}
				user={post.data.author}
				createdAt={post.data.createdAt}
				viewsCount={post.data.vievsCount}
				likesCount={post.data.likesCount}
				disLikesCount={post.data.disLikesCount}
				commentsCount={post.data.commentsCount}
				tags={post.data.tags}
				isFullPost
			>
				<ReactMarkdown children={post.data.text} />
			</Post>
			<CommentsBlock
				items={comments.data}
				isLoading={comments.isLoading}
				isEditable={user?.id === post?.data.author._id}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
