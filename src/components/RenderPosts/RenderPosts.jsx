import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./../../components/Post";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const RenderPosts = ({ isPostLoading, posts, userData }) => {
	const { id } = useParams();
	return (
		<>
			{id && (
				<Grid item xs={7}>
					<Typography variant="h4" marginBottom={2}>
						Ваші пости
					</Typography>
					{!isPostLoading && posts.length === 0 && (
						<Typography variant="h5" marginBottom={2} marginTop={5}>
							У вас немає постів
						</Typography>
					)}
					<Grid xs={8} item style={{ maxWidth: "100%" }}>
						{(isPostLoading ? [...Array(5)] : posts).map((data, index) =>
							isPostLoading ? (
								<Post key={index} isLoading={true} />
							) : (
								<Post
									id={data._id}
									title={data.title}
									imageUrl={data.imageURL ? data.imageURL : ""}
									authorData={data.author}
									createdAt={data.createdAt}
									viewsCount={data.vievsCount}
									commentsCount={data.commentsCount}
									likesCount={data.likesCount}
									disLikesCount={data.disLikesCount}
									tags={data.tags}
									isEditable={userData?._id === data.author._id}
								/>
							)
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default RenderPosts;
