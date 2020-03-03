import React, {
  useEffect,
  useState
} from "react";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {
  let oggetto = props.dati;

  return oggetto.map((contenutoBottone, indice) => {
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