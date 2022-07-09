import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SideBlock } from "./SideBlock";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { fetchPosts, fetchTags } from "../redux/posts/posts.actions";
import { Button, Typography } from "@mui/material";
import queryString from "query-string";
export const TagsBlock = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { tags } = useSelector((state) => state.posts);
	const isLoading = tags.status === "loading";
	const [tag, setTag] = useState("");
	const search = useLocation().search;
	const queryStringSeach = queryString.parse(useLocation().search);
	useEffect(() => {
		dispatch(fetchTags());
	}, []);
	useEffect(() => {
		searchParams.set("tag", tag);
		setSearchParams(searchParams);
	}, [tag]);
	useEffect(() => {
		if (searchParams) {
			dispatch(fetchPosts(queryStringSeach));
		}
	}, [searchParams]);
	return (
		<SideBlock>
			<div style={{ display: "flex", flexDirection: "row", alignItems:"center",justifyContent:"space-between",padding:"15px 15px 0 15px" }}>
				<Typography variant="h5">Тэги</Typography>
				<Button
					variant="contained"
					color="inherit"
					size="medium"
					onClick={(e) => setTag("")}
				>
					Очистити
				</Button>
			</div>

			<List style={{ display: "flex", flexDirection: "column" }}>
				{(isLoading ? [...Array(5)] : tags.items).map((name, i) => (
					<ListItem key={i} disablePadding>
						<ListItemButton
							onClick={(e) => setTag(name)}
							style={
								name === tag
									? { backgroundColor: "#F5F5F5" }
									: { color: "black" }
							}
						>
							<ListItemIcon>
								<TagIcon />
							</ListItemIcon>
							{isLoading ? (
								<Skeleton width={100} />
							) : (
								<ListItemText primary={name} />
							)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</SideBlock>
	);
};
