import React, { useEffect, useState, useContext } from "react";

import FullNavBar from "../NavBar/FullNavBar";
import RiassuntiDaApprovare from "./RiassuntiDaApprovare";
import CaricaRiassunto from "./CaricaRiassunto";
import "../App.css";
import $ from "jquery";
import MostraRiassunti from "./MostraRiassunti";
import { accediGoogle } from "../FirebaseStuff/auth";
import TextEditor from "./TextEditor";
import MostarRiassuntiTemporanei from "./MostraRiassuntiTemporanei";
import { TestoProvider } from "../Util/Contesti/ContestoTesto";
import InformazioniUtente from "./InfomazioniUtente";
import GoogleLoginFoto from "../Util/Immagini/bottoneGoogle.png";

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
    let a = localStorage.getItem("utente");

    try {
      a = JSON.parse(a);

      cambiaAccount(a);
      cambiaUDID(a.uid);

      console.log(localStorage.getItem("utente"));

      cambiaOk(true);
    } catch (error) {
      return;
    }

    //controllaCheEsistaGia();
  };

  useEffect(esisteGia, [props.location.pathname, udid]);

  function responseGoogle(risposta) {
    sessionStorage.clear();
    localStorage.removeItem("idRiassunto");
    localStorage.removeItem("idFile");

    cambiaAccount(risposta.getBasicProfile());
    cambiaUDID(risposta.googleId);
  }

  const stile = {
    marginTop: "-50%",
  };

  $("#loadingImage").fadeOut(500, "swing");

  $("#loadingImage").fadeOut(500, "swing");
  return (
    <React.Fragment>
      <FullNavBar
        elementi={[
          {
            nome: "Stai attento a quello che carichi, non ti conviene",
            dati: [],
          },
        ]}
        noBar={true}
      >
        {" "}
        {ok ? (
          <InformazioniUtente
            nome={account.displayName}
            linkImmagine={account.photoURL}
          />
        ) : (
          <div>
            <div class="google-btn" onClick={accediGoogle}>
              <div class="google-icon-wrapper">
                <img
                  class="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p class="btn-text">
                <b>Accedi con Google</b>
              </p>
            </div>
          </div>
        )}{" "}
      </FullNavBar>{" "}
      {ok ? <CaricaRiassunto /> : <></>}
      {false ? (
        <React.Fragment>
          <div
            id="body"
            style={{
              marginTop: "30%",
            }}
          >
            <section id="section1" className="sezione1">
              <div
                className="container-fluid"
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                }}
              >
                <MostraRiassunti account={udid} />{" "}
              </div>{" "}
            </section>{" "}
            <RiassuntiDaApprovare token={sessionStorage.token} />{" "}
            {dimesioneFinestra < 400 ? (
              <div> </div>
            ) : (
              <TestoProvider>
                <div id="section3" className="sezione3">
                  <MostarRiassuntiTemporanei account={udid} />{" "}
                </div>{" "}
                <div id="section4" className="sezione4">
                  <div>
                    <TextEditor />
                  </div>{" "}
                </div>{" "}
              </TestoProvider>
            )}{" "}
          </div>{" "}
        </React.Fragment>
      ) : (
        <div> </div>
      )}{" "}
    </React.Fragment>
  );
}

export default Login;
