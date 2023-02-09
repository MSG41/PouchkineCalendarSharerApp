import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./home.view.scss";
import piu from "../../Assets/images/piu-tr.png";
import Spinner from "../../Components/Spinner/Spinner.jsx";
import ConfettiExplosion from "confetti-explosion-react";
// import Form from "../../Components/Form/Form.jsx";
// import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
// import services from "../../services/index.services";

const Form = lazy(() => import("../../Components/Form/Form.jsx"));

const HomeView = () => {
  // This is for the login and the dropdown menu
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // This is for the particles
  const node = useRef();
  const ConfettiExplosionWrapper = React.memo(ConfettiExplosion);
  const [isExploding, setIsExploding] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [active, setActive] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // The Click Handle
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

  // Logging in:
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
      setConfirmationMessage("Login Successful");
      setIsOpen(true);
      setTimeout(() => setConfirmationMessage(""), 2500);
    },

    onError: (error) => {
      console.error("Login Failed:", error);
      setConfirmationMessage("Login Failed");
    },
  });

  // Fetching the USER Token and catching the error if there is one.
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        );
        if (mounted) {
          setProfile(res.data);
          localStorage.setItem("profile", JSON.stringify(res.data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      fetchProfile();
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  // This is for the Logging Out:
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
        <img
          src={piu}
          onClick={() => {
            setIsExploding(!isExploding);
            setIsShaking(!isShaking);
            setActive(!active);
          }}
          className={`piu ${active ? "active" : ""}`}
          // className="piu"
          alt="poeshie"
        />
        <div className="divexplode">
          {isExploding && (
            <ConfettiExplosionWrapper
              force={0.4}
              duration={2000}
              particleCount={100}
              height={169}
              floorWidth={350}
            />
          )}
        </div>

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
      {profile ? (
        <Suspense fallback={<Spinner />}>
          <Form profile={{ name: profile.name, email: profile.email }} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default HomeView;

//   BOAS EDIT
//     //We use local state to store posts we will retrieve via our service
//   const [posts, setPosts] = useState([]);

//   //We also use a local loading state initially set to true
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   //We have a function that uses our service to retrieve data and puts it in local state. After, we set the loadingstate to false
//   const callPostService = async () => {
//     setLoading(true);
//     try {
//       const res1 = await services.posts.getAllPosts();

//       setPosts(res1);
//       //do something with res2
//     } catch (e) {
//       console.log("error: ", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //We use useEffect to call our method onload.
//   useEffect(() => {
//     callPostService();
//   }, []);

//   //If localState loading = true, we return ...loading
//   if (loading) return <p>...loading</p>;

//   return (
//     <div>
//       BOAS EDIT
//       <h2>HomePage</h2>
//       <p>
//         This page uses a service to retreive Posts from the JSON Typicode API.
//         This is the basic set-up for retrieving data from an API. If you want to
//         focus on building UI components. use the method as shown in this view.
//         For the ambitious, you can take a look at CharacterOverview.view.js to
//         see how we implement a store and services. The decsription is in the
//         comments. The page is rendered below this one.
//       </p>
//       <div>
//         {!posts.length && "Geen berichten"}
//         {posts &&
//           posts.map((singlePost) => (
//             <div
//               key={singlePost.id}
//               onClick={() => navigate(`/posts/${singlePost.id}`)}
//             >
//               {singlePost.title}
//               {singlePost.name}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };
