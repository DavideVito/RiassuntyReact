import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Indirizzo from "./Indirizzo";

import "../App.css";

function Indirizzi(props) {
  return props.data.map((indirizzo, indice) => {
    return (
      <div>
        <Indirizzo
          key={indirizzo.Indirizzo}
          Titolo={indirizzo.Indirizzo}
          id={indice}
        />
      </div>
    );
  });
}

export default Indirizzi;
