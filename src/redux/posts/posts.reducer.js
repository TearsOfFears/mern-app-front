import {postsTypes} from "./posts.types"
const initialState = {
  posts: {
    items: [],
    status: 'loading',
    errors: []
  },
  tags: {
    items: [],
    status: 'loading',
    errors: []
  }
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case postsTypes.FETCH_POSTS_LOADING:
      return {
        ...state,
        posts: {
          ...state.posts,
          status: 'loading',
          items: [],
          errors: []
        }
      }
    case postsTypes.FETCH_POSTS_ERRORS:
      return {
        ...state,
        posts: {
          ...state.posts,
          status: 'error',
          errors: action.payload,
          items: []
        }
      }
    case postsTypes.FETCH_POSTS_LOADED:
      return {
        ...state,
        posts: {
          ...state.posts,
          status: 'loaded',
          items: action.payload,
          errors: []
        }
      }
      case postsTypes.FETCH_POSTS_BYUSER:
        return {
          ...state,
          posts: {
            ...state.posts,
            status: 'loaded',
            items: action.payload,
            errors: []
          }
        }
    case postsTypes.DELETE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          items: state.posts.items = state
            .posts
            .items
            .filter(obj => obj._id !== action.payload.postId),
          errors: [],
           status: "loaded",
        }
      }
      ////////////////////////////////
    case postsTypes.FETCH_TAGS_LOADING:
      return {
        ...state,
        tags: {
          ...state.tags,
          status: "loading",
          items: action.payload,
          errors: []
        }
      }
    case postsTypes.FETCH_TAGS_ERRORS:
      return {
        ...state,
        tags: {
          ...state.tags,
          status: "error",
          items: [],
          errors: action.payload
        }
      }
    case postsTypes.FETCH_TAGS_LOADED:
      return {
        ...state,
        tags: {
          ...state.tags,
          status: "loaded",
          items: action.payload,
          errors: []
        }
      }

    default:
      return state;
  }
}
export default commentsReducer