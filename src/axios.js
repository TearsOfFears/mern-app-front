import axios from "axios";

const  {REACT_APP_API_URL} = process.env
const instance = axios.create({
  baseURL: REACT_APP_API_URL
})

instance.defaults.withCredentials = true;
instance
  .interceptors
  .request
  .use((config) => {
    config.headers.Authorization = window
      .localStorage
      .getItem('token')
    return config
  })

instance
  .interceptors
  .response
  .use((config) => {
    return config
  }, async (err) => {
    const originalReaquest = err.config
    if (err.response.status == 403 && err.config && !err.config._isRetry) {
      originalReaquest._isRetry = true;
      try {
        const refresh = await instance.get("/auth/refresh", {
          withCredentials: true
        })
        window
          .localStorage
          .setItem('token', refresh.data.tokens.access)
        return instance.request(originalReaquest)
      } catch (err) {
        console.log("Not Auth ", err);
      }
    }
    throw err
  })


export default instance;