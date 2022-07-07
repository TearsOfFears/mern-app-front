import { postsTypes } from "./posts.types"
import axios from "./../../axios";

export const fetchPosts = (params) => {
    return async (dispatch) => {
        dispatch({
            type: postsTypes.FETCH_POSTS_LOADING
        });
        await axios.post('/getPosts',params)
            .then(res => setTimeout(() => {
                dispatch({
                    type: postsTypes.FETCH_POSTS_LOADED,
                    payload: res.data,
                })
            }, 200))
            .catch(e => dispatch({
                type: postsTypes.FETCH_POSTS_ERRORS,
                payload: e,
            }))
    }
}

export const deletePost = (params) => {
    return async (dispatch) => {
        await axios.delete(`/posts/${params}`)
            .then(res => 
                dispatch({
                    type: postsTypes.DELETE_POST,
                    payload: res.data,
                })
            )
            .catch(e => dispatch({
                type: postsTypes.FETCH_POSTS_ERRORS,
                payload: e,
            }))
    }
}

export const fetchTags = () => {
    return async (dispatch) => {
        dispatch({
            type: postsTypes.FETCH_POSTS_LOADING
        });
         await axios.get('/tags')
            .then(res => setTimeout(() => {
                dispatch({
                    type: postsTypes.FETCH_TAGS_LOADED,
                    payload: res.data,
                })
            }, 200))
            .catch(e => dispatch({
                type: postsTypes.FETCH_POSTS_ERRORS,
                payload: e,
            }))
    }
}
