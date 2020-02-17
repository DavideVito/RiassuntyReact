import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Indirizzo from "./Indirizzo";
import "../App.css";
import Bottone from "./../Util/Bottone";

function Bottoni(props) {
  const [materie, cambiaMaterie] = useState([]);

  const fetchMaterie = async () => {
    let indirizzo = props.indirizzo;
    console.log(indirizzo);
    let materie = await fetch(
      `https://vps.lellovitiello.tk/Riassunty/API/materie.php?indirizzo=${indirizzo}`
    );
    materie = await materie.json();

    cambiaMaterie(materie);
    console.log(materie);
  };

  useEffect(fetchMaterie, []);

  return materie.map((materia, indice) => {
    return (
      <div>
        <Bottone
          TestoBottone={materia.Materia}
          idMateria={materia.IDMateria}
          key={materia.IDMateria}
        />
      </div>
    );
  });
}

export default Bottoni;
