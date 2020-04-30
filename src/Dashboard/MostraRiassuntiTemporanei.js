import React, {
  useEffect,
  useState,
  useContext
} from "react";
import "../Util/DropDownMenu/DropDownMenu";
import "../App.css";
import $ from "jquery";
import {
  ContestoTesto
} from "../Util/Contesti/ContestoTesto";
import {
  Col,
  Row,
  Container
} from "react-bootstrap";

function MostraRiassuntiTemporanei(props) {
  let [riassuntiTemporanei, cambiaRiassunti] = useState([]);

  const [testo, cambiaTesto] = useContext(ContestoTesto);

  const prendiRiassunti = () => {
    $.ajax({
      //url: `http://localhost/~davidevitiello/Riassunty/API/getRiassuntiTemporanei.php`,
      url: `https://vps.lellovitiello.tk/Riassunty/API/getRiassuntiTemporanei.php`,
      //url: "http://192.168.1.130/Riassunty/API/getRiassuntiTemporanei.php",
      data: {
        token: sessionStorage.token,
      },
      method: "POST",
      success: (data) => {
        console.log(data);
        if (typeof data.shoudRedirect !== "undefined") {
          if (data.shoudRedirect === true) {
            window.location.href = "/Login";
          }
        }

        for (let riassunto of data) {
          riassunto.versioni.unshift({
            UltimaModifica: "Seleziona una versione",
            IDFile: "",
          });
        }
        cambiaRiassunti(data);
      },
    });
  };

  const prendiFile = () => {
    $.ajax({
      //url: `http://localhost/~davidevitiello/Riassunty/API/getFileRiassuntoTemporaneo.php`,
      url: `https://vps.lellovitiello.tk/Riassunty/API/getFileRiassuntoTemporaneo.php`,
      //url: "http://192.168.1.130/Riassunty/API/getFileRiassuntoTemporaneo.php",

      data: {
        file: fileSezionato,
        riassunto: riassuntoSelezionato,
      },
      method: "POST",
      success: (data) => {
        debugger;
        localStorage.setItem("idRiassunto", riassuntoSelezionato);
        localStorage.setItem("idFile", fileSezionato);
        if (data.txt === false) {
          cambiaTesto("");
          return;
        }
        cambiaTesto(data.txt);
      },
    });
  };

  let [riassuntoSelezionato, cambiaRiassuntoSelezionato] = useState("");
  let [fileSezionato, cambiaFileSelezioanto] = useState("");

  useEffect(prendiFile, [riassuntoSelezionato, fileSezionato]);
  useEffect(prendiRiassunti, [props.account]);

  return ( <
      React.Fragment >
      <
      div style = {
        {
          paddingTop: "80px",
        }
      } >
      <
      /div>{" "} <
      Container >
      <
      Row >
      <
      Col md = {
        2
      } > < /Col> <Col md={3}> Nome File </Col > < Col md = {
        1
      } > < /Col>{" "} <
      Col md = {
        3
      } > Ultima Modifica < /Col> <Col md={2}> </Col >
      <
      /Row>{" "} < /
      Container > {
        " "
      } <
      div style = {
        {
          paddingTop: "80px",
        }
      } >
      <
      /div>{" "} {
      riassuntiTemporanei.map((riassuntoTemporaneo) => {
        return ( <
          React.Fragment >
          <
          Container >
          <
          Row >
          <
          Col md = {
            2
          } > < /Col>{" "} <
          Col md = {
            3
          } > {
            riassuntoTemporaneo.Nome
          } < /Col>{" "} <
          Col md = {
            1
          } > < /Col>{" "} <
          Col md = {
            3
          } >
          <
          select className = "form-control"
          onChange = {
            (e) => {
              let idFile = e.currentTarget.value;
              if (idFile === "") {
                idFile = e.currentTarget.options[1].value;
              }
              let idRiassunto = e.target.name;
              cambiaRiassuntoSelezionato(idRiassunto);
              cambiaFileSelezioanto(idFile);
            }
          }
          name = {
            riassuntoTemporaneo.IDRiassunto
          } > {
            " "
          } {
            riassuntoTemporaneo.versioni.map((elemento) => {
              return ( <
                option value = {
                  elemento.IDFile
                } > {
                  " "
                } {
                  elemento.UltimaModifica
                } {
                  " "
                } <
                /option>
              );
            })
          } {
            " "
          } <
          /select>{" "} < /
          Col > {
            " "
          } <
          Col md = {
            2
          } > < /Col>{" "} < /
          Row > {
            " "
          } <
          /Container>{" "} <
          div style = {
            {
              height: "80px",
            }
          } >
          <
          /div>{" "} <
          br / >
          <
          /React.Fragment>
        );
      })
    } {
      " "
    } <
    /React.Fragment>
);
}

export default MostraRiassuntiTemporanei;