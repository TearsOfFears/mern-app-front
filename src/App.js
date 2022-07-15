import Container from "@mui/material/Container";
import { useEffect } from "react";
import {Routes,Route} from "react-router-dom"
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {useDispatch,useSelector} from "react-redux";
import {fetchAuthUser,selectIsAuth} from "./redux/auth/auth.actions"
import { Account } from "./pages/Account";
import { GoogleOAuthProvider } from '@react-oauth/google';
import WithAuth from "./HOC/WithAuth"
function App() {
  const dispatch = useDispatch(); 
  const isAuth = useSelector(selectIsAuth);
  useEffect(()=>{
    dispatch(fetchAuthUser());
  },[])
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
