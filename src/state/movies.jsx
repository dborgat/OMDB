import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const getMoviesRequest = createAsyncThunk("MOVIES", () => {

  return axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d4f91ec83818c0da9baf8a731881dc31&language=en-US&page=${ Math.floor(Math.random()*498)+1}`
    )
    .then((r) => r.data)
    .then((fristMovies) => {
      let moviesArray = fristMovies.results;
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=d4f91ec83818c0da9baf8a731881dc31&language=en-US&page=${ Math.floor(Math.random()*498)+1}`
        )
        .then((r2) => r2.data)
        .then((secondMovies) => {
          return (moviesArray = [...moviesArray, ...secondMovies.results]);
        });
    });
});
const moviesReducer = createReducer([], {
  [getMoviesRequest.fulfilled]: (state, action) => action.payload,
});

export default moviesReducer;
