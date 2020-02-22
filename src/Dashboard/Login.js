import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "../App.css";
import MostraRiassunti from "./MostraRiassunti";

function Login() {
  let [account, impostaAccount] = useState({});

  const esisteGia = async () => {
    let udid = "109232597291200925390";
    let data = new FormData();
    data.append("id", udid);
    let risposta = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/Utenti.php",
      {
        method: "POST",
        body: data,
        mode: "cors"
      }
    );
    risposta = await risposta.json();
    console.log(risposta);
  };

  useEffect(esisteGia, [window.location.href, account]);

  function responseGoogle(risposta) {
    let udid = "109232597291200925390";
  }

  const stile = {
    backgroundColor: "white"
  };

  return (
    <React.Fragment>
      <header>
        <nav className="">
          <div id="brand">
            <Link to="/">
              <div id="logo">
                {" "}
                <img
                  id="fotoLogo"
                  src="https://riassunty.altervista.org/logoBIANCO.jpg"
                />{" "}
              </div>{" "}
            </Link>
          </div>
          <div id="menu">
            <div id="menu-toggle">
              <div id="menu-icon">
                <div className="bar"> </div> <div className="bar"> </div>{" "}
                <div className="bar"> </div>{" "}
              </div>{" "}
            </div>{" "}
            <ul id="outJS">
              <li>
                Accedi alla pagina che servirà a caricare un riassunto
                utilizzando uno dei servizi sotto elencati{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </nav>{" "}
        <div id="hero-section">
          <div id="head-line">
            <div className="row justify-content-center"> Bottone Log in </div>
            <div id="out1"> </div> <div> </div>
            <div id="doveAndrannoIDati" hidden="">
              <div className="row justify-content-center">
                <img id="immagine" />
              </div>
              <div> </div>{" "}
              <div className="row justify-content-center">
                <p id="nome"> </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      <div id="body"></div>{" "}
    </React.Fragment>
  );
}

export default Login;
