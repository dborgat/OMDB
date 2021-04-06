import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { log, success, error } from "../../hooks/logs";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import Content from "../Content";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(12),
    color: theme.palette.text.secondary,
  },
}));

const User = () => {
  const movies = useSelector((state) => state.movies);
  const [favoritos, setfavoritos] = React.useState([]);
  useEffect(() => {
    log("aca vienen las pelis favs...");
    axios
      .get("/api/favorites")
      .then((res) => setfavoritos(res.data))
      .catch(({ response }) => {
        error(response.status, response.statusText);
      });
  }, []);

  console.log("<-------------->", favoritos);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={10}>
        {favoritos ? (
          favoritos.map((fav) => (
            <Link to={`/movies/${fav.movieId}`} key={fav.id}>
              <Grid>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${fav.img}`}
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
  );
};

export default User;
