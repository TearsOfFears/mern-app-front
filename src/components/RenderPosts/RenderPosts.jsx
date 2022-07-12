import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./../../components/Post";
import { Typography } from "@mui/material";

const RenderPosts = ({ isPostLoading, posts, userData }) => {

	
	return (
		<Grid item xs={7}>
		<Typography variant="h4" marginBottom={2}>Ваші пости</Typography>
		<Grid xs={8} item  style={{maxWidth:"100%"}}> 
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
						commentsCount={data.commentsCount}
						likesCount={data.likesCount}
						tags={data.tags}
						isEditable={userData?._id === data.author._id}
					/>
				)
			)}
		</Grid>
		</Grid>
	);
};

export default RenderPosts;
