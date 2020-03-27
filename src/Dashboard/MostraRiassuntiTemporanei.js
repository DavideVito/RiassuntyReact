import React, { useEffect, useState, useContext } from "react";
import "../Util/DropDownMenu/DropDownMenu";
import "../App.css";
import $ from "jquery";
import { ContestoTesto } from "../Util/Contesti/ContestoTesto";

function MostraRiassuntiTemporanei(props) {
  let [riassuntiTemporanei, cambiaRiassunti] = useState([]);

  const [testo, cambiaTesto] = useContext(ContestoTesto);

  const prendiRiassunti = () => {
    $.ajax({
      url: `http://localhost/~davidevitiello/Riassunty/API/getRiassuntiTemporanei.php`,
      // url: `https://vps.lellovitiello.tk/Riassunty/API/getRiassuntiTemporanei.php`,

      data: {
        token: sessionStorage.token
      },
      method: "POST",
      success: data => {
        console.log(data);
        for (let riassunto of data) {
          riassunto.versioni.unshift({
            UltimaModifica: "Seleziona una versione",
            IDFile: ""
          });
        }
        cambiaRiassunti(data);
      }
    });
  };

  const prendiFile = () => {
    $.ajax({
      url: `http://localhost/~davidevitiello/Riassunty/API/getFileRiassuntoTemporaneo.php`,
      // url: `https://vps.lellovitiello.tk/Riassunty/API/getFileRiassuntoTemporaneo.php`,

      data: {
        file: fileSezionato,
        riassunto: riassuntoSelezionato
      },
      method: "POST",
      success: data => {
        sessionStorage.idRiassunto = riassuntoSelezionato;
        sessionStorage.idFile = fileSezionato;
        if (data.txt === false) {
          cambiaTesto("");
          return;
        }
        cambiaTesto(data.txt);
      }
    });
  };

  let [riassuntoSelezionato, cambiaRiassuntoSelezionato] = useState("");
  let [fileSezionato, cambiaFileSelezioanto] = useState("");

  useEffect(prendiFile, [riassuntoSelezionato, fileSezionato]);
  useEffect(prendiRiassunti, [props.account]);

  let stile = {
    color: "white"
  };

  return (
    <React.Fragment>
      {" "}
      <div
        style={{
          height: "80px"
        }}
      >
        {" "}
      </div>{" "}
      <div className="row">
        <div className="col-md-2"> </div>{" "}
        <div className="col-md-3"> Nome File </div>{" "}
        <div className="col-md-1"> </div>{" "}
        <div className="col-md-3"> Ultima Modifica </div>{" "}
        <div className="col-md-2"> </div>{" "}
      </div>{" "}
      <div
        style={{
          height: "20px"
        }}
      >
        {" "}
      </div>{" "}
      {riassuntiTemporanei.map(riassuntoTemporaneo => {
        return (
          <React.Fragment>
            <div className="row">
              <div className="col-md-2"> </div>{" "}
              <div className="col-md-3"> {riassuntoTemporaneo.Nome} </div>{" "}
              <div className="col-md-1"> </div>{" "}
              <div className="col-md-3">
                <select
                  className="form-control"
                  onChange={e => {
                    let idFile = e.currentTarget.value;
                    if (idFile === "") {
                      idFile = e.currentTarget.options[1].value;
                    }
                    let idRiassunto = e.target.name;
                    cambiaRiassuntoSelezionato(idRiassunto);
                    cambiaFileSelezioanto(idFile);
                  }}
                  name={riassuntoTemporaneo.IDRiassunto}
                >
                  {" "}
                  {riassuntoTemporaneo.versioni.map(elemento => {
                    return (
                      <option value={elemento.IDFile}>
                        {" "}
                        {elemento.UltimaModifica}{" "}
                      </option>
                    );
                  })}{" "}
                </select>{" "}
              </div>{" "}
              <div className="col-md-2"> </div>{" "}
            </div>{" "}
            <div
              style={{
                height: "20px"
              }}
            >
              {" "}
            </div>{" "}
          </React.Fragment>
        );
      })}{" "}
    </React.Fragment>
  );
}

export default MostraRiassuntiTemporanei;
