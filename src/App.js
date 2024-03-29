import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Form from "./views/Form";
import "./App.css";
import piu from "./Assets/images/piu-tr.png";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
      setConfirmationMessage("Login Successful");
      setIsOpen(true);
      setTimeout(() => setConfirmationMessage(""), 2500);
    },

    onError: (error) => {
      console.log("Login Failed:", error);
      setConfirmationMessage("Login Failed");
    },
  });

  useEffect(() => {
    if (user) {
      try {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setProfile(res.data);
            localStorage.setItem("profile", JSON.stringify(res.data));
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    setProfile(null);
    setConfirmationMessage("Logout Successful");
    setTimeout(() => setConfirmationMessage(""), 2500);
  };
  return (
    <div className="App">
      <nav className="navbar">
        <div className="left-nav">Poeshie Cal</div>
        <img src={piu} className="piu" alt="poeshie" />
        <div className="right-nav">
          {profile ? (
            <div className="dropdown" ref={node}>
              <p className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                {profile.name}
              </p>
              {isOpen ? (
                <div className="dropdown-content">
                  <img src={profile.picture} alt="user" />
                  <p>
                    <b>Name:</b> {profile.name}
                  </p>
                  <p>
                    <b>Email:</b> {profile.email}
                  </p>
                  <br />
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : null}
            </div>
          ) : (
            <button onClick={() => login()}>Sign in</button>
          )}
        </div>
      </nav>
      {confirmationMessage ? (
        <p className="confirmation-message">{confirmationMessage}</p>
      ) : null}
      {profile ? <Form /> : null}
    </div>
  );
}

export default App;
