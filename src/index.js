import React, { useState, createContext } from "react";
import { render } from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./views/App";
import store from "./state/store";

export const UserContext = createContext();

const Root = () => {
  const [user, setUser] = useState({});

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default render(<Root />, document.getElementById("root"));
