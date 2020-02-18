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
      <div className="row justify-content-center">
        <div className="button bottonaccio" id="button-3">
          <div id="circle"> </div> <div> {props.TestoBottone} </div>{" "}
          <div> </div>{" "}
        </div>{" "}
      </div>{" "}
    </Link>
  );
}

export default Bottone;
