import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../App.css";

import FullNavBar from "../NavBar/FullNavBar";

function CaricaRiassunto() {
  let anni = [];
  let [indirizzi, cambiaIndirizzi] = useState([]);
  let [materie, cambiaMaterie] = useState([]);

  for (let i = 0; i < 5; i++) {
    anni.push(i + 1);
  }

  const prendiIndirizzi = () => {
    const getIndirizzi = async () => {
      let indirizzi = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php"
      );
      indirizzi = await indirizzi.json();
      cambiaIndirizzi(indirizzi);
    };
    getIndirizzi();
  };

  useEffect(prendiIndirizzi, []);

  const prendiMaterie = event => {
    let indirizzo =
      event.currentTarget.options[event.currentTarget.selectedIndex].value;

    const getMaterie = async () => {
      let materie = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/materie.php?indirizzo=" +
          indirizzo
      );

      materie = await materie.json();
      cambiaMaterie(materie);
    };
    getMaterie();
  };
  $("#loadingImage").fadeOut(500, "swing");
  const caricaFile = async e => {
    e.preventDefault();
    let file = $("#file").prop("files")[0];
    let form = new FormData();
    form.append("pdfDaCaricare", file);

    let annoSelezionato = document.getElementById("anno");
    annoSelezionato =
      annoSelezionato.options[annoSelezionato.selectedIndex].value;

    form.append("anno", annoSelezionato);

    let indirizzoSelezionato = document.getElementById("indirizzo");
    indirizzoSelezionato =
      indirizzoSelezionato.options[indirizzoSelezionato.selectedIndex].value;

    form.append("indirizzi", indirizzoSelezionato);

    let materiaSelezionata = document.getElementById("materia");
    materiaSelezionata =
      materiaSelezionata.options[materiaSelezionata.selectedIndex].value;

    form.append("materie", materiaSelezionata);

    let token = sessionStorage.token;
    if (token) {
      form.append("token", token);
    }

    $.ajax({
      //url: "http://localhost/~davidevitiello/Riassunty/API/caricaRiassunto.php", // point to server-side PHP script
      url: "https://vps.lellovitiello.tk/Riassunty/API/caricaRiassunto.php",
      cache: false,
      contentType: false,
      processData: false,
      data: form,
      type: "POST",
      success: data => {
        if (data.shouldRedirect === "true") {
          window.location.href = "/Login";
        }
      }
    });
  };

  const stileContenitore = {
    marginTop: "-20%"
  };

  let stile = {
    color: "white"
  };

  return (
    <React.Fragment>
      {" "}
      <FullNavBar
        elementi={[
          {
            nome: "Stai attento a quello che carichi, non ti conviene",
            dati: []
          }
        ]}
      />{" "}
      <form onSubmit={caricaFile} style={{ marginLeft: "50%" }}>
        <div style={stileContenitore}>
          <p> Seleziona il file </p>{" "}
          <input
            type="file"
            id="file"
            name="pdfDaCaricare"
            required
            style={{
              width: "auto",
              height: "auto",
              borderRadius: "0",
              marginLeft: "50%"
            }}
          />{" "}
        </div>{" "}
        <div style={stile}>
          <p> Seleziona l 'indirizzo</p>{" "}
          <select onChange={prendiMaterie} id="indirizzo" required>
            {" "}
            {indirizzi.map(indirizzo => {
              return (
                <option value={indirizzo.Indirizzo}>
                  {" "}
                  {indirizzo.Indirizzo}{" "}
                </option>
              );
            })}{" "}
          </select>{" "}
        </div>{" "}
        <div style={stile}>
          <p> Seleziona la materia </p>{" "}
          <select required id="materia">
            {" "}
            {materie.map(materia => {
              return (
                <option value={materia.IDMateria}> {materia.Materia} </option>
              );
            })}{" "}
          </select>{" "}
        </div>{" "}
        <div style={stile}>
          <p> Seleziona l 'anno</p>{" "}
          <select required id="anno">
            {" "}
            {anni.map(anno => {
              return <option value={anno}> {anno} </option>;
            })}{" "}
          </select>{" "}
        </div>{" "}
        <div className="row justify-content-center">
          <button
            type="submit"
            value="Carica"
            className="btn btn-primary mb-2"
            //onClick={caricaFile}
          >
            {" "}
            Carica{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
      <div className="progress">
        <div className="barraCaricamento"> </div>{" "}
        <div id="percentuale" className="percent">
          0 %
        </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default CaricaRiassunto;
