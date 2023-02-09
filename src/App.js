// import { NavLink, Route, Routes } from "react-router-dom";
// import { ROUTES } from "./routes/index.routes";

import HomeView from "./views/home/home.view.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="265591396-dje5b1eiffj5aoq9c0dqmburuq4ugkvm.apps.googleusercontent.com">
        <HomeView />
      </GoogleOAuthProvider>

      {/* <div>
        {ROUTES.filter((singleRoute) => singleRoute.inNav).map(
          (singleRoute) => (
            <NavLink
              key={singleRoute.id}
              to={singleRoute.path}
              className={({ isActive }) =>
                `${isActive ? "navlink navlink--active" : "navlink"}`
              }
            >
              {singleRoute.label}
            </NavLink>
          )
        )}
      </div>
      <Routes>
        {ROUTES.map((singleRoute) => (
          <Route key={singleRoute.id} {...singleRoute} />
        ))}
      </Routes> */}
    </div>
  );
}

export default App;
