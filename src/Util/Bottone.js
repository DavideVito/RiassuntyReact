import React from "react";
import animateScrollTo from "animated-scroll-to";
import { Link } from "react-router-dom";
import "../App.css";

function Bottone(props) {
  const mostraMateria = async event => {
    if (
      event.currentTarget.parentNode.innerText.toLowerCase() ===
      props.TestoBottone.toLowerCase()
    ) {
      animateScrollTo(0);
    }
    return;
  };
  return (
    <Link to={`/mostraMateria/${props.idMateria}`}>
      <div class="row justify-content-center" onClick={mostraMateria}>
        <div class="button bottonaccio" id="button-3">
          <div id="circle"> </div> <a> {props.TestoBottone} </a>{" "}
        </div>{" "}
      </div>
    </Link>
  );
}

export default Bottone;
