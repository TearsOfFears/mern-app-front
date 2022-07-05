import React, { useLayoutEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchTags } from "../redux/slices/posts";

export const TagsBlock = () => {
	const dispatch = useDispatch();

	const { tags } = useSelector((state) => state.posts);
	const isLoading = tags.status === "loading";
	console.log(isLoading);

	console.log(tags);
  useLayoutEffect(() => {
		dispatch(fetchTags());
	}, []);
	return (
		<SideBlock title="Тэги">
			<List>
				{(isLoading ? [...Array(5)] : tags.items).map((name, i) => (
					<Link
						style={{ textDecoration: "none", color: "black" }}
						to={`/tags/${name}`}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
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
					</Link>
				))}
			</List>
		</SideBlock>
	);
};
