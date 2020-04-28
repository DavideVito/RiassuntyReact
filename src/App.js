import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MostraMaterie from "./Contenuti/MostraMaterie";
import "./App.css";
import RiassuntiDaApprovare from "./Dashboard/RiassuntiDaApprovare";
import Main from "./Contenuti/Main";
import MostraRiassunto from "./Contenuti/MostraRiassunto";
import Login from "./Dashboard/Login";
import CaricaRiassunto from "./Dashboard/CaricaRiassunto";
import ApiReference from "./Util/ApiReference/ApiReference";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/API" exact component={ApiReference} />{" "}
        <Route path="/Login" exact component={Login} />{" "}
        <Route
          path="/Login/ApprovaRiassunto"
          exact
          component={RiassuntiDaApprovare}
        />{" "}
        <Route
          path="/Login/CaricaRiassunto"
          exact
          component={CaricaRiassunto}
        />{" "}
        <Route path="/mostraRiassunto/:id" component={MostraRiassunto} />{" "}
        <Route path="/mostraMateria/:id" component={MostraMaterie} />{" "}
        <Route exact path="/" component={Main} />{" "}
      </Switch>{" "}
    </Router>
  );
}

export default App;

/* */
