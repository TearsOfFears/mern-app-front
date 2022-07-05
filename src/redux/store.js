import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comments";
import logger from 'redux-logger'
const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer:{
        posts:postsReducer,
        auth:authReducer,
        comments:commentsReducer
    }
})

export default store;