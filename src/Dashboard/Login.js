import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "../App.css";

function Login() {
  function responseGoogle(risposta) {
    console.log(risposta);
  }

  return (
    <React.Fragment>
      <div>
        {" "}
        <h1> CIAO </h1>
      </div>
  );
}

export default Login;
