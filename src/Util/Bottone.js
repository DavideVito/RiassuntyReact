import React from "react";
import animateScrollTo from "animated-scroll-to";
import { Link } from "react-router-dom";
import "../App.css";

function Bottone(props) {
  let link =
    typeof props.link === "string" ? props.link.replace(":id", props.id) : "/";
  //props.link = props.link.replace(/(\d)/gm, props.idMateria);
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
    <Link to={link}>
      <div className="row justify-content-center" onClick={mostraMateria}>
        <div className="nostroButton bottonaccio" id="button-3">
          <div id="circle"> </div> <a> {props.TestoBottone} </a> <div> </div>{" "}
        </div>{" "}
      </div>{" "}
    </Link>
  );
}

export default Bottone;
