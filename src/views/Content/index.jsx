import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "../Header";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(12),
    color: theme.palette.text.secondary,
  },
}));

const Content = () => {
  const movies = useSelector((state) => state.movies);

  const [mainMovies, setMainMovies] = React.useState([]);

  React.useEffect(() => {
    setMainMovies(movies);
  }, [movies]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
    < Header />
      <Grid container spacing={10}>
        {mainMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <Grid >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                style={{ width: "150px", height: "200px" }}
              ></img>
            </Grid>
          </Link>
        ))}
      </Grid>
    </div>
  );
};

export default Content;
