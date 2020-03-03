import React from "react";
import "../../App.css";
import $ from "jquery";
import animateScrollTo from "animated-scroll-to";

function NavBarItem(props) {
  const quandoClicca = () => {
    let offeset = $(`#section${props.indice}`).offset().top - 100;
    animateScrollTo(offeset, {
      cancelOnUserAction: false
    });
  };

  return ( <
    li className = "menu-item"
    onClick = {
      quandoClicca
    } >
    <
    p > {
      props.nome
    } < /p>{" "} <
    /li>
  );
}

export default NavBarItem;