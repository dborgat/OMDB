import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSearchMoviesRequest } from "../../state/searchMovie";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Content from "../Content";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../components/ThemeConfig";

import Header from "../Header";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(12),
    color: theme.palette.text.secondary,
  },
}));

const SearchMovies = (search) => {
  console.log(search);
  const dispatch = useDispatch();

  const searchMovie = useSelector((state) => state.searchMovie);
  const classes = useStyles();

  const movieName = search.search.match.params.id;

  React.useEffect(() => {
    dispatch(getSearchMoviesRequest(movieName));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header />
        <Grid container spacing={10}>
          {searchMovie.results ? (
            searchMovie.results.map((movie) => (
              <Link to={`/movies/${movie.id}`}>
                <Grid key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    style={{ width: "150px", height: "200px" }}
                  ></img>
                </Grid>
              </Link>
            ))
          ) : (
            <Content />
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default SearchMovies;
