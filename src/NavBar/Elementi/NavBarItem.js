import React from "react";
import "../../App.css";
import $ from "jquery";
import animateScrollTo, { EasingFunction } from "animated-scroll-to";

function NavBarItem(props) {
  const quandoClicca = () => {
    let a;
    try {
      a = document.getElementById(`section${props.indice - 1}`);
    } catch (error) {
      a = document.getElementById(`section${props.indice}`);
    }

    animateScrollTo(a, {
      speed: 1000,
      cancelOnUserAction: false,
      easing: (t) => {
        return t * (2 - t);
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
