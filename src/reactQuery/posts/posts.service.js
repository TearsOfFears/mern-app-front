import axios from "../../axios"


export const postsService = {
    async getAll(params) {
        console.log(params);
        return await axios.get(`/getPosts`, {
            params
        }).then((res) => {
            return res.data
        })
    },
    async getCurrentPost({
        params
    }) {
        return await axios.get("/getCurrentPost", {
            params
        }).then((res) => {
            return res.data
        })
    },
    async getAllTags() {
        return await axios.get('/tags').then((res) => {
            return res.data
        })
    },
    async deleteCurrentPost(params) {
        console.log(params);
        return await axios.delete(`/posts/${params}`);

    }
}


// export const fetchPosts = (params) => {
//     console.log(params);
//     return async (dispatch) => {
//         dispatch({
//             type: postsTypes.FETCH_POSTS_LOADING
//         });
//         await axios.get(`/getPosts`,{params})
//             .then(res => setTimeout(() => {
//                 dispatch({
//                     type: postsTypes.FETCH_POSTS_LOADED,
//                     payload: res.data,
//                 })
//             }, 200))
//             .catch(e => dispatch({
//                 type: postsTypes.FETCH_POSTS_ERRORS,
//                 payload: e,
//             }))
//     }
// }


// export const fetchPostsByUser = (id) => {
//     console.log(id);
//     return async (dispatch) => {
//         dispatch({
//             type: postsTypes.FETCH_POSTS_LOADING
//         });
//         await axios.get(`/posts/${id}`)
//             .then(res => setTimeout(() => {
//                 dispatch({
//                     type: postsTypes.FETCH_POSTS_BYUSER,
//                     payload: res.data,
//                 })
//             }, 200))
//             .catch(e => dispatch({
//                 type: postsTypes.FETCH_POSTS_ERRORS,
//                 payload: e,
//             }))
//     }
// }


// export const deletePost = (params) => {
//     return async (dispatch) => {
//         await axios.delete(`/posts/${params}`)
//             .then(res => 
//                 dispatch({
//                     type: postsTypes.DELETE_POST,
//                     payload: res.data,
//                 })
//             )
//             .catch(e => dispatch({
//                 type: postsTypes.FETCH_POSTS_ERRORS,
//                 payload: e,
//             }))
//     }
// }

// export const fetchTags = () => {
//     return async (dispatch) => {
//         dispatch({
//             type: postsTypes.FETCH_POSTS_LOADING
//         });
//          await axios.get('/tags')
//             .then(res => setTimeout(() => {
//                 dispatch({
//                     type: postsTypes.FETCH_TAGS_LOADED,
//                     payload: res.data,
//                 })
//             }, 200))
//             .catch(e => dispatch({
//                 type: postsTypes.FETCH_POSTS_ERRORS,
//                 payload: e,
//             }))
//     }
// }