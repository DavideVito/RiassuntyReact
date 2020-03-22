import React, { useEffect, useState } from "react";

import "../App.css";

function MostraRiassunti(props) {
  let [anteprime, cambiaAnteprime] = useState([]);

  const prendiRiassunti = () => {
    const getAnteprime = async () => {
      let data = new FormData();

      data.append("prendiProp", 1);
      data.append("token", sessionStorage.token);

      let anteprime = await fetch(
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

  async function eliminaRiassunto(evento) {
    let data = new FormData();

    data.append("id", evento.currentTarget.id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php",
      //"http://localhost/~davidevitiello/Riassunty/API/eliminaRiassunto.php",
      {
        method: "POST",
        body: data,
        mode: "cors"
      }
    );

    console.log(rispostaFetch);
  }

  let stile = {
    color: "white"
  };

  return (
    <React.Fragment>
      {" "}
      {anteprime.map(anteprima => {
        return (
          <div>
            <div className="container-fluid row">
              <div style={stile} className="col-md">
                <p> {anteprima.Titolo} </p>{" "}
                <img
                  src={
                    "https://vps.lellovitiello.tk/Riassunty/" +
                    anteprima.URLImmagine
                  }
                  alt={anteprima.Titolo}
                  width="300"
                  height="300"
                />
              </div>{" "}
              <div style={stile} className="col-md">
                <p> Elimina </p>{" "}
                <img
                  alt={"Elimina"}
                  id={anteprima.ID}
                  style={{
                    cursor: "pointer"
                  }}
                  src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                  onClick={eliminaRiassunto}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      })}{" "}
    </React.Fragment>
  );
}

export default MostraRiassunti;
