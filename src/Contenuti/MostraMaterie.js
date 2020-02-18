import React, { useEffect, useState } from "react";
import "../App.css";
import history from "../Util/history";
import { Link } from "react-router-dom";
import FullNavBar from "../NavBar/FullNavBar";
import Indirizzi from "./Indirizzi";
import Bottone from "../Util/Bottone";

function MostraMaterie(props) {
  const [anni, cambiaAnni] = useState([]);

  const fetchAnni = () => {
    async function prendiAnni() {
      let anniJson = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/ottieniAnni.php"
      );
      let idMateria = props.match.params.id;
      let ann = [];
      anniJson = await anniJson.json();

      for (let anno of anniJson) {
        async function prendiAnteprime() {
          let anteprimeFetch = await fetch(
            `https://vps.lellovitiello.tk/Riassunty/API/anteprima.php?idMateria=${idMateria}&anno=${anno}`
          );

          anteprimeFetch = await anteprimeFetch.json();
          for (let anteprima of anteprimeFetch) {
            Object.defineProperty(
              anteprima,
              "nome",
              Object.getOwnPropertyDescriptor(anteprima, "Titolo")
            );

            Object.defineProperty(
              anteprima,
              "id",
              Object.getOwnPropertyDescriptor(anteprima, "ID")
            );
            delete anteprima["Titolo"];
            delete anteprima["ID"];
          }

          let annoOggetto = {
            nome: anno + "",
            anteprime: anteprimeFetch
          };
          ann.push(annoOggetto);
        }

        await prendiAnteprime();
      }
      debugger;
      cambiaAnni(ann);
    }
    console.log("Vengo eseguito");
    prendiAnni();
  };

  useEffect(fetchAnni, [history.location]);
  console.log(history.location);

  return (
    <React.Fragment>
      <FullNavBar indirizzi={anni} />{" "}
      <Link to="/Login">
        <Bottone TestoBottone="Per caricare un riassunto" />
      </Link>{" "}
      <h1> CIao CIAO CIAO CIAOC </h1>{" "}
      {/*anni.map(anno => {
              console.log("Ciao");
              return <Indirizzi dati={anno} />;
            })*/}{" "}
    </React.Fragment>
  );
}

export default MostraMaterie;
