import React from "react";
import Bottoni from "./Bottoni";
import "../App.css";

function Titolo(props) {
  const stileTitolo = {
    marginBottom: "80px",
  };

  return (
    <React.Fragment>
      <div id="nostroHeading" className="row">
        <div className="col-md" style={stileTitolo}>
          {" "}
          {props.dati.nome}{" "}
        </div>{" "}
      </div>{" "}
      <div className="row justify-content-center">
        <Bottoni dati={props.dati.dati} link={props.link} />{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Titolo;
