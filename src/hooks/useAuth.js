import {useContext} from "react"
import UserContext from "../reactQuery/context"

export const useAuth = ()=>{
    const {user, setUser} = useContext(UserContext)
    const isAuth = Boolean(user);
    const data = user;
    return {isAuth,data,setUser}
}