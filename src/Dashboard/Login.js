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
      <GoogleLogin
        clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            This is my custom Google button
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </React.Fragment>
  );
}

export default Login;
