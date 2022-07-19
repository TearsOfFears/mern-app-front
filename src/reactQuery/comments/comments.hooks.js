import { useQuery, QueryCache } from "react-query";
import { commentsSevice } from "./comments.service";


export const useComments = ()=> {
  return useQuery( ["fetch comments"], () => commentsSevice.getAllComments(),{ enabled:true });
}


export const useCommentsById = (values)=> {
  return useQuery( ["fetch comments by ID Post",values], () => commentsSevice.getCommentsById(values),{ cacheTime: 5000, staleTime: 30000 });
}

export const useDeleteComment = (id)=> {
  return useQuery( ["delete comments by Id",id], () => commentsSevice.deleteComment(id),{ enabled:false });
}
