import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { log, success, error } from "../../hooks/logs";
import { useHistory } from "react-router-dom";


import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../components/ThemeConfig";
import { UserContext } from "../../index";


import Header from "../Header";
import { getSingleMoviesRequest } from "../../state/singleMovie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(12),
    color: theme.palette.text.secondary,
  },
}));


const SingleMovie = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const singleMovie = useSelector((state) => state.singleMovie);
  const classes = useStyles();
  const { user } = React.useContext(UserContext);

  
  const addToFav = async () => {
    if (!user.id) alert("you have to be logged in");
    else
      try {
        // POST user credentials
        await axios.post(`/api/favorites/${user.id}`, {
          title: singleMovie.title,
          img: singleMovie.poster_path,
          movieId: singleMovie.id,
          userId: user.id,
        });
        success(`new movie added`);
        // Redirect to login!
        history.push("/user");
      } catch ({ response }) {
        // something's not right...
        error(response.status, response.statusText);
      }
  };
  React.useEffect(() => {
    dispatch(getSingleMoviesRequest(id.id));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header />
        <Grid key={singleMovie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`}
            style={{ width: "150px", height: "200px" }}
          ></img>
          <h1>{singleMovie.title}</h1>
          <h3>{singleMovie.overview}</h3>
          <button onClick={addToFav} >Add To Favorites</button>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default SingleMovie;
