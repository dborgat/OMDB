import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";




export const getSingleMoviesRequest = createAsyncThunk("SINGLEMOVIE", (id) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d4f91ec83818c0da9baf8a731881dc31&language=en-US`
    )
    .then((r) => r.data)
});

export const singleMovieReducer = createReducer({}, {
  [getSingleMoviesRequest.fulfilled]: (state, action) => action.payload,
});



