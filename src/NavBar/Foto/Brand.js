import React from "react";
import Foto from "./Foto";
import "../../App.css";

function Brand(props) {
  return (
    <div id="brand">
      <div id="logo">
        <Foto link={props.link} />{" "}
      </div>{" "}
    </div>
  );
}

export default Brand;
