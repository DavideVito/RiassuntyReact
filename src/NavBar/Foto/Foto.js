import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "../../App.css";
import animateScrollTo from "animated-scroll-to";

function Foto(props) {
  const style = {
    height: "100%",
    width: "100%",
    borderRadius: "45%"
  };

  let link = "https://riassunty.altervista.org/logoBIANCO.jpg";
  if (props.link) {
    link = props.link;
  }

  return (
    <React.Fragment>
      <Link
        to="/"
        onClick={e => {
          if (window.location.pathname === "/") {
            e.preventDefault();
          } else {
            $("#loadingImage").fadeIn(0);
          }
          animateScrollTo(0);
        }}
      >
        <img src={link} alt="Logo ITIS" style={style} />
      </Link>
    </React.Fragment>
  );
}

export default Foto;
