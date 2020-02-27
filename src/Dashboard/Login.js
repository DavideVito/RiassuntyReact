import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FullNavBar from "../NavBar/FullNavBar";
import axios from "axios";
import Bottone from "../Util/Bottone";
import "../App.css";
import MostraRiassunti from "./MostraRiassunti";

function Login(props) {
  let [account, impostaAccount] = useState({});
  let [riassunti, cambiaRiassunti] = useState([]);
  let [riassuntiDaApprovare, cambiaRiassuntiDaApprovare] = useState([]);

  const esisteGia = () => {
    async function controllaCheEsistaGia() {
      let udid = "109232597291200925390";
      let data = new FormData();
      data.append("id", udid);
      let risposta = await fetch(
        //"https://vps.lellovitiello.tk/Riassunty/API/Utenti.php",
        "http://localhost/~davidevitiello/Riassunty/API/Utenti.php",
        {
          method: "POST",
          body: data,
          credentials: "include"
        }
      );

      risposta = await risposta.json();
      console.log(risposta);
    }

    controllaCheEsistaGia();
  };

  useEffect(esisteGia, [
    window.location.href,
    props.location.pathname,
    account
  ]);

  function responseGoogle(risposta) {
    let udid = "109232597291200925390";
  }

  const stile = {
    marginTop: "-20%"
  };

  return (
    <React.Fragment>
      <FullNavBar
        elementi={[
          {
            nome: "Stai attento a quello che carichi, non ti conviene",
            dati: []
          }
        ]}
      />{" "}
      <div style={stile}>
        <Bottone TestoBottone="Per caricare" link="/Login/CaricaRiassunto" />
        <Bottone TestoBottone="Per approvare" link="/Login/ApprovaRiassunto" />
        <MostraRiassunti />
        <div id="body"> </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Login;
