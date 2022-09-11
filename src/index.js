import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter} from "react-router-dom";
import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
import { GoogleOAuthProvider  } from '@react-oauth/google';
const  {REACT_APP_GOOGLE_AUTH} = process.env
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 *1000
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById("root"));

const Main = () => {

  return (
    <CssBaseline >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_AUTH}>
              <App/>
              </GoogleOAuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  )

}

root.render(<Main/>);
