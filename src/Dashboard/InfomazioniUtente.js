import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Bottone from "../Util/Bottone";

const InformazioniUtente = (props) => {
  function logout() {
    sessionStorage.clear();
    window.location.href = "/Login";
  }
  return (
    <div>
      <div
        id="datiUtente"
        style={{
          marginBottom: "20%",
        }}
      >
        <div id="nomePersona" className="row justify-content-center">
          {" "}
          {
            <p
              style={{
                color: "white",
                fontSize: "xx-large",
              }}
            >
              Bentornato {props.nome}{" "}
            </p>
          }{" "}
        </div>{" "}
        <div id="immaginePersona" className="row justify-content-center">
          {" "}
          {
            <img
              src={props.linkImmagine}
              width="150"
              height="150"
              alt={"Immagine di " + props.nome}
              style={{
                borderRadius: "50%",
              }}
            />
          }{" "}
        </div>{" "}
      </div>{" "}
      <div
        id="bottoni"
        style={{
          marginTop: "20%",
        }}
      >
        <div
          className="row justify-content-center"
          style={{
            marginBottom: "20%",
          }}
        >
          <GoogleLogout
            clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
            buttonText="Logout"
            theme="dark"
            width="260"
            height="80"
            onLogoutSuccess={logout}
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default InformazioniUtente;
/*<Bottone TestoBottone="Per approvare" link="/Login/ApprovaRiassunto" />*/
