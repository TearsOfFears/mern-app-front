import Container from "@mui/material/Container";
import { useEffect,useContext,useState } from "react";
import {Routes,Route, useNavigate} from "react-router-dom"
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { userService } from "./reactQuery/auth/user.service";
import { useQuery } from "react-query";
import UserContext from "./reactQuery/context/context";
import { useFetchUser } from "./reactQuery/auth/user.hooks";
import { Typography } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import { Account } from "./pages/Account";
import Activate from "./pages/Activate";
import Admin from "./pages/Admin";
import { WithAdmin } from "./HOC/WithRole";
import Chat from "./pages/Chat";
import { SocketContext,socket } from "./reactQuery/context/socket.js";



function App() {
  const [user, setUser] = useState(null);
 const {data,isLoading,refetch,isError} = useFetchUser()
 const navigate = useNavigate();
useEffect(()=>{
  if(data){
    setUser(data)
    if(isLoading)
    return <Typography>Loading... </Typography>
  }
  else{
    window.localStorage.getItem("token")!==null && refetch()
  }
},[data,isLoading])

  return (
    <>
    <UserContext.Provider
              value={{
              isLoading,
              user,
              setUser
            }}> 
      <SocketContext.Provider value={socket}>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={   <Home /> }/>
          <Route path="/account/:id" element={<Account/> }/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/:commentId" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost/>}/>
          <Route path="/addPost" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/activate/:link" element={<Activate />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/chat/:id" element={<Chat />}/>
          <Route path="/admin" element={    <WithAdmin><Admin /></WithAdmin>}/>
        </Routes>
      </Container>
      </SocketContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
