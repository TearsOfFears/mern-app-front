import Container from "@mui/material/Container";
import { useEffect,useContext } from "react";
import {Routes,Route, useNavigate} from "react-router-dom"
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { userService } from "./reactQuery/auth/user.service";
import { useQuery } from "react-query";
import UserContext from "./reactQuery/context";
import { useFetchUser } from "./reactQuery/auth/user.hooks";
import { Typography } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import { Account } from "./pages/Account";
// import { Account } from "./pages/Account";

function App() {
 const {data,isLoading,refetch,isError} = useFetchUser()
 const navigate = useNavigate();
 const  {setUser} = useAuth()
 console.log(data);
  if(data){
    console.log("triggerd");
    setUser(data)
    if(isLoading)
    return <Typography>Loading... </Typography>
  }
  else{
    window.localStorage.getItem("token")!==null && refetch()
  }
  return (
    <>
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
        </Routes>
      </Container>
    </>
  );
}

export default App;
