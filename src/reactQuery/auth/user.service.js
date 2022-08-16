import axios from "../../axios"
import {
  useContext
} from "react"
import UserContext from "../../reactQuery/context"

export const userService = {
  async loginUser(params) {
    return await axios
      .post('/auth/login', params)
      .then((res) => {
        if ("token" in res.data) {
          window.localStorage.setItem("token", res.data.token);
          return res.data
        }
      })
  },
  async authUser() {
    return await axios.get('/auth/user')
      .then((res) => {
        return res.data
      })
  },
  async loginGoogle(params) {
    return await axios.post('/auth/loginGoogle', params)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        return res.data
      })
  },
  async changeUserInfo({id,fields}) {
    return await axios.patch(`/auth/${id}`, fields)
      .then((res) => {
        return res.data
      })
  },

  logout() {
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token");
    }
  }
}