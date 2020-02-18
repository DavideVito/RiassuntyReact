import React from "react";
import Bottoni from "./Bottoni";
import "../App.css";

function Titolo(props) {
  const stile = {
    marginTop: "125px"
  };

  const stileTitolo = {
    marginBottom: "80px"
  };

  let oggetto = props.dati;
  console.log("Titolo", oggetto);
  return (
    <React.Fragment>
      <div id="heading" className="row" style={stile}>
        <div className="col-md" style={stileTitolo}>
          {" "}
          {props.dati.nome}{" "}
        </div>{" "}
      </div>{" "}
      <div className="row justify-content-center">
        <Bottoni dati={props.dati.dati} />{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Titolo;
