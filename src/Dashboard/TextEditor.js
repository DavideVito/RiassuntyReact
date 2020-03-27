import React, { useState, useContext } from "react";
import $ from "jquery";
import CaricaRiassunto from "./CaricaRiassunto";
import { Editor } from "@tinymce/tinymce-react";

import { ContestoTesto } from "../Util/Contesti/ContestoTesto";

function MyEditor() {
  let [numeroRighe, cambiaNumeroRighe] = useState(1);
  const [testo, cambiaTesto] = useContext(ContestoTesto);
  let [mostra, cambiaMostra] = useState("false");

  function caricaRiassuntoTemporaneo(content) {
    let righe = content.split("\n");
    if (numeroRighe === righe.length) {
      return;
    }
    cambiaNumeroRighe(righe.length);
    let titolo = $(righe[0]).text();
    if (titolo === "") {
      return;
    }
    let contenuto = content;
    let token = sessionStorage.token;
    let idRiassunto = "";
    if (
      typeof sessionStorage.idRiassunto === "undefined" ||
      sessionStorage.idRiassunto === ""
    ) {
      idRiassunto = "no";
    } else {
      idRiassunto = sessionStorage.idRiassunto;
    }
    let idFile = "";
    if (
      typeof sessionStorage.idFile === "undefined" ||
      sessionStorage.idFile === ""
    ) {
      idFile = "no";
    } else {
      idFile = sessionStorage.idFile;
    }

    console.log("carico");
    $.ajax({
      url:
        //"https://vps.lellovitiello.tk/Riassunty/API/caricaTestoTemporaneo.php",
        "http://localhost/~davidevitiello/Riassunty/API/caricaTestoTemporaneo.php",
      data: {
        token: token,
        nome: titolo,
        contenuto: contenuto,
        idRiassunto: idRiassunto,
        idFile: idFile
      },
      method: "POST",
      success: data => {
        sessionStorage.idRiassunto = data.idRiassunto;
      }
    });
  }

  let handleEditorChange = (content, editor) => {
    caricaRiassuntoTemporaneo(content);
  };

  return (
    <React.Fragment>
      <div
        style={{
          height: "150px"
        }}
      >
        {" "}
      </div>{" "}
      <div className="row">
        <div className="col-md-2"> </div>
        <div className="col-md">
          La prima riga conterrà il titolo del file.
          <br />
          Le altre conterranno il contnuto
          <br />
          Per salvare il file basta il pulsante invio <br />
        </div>
        <div className="col-md-2"> </div>
      </div>
      <div
        style={{
          height: "50px"
        }}
      >
        {" "}
      </div>{" "}
      <div className="row">
        <div className="col-md-2"> </div>{" "}
        <div className="col-md-3">
          <input
            name=""
            id=""
            class="btn btn-primary"
            type="button"
            value="Clicca per creare un nuovo riassunto"
            onClick={() => {
              sessionStorage.removeItem("idRiassunto");
              sessionStorage.removeItem("idFile");
              cambiaTesto("");
            }}
          />{" "}
        </div>{" "}
        <div className="col-md-2"> </div>{" "}
        <div className="col-md-3">
          <input
            name=""
            id=""
            class="btn btn-primary"
            type="button"
            value="Clicca caricare questo riassunto"
            onClick={() => {
              //caricaRiassuntoTemporaneo(testo + "\n");

              cambiaMostra(mostra === true ? false : true);
            }}
          />{" "}
        </div>
        <div className="col-md-2"> </div>{" "}
      </div>{" "}
      <div
        style={{
          height: "50px"
        }}
      >
        {" "}
      </div>{" "}
      <div className="row">
        <div className="col-md-2"> </div>{" "}
        <div className="col-md">
          <Editor
            value={testo}
            textareaName="testoUtente"
            placeholder="Scrivi qua il tuo riassunto, verrà salvato in automatico"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist format autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount save"
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | help"
            }}
            onEditorChange={handleEditorChange}
          />{" "}
        </div>{" "}
        <div className="col-md-2"> </div>{" "}
      </div>{" "}
      {mostra === true ? (
        <div id="caricaRiassunto">
          <CaricaRiassunto renderNavBar="t" renderSelezionaFile="t" />
        </div>
      ) : (
        <div></div>
      )}{" "}
    </React.Fragment>
  );
}

export default MyEditor;
