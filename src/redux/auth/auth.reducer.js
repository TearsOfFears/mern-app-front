import {authTypes} from "./auth.types"
const initialState = {
  data: null,
  status: 'loading',
  errors: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        status: 'loaded',
        data: action.payload,
        errors: []
      }
      case authTypes.USER_LOGOUT:
        window.localStorage.removeItem("token")
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