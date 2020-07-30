import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Router, navigate } from "@reach/router";
import { authUser } from "./redux/action";
import axios from "axios";
import Home from "./components/Home";
import Signin from "./components/Signin";
import "./App.css";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("tokenn");
    if (token) {
      axios
        .get("http://localhost:8956/api/users/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(authUser({ token, user_: res.data[0] }));
        });
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Home path="/" exact />
        <Profile path="/profile" />
        <Signup path="/signup" />
        <Signin path="/login" />
      </Router>
    </div>
  );
};

export default App;
