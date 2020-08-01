import React, { useState, useEffect } from "react";
import { navigate, redirectTo } from "@reach/router";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/action";
const Signin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("tokenn");
    if (token) {
      navigate("/profile");
    }
  }, []);
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleClick = () => {
    setLoading(true);
    axios
      .post("https://assgnimage.herokuapp.com/api/users/signin", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            authUser({ token: res.data.token, user_: res.data.user[0] })
          );
          navigate("/profile");
        }
      })
      .catch((err) => {
        if (err.response.data.message === "User does not exists") {
          setLoading(false);
          navigate("/signup");
        }
        if (err.response.status === 401) {
          setLoading(false);
          setError("Invalid username/password");
        }
        if (err.response.status === 400) {
          setLoading(false);
          setError("Please try again later");
        }
      });
  };

  return (
    <>
      {loading ? (
        <Loader
          style={{
            marginTop: "10%",
          }}
          type="Audio"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <div
          style={{
            marginTop: "10%",
            flexDirection: "column",
            marginLeft: "35%",
            display: "flex",
            width: "30%",
          }}
        >
          <p>Welcome back,</p>
          <p> Please enter the details to signIn.</p>
          <input
            style={{ padding: 10, margin: 10 }}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            style={{ padding: 10, margin: 10 }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <button style={{ padding: 10, margin: 10 }} onClick={handleClick}>
            {" "}
            Sign In{" "}
          </button>
          <a href="" onClick={handleSignup}>
            Click here to signup!
          </a>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </div>
      )}
    </>
  );
};

export default Signin;
