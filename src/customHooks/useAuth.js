import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthUser, selectIsAuth} from "./../redux/auth/auth.actions"
export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [])
  return isAuth;
}