import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import "../../App.css";
import animateScrollTo from "animated-scroll-to";

function Foto(props) {
  const style = {
    height: "100%",
    width: "100%",
    borderRadius: "45%",
  };

  let link = "/logoBIANCO.jpg";
  return (
    <React.Fragment>
      <Link
        onClick={(e) => {
          animateScrollTo(0);

          $("#loadingImage").fadeIn(0);
        }}
        to="/"
      >
        <img src={link} alt="Logo ITIS" style={style} />{" "}
      </Link>{" "}
    </React.Fragment>
  );
}

export default withRouter(Foto);
