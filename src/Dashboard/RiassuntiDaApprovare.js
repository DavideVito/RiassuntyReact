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

  let stileBottone = { marginTop: "40px" };

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
    $(elemento.firstElementChild.childNodes[2].lastElementChild).off();
    $(elemento.firstElementChild.childNodes[2].lastElementChild).css({
      cursor: "not-allowed",
    });

    $(elemento.firstElementChild.childNodes[4].lastElementChild).off();
    $(elemento.firstElementChild.childNodes[4].lastElementChild).css({
      cursor: "not-allowed",
    });
    let direzione = approvato ? "right" : "left";
    $(elemento).toggle(direzione, () => {
      $(elemento).remove();
    });
    return;
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
                  <div style={{ backgroundColor: "inherit" }}>
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
                        <button
                          style={stileBottone}
                          className="btn btn-danger"
                          id={riassunto.ID}
                          onClick={(e) => {
                            let divPadre =
                              e.target.parentElement.parentElement
                                .parentElement;
                            eliminaRiassunto(e.currentTarget.id);

                            animaQuandoClicca(divPadre);
                          }}
                        >
                          Elimina
                        </button>
                      </div>{" "}
                      <div style={stile} className="col-md">
                        <button
                          style={stileBottone}
                          className="btn btn-success"
                          id={riassunto.ID}
                          onClick={(e) => {
                            let divPadre =
                              e.target.parentElement.parentElement
                                .parentElement;
                            approvaRiassunto(e.currentTarget.id);

                            animaQuandoClicca(divPadre);
                          }}
                        >
                          Approva
                        </button>
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
