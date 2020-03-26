import React, { useState } from "react";
import $ from "jquery";
import { Editor } from "@tinymce/tinymce-react";

function MyEditor() {
  let [numeroRighe, cambiaNumeroRighe] = useState(1);

  let handleEditorChange = (content, editor) => {
    let righe = content.split("\n");
    if (numeroRighe === righe.length) {
      return;
    }
    cambiaNumeroRighe(righe.length);

    let titolo = $(righe[0]).text();
    let contenuto = content;
    let token = sessionStorage.token;
    let idRiassunto = "";
    if (typeof sessionStorage.idRiassunto === "undefined") {
      idRiassunto = "no";
    } else {
      idRiassunto = sessionStorage.idRiassunto;
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
        idRiassunto: idRiassunto
      },
      method: "POST",
      success: data => {
        sessionStorage.idRiassunto = data.idRiassunto;
      }
    });
  };

  return (
    <React.Fragment>
      <div
        style={{
          height: "250px"
        }}
      >
        {" "}
      </div>{" "}
      <div className="row">
        <div className="col-md-2"> </div>{" "}
        <div className="col-md">
          <Editor
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
    </React.Fragment>
  );
}

export default MyEditor;
