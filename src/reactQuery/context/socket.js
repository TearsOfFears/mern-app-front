import io from "socket.io-client";
import { createContext } from "react";
const { REACT_APP_API_URL } = process.env;

export const socket = io.connect(REACT_APP_API_URL);
export const SocketContext = createContext();
