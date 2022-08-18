import { useQuery, QueryCache,useMutation } from "react-query";
import { userService } from "./user.service";


export const useLogin = (values)=> {
  return useMutation( ["login user", values],userService.loginUser);
}

export const useFetchUser = ()=> {
  return useQuery( ["fetch User"], () => userService.authUser(),{refetchOnWindowFocus:true,enabled:false});
}