import React from "react";
import Bottoni from "./Bottoni";
import "../App.css";

function Titolo(props) {
  const stileTitolo = {
    marginBottom: "80px",
  };

  //console.log("Titolo", props.dati);

  return (
    <React.Fragment>
      <div id="nostroHeading" className="row">
        <div className="col-md" style={stileTitolo}>
          {" "}
          {props.dati.nome}{" "}
        </div>{" "}
      </div>{" "}
      <div className="row justify-content-center">
        <Bottoni
          dati={props.dati.dati}
          link={props.link}
          indirizzo={props.dati.nome}
        />{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Titolo;
