import React from "react";
import Brand from "./Foto/Brand";
import NavBarItem from "./Elementi/NavBarItem";
import MenuIcon from "./Elementi/MenuIcon";
import "../App.css";

function FullNavBar(props) {
  //console.log(props.indirizzi);
  console.log(props);
  return (
    <header>
      <nav>
        <Brand />
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
