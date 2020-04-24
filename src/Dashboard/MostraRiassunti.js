import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";
import $ from "jquery";

function MostraRiassunti(props) {
  let [anteprime, cambiaAnteprime] = useState([]);

  const prendiRiassunti = () => {
    const getAnteprime = async () => {
      let data = new FormData();

      data.append("prendiProp", 1);
      data.append("token", sessionStorage.token);

      let anteprime = await fetch(
        //`http://192.168.1.130/Riassunty/API/anteprima.php?prendiProp=1&token=${sessionStorage.token}&normale=1`,
        `https://vps.lellovitiello.tk/Riassunty/API/anteprima.php?prendiProp=1&token=${sessionStorage.token}&normale=1`
        //`http://localhost/~davidevitiello/Riassunty/API/anteprima.php?prendiProp=1&token=${sessionStorage.token}&normale=1`
      );
      anteprime = await anteprime.json();
      cambiaAnteprime(anteprime);
      console.log("Anteprime", anteprime);
    };
    getAnteprime();
  };

  useEffect(prendiRiassunti, [props.account]);

  const rimuoviDaArray = (idRiassunto) => {
    let riass = [];
    for (let riassunto of anteprime) {
      if (riassunto.ID === idRiassunto) {
        continue;
      }
      riass.push(riassunto);
    }
    cambiaAnteprime(riass);
    console.log(riass);
  };

  async function eliminaRiassunto(evento) {
    let data = new FormData();
    let id = evento.currentTarget.id;

    data.append("id", id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php",
      //"http://localhost/~davidevitiello/Riassunty/API/eliminaRiassunto.php",
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );
    rimuoviDaArray(id);

    /* 
        $(elemento).toggle("slow", () => {
          $(elemento).remove();
        });*/

    // console.log(rispostaFetch);
  }

  let stile = {
    color: "white",
  };

  return (
    <React.Fragment>
      <p
        style={{
          fontSize: "20pt",
          fontWeight: "700",
        }}
      >
        {" "}
        Riassunti Caricati{" "}
      </p>{" "}
      {anteprime.map((anteprima) => {
        return (
          <div
            style={{
              paddingBottom: "50px",
              paddingTop: "25px",
            }}
          >
            <div className="container-fluid row">
              <div style={stile} className="col-md">
                <p> {anteprima.Titolo} </p>{" "}
                <Link to={`/MostraRiassunto/${anteprima.ID}`}>
                  <img
                    src={
                      "https://vps.lellovitiello.tk/Riassunty/" +
                      anteprima.URLImmagine
                    }
                    style={{
                      cursor: "pointer",
                    }}
                    alt={anteprima.Titolo}
                    width="300"
                    height="300"
                  />
                </Link>{" "}
              </div>{" "}
              <div style={stile} className="col-md">
                <button
                  id={anteprima.ID}
                  className="btn btn-danger"
                  onClick={eliminaRiassunto}
                  style={{ marginTop: "20px" }}
                >
                  Elimina
                </button>
              </div>{" "}
            </div>{" "}
          </div>
        );
      })}{" "}
      <div
        style={{
          height: "30px",
        }}
      >
        {" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default MostraRiassunti;
