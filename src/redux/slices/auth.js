import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "./../../axios";
export const fetchAuthData = createAsyncThunk('auth/fetchAuthData', async(params) => {
  const {data} = await axios.post('/auth/login', params);
  return data;
})

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async(params) => {
  const {data} = await axios.get('/auth/user');
  return data;
})

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state)=>{
      state.data=null;
      window.localStorage.removeItem("token")
    }
  },
  extraReducers: {
    [fetchAuthData.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthData.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuthUser.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthUser.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    }
  }
})


export const selectIsAuth = state=>Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;