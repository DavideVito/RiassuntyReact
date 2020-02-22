import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "../App.css";

function Login() {
  let [anteprime, cambiaAnteprime] = useState([]);

  const prendiRiassunti = async () => {
    let anteprime = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/anteprima.php"
    );
    anteprime = await anteprime.json();
    cambiaAnteprime(anteprime);
  };

  useEffect(prendiRiassunti, [window.location.href, anteprime]);

  function responseGoogle(risposta) {
    let udid = "109232597291200925390";
  }

  const stile = {
    backgroundColor: "white"
  };

  let stileFoto = {
    height: "100%",
    width: "100%",
    borderRadius: "45%"
  };

  return (
    <React.Fragment>
      {anteprime.map(anteprima => {
        return (
          <div>
            <img
              src={
                "https://vps.lellovitiello.tk/Riassunty/" +
                anteprima.URLImmagine
              }
              width="300"
              height="300"
            />

            <p>{anteprima.Titolo}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Login;
