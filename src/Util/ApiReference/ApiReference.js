import React, { useState } from "react";
import $ from "jquery";
import Footer from "../../Util/Footer.js";
import "../../App.css";
import ReactJson from "react-json-view";
import FullNavBar from "../../NavBar/FullNavBar";
import { Button } from "react-bootstrap";

function ApiReference(props) {
  $("#loadingImage").fadeOut(500);
  let [json, cambiaJSON] = useState("{}");
  let [mostra, cambiaMostra] = useState(false);

  let elementi = [
    {
      nome: "Indirizzi",
      id: "1",
      dati: [
        {
          id: Math.random() * 1000,
          nome: "Per ottenre gli indirizzi",
        },
      ],
    },
    {
      nome: "Materie",
      id: "2",
      dati: [
        {
          id: Math.random() * 1000,
          nome: "Get Materie",
        },
      ],
    },
    {
      id: "3",
      nome: "Riassunty",
      dati: [
        {
          id: Math.random() * 1000,
          nome: "Get Riassunty",
        },
        {
          id: Math.random() * 1000,
          nome: "Carica Riassunto",
        },
        {
          id: Math.random() * 1000,
          nome: "Ottenere la ",
        },
        {
          id: Math.random() * 1000,
          nome: "Inserire una valutazione",
        },
      ],
    },
  ];
  console.log("Elementi", elementi);
  console.log("json", json);
  return (
    <React.Fragment>
      <FullNavBar elementi={elementi} />{" "}
      <main
        style={{
          color: "white",
        }}
      >
        <React.Fragment>
          <section id="section0" className="sezione0">
            <div
              className="conteiner-fluid"
              style={{
                textAlign: "center",
              }}
            >
              <div id="nostroHeading" className="row">
                <div
                  className="col-md"
                  style={{
                    marginBottom: "80px",
                  }}
                >
                  Indirizzi
                </div>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <div
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Per ottenere gli indirizzi
                  <div>
                    <div>
                      <code style={{ color: "black" }}>
                        GET =>
                        https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php
                      </code>
                      <div>
                        <code>param: Nessuno</code>
                        <div>
                          <Button
                            variant="primary"
                            onClick={async () => {
                              if (mostra) {
                                cambiaMostra(false);
                                return;
                              }
                              let ris = await fetch(
                                "https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php"
                              );
                              ris = await ris.json();
                              cambiaJSON(JSON.stringify(ris));
                              cambiaMostra(true);
                            }}
                          >
                            Esegui richiesta
                          </Button>{" "}
                          <div style={{ height: "50px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </section>{" "}
          <section id="section1" className="sezione1">
            <div
              className="conteiner-fluid"
              style={{
                textAlign: "center",
              }}
            >
              <div id="nostroHeading" className="row">
                <div
                  className="col-md"
                  style={{
                    marginBottom: "80px",
                  }}
                >
                  Materie
                </div>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <div
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                  }}
                >
                  Restituisce tuttle le materie di un indirizzo
                  <div>
                    <div>
                      <code style={{ color: "black" }}>
                        GET =>
                        https://vps.lellovitiello.tk/Riassunty/API/materie.php
                      </code>
                      <div>
                        <div>
                          <code>param: indirizzo?</code>
                          <br /> Se indirizzo non è presente, Restituisce tutte
                          le materie
                        </div>
                        <div>
                          <Button
                            variant="primary"
                            onClick={async () => {
                              if (mostra) {
                                cambiaMostra(false);
                                return;
                              }
                              let ris = await fetch(
                                "https://vps.lellovitiello.tk/Riassunty/API/materie.php?indirizzo=Informatica"
                              );
                              ris = await ris.json();
                              cambiaJSON(JSON.stringify(ris));
                              cambiaMostra(true);
                            }}
                          >
                            Esegui richiesta
                          </Button>{" "}
                          <div style={{ height: "50px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </section>{" "}
          <section id="section2" className="sezione2">
            <div
              className="conteiner-fluid"
              style={{
                textAlign: "center",
              }}
            >
              <div id="nostroHeading" className="row">
                <div
                  className="col-md"
                  style={{
                    marginBottom: "80px",
                  }}
                >
                  Riassunty
                </div>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <div
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                  }}
                >
                  Anteprime
                  <div>
                    <div>
                      <code style={{ color: "black" }}>
                        GET =>
                        https://vps.lellovitiello.tk/Riassunty/API/anteprima.php
                      </code>
                      <div>
                        <div>
                          <code>param: idMateria?, anno?</code>
                        </div>
                        <div>
                          <Button
                            variant="primary"
                            onClick={async () => {
                              if (mostra) {
                                cambiaMostra(false);
                                return;
                              }
                              let ris = await fetch(
                                "https://vps.lellovitiello.tk/Riassunty/API/anteprima.php"
                              );
                              ris = await ris.json();
                              cambiaJSON(JSON.stringify(ris));
                              cambiaMostra(true);
                            }}
                          >
                            Esegui richiesta
                          </Button>{" "}
                          <div style={{ height: "50px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                  }}
                >
                  GET Riassunti
                  <div>
                    <div>
                      <code style={{ color: "black" }}>
                        GET =>
                        https://vps.lellovitiello.tk/Riassunty/API/riassunto.php
                      </code>
                      <div>
                        <div>
                          <code>param: idRiassunto!</code>
                        </div>
                        <div>
                          <Button
                            variant="primary"
                            onClick={async () => {
                              if (mostra) {
                                cambiaMostra(false);
                                return;
                              }
                              let ris = await fetch(
                                "https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=1"
                              );
                              ris = await ris.json();
                              cambiaJSON(JSON.stringify(ris));
                              cambiaMostra(true);
                            }}
                          >
                            Esegui richiesta
                          </Button>{" "}
                          <div style={{ height: "50px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                  }}
                >
                  Carica Riassunto
                  <div>
                    <div>
                      <code style={{ color: "black" }}>
                        POST =>
                        https://vps.lellovitiello.tk/Riassunty/API/caricaRiassunto.php
                      </code>
                      <div>
                        <div>
                          <code>
                            param: filePDF!, indirizzo!, materia!, anno!,
                            utente!
                          </code>
                        </div>
                        <div>
                          <div style={{ height: "50px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                style={{
                  fontSize: "2em",
                  cursor: "pointer",
                }}
              >
                Ottnere la valutazione
                <div>
                  <div>
                    <code style={{ color: "black" }}>
                      GET =>
                      https://vps.lellovitiello.tk/Riassunty/API/getValutazione.php
                    </code>
                    <div>
                      <div>
                        <code>param: idRiassunto!</code>
                      </div>
                      <div>
                        <Button
                          variant="primary"
                          onClick={async () => {
                            if (mostra) {
                              cambiaMostra(false);
                              return;
                            }
                            let ris = await fetch(
                              "https://vps.lellovitiello.tk/Riassunty/API/getValutazione.php?idRiassunto=4"
                            );
                            ris = await ris.json();
                            cambiaJSON(JSON.stringify(ris));
                            cambiaMostra(true);
                          }}
                        >
                          Esegui richiesta
                        </Button>{" "}
                        <div style={{ height: "50px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "2em",
                  cursor: "pointer",
                }}
              >
                Inserire la valutazione
                <div>
                  <div>
                    <code style={{ color: "black" }}>
                      GET =>
                      https://vps.lellovitiello.tk/Riassunty/API/InserisciValutazione.php
                    </code>
                    <div>
                      <div>
                        <code>
                          param: idRiassunto!, idUtente!, Valutazione!,
                          idRiassunto
                        </code>
                      </div>
                      <div>
                        <div style={{ height: "50px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
        </React.Fragment>{" "}
      </main>{" "}
      <div
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          width: "350px",
          position: "fixed",
          top: 160,
          left: 0,
        }}
      >
        <ReactJson src={JSON.parse(json)} />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ApiReference;
/*
<div>
        elementi.map((elemento) => {
          <div>{elemento.nome}</div>
          <div>
              {
                elemento.dati.map(dato => {
                    <div>{dato.nome}</div>
                })
              }
          </div>
        <ReactJson src={my_json_object} />
        })</div>} */
