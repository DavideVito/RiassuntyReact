import React, { useState, useContext } from "react";
import $ from "jquery";
import CaricaRiassunto from "./CaricaRiassunto";
import { Editor } from "@tinymce/tinymce-react";

import { ContestoTesto } from "../Util/Contesti/ContestoTesto";

function MyEditor() {
  let [numeroRighe, cambiaNumeroRighe] = useState(1);
  const [testo, cambiaTesto] = useContext(ContestoTesto);
  let [mostra, cambiaMostra] = useState("false");

  let [file, cambiaFile] = useState({});

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
      type: mime
    });
  }

  async function convertiFile(idRiassunto, idFile) {
    let data = new FormData();
    data.append("idRiassunto", idRiassunto);
    data.append("idFile", idFile);

    let risposta = await fetch(
      //"http://192.168.1.130/Riassunty/API/convertiHtml2Pdf.php",
      "https://vps.lellovitiello.tk/Riassunty/API/convertiHtml2Pdf.php",
      //"http://localhost/~davidevitiello/Riassunty/API/convertiHtml2Pdf.php",
      {
        method: "post",
        body: data
      }
    );

    risposta = await risposta.json();
    return dataURLtoFile(risposta.base64, risposta.nome);
  }

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

    $.ajax({
      url:
        "https://vps.lellovitiello.tk/Riassunty/API/caricaTestoTemporaneo.php",
      //"http://localhost/~davidevitiello/Riassunty/API/caricaTestoTemporaneo.php",
      //"http://192.168.1.130/Riassunty/API/caricaTestoTemporaneo.php",
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
        sessionStorage.idFile = data.idFile;
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
        <div className="col-md-2"> </div>{" "}
        <div className="col-md">
          La prima riga conterrà il titolo del file. <br />
          Le altre conterranno il contnuto <br />
          Per salvare il file basta il pulsante invio <br />
        </div>{" "}
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
            onClick={async () => {
              debugger;
              caricaRiassuntoTemporaneo(testo + "\n");

              cambiaMostra(mostra === true ? false : true);
              if (typeof sessionStorage.idRiassunto !== "undefined") {
                if (typeof sessionStorage.idFile !== "undefined") {
                  if (sessionStorage.idFile !== "") {
                    if (sessionStorage.idRiassunto !== "") {
                      let file = await convertiFile(
                        sessionStorage.idRiassunto,
                        sessionStorage.idFile
                      );
                      cambiaFile(file);
                    }
                  }
                }
              }
            }}
          />{" "}
        </div>{" "}
        <div className="col-md-2"> </div>{" "}
      </div>{" "}
      <div
        style={{
          height: "50px"
        }}
      >
        {" "}
      </div>{" "}
      <div
        className="row"
        style={{
          paddingBottom: "150px"
        }}
      >
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
          <CaricaRiassunto
            renderNavBar="t"
            renderSelezionaFile="t"
            file={file}
          />{" "}
        </div>
      ) : (
        <div> </div>
      )}{" "}
    </React.Fragment>
  );
}

export default MyEditor;
