import {useContext} from "react"
import UserContext from "../reactQuery/context"

export const useAuth = ()=>{
    const {user,isLoading, setUser} = useContext(UserContext)
    const isAuth = Boolean(user);
    const isUser = !isLoading && user?.roles.includes("user");
    const isWritter = !isLoading && user?.roles.includes("writter");
    const isAdmin = !isLoading && user?.roles.includes("writter");
    const data = user;
    return {isAuth,isLoading,data,setUser,isUser,isWritter,isAdmin}
}