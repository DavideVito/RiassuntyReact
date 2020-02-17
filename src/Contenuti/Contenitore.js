import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Titolo from "./Titolo";
import "../App.css";
import Bottoni from "./Bottoni";

function Contenitore(props) {
  const stileHeading = {
    marginTop: "125px"
  };

  const stileContenitore = {
    textAlign: "center"
  };

  console.log("Contenitore: ", props);

  return (
    <React.Fragment>
      <div class="container-fluid" style={stileContenitore}>
        <Titolo Tilolo={props.Tilolo} style={stileHeading} />{" "}
      </div>
    </React.Fragment>
  );
}

export default Contenitore;
