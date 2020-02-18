import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contenitore from "./Contenitore";
import Bottoni from "./Bottoni";
import "../App.css";

function Sezione(props) {
  return (
    <React.Fragment>
      <Contenitore dati={props.dati} />{" "}
    </React.Fragment>
  );
}

export default Sezione;
