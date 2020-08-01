import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { authUser } from "../redux/action";

const Signup = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("tokenn");
    if (token) {
      navigate("/profile");
    }
  }, []);
  const handleClick = () => {
    setLoading(true);

    setError();
    if (
      username === undefined ||
      password === undefined ||
      userType === undefined
    ) {
      setLoading(false);
      setError("Please enter the details properly");
    } else {
      axios
        .post("https://assgnimage.herokuapp.com/api/users/signup", {
          username: username,
          password: password,
          userType: userType,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(authUser(res.data));
            navigate("/profile");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setLoading(false);
            setError("Username already taken");
          }
          if (err.response.status === 400) {
            setLoading(false);
            setError("Please try again later");
          }
        });
    }
  };
  const handleTypeSelect = (typ) => {
    setUserType(typ);
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
          <p>Welcome,</p>
          <p> Please enter the details to signup.</p>
          <input
            style={{ padding: 10, margin: 10 }}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            style={{ padding: 10, margin: 10 }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <label htmlFor="type">Choose a Type:</label>

          <select
            onClick={(e) => handleTypeSelect(e.target.value)}
            name="type"
            id="type"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <button style={{ padding: 10, margin: 10 }} onClick={handleClick}>
            {" "}
            Sign Up{" "}
          </button>
          <a href="/login" onClick={() => navigate("/login")}>
            Click here to signin !
          </a>
          {error ? <p style={{ color: "red" }}> {error}</p> : null}
        </div>
      )}
    </>
  );
};

export default Signup;
