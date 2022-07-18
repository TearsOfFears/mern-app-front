import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter} from "react-router-dom";
import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import UserContext from "./reactQuery/context";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
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
  const [user, setUser] = useState(null);
  return (
    <CssBaseline >
      <ThemeProvider theme={theme}>
        <BrowserRouter>

          <QueryClientProvider client={queryClient}>
            <UserContext.Provider
              value={{
              user,
              setUser
            }}>
              <App/>
            </UserContext.Provider>
            <ReactQueryDevtools initialIsOpen={false}/>

          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  )

}

root.render(<Main/>);
