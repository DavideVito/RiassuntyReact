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

  return (
    <React.Fragment>
      <div id="heading" className="row" style={stile}>
        <div className="col-md" style={stileTitolo}>
          {" "}
          {props.Tilolo}{" "}
        </div>{" "}
      </div>{" "}
      <div className="row justify-content-center">
        <Bottoni indirizzo={props.Tilolo} />{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Titolo;
