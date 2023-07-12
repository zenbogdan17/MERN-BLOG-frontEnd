import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (id) => {
    const { data } = await axios.get(`/posts/${id}/comments`);
    return data;
  }
);

export const fetchNewComment = createAsyncThunk(
  'posts/fetchNewComment',
  async ({ userId, commentText, postId }) => {
    try {
      const response = await axios.post(`/posts/${postId}/writeComment`, {
        user: userId,
        text: commentText,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const commentsSlice = createSlice({
  name: 'commenst',
  initialState,
  reducers: {},
  extraReducers: {
    //get comments
    [fetchComments.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    },
    [fetchComments.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
