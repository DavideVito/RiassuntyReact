import React from "react";

import Contenitore from "./Contenitore";

import "../App.css";

function Sezione(props) {
  return ( <
    React.Fragment >
    <
    Contenitore dati = {
      props.dati
    }
    link = {
      props.link
    }
    />{" "} < /
    React.Fragment >
  );
}

export default Sezione;