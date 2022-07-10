import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./../../components/Post";

const RenderPosts = ({ isPostLoading, posts, userData }) => {

	
	return (
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
						tags={data.tags}
						isEditable={userData?._id === data.author._id}
					/>
				)
			)}
		</Grid>
	);
};

export default RenderPosts;
