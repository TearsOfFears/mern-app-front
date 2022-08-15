import {useQuery, QueryCache, useMutation} from "react-query";
import {postsService} from "./posts.service";

export const useFetchPosts = (values) => {
  return useQuery([
    "fetch Posts", values
  ], () => postsService.getAll(values), {
    cacheTime: Infinity,
    staleTime: 30000
  });
}
export const useFetchCurrentPost = (values) => {
  return useQuery([
    "fetch Current Post", values
  ], () => postsService.getCurrentPost(values), {staleTime: 30000});
}

export const useFetchTags = () => {
  return useQuery(["fetch Tags"], () => postsService.getAllTags(), {
    cacheTime: Infinity,
    staleTime: 30000
  });
}
export const useDeletePost = (values) => {
  return useMutation(["delete Post",values], () => postsService.deleteCurrentPost(values));
}