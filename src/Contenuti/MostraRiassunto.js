import React, { useEffect, useState } from "react";
import "../App.css";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
function MostraRiassunto(props) {
  const [riassunto, cambiaRiassunto] = useState([]);
  const fetchRiassunto = async () => {
    let riassuntoJSON = {};
    let idRiassunto = props.match.params.id;

    async function prendiRiassunto() {
      riassuntoJSON = await fetch(
        `https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=${idRiassunto}`
      );

      riassuntoJSON = await riassuntoJSON.json();
      riassuntoJSON = riassuntoJSON[0];
    }
    await prendiRiassunto();
    console.log(riassuntoJSON);
    cambiaRiassunto(riassuntoJSON);
  };

  useEffect(fetchRiassunto, [props.location.pathname]);
  console.log(props.location.pathname);

  return (
    <React.Fragment>
      <div>{ReactHtmlParser(riassunto.txt)}</div>
    </React.Fragment>
  );
}

export default MostraRiassunto;