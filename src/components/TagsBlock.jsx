import React,{useState,useEffect} from "react";
import { SideBlock } from "./SideBlock";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { postsService } from "../reactQuery/posts/posts.service";
import { useQuery, QueryCache } from "react-query";
import { Typography,Button } from "@mui/material";

export const TagsBlock = ({ items, isLoading }) => {
	const [searchParams, setSearchParams] = useSearchParams();
  const search = useLocation().search;
	const queryStringSeach = queryString.parse(useLocation().search);
  const posts = useQuery(
		["load all posts", queryStringSeach],
		() => postsService.getAll(queryStringSeach),
		{ cacheTime: 5*60*1000, staleTime: 30000 }
	);
	const [tag, setTag] = useState("");

  useEffect(() => {
		searchParams.set("tag", tag);
		setSearchParams(searchParams);
	}, [tag]);
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
      {(isLoading ? [...Array(5)] : items).map((name, i) => (
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
