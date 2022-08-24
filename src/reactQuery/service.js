import axios from "../axios"

export const services = {
    async postImage(params) {
        return await axios.post("/upload",
            params
        ).then((res) => {
            return res.data
        })
    },
}