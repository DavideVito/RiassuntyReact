import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MostraMaterie from "./Contenuti/MostraMaterie";
import "./App.css";

import Main from "./Contenuti/Main";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/mostraMateria/:id" component={MostraMaterie} />{" "}
        <Route exact path="/" component={Main} />{" "}
      </Switch>{" "}
    </Router>
  );
}

export default App;
