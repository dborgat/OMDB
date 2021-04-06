import React, { useContext } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../index";
import axios from "axios";
import { log, success, error } from "../../hooks/logs";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = async () => {
    log("logout attempt...");
    try {
      await axios.post("/api/logout");
      setUser({});
      success("logged out");
      history.push("/");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  function handlePress(e) {
    if (e.keyCode === 13) {
      window.location = `http://localhost:3000/searchMovies/${value}`;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <Button color="inherit">OMDB</Button>
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => handlePress(e)}
            />
          </div>
          {user.id ? (
            <div>
              <Link to="/user" >
                <span >Hi: {user.email}</span>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
