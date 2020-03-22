import React, { useEffect, useState } from "react";
import $ from "jquery";
import Indirizzi from "./Indirizzi";
import Bottone from "../Util/Bottone";
import Footer from "../Util/Footer";
import SearchBar from "../Util/SearchBar/SearchBar";
import "../App.css";
import FullNavBar from "../NavBar/FullNavBar";

function Main(props) {
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
          Object.assign(ind[i], {
            dati: materie
          });
          Object.assign(ind[i], {
            id: i
          });
        }

        await prendiMaterie();
      }
      $("#loadingImage").fadeOut(500, "swing");
      cambiaIndirizzi(ind);
    }
    prendiIndirizzi();
  };
  useEffect(fetchIndirizzi, [props.location.pathname]);

  return (
    <React.Fragment>
      <FullNavBar elementi={indirizzi} noBar={false} />{" "}
      <main id="main">
        <div id="elementiPrincipali"></div>{" "}
        {indirizzi.map((indirizzo, indice) => {
          return (
            <React.Fragment>
              <Indirizzi dati={indirizzo} link={"/mostraMateria/:id"} />{" "}
              <div className={"separator" + indice}> </div>{" "}
            </React.Fragment>
          );
        })}{" "}
      </main>{" "}
      <Footer />
    </React.Fragment>
  );
}

export default Main;
