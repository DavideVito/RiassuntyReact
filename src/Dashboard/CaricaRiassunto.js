import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../App.css";
import FullNavBar from "../NavBar/FullNavBar";

function CaricaRiassunto() {
  let [anni, cambiaAnni] = useState([]);
  let [indirizzi, cambiaIndirizzi] = useState([]);
  let [materie, cambiaMaterie] = useState([]);
  let [file, cambiaFile] = useState({});
  let [annoImpostato, cambiaAnno] = useState(0);
  let [materiaImpostata, cambiaMateria] = useState("");
  let [indirizzoImpostato, cambiaIndirizzo] = useState("");

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
    cambiaIndirizzo(indirizzo);

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

  const selezioneFile = e => {
    cambiaFile(e.target.files[0]);
  };

  const caricaFile = async e => {
    const data = new FormData();
    data.append("pdfDaCaricare", file, file.name);
    debugger;
    let anno = annoImpostato;
    let materia = materiaImpostata;
    let indirizzo = indirizzoImpostato;

    data.append("anno", anno);
    data.append("materie", materia);
    data.append("indirizzi", indirizzo);
    let token = sessionStorage.token;
    if (token) {
      data.append("token", token);
    }

    $.ajax({
      url: "http://localhost/~davidevitiello/Riassunty/API/caricaRiassunto.php",
      method: "POST",
      data: {
        anno: anno,
        materia: materia,
        indirizzo: indirizzo,
        pdfDaCaricare: file,
        token: token
      },
      contentType: "multipart/form-data",
      success: dati => {
        debugger;
      }
    });

    /*await axios.post(
      "http://localhost/~davidevitiello/Riassunty/API/caricaRiassunto.php",
      //"https://vps.lellovitiello.tk/Riassunty/API/caricaRiassunto.php",
      data,
      {
        method: "POST",
        
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          document.getElementById("percentuale").innerText = percentCompleted;
        }
      }
    );*/
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
      <div style={stileContenitore}>
        <p> Seleziona il file </p>{" "}
        <input type="file" id="file" name="file" onChange={selezioneFile} />{" "}
      </div>{" "}
      <div style={stile}>
        <p> Seleziona l 'indirizzo</p>{" "}
        <select onChange={prendiMaterie} id="indirizzo">
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
        <select
          id="materia"
          onChange={e => {
            let materia =
              e.currentTarget.options[e.currentTarget.selectedIndex].value;
            cambiaMateria(materia);
          }}
        >
          {materie.map(materia => {
            return (
              <option value={materia.IDMateria}> {materia.Materia} </option>
            );
          })}{" "}
        </select>{" "}
      </div>{" "}
      <div style={stile}>
        <p> Seleziona l 'anno</p>{" "}
        <select
          id="anno"
          onChange={e => {
            let anno =
              e.currentTarget.options[e.currentTarget.selectedIndex].value;
            cambiaAnno(anno);
          }}
        >
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
          onClick={caricaFile}
        >
          {" "}
          Carica{" "}
        </button>{" "}
      </div>{" "}
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
