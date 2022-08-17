import axios from "../../axios"


export const commentsSevice = {
    async getAllComments(){
        return await axios.get(`/comment`).then((res)=>{return res.data})
    },
    async getCommentsById(postId){
        return await axios.get(`/comment/${postId}`).then((res)=>{return res.data})
    },
    async deleteComment(id){
        return await axios.delete(`/commentDelete/${id}`)
    }, 
    async setUserLike(params){
       return await axios.patch('/auth/user/setLike', params)
        
    },
    async setUserDisLike(params){
      return  await axios.patch('/auth/user/setDisLike', params)
    },
    async createComment(params){
        return await axios.post(`/comment`, params)
    },
}
