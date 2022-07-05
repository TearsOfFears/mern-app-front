import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk('posts/fetchComments', async() => {
  const {data} = await axios.get(`/comment`);
  return data;
})
export const fetchCommentsById = createAsyncThunk('posts/fetchCommentsById', async(id) => {
  const {data} = await axios.get(`/comment/${id}`)
  return data;
})

export const createComment = createAsyncThunk('comments/createComment', async(params) => {
  await axios.post(`/comment`, params);
})

const initialState = {
  comments: {
    items: [],
    status: 'loading'
  },
  currentComments: {
    items: [],
    status: 'loading'
  }
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.comments.status = "loading";
      state.comments.items = [];
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    ////////////
    [fetchCommentsById.pending]: (state) => {
      state.currentComments.status = "loading";
      state.currentComments.items = [];
    },
    [fetchCommentsById.fulfilled]: (state, action) => {
      console.log(action);
      state.currentComments.items = action.payload;
      state.currentComments.status = "loaded";
    },
    [fetchCommentsById.rejected]: (state) => {
      state.currentComments.items = [];
      state.currentComments.status = "error";
    },
    /////////
    [createComment.pending]: (state, action) => {
      state.currentComments.items = [];
      state.currentComments.status = "loading";
    },
  }
})

export const commentsReducer = commentsSlice.reducer;
