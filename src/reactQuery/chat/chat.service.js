import axios from "../../axios"
import {
  useContext
} from "react"
import UserContext from "../context/context"

export const chatService = {
  async createMessage(params) {
    return await axios
      .post('/api/messages/create', params)
      .then((res) => {
        return res.data
      })
  },
  async getAllMessages() {
    return await axios
      .get('/api/messages/getAll')
      .then((res) => {
        return res.data
      })
  },
  async getUserConvers(id) {
    return await axios
      .get(`/api/conversation/get/${id}`)
      .then((res) => {
        return res.data
      })
  },
  async deleteMessages(id) {
    return await axios
      .delete(`/api/messages/delete/${id}`)
      .then((res) => {
        return res.data
      })
  },
  async editUserProfile({
    id,
    fields
  }) {
    return await axios.patch(`/users/${id}`, fields)
      .then((res) => {
        return res.data
      })
  },
}