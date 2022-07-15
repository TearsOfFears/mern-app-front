import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from "react-redux";
import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import store from "./redux/createStore";
import { GoogleOAuthProvider  } from '@react-oauth/google';
const  {REACT_APP_GOOGLE_AUTH} = process.env

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_AUTH}>
          <App/>
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
    </>
);
