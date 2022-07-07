import { commentsTypes } from "./comments.types"
import axios from "./../../axios";

export const createComment = (params) => {
    return async (dispatch) => {
        dispatch({
            type: commentsTypes.FETCH_COMMENTS_LOADING
        });
         await axios.post(`/comment`, params)
            .then(res => 
                dispatch({
                    type: commentsTypes.CREATE_COMMENT,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: commentsTypes.FETCH_COMMENTS_ERROR,
                payload: e,
            }))
    }
}

export const deleteComment = (id) => {
    return async (dispatch) => {
        dispatch({
            type: commentsTypes.FETCH_COMMENTS_LOADING
        });
        await axios.delete(`/commentDelete/${id}`)
            .then(res => 
                dispatch({
                    type: commentsTypes.DELETE_COMMENT,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: commentsTypes.FETCH_COMMENTS_ERROR,
                payload: e,
            }))
    }
}

export const fetchComments = () => {
    return async (dispatch) => {
        dispatch({
            type: commentsTypes.FETCH_COMMENTS_LOADING
        });
        await axios.get(`/comment`)
            .then(res => 
                dispatch({
                    type: commentsTypes.FETCH_COMMENTS_LOADED,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: commentsTypes.FETCH_COMMENTS_ERROR,
                payload: e,
            }))
    }
}

export const fetchCommentsById = (id) => {
    return async (dispatch) => {
        dispatch({
            type: commentsTypes.FETCH_CURRENTCOMMENTS_LOADING
        });
        await axios.get(`/comment/${id}`)
            .then(res => 
                dispatch({
                    type: commentsTypes.FETCH_CURRENTCOMMENTS_LOADED,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: commentsTypes.FETCH_COMMENTS_ERROR,
                payload: e,
            }))
    }
}

  

