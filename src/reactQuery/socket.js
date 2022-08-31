import io from "socket.io-client";
const  {REACT_APP_API_URL} = process.env
export const socket = io(REACT_APP_API_URL);