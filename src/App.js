import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Form from "./views/Form";
import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const [isOpen, setIsOpen] = useState(true);

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setIsOpen(true);
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
      setConfirmationMessage("Login Successful");
      setTimeout(() => setConfirmationMessage(""), 1500);
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
            setIsOpen(true);
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
    setTimeout(() => setConfirmationMessage(""), 1500);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="left-nav">Pouchie Cal</div>
        <div className="right-nav">
          {profile ? (
            <div className="dropdown">
              <p className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                {profile.name}
              </p>
              {isOpen ? (
                <div className="dropdown-content">
                  <img src={profile.picture} alt="user" />
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />

                  <br />
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : null}
            </div>
          ) : (
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
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
