import React, { useEffect, useState } from "react";
import "../App.css";
import history from "../Util/history";
import Brand from "../NavBar/Foto/Brand";
import MenuIcon from "../NavBar/Elementi/MenuIcon";
import { Link } from "react-router-dom";
import NavBarItem from "../NavBar/Elementi/NavBarItem";
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
            dati: anteprimeFetch,
            id: anno
          };
          ann.push(annoOggetto);
        }

        await prendiAnteprime();
      }
      cambiaAnni(ann);
    }
    console.log("Vengo eseguito");
    prendiAnni();
  };

  useEffect(fetchAnni, [props.location.pathname]);
  console.log(props.location.pathname);

  return (
    <div>
      <header>
        <nav>
          <Brand />
          <div id="menu">
            <div id="menu-toggle">
              <MenuIcon />
            </div>{" "}
            <ul>
              {anni.map((anno, indice) => {
                return (
                  <NavBarItem
                    key={indice}
                    nome={anno.nome}
                    indice={indice + 1}
                  />
                );
              })}
            </ul>{" "}
          </div>{" "}
        </nav>{" "}
      </header>
      <Link to="/Login">
        <Bottone TestoBottone="Per caricare un riassunto" />
      </Link>{" "}
      {anni.map(anno => {
        console.log("anno", anno);
        return <Indirizzi dati={anno} link={"/mostraRiassunto/:id"} />;
      })}{" "}
    </div>
  );
}

export default MostraMaterie;
