import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import moviesReducer from "./movies";
import { singleMovieReducer } from "./singleMovie";
import { searchMovieReducer } from "./searchMovie";


const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        movies: moviesReducer,
        singleMovie: singleMovieReducer,
        searchMovie: searchMovieReducer,
    },
  });
  
  export default store;




