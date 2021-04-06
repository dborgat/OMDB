import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserContext } from "../../index";
import { log, success, error } from "../../hooks/logs";
import axios from "axios";



import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../components/ThemeConfig";

import Header from "../Header";
import Content from "../Content";
import Loging from "../Login";
import SingUp from "../SignUp";
import SingleMovie from "../SingleMovie";
import SearchMovie from "../SearchMovie";
import User from "../User";
import { getMoviesRequest } from "../../state/movies";



const App = () => {
  const dispatch = useDispatch();

  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    log(`fetching user...`);
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        success(`found user ${user.mail}`);
        setUser(user);
      })
      .catch(({ response }) => {
        error(response.status, response.statusText);
      });
  }, []);


  React.useEffect(() => {
    dispatch(getMoviesRequest());
  }, [dispatch]);


  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
          <Route exact path="/" component={Content} />
          <Route exact path="/login" component={Loging} />
          <Route exact path="/singup" component={SingUp} />
          <Route exact path="/movies/:id" render = {({match})=> <SingleMovie id={match.params}/>}/>
          <Route exact path="/searchMovies/:id" render = {match=> <SearchMovie search={match}/>}/>
          <Route exact path="/user" render = {({match})=> <User id={match.params}/>}/>
          <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
