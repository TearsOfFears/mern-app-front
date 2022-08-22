import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444"
  
})


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
    if (err.response.status == 401 && err.config && !err.config._isRetry ) {
      originalReaquest._isRetry = true;
      try {
        const refresh = await instance.get("/auth/refresh", {
          withCredentials: true
        })
        window
          .localStorage
          .setItem('token', refresh.data.accessToken)
        return instance.request(originalReaquest)
      } catch (err) {
        console.log("Not Auth ", err);
      }
    }
    throw err
  })


export default instance;