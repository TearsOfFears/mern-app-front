import { useQuery, QueryCache } from "react-query";
import { commentsSevice } from "./comments.service";


export const useComments = (values)=> {
  return useQuery( ["fetch comments"], () => commentsSevice.getAllComments(),{ cacheTime: 5000, staleTime: 30000 });
}
export const useCommentsById = (values)=> {
  return useQuery( ["fetch comments by ID Post",values], () => commentsSevice.getCommentsById(values),{ cacheTime: 5000, staleTime: 30000 });
}
