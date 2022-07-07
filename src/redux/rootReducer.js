import authReducer from './auth/auth.reducer';
import postsReducer from "./posts/posts.reducer";
import commentsReducer from "./comments/comments.reducer";
const rootReducer = () => ({
    auth:authReducer,
    posts:postsReducer,
    comments:commentsReducer
  });
export default rootReducer