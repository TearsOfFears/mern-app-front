import {useContext} from "react"
import UserContext from "../reactQuery/context"

export const useAuth = ()=>{
    const {user,isLoading, setUser} = useContext(UserContext)
    const isAuth = Boolean(user);
    const data = user;
    return {isAuth,isLoading,data,setUser}
}