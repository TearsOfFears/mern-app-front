import {authTypes} from "./auth.types"
const initialState = {
  data: null,
  status: 'loading',
  errors: [],
  errorsAuth: [],
  statusAuth:'loading',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case authTypes.CLEAR_STORE:
      return {
        ...state,
        data: null,
        status: 'loading',
        errors: []
      }
    case authTypes.AUTH_DATA_LOADED:
      return {
        ...state,
        status: 'loading',
        data: null,
        errors: []
      }
    case authTypes.AUTH_DATA_ERRORS:
      return {
        ...state,
        status: 'error',
        data: null,
        errors: action.payload
      }
    case authTypes.USER_LOGIN_REGISTER_ERRORS:
      return {
        ...state,
        statusAuth: 'error',
        data: null,
        errorsAuth: action.payload
      }
    case authTypes.FETCH_LOGIN_USER:
      if ("token" in action.payload) 
        window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        status: 'loaded',
        data: action.payload,
        errors: []
      }
    case authTypes.FETCH_AUTH_DATA:
      return {
        ...state,
        status: 'loaded',
        data: action.payload,
        errors: []
      }
    case authTypes.USER_REGISTER:
      if ("token" in action.payload) 
        window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        status: 'loaded',
        data: action.payload,
        errors: []
      }
      case authTypes.REGISTR_GOOGLE:
        if ("token" in action.payload) 
          window.localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          status: 'loaded',
          data: action.payload,
          errors: []
        }

      case authTypes.LOGIN_GOOGLE:
        if ("token" in action.payload) 
          window.localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          status: 'loaded',
          data: action.payload,
          errors: []
        }
      case authTypes.ADD_USER_LIKE:
        return {
          ...state,
          status: 'loaded',
          data: action.payload,
          errors: []
        }
        case authTypes.ADD_USER_DISLIKE:
          return {
            ...state,
            status: 'loaded',
            data: action.payload,
            errors: []
          }
        case authTypes.UPDATE_USER_INFO:
          return {
           
            status: 'loaded',
            data: action.payload,
            errors: []
          }
    case authTypes.USER_LOGOUT:
      window
        .localStorage
        .removeItem("token")
        return {
          ...state,
          status: 'loading',
          data: [],
          errors: []
        }
    default:
      return state;
  }
}
export default authReducer