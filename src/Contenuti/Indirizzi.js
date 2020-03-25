import React from "react";
import Indirizzo from "./Indirizzo";

import "../App.css";

function Indirizzi(props) {
  let oggetto = props.dati;
  return (
    <React.Fragment>
      {" "}
      <Indirizzo
        key={oggetto.nome}
        nome={oggetto.nome}
        id={oggetto.id}
        dati={props.dati}
        link={props.link}
      />{" "}
    </React.Fragment>
  );
}

export default Indirizzi;
