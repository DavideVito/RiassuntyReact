import React, {
  useEffect,
  useState
} from "react";
import "../App.css";
import $ from "jquery";
import Brand from "../NavBar/Foto/Brand";
import MenuIcon from "../NavBar/Elementi/MenuIcon";
import Footer from "../Util/Footer";
import NavBarItem from "../NavBar/Elementi/NavBarItem";
import Indirizzi from "./Indirizzi";
import CaricaAndCerca from "./CaricaAndCerca";


function MostraMaterie(props) {
  const [anni, cambiaAnni] = useState([]);

  $(window).on("popstate", () => {
    $("#loadingImage").fadeIn(500);
  });


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
            //`http://localhost/~davidevitiello/Riassunty/API/anteprima.php?idMateria=${idMateria}&anno=${anno}`
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
      $("#loadingImage").fadeOut(500);
      cambiaAnni(ann);
    }
    $("#loadingImage").fadeIn(0);

    prendiAnni();
  };

  useEffect(fetchAnni, [props.location.pathname]);

  let [linkFoto, cambiaLink] = useState("");

  $(window, document).on("scroll", () => {
    try {
      let elemento = document.getElementsByClassName("navShadow");
      if (elemento.length === 0) {
        cambiaLink("https://riassunty.altervista.org/FrecciaNera.png");
      } else {
        cambiaLink("https://riassunty.altervista.org/FrecciaBianca.png");
      }
    } catch (e) {
      cambiaLink("https://riassunty.altervista.org/FrecciaNera.png");
      console.log(e);
    }
  });

  return ( <
    div >
    <
    header >
    <
    nav >
    <
    Brand link = {
      linkFoto
    }
    />{" "} <
    div id = "menu" >
    <
    div id = "menu-toggle"
    onClick = {
      () => {
        $("#menu-toggle").toggleClass("closeMenu");
        $("ul").toggleClass("showMenu");

        if ($("#menu-toggle").hasClass("closeMenu")) {
          $("#main").animate({
              left: "85%",
              opacity: "0.7"
            },
            300
          );
        } else {
          $("#main").animate({
              left: "0px",
              opacity: "1"
            },
            300
          );
        }
        $("li").on("click", () => {
          $("ul").removeClass("showMenu");
          $("#menu-toggle").removeClass("closeMenu");
        });
      }
    } >
    <
    MenuIcon / >
    <
    /div>{" "} <
    ul > {
      " "
    } {
      anni.map((anno, indice) => {
        return ( <
          NavBarItem key = {
            indice
          }
          nome = {
            anno.nome
          }
          indice = {
            indice + 1
          }
          />
        );
      })
    } {
      " "
    } <
    /ul>{" "} < /
    div > {
      " "
    } <
    /nav>{" "} <
    div id = "hero-section" >
    <
    CaricaAndCerca / >
    <
    /div>{" "} < /
    header > {
      " "
    } <
    main id = "main" > {
      " "
    } {
      anni.map(anno => {
        return <Indirizzi dati = {
          anno
        }
        link = {
          "/mostraRiassunto/:id"
        }
        />;
      })
    } {
      " "
    } <
    /main>{" "} <
    Footer / >
    <
    /div>
  );
}

export default MostraMaterie;