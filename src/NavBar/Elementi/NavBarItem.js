import React from "react";
import "../../App.css";
import $ from "jquery";
import animateScrollTo, { EasingFunction } from "animated-scroll-to";

function NavBarItem(props) {
  const quandoClicca = () => {
    let offeset = $(`#section${props.indice}`).offset().top - 100;
    let a = document.getElementById(`section${props.indice}`);
    //debugger;
    animateScrollTo(a, {
      speed: 1000,
      cancelOnUserAction: false,
      easing: (t) => {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      },
    }).then(() => {
      console.log("finito");
    });
  };

  return (
    <li className="menu-item" onClick={quandoClicca}>
      <p> {props.nome} </p>{" "}
    </li>
  );
}

export default NavBarItem;
