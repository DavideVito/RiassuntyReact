import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Indirizzo from "./Indirizzo";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {
  let oggetto = props.dati;
  console.log("Bottoni", oggetto);

  return oggetto.map((contenutoBottone, indice) => {
    return (
      <Bottone
        TestoBottone={contenutoBottone.nome}
        idMateria={contenutoBottone.id}
        key={contenutoBottone.id}
      />
    );
  });
}

export default Bottoni;
