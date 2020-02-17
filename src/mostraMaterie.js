import React from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function MostraMaterie(props) {
  let { id } = useParams();
  let stile = { color: "white" };
  return (
    <div>
      <h3 style={stile}>ID: {id}</h3>
    </div>
  );
}

export default MostraMaterie;
