import React, { useState } from "react";
import Brand from "./Foto/Brand";
import $ from "jquery";
import NavBarItem from "./Elementi/NavBarItem";
import MenuIcon from "./Elementi/MenuIcon";
import "../App.css";

function FullNavBar(props) {
  let [linkFoto, cambiaLink] = useState("");

  $(window, document).on("scroll", () => {
    try {
      let elemento = document.getElementsByClassName("navShadow");
      if (elemento.length === 0) {
        cambiaLink("https://riassunty.altervista.org/logoBIANCO.jpg");
      } else {
        cambiaLink("https://riassunty.altervista.org/logoNERO.jpg");
      }
    } catch (e) {
      cambiaLink("https://riassunty.altervista.org/logoBIANCO.jpg");
      console.log(e);
    }
  });

  return (
    <header>
      <nav>
        <Brand link={linkFoto} />
        <div id="menu">
          <div id="menu-toggle">
            <MenuIcon />
          </div>{" "}
          <ul>
            {" "}
            {props.elementi.map((indirizzo, indice) => {
              return (
                <NavBarItem
                  key={indice}
                  nome={indirizzo.nome}
                  indice={indice}
                />
              );
            })}{" "}
          </ul>{" "}
        </div>{" "}
      </nav>{" "}
    </header>
  );
}

export default FullNavBar;
