import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import $ from "jquery";
import "../App.css";

function RiassuntiDaApprovare(props) {
  let [riassuntiNonApprovati, cambiaRiassunti] = useState([]);

  const prendiRiassunti = () => {
    const getRiassunti = async () => {
      $.ajax({
        url:
          "https://vps.lellovitiello.tk/Riassunty/API/riassuntiNonApprovati.php",
        //"http://localhost/~davidevitiello/Riassunty/API/riassuntiNonApprovati.php",

        data: {
          token: props.token,
        },
        method: "GET",
        success: (data) => {
          if (data.shouldRedirect) {
            cambiaRiassunti([]);
            return;
          }
          cambiaRiassunti(data);
        },
      });
    };
    getRiassunti();
  };

  const rimuoviDaArray = (idRiassunto) => {
    let riass = [];
    for (let riassunto of riassuntiNonApprovati) {
      if (riassunto.ID === idRiassunto) {
        continue;
      }
      riass.push(riassunto);
    }
    cambiaRiassunti(riass);
  };

  useEffect(prendiRiassunti, [props.token]);

  const approvaRiassunto = (id) => {
    $.ajax({
      url: "https://vps.lellovitiello.tk/Riassunty/API/approvaRiassunto.php", //"http://localhost/~davidevitiello/Riassunty/API/approvaRiassunto.php", //
      data: {
        id: id,
        token: sessionStorage.token,
      },
      method: "POST",
      success: (data) => {
        if (data === null) {
          rimuoviDaArray(id);
          return;
        }

        if (data.shouldRedirect === "true") {
          window.location.href = "/Login";
        }
      },
    });
  };

  const animaQuandoClicca = (elemento, approvato) => {
    let colore = "red";
    console.log($(elemento).children());
    if (approvato) {
      colore = "green";
    }
    $(elemento).css({
      backgroundColor: colore,
      opacity: 0,
    });
    $(elemento).animate(
      {
        opacity: 1,
      },
      750
    );
    $(elemento).slideUp(() => {
      $(elemento).remove();
    });
    return;

    /*

    if (approvato) {
      
    }
    $(elemento).slideDown(() => {
      $(elemento).remove();
    });*/
  };
  async function eliminaRiassunto(id) {
    let data = new FormData();

    data.append("id", id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php",
      {
        method: "POST",
        body: data,
        credentials: "same-origin",
      }
    );
    if (rispostaFetch.shouldRedirect === "true") {
      window.location.href = "/Login";
    }

    rimuoviDaArray(id);
  }

  let stile = {
    color: "white",
  };

  return (
    <React.Fragment>
      {" "}
      {console.log(
        "Riassunti non approvati",
        riassuntiNonApprovati.length
      )}{" "}
      {riassuntiNonApprovati.length === 0 ? (
        <div> </div>
      ) : (
        <section id="section2" className="sezione2">
          <div
            className="container-fluid"
            style={{
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            <div>
              {" "}
              <p
                style={{
                  fontSize: "20pt",
                  fontWeight: "700",
                }}
              >
                Riassunti Da approvare{" "}
              </p>{" "}
              <div
                style={{
                  height: "20px",
                }}
              >
                {" "}
              </div>{" "}
              {riassuntiNonApprovati.map((riassunto, indice) => {
                return (
                  <div>
                    <div
                      className="container-fluid row"
                      style={{
                        paddingBottom: "75px",
                      }}
                    >
                      <div style={stile} className="col-md">
                        <p> {riassunto.Titolo} </p>{" "}
                        <Link to={`/MostraRiassunto/${riassunto.ID}`}>
                          <img
                            src={
                              "https://vps.lellovitiello.tk/Riassunty/" +
                              riassunto.URLImmagine
                            }
                            alt="riassunto.Titolo"
                            width="300"
                            height="300"
                          />{" "}
                        </Link>{" "}
                      </div>{" "}
                      <div style={stile} className="col-md">
                        <p> Elimina </p>{" "}
                        <img
                          id={riassunto.ID}
                          style={{
                            cursor: "pointer",
                          }}
                          alt="Elimina"
                          src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                          onClick={(e) => {
                            eliminaRiassunto(e.currentTarget.id);
                            let divPadre =
                              e.target.parentElement.parentElement
                                .parentElement;

                            animaQuandoClicca(divPadre);
                          }}
                        />{" "}
                      </div>{" "}
                      <div style={stile} className="col-md">
                        <p> Approva </p>{" "}
                        <img
                          alt="Approva"
                          id={riassunto.ID}
                          style={{
                            cursor: "pointer",
                          }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1024px-Green_tick.svg.png"
                          width="50"
                          height="50"
                          onClick={(e) => {
                            approvaRiassunto(e.currentTarget.id);
                            let divPadre =
                              e.target.parentElement.parentElement
                                .parentElement;

                            animaQuandoClicca(divPadre, true);
                          }}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
            </div>{" "}
          </div>{" "}
        </section>
      )}{" "}
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
