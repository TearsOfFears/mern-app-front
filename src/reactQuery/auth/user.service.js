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
        if ("tokens" in res.data) {
          window.localStorage.setItem("token", res.data.tokens.access);
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
    return await axios.post('/auth/loginGoogle', {
        code: params
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.tokens.access);
        return res.data
      })
  },

  async registrUser(params) {
    return await axios.post('/auth/register', params)
      .then(res =>
        res.data
      )
  },
  async getCurrentUserProfile(id) {
    return await axios.get(`/auth/${id}`)
      .then((res) => {
        return res.data
      })
  },
  async changeUserInfo({
    id,
    fields
  }) {
    return await axios.patch(`/auth/${id}`, fields)
      .then((res) => {
        return res.data
      })
  },
  async activateUserAccount(link) {
    return await axios.post(`/auth/activate/${link}`)
      .then((res) => {
        return res.data
      })
  },

  async logout() {
    return await axios.get(`/auth/logout`)
    .then((res) => {
      if (window.localStorage.getItem("token")) {
        window.localStorage.removeItem("token");
      }
      return res.data
    })
  }
}