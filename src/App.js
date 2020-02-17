import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Indirizzi from "./Contenuti/Indirizzi";
import Bottone from "./Util/Bottone";
import MostraMaterie from "./mostraMaterie";
import "./App.css";
import FullNavBar from "./NavBar/FullNavBar";

function App() {
  const [indirzzi, cambiaIndirizzi] = useState([]);

  const fetchIndirizzi = async () => {
    let indirizzi = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php"
    );
    indirizzi = await indirizzi.json();

    global.indirizzi = indirizzi;

    cambiaIndirizzi(indirizzi);
    console.log(indirizzi);
  };
  useEffect(fetchIndirizzi, []);
  return (
    <Router>
      <Switch>
        <Route path="/mostraMateria/:id">
          <MostraMaterie />
        </Route>
        <Route path="/">
          <header>
            <FullNavBar indirizzi={indirzzi} />{" "}
          </header>{" "}
          <Link to="/Login">
            <Bottone TestoBottone="Per caricare un riassunto" />
          </Link>{" "}
          <Indirizzi key="Indirizzi" data={indirzzi} />{" "}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
