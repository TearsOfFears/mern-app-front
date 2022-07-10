import { authTypes } from "./auth.types"
import axios from "./../../axios";
export const loginUser = (params) => {
    return async (dispatch) => {
        dispatch({
            type: authTypes.AUTH_DATA_LOADED
        });
        await axios.post('/auth/login', params)
            .then(res => 
                dispatch({
                    type: authTypes.FETCH_LOGIN_USER,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: authTypes.AUTH_DATA_ERRORS,
                payload: e,
            }))
    }
}

export const fetchAuthUser = () => {
    
    return async (dispatch) => {
        dispatch({
            type: authTypes.AUTH_DATA_LOADED
        });
         await axios.get('/auth/user')
            .then(res => 
                dispatch({
                    type: authTypes.FETCH_AUTH_DATA,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: authTypes.AUTH_DATA_ERRORS,
                payload: e,
            }))
    }
}

export const userRegister = (params) => {
    
    return async (dispatch) => {
        dispatch({
            type: authTypes.AUTH_DATA_LOADED
        });
        await axios.post('/auth/register', params)
            .then(res => 
                dispatch({
                    type: authTypes.USER_REGISTER,
                    payload: res.data,
                })
           )
            .catch(e => dispatch({
                type: authTypes.AUTH_DATA_ERRORS,
                payload: e,
            }))
    }
}

export const updateUserInfo = (params) => {
    return async (dispatch) => {
        dispatch({
            type: authTypes.AUTH_DATA_LOADED
        });
        await axios.patch('/auth/register', params)
            .then(res => 
                dispatch({
                    type: authTypes.USER_REGISTER,
                    payload: res.data,
                })
           )
            .catch(e => dispatch({
                type: authTypes.AUTH_DATA_ERRORS,
                payload: e,
            }))
    }
}


export const logout = () => ({
    type:authTypes.USER_LOGOUT
})
export const selectIsAuth = state => Boolean(state.auth.data);

export const getDataUser = state => state.auth.data;