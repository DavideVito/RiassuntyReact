import React from "react";
import { esci } from "../FirebaseStuff/auth";

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
          <div class="google-btn" onClick={esci}>
            <div class="google-icon-wrapper">
              <img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p class="btn-text">
              <p>Esci </p>
            </p>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default InformazioniUtente;
/*<Bottone TestoBottone="Per approvare" link="/Login/ApprovaRiassunto" />*/
