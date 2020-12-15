import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "../navigation/navigation";
import Home from "../home/home";
import JWT from "jsonwebtoken";
import { AuthContext } from "../contexts/authContext";
import Popular from "../popular/popular";
import Favorites from "../favorites/favorites";

const App = () => {
  const initialeState = {
    first_name: "",
    last_name: "",
    valid: false,
    id: "",
    dob: "",
    sightings: 0,
    email: "",
  };
  // Check for existing JWT and check if it's valid
  const userToken = localStorage.getItem("token");
  let userInfo = JSON.parse(localStorage.getItem("user"));
  if (userInfo) {
    const storedJWT = userToken;
    if (storedJWT !== null) {
      const decodedJWT = JWT.decode(storedJWT, { complete: true });
      const currentDate = new Date();

      if (
        decodedJWT.expiresIn === undefined ||
        decodedJWT.expiresIn < currentDate.getTime()
      ) {
        userInfo.valid = true;
      }
    }
  } else {
    userInfo = initialeState;
  }

  const [user, setUser] = useState(userInfo);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={providerValue}>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/popular" exact component={Popular} />
          <Route path="/favorites" exact component={Favorites} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
