import React, {
  useEffect,
  useState,
  useContext
} from "react";
import GoogleLogin from "react-google-login";
import FullNavBar from "../NavBar/FullNavBar";
import RiassuntiDaApprovare from "./RiassuntiDaApprovare";
import CaricaRiassunto from "./CaricaRiassunto";
import "../App.css";
import $ from "jquery";
import MostraRiassunti from "./MostraRiassunti";
import TextEditor from "./TextEditor";
import MostarRiassuntiTemporanei from "./MostraRiassuntiTemporanei";
import {
  TestoProvider
} from "../Util/Contesti/ContestoTesto";
import InformazioniUtente from "./InfomazioniUtente";

import A from "./A";

function Login(props) {
  let [ok, cambiaOk] = useState(false);
  let [udid, cambiaUDID] = useState();
  let [account, cambiaAccount] = useState({});
  let [dimesioneFinestra, cambiaDimesioneFinestra] = useState(
    window.innerWidth
  );

  window.addEventListener("resize", (e) => {
    cambiaDimesioneFinestra(e.target.innerWidth);
  });

  const esisteGia = () => {
    if (udid === 0 || typeof udid === "undefined") {
      return;
    }
    async function controllaCheEsistaGia() {
      let data = new FormData();
      data.append("id", udid);
      let token = sessionStorage.token;
      if (token) {
        data.append("token", token);
      }
      data.append("username", account.getName());
      data.append("idGoogle", account.getId());
      data.append("mail", account.getEmail());

      let risposta = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/Utenti.php",
        // "http://localhost/~davidevitiello/Riassunty/API/Utenti.php",
        //"http://192.168.1.130/Riassunty/API/Utenti.php",
        {
          method: "POST",
          body: data,
        }
      );
      risposta = await risposta.json();
      sessionStorage.token = risposta.token;
      console.log(risposta);
      cambiaOk(true);
    }

    controllaCheEsistaGia();
  };

  useEffect(esisteGia, [props.location.pathname, udid]);

  function responseGoogle(risposta) {
    sessionStorage.clear();
    cambiaAccount(risposta.getBasicProfile());
    cambiaUDID(risposta.googleId);
  }

  const stile = {
    marginTop: "-50%",
  };

  $("#loadingImage").fadeOut(500, "swing");

  $("#loadingImage").fadeOut(500, "swing");
  return ( <
    React.Fragment >
    <
    FullNavBar elementi = {
      [{
        nome: "Stai attento a quello che carichi, non ti conviene",
        dati: [],
      }, ]
    }
    noBar = {
      true
    } >
    {
      " "
    } {
      ok ? ( <
        InformazioniUtente nome = {
          account.getName()
        }
        linkImmagine = {
          account.getImageUrl()
        }
        />
      ) : ( <
        div >
        <
        GoogleLogin clientId = "757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
        buttonText = "Login"
        onSuccess = {
          responseGoogle
        }
        onFailure = {
          responseGoogle
        }
        isSignedIn = {
          true
        }
        onLogoutSuccess = {
          () => {
            window.location.href = "/Login";
          }
        }
        theme = "dark"
        width = "260"
        height = "80"
        cookiePolicy = {
          "single_host_origin"
        }
        />{" "} <
        /div>
      )
    } {
      " "
    } <
    /FullNavBar>{" "} {
      ok ? ( <
        React.Fragment >
        <
        div id = "body"
        style = {
          {
            marginTop: "30%",
          }
        } >
        <
        CaricaRiassunto / >
        <
        section id = "section1"
        className = "sezione1" >
        <
        div className = "container-fluid"
        style = {
          {
            textAlign: "center",
            marginTop: "100px",
          }
        } >
        <
        MostraRiassunti account = {
          udid
        }
        />{" "} <
        /div>{" "} <
        /section>{" "} <
        RiassuntiDaApprovare token = {
          sessionStorage.token
        }
        />{" "} {
          dimesioneFinestra < 400 ? ( <
            div > < /div>
          ) : ( <
            TestoProvider >
            <
            div id = "section3"
            className = "sezione3" >
            <
            MostarRiassuntiTemporanei account = {
              udid
            }
            />{" "} <
            /div>{" "} <
            div id = "section4"
            className = "sezione4" >
            <
            div >
            <
            TextEditor / >
            <
            /div>{" "} <
            /div>{" "} <
            /TestoProvider>
          )
        } {
          " "
        } <
        /div>{" "} <
        /React.Fragment>
      ) : ( <
        div > < /div>
      )
    } {
      " "
    } <
    /React.Fragment>
  );
}

export default Login;