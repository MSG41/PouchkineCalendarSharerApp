import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { HomeView } from "./views/home/home.view";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.Fragment> */}
    {/* <GoogleOAuthProvider clientId="265591396-dje5b1eiffj5aoq9c0dqmburuq4ugkvm.apps.googleusercontent.com"> */}
    {/* <HomeView /> */}

    <App />

    {/* </GoogleOAuthProvider> */}
    {/* </React.Fragment> */}
  </BrowserRouter>
);

reportWebVitals();
