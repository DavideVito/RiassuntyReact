import React from "react";
import Titolo from "./Titolo";
import "../App.css";

function Contenitore(props) {
  const stileHeading = {
    marginTop: "125px"
  };

  const stileContenitore = {
    textAlign: "center"
  };

  return ( <
    React.Fragment >
    <
    div className = "container-fluid"
    style = {
      stileContenitore
    } >
    <
    Titolo key = "Titolo"
    dati = {
      props.dati
    }
    style = {
      stileHeading
    }
    link = {
      props.link
    }
    />{" "} < /
    div > {
      " "
    } <
    /React.Fragment>
  );
}

export default Contenitore;