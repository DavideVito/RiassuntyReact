import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Indirizzo from "./Indirizzo";

import "../App.css";

function Indirizzi(props) {
  console.log("Indirizzi", props.dati);
  let oggetto = props.dati;
  return (
    <React.Fragment>
      /
      <Indirizzo
        key={oggetto.nome}
        nome={oggetto.nome}
        id={oggetto.id}
        dati={props.dati}
      />
    </React.Fragment>
  );
}

export default Indirizzi;
