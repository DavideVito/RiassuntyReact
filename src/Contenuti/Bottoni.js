import React from "react";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {

  return props.dati.map((contenutoBottone, indice) => {
    return ( <
      Bottone TestoBottone = {
        contenutoBottone.nome
      }
      id = {
        contenutoBottone.id
      }
      key = {
        contenutoBottone.id
      }
      link = {
        props.link
      }
      />
    );
  });
}

export default Bottoni;