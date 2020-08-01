import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import i1 from "../assets/image1.jpg";
import i3 from "../assets/i3.jpg";
import i2 from "../assets/image2.jpg";
import { removeUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const token = localStorage.getItem("tokenn");
    if (!token) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    navigate("/");
    dispatch(removeUser());
  };

  return (
    <div>
      {user ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5%",
              justifyContent: "space-between",
            }}
          >
            <p>
              Hi,<span style={{ color: "red" }}> {user.username}</span> your
              type is <span style={{ color: "red" }}>{user.userType}</span>
            </p>
            <button style={{ padding: 10, margin: 10 }} onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div style={{}}>
            {user.userType === "A" ? (
              <img
                style={{ width: window.innerWidth, height: window.innerHeight }}
                src={i1}
                alt="i2"
              ></img>
            ) : null}
            {user.userType === "B" ? (
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    height: window.innerHeight,
                    width: window.innerWidth / 2,
                  }}
                  alt="i1"
                  src={i1}
                ></img>
                <img
                  style={{
                    height: window.innerHeight,
                    width: window.innerWidth / 2,
                  }}
                  src={i2}
                  alt="i2"
                ></img>
              </div>
            ) : null}
            {user.userType === "C" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{
                    height: window.innerHeight / 2,
                    width: window.innerWidth,
                  }}
                  src={i2}
                  alt="i1"
                ></img>
                <img
                  style={{
                    height: window.innerHeight / 2,
                    width: window.innerWidth,
                  }}
                  src={i3}
                  alt="i2"
                ></img>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Profile;
