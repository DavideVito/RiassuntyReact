import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Indirizzi from "./Indirizzi";
import Bottone from "../Util/Bottone";
import MostraMaterie from "./MostraMaterie";
import "../App.css";
import FullNavBar from "../NavBar/FullNavBar";

function Main() {
  const [indirizzi, cambiaIndirizzi] = useState([]);

  const fetchIndirizzi = () => {
    async function prendiIndirizzi() {
      let indirizzi = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php"
      );
      let ind = await indirizzi.json();

      for (let i = 0; i < ind.length; i++) {
        async function prendiMaterie() {
          let materie = await fetch(
            `https://vps.lellovitiello.tk/Riassunty/API/materie.php?indirizzo=${ind[i].Indirizzo}`
          );
          materie = await materie.json();

          for (let materia of materie) {
            Object.defineProperty(
              materia,
              "nome",
              Object.getOwnPropertyDescriptor(materia, "Materia")
            );
            delete materia["Materia"];

            Object.defineProperty(
              materia,
              "id",
              Object.getOwnPropertyDescriptor(materia, "IDMateria")
            );
            delete materia["IDMateria"];
            delete materia["Indirizzo"];
          }

          Object.defineProperty(
            ind[i],
            "nome",
            Object.getOwnPropertyDescriptor(ind[i], "Indirizzo")
          );
          delete ind[i]["Indirizzo"];
          Object.assign(ind[i], { dati: materie });
          Object.assign(ind[i], { id: i });
        }

        await prendiMaterie();
      }
      console.log("Main.js", ind);
      cambiaIndirizzi(ind);
    }
    prendiIndirizzi();
  };
  useEffect(fetchIndirizzi, []);

  return (
    <React.Fragment>
      <FullNavBar elementi={indirizzi} />{" "}
      <Link to="/Login">
        <Bottone TestoBottone="Per caricare un riassunto" />
      </Link>{" "}
      {indirizzi.map(indirizzo => {
        console.log(indirizzo);
        return <Indirizzi dati={indirizzo} />;
      })}
    </React.Fragment>
  );
}

export default Main;