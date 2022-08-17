import {
  useQuery,
  QueryCache,
  useMutation
} from "react-query";
import {
  commentsSevice
} from "./comments.service";


export const useComments = () => {
  return useQuery(["fetch comments"], () => commentsSevice.getAllComments(), {
    refetchIntervalInBackground: true
  });
}


export const useCommentsById = (values) => {
  return useQuery(["fetch comments by ID Post", values], () => commentsSevice.getCommentsById(values), {
    refetchOnWindowFocus:true,
    enabled: false
  });
}

export const useDeleteComment = (id) => {
  return useMutation(["delete comments by Id", id], () => commentsSevice.deleteComment(id), {
    enabled: false
  });
}