import React, { useState } from "react";
import { Button, ButtonBase } from "@material-ui/core";
import WatchList from '../../assets/watchlist.png'
import "./Header.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Header = () => {
  const [user, setUser] = useState(null);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        setUser(user);
        console.log(user);
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <nav
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span style={{ marginLeft: "8px" }} onClick={() => window.scroll(0, 0)}>
        Movie Reviewing app
      </span>
      <div style={{ display: "flex", alignItems: "center" }}>
      {/* {user ? (
          <img src={WatchList}  style={{background:'#FFFFFF',borderRadius:'6px',height:'28px',marginRight:'6px'}} />
        ) : null} */}
        {user ? (
          <UserInfo name={user.displayName} photoURL={user.photoURL} />
        ) : null}

        {user ? (
          <Button style={{ margin: "6px" }} variant="contained" color="primary">
            Logout
          </Button>
        ) : (
          <Button
            onClick={signInWithGoogle}
            style={{ margin: "6px" }}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
const UserInfo = ({ name, photoURL }) => {
  return (
    <div style={{ display: "flex" }}>
      <img
        style={{ height: "24px", width: "24px", borderRadius: "5px" }}
        src={photoURL}
      />
      <span style={{ fontSize: "1rem", marginLeft: "8px", fontWeight: "600" }}>
        {name}{" "}
      </span>
    </div>
  );
};
export default Header;
