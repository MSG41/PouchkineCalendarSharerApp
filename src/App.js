// This one has a buggy image :

import React, { useState, useEffect, Profiler } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import NameUpdate from "./views/NameUpdate";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setIsOpen(true);
      setConfirmationMessage("Login Successful") ??
        setTimeout(() => setConfirmationMessage(false), 1000);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setConfirmationMessage("Login Failed");
    },
  });

  useEffect(() => {
    if (user) {
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
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setConfirmationMessage("Logout Successful") ??
      setTimeout(() => setConfirmationMessage(false), 1000);
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
      {profile ? <NameUpdate /> : null}
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import NameUpdate from "./views/NameUpdate";
// import ConfirmationModal from "./views/ConfirmationModal";
// import "./App.css";

// function App() {
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log("Login Failed:", error),
//   });

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//   };

//   const submitHandler = () => {
//     // Add your submit logic here
//     setModalMessage("Your submission was successful!");
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="App">
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         message={modalMessage}
//       />
//       <nav className="navbar">
//         <div className="left-nav">Pouchie Cal</div>
//         <div className="right-nav">
//           {profile ? (
//             <div className="dropdown">
//               <p className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
//                 {profile.name}
//               </p>
//               {isOpen ? (
//                 <div className="dropdown-content">
//                   <img src={profile.picture} alt="user" />
//                   <p>Name: {profile.name}</p>
//                   <p>Email Address: {profile.email}</p>
//                   <br />
//                   <br />
//                   <button onClick={logOut}>Log out</button>
//                 </div>
//               ) : null}
//             </div>
//           ) : (
//             <button onClick={() => login()}>Sign in with Google 🚀 </button>
//           )}
//         </div>
//       </nav>
//       {profile ? <NameUpdate submitHandler={submitHandler} /> : null}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         message="Profile updated successfully!"
//       />
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import NameUpdate from "./views/NameUpdate";
// import "./App.css";

// function App() {
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log("Login Failed:", error),
//   });

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//   };

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <div className="left-nav">Pouchie Cal</div>
//         <div className="right-nav">
//           {profile ? (
//             <div className="dropdown">
//               <p className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
//                 {profile.name}
//               </p>
//               {isOpen ? (
//                 <div className="dropdown-content">
//                   <img src={profile.picture} alt="user" />
//                   <p>Name: {profile.name}</p>
//                   <p>Email Address: {profile.email}</p>
//                   <br />
//                   <br />
//                   <button onClick={logOut}>Log out</button>
//                 </div>
//               ) : null}
//             </div>
//           ) : (
//             <button onClick={() => login()}>Sign in with Google 🚀 </button>
//           )}
//         </div>
//       </nav>
//       {profile ? <NameUpdate /> : null}
//     </div>
//   );
// }

// export default App;

// This one works nicely !!!!

// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import NameUpdate from "./views/NameUpdate";

// function App() {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log("Login Failed:", error),
//   });

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`
//         )
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//   };

//   return (
//     <div>
//       <h2>React Google Login</h2>
//       <br />
//       <br />
//       {profile ? (
//         <div>
//           <img src={profile.picture} alt="user" />
//           <h3>User Logged in</h3>
//           <p>Name: {profile.name}</p>
//           <p>Email Address: {profile.email}</p>
//           <br />
//           <br />
//           <button onClick={logOut}>Log out</button>
//           {profile ? <NameUpdate /> : null}
//         </div>
//       ) : (
//         <button onClick={() => login()}>Sign in with Google 🚀 </button>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import NameUpdate from "./views/NameUpdate";

// function App() {
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState(null);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log("Login Failed:", error),
//   });

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//   };

//   return (
//     <div>
//       <h2>React Google Login</h2>
//       <br />
//       <br />
//       {profile ? (
//         <div>
//           <img src={profile.picture} alt="user" />
//           <h3>User Logged in</h3>
//           <p>Name: {profile.name}</p>
//           <p>Email Address: {profile.email}</p>
//           <br />
//           <br />
//           <button onClick={logOut}>Log out</button>
//           {profile ? <NameUpdate /> : null}
//         </div>
//       ) : (
//         <button onClick={() => login()}>Sign in with Google 🚀 </button>
//       )}
//     </div>
//   );
// }

// export default App;
