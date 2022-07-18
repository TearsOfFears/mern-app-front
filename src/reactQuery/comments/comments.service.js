import axios from "../../axios"


export const commentsSevice = {
    async getAllComments(){
        return await axios.get(`/comment`).then((res)=>{return res.data})
    },
    async getCommentsById(postId){
        console.log("postId",postId);
        return await axios.get(`/comment/${postId}`).then((res)=>{return res.data})
    },
}
