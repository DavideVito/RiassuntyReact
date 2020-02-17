import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sezione from "./Sezione";
import Bottoni from "./Bottoni";
import "../App.css";

function Indirizzo(props) {
  return (
    <section id={`section${props.id}`} class={`sezione${props.id}`}>
      <Sezione indirizzo={props.Titolo} />{" "}
    </section>
  );
}

export default Indirizzo;
