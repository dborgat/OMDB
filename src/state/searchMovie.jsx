import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getSearchMoviesRequest = createAsyncThunk(
  "SEARCHMOVIE",
  (value) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=d4f91ec83818c0da9baf8a731881dc31&query=${value}`
      )
      .then((r) => r.data)
  }
);

export const searchMovieReducer = createReducer(
  [],
  {
    [getSearchMoviesRequest.fulfilled]: (state, action) => action.payload,
  }
);
