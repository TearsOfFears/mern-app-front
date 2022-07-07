import {commentsTypes} from "./comments.types"
const initialState = {
  comments: {
    items: [],
    status: 'loading',
    errors: []
  },
  currentComments: {
    items: [],
    status: 'loading',
    errors: []
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case commentsTypes.FETCH_COMMENTS_LOADING:
      return {
        ...state,
        comments: {
          ...state.comments,
          status: 'loading',
          items: [],
          errors: []
        }
      }
    case commentsTypes.FETCH_COMMENTS_ERROR:
      return {
        ...state,
        comments: {
          ...state.comments,
          status: 'error',
          errors: action.payload,
          items: []
        }
      }
    case commentsTypes.FETCH_COMMENTS_LOADED:
      return {
        ...state,
        comments: {
          ...state.comments,
          status: 'loaded',
          items: action.payload,
          errors: []
        }
      }
    ////////////////////////////////
    case commentsTypes.FETCH_CURRENTCOMMENTS_LOADING:
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          status: "loading",
          items: action.payload,
          errors: []
        }
      }
    case commentsTypes.FETCH_CURRENTCOMMENTS_ERROR:
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          status: "error",
          items: [],
          errors: action.payload
        }
      }
    case commentsTypes.FETCH_CURRENTCOMMENTS_LOADED:
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          status: "loaded",
          items: action.payload,
          errors: []
        }
      }
    default:
      return state;
  }
}
export default authReducer