import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Indirizzo from "./Indirizzo";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {
  let oggetto = props.dati;

  return oggetto.map((contenutoBottone, indice) => {
    return (
      <Bottone
        TestoBottone={contenutoBottone.nome}
        id={contenutoBottone.id}
        key={contenutoBottone.id}
        link={props.link}
      />
    );
  });
}

export default Bottoni;
