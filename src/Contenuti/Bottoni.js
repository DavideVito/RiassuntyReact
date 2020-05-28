import React from "react";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {
  //console.log("props.dati", props.dati);
  return props.dati.map((contenutoBottone, indice) => {
    //console.log("Contenuto Bottone", contenutoBottone);
    return (
      <Bottone
        TestoBottone={contenutoBottone.nome}
        id={contenutoBottone.nome}
        key={contenutoBottone.id}
        link={props.link}
        indirizzo={props.indirizzo}
      />
    );
  });
}

export default Bottoni;
