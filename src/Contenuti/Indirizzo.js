import React from "react";
import Sezione from "./Sezione";

import "../App.css";

function Indirizzo(props) {
  return ( <
    section id = {
      `section${props.id}`
    }
    className = {
      `sezione${props.id}`
    } >
    <
    Sezione dati = {
      props.dati
    }
    link = {
      props.link
    }
    />{" "} <
    /section>
  );
}

export default Indirizzo;