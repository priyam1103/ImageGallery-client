import React, { useEffect } from "react";
import { navigate } from "@reach/router";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("tokenn");
    if (token) {
      navigate("/profile");
    }
  }, []);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div
      style={{
        marginTop: "10%",
        flexDirection: "column",
        marginLeft: "35%",
        display: "flex",
        width: "30%",
        backgroundColor: "red",
      }}
    >
      <p>Welcome To Image Gallery</p>

      <button style={{ padding: 10, margin: 10 }} onClick={handleLogin}>
        Login
      </button>
      <button style={{ padding: 10, margin: 10 }} onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};
export default Home;
