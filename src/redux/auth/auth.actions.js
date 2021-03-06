import { authTypes } from "./auth.types"
import axios from "./../../axios";
export const loginUser = (params) => {
    return async (dispatch) => {
        await axios.post('/auth/login', params)
            .then(res => 
                dispatch({
                    type: authTypes.FETCH_LOGIN_USER,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: authTypes.USER_LOGIN_REGISTER_ERRORS,
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
        await axios.post('/auth/register', params)
            .then(res => 
                dispatch({
                    type: authTypes.USER_REGISTER,
                    payload: res.data,
                })
           )
            .catch(e => dispatch({
                type: authTypes.USER_LOGIN_REGISTER_ERRORS,
                payload: e,
            }))
    }
}

export const registrGoogle = (params) => {
    
    return async (dispatch) => {
        await axios.post('/auth/registrGoogle', params)
            .then(res => 
                dispatch({
                    type: authTypes.REGISTR_GOOGLE,
                    payload: res.data,
                })
           )
            .catch(e => dispatch({
                type: authTypes.USER_LOGIN_REGISTER_ERRORS,
                payload: e,
            }))
    }
}

export const loginGoogle = (params) => {
    return async (dispatch) => {
        await axios.post('/auth/loginGoogle', params)
            .then(res => 
                dispatch({
                    type: authTypes.LOGIN_GOOGLE,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: authTypes.USER_LOGIN_REGISTER_ERRORS,
                payload: e,
            }))
    }
}



export const updateUserInfo = (id,fields) => {
    return async (dispatch) => {
        dispatch({
            type: authTypes.AUTH_DATA_LOADED
        });
        await axios.patch(`/auth/${id}`, fields)
            .then(res => setTimeout(()=>{
                dispatch({
                    type: authTypes.UPDATE_USER_INFO,
                    payload: res.data,
                })
            },500)
           )
            .catch(e => dispatch({
                type: authTypes.AUTH_DATA_ERRORS,
                payload: e,
            }))
    }
}


export const setUserLike = (params) => {
    return async (dispatch) => {
        await axios.patch('/auth/user/setLike', params)
            .then(res => 
                dispatch({
                    type: authTypes.ADD_USER_LIKE,
                    payload: res.data,
                })
           )
           .catch(e => dispatch({
            type: authTypes.AUTH_DATA_ERRORS,
            payload: e,
        }))
    }
}


export const setUserDisLike = (params) => {
    return async (dispatch) => {
        await axios.patch('/auth/user/setDisLike', params)
            .then(res => 
                dispatch({
                    type: authTypes.ADD_USER_LIKE,
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

export const clearState = () => ({
    type:authTypes.CLEAR_STORE
})


export const selectIsAuth = state => Boolean(state.auth.data);

export const getDataUser = state => state.auth.data;