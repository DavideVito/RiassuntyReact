import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import $ from "jquery";
import ReactHtmlParser from "react-html-parser";

function MostraRiassunto(props) {
  const [riassunto, cambiaRiassunto] = useState([]);
  const fetchRiassunto = () => {
    let riassuntoJSON = {};
    let idRiassunto = props.match.params.id;

    async function prendiRiassunto() {
      riassuntoJSON = await fetch(
        `https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=${idRiassunto}`
      );

      riassuntoJSON = await riassuntoJSON.json();
      riassuntoJSON = riassuntoJSON[0];
      cambiaRiassunto(riassuntoJSON);
      $("#loadingImage").fadeOut(500);
    }
    $("#loadingImage").fadeIn(500);
    prendiRiassunto();
  };

  useEffect(fetchRiassunto, [props.location.pathname]);

  if (typeof riassunto === "undefined") {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <div> {ReactHtmlParser(riassunto.txt)} </div>{" "}
    </React.Fragment>
  );
}

export default MostraRiassunto;
