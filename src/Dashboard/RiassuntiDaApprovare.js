import React, { useEffect, useState } from "react";
import FullNavBar from "../NavBar/FullNavBar";
import GoogleLogin from "react-google-login";
import "../App.css";

function RiassuntiDaApprovare(props) {
  let [riassuntiNonApprovati, cambiaRiassunti] = useState([]);

  const prendiRiassunti = () => {
    const getRiassunti = async () => {
      let riassuntiNonApprovati = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/riassuntiNonApprovati.php",
        {
          //"http://localhost/~davidevitiello/Riassunty/API/riassuntiNonApprovati.php",
          credentials: "include",
          method: "POST"
        }
      );
      riassuntiNonApprovati = await riassuntiNonApprovati.json();
      cambiaRiassunti(riassuntiNonApprovati);
      console.log("Anteprime", riassuntiNonApprovati);
    };
    getRiassunti();
  };

  useEffect(prendiRiassunti, [props.location.pathname]);

  async function eliminaRiassunto(evento) {
    debugger;

    let data = new FormData();

    data.append("id", evento.currentTarget.id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php",
      {
        method: "POST",
        body: data,
        credentials: "same-origin"
      }
    );

    console.log(rispostaFetch);
  }

  function a(arg) {
    console.log("ARG", arg);
    debugger;
  }

  let stile = {
    color: "white"
  };

  return (
    <React.Fragment>
      {" "}
      <FullNavBar
        elementi={[
          {
            nome:
              "Clicca sulla X per scartare un riassunto, sull'altro per approvare, Easy no?",
            dati: []
          }
        ]}
      />{" "}
    </React.Fragment>
  );
}

/*

       {anteprime.map(anteprima => {
        return (
          <div>
            <div className="container-fluid row">
              <div style={stile} className="col-md">
                <p>{anteprima.Titolo}</p>
                <img
                  src={
                    "https://vps.lellovitiello.tk/Riassunty/" +
                    anteprima.URLImmagine
                  }
                  width="300"
                  height="300"
                />
              </div>
              <div style={stile} className="col-md">
                <p>Elimina</p>
                <img
                id={anteprima.ID}
                  style={{ cursor: "pointer" }}
                  src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                  onClick={eliminaRiassunto}
                />
              </div>
            </div>
          </div>
        );
      })}


 */

export default RiassuntiDaApprovare;
