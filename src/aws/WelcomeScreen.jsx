// modules
import React, { useEffect } from "react";
import {
  CognitoUserPool
} from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// styling
import "./styles/Welcome.scss";

const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_USERPOOL_ID,
  ClientId: process.env.REACT_APP_APPCLIENT_ID,
});

const WelcomeScreen = () => {

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const signOut = () => {

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    navigate("/");
  };

  useEffect(() => {
    // console.log("acctok", userData);
    // console.log('Successfully Logged in!',cognitoUser.getUserData(accessToken))
  }, []);
  return (
    <div className="Container">
      <h1 className="Greeting">Hi {userData.name}!</h1>
      <button
        className="SignoutButton"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default WelcomeScreen;
