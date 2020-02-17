import React from "react";
import Brand from "./Foto/Brand";
import NavBarItem from "./Elementi/NavBarItem";
import MenuIcon from "./Elementi/MenuIcon";
import "../App.css";

function FullNavBar(props) {
  return (
    <nav>
      <Brand />
      <div id="menu">
        <div id="menu-toggle">
          <MenuIcon />
        </div>{" "}
        <ul>
          {" "}
          {props.indirizzi.map((indirizzo, indice) => {
            return (
              <NavBarItem
                key={indice}
                indirizzo={indirizzo.Indirizzo}
                indice={indice}
              />
            );
          })}{" "}
        </ul>{" "}
      </div>{" "}
    </nav>
  );
}

export default FullNavBar;
