import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./../../components/Post";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./RenderPosts.module.scss";
const RenderPosts = ({ isPostLoading, posts, userData, isUser }) => {
	const { data: authUserData, isAuth } = useAuth();
	const { id } = useParams();
	return (
		<>
			<Grid item xs={isUser ? 7 : 8}>
				{isUser && (
					<>
						{" "}
						<Typography variant="h4" marginBottom={2}>
							Пости
						</Typography>
						{!isPostLoading &&
							posts.length === 0 &&
							(isAuth && authUserData._id === id ? (
								<Typography variant="h5" marginBottom={2} marginTop={5}>
									У вас немає постів
								</Typography>
							) : (
								<Typography variant="h5" marginBottom={2} marginTop={5}>
									У користувача немає постів
								</Typography>
							))}
					</>
				)}
				<TransitionGroup>
					<Grid xs={8} item style={{ maxWidth: "100%" }}>
						{(isPostLoading ? [...Array(2)] : posts).map((data, index) =>
							isPostLoading ? (
								<Post key={index} isLoading={true} />
							) : (
								<CSSTransition
									key={index}
									in={!isPostLoading}
									timeout={500}
									classNames={{
										enter: styles.enter,
										enterActive: styles.enterActive,
										enterDone: styles.enterActive,
									}}
								>
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
										isLoading={isPostLoading}
										isEditable={userData?._id === data.author._id}
									/>
								</CSSTransition>
							)
						)}
					</Grid>
				</TransitionGroup>
			</Grid>
		</>
	);
};

export default RenderPosts;
