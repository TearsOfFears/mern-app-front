import { useQuery, QueryCache } from "react-query";
import { userService } from "./user.service";


export const useLogin = (values)=> {
  return useQuery( ["login user", values], () => userService.loginUser(values),{refetchOnWindowFocus:true});
}

export const useFetchUser = ()=> {
  return useQuery( ["fetch User"], () => userService.authUser(),{ cacheTime: Infinity, staleTime: 30000 });
}