import {
    useContext,
    useEffect
} from "react"
import {
    useNavigate
} from "react-router-dom"
import Loader from "../components/Loader"
import {
    useFetchUser
} from "../reactQuery/auth/user.hooks"
import UserContext from "../reactQuery/context"

export default (roleCheck) => {
    const navigate = useNavigate()
    const {
        data,
        isLoading
    } = useFetchUser()

    if (isLoading)
        return <Loader/> ;
    if (data && data.roles.includes(roleCheck))
        return true;

    return navigate("/?sort=latest&tag=react")
}