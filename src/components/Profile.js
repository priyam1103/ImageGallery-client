import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import i1 from "../assets/image1.jpg";
import i2 from "../assets/image2.jpg";
import { removeUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
              marginLeft: "50%",
            }}
          >
            <p>Hi, {user.username}</p>
            <button style={{ margin: 20 }} onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div style={{}}>
            {user.userType === "A" ? (
              <img
                style={{ width: "100%", height: 530 }}
                src={i2}
                alt="i2"
              ></img>
            ) : null}
            {user.userType === "B" ? (
              <div style={{ display: "flex" }}>
                <img
                  style={{ height: 600, width: "50%" }}
                  alt="i1"
                  src={i1}
                ></img>
                <img
                  style={{ height: 600, width: "50%" }}
                  src={i2}
                  alt="i2"
                ></img>
              </div>
            ) : null}
            {user.userType === "C" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{ height: 300, width: "100%" }}
                  src={i1}
                  alt="i1"
                ></img>
                <img
                  style={{ height: 300, width: "100%" }}
                  src={i2}
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
