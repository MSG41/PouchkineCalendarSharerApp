import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <GoogleOAuthProvider clientId="265591396-dje5b1eiffj5aoq9c0dqmburuq4ugkvm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.Fragment>
);

reportWebVitals();
