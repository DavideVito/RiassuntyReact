import React, { useState } from "react";
import "./stileSearchBar.css";

function SearchBar(props) {
  let [riassunti, cambiaRiassunti] = useState([]);

  const expand = e => {
    e.target.classList.toggle("close");
    document.getElementById("search-input").classList.toggle("square");
    document.getElementById("search-input").focus();
  };

  const cercaSulDB = async e => {
    console.log(e.key);
    let testoAccettato = /^[0-9a-zA-Z]+$/;
    if (e.target.value.match(testoAccettato) || e.key === "Backspace") {
      let rispostaDB = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/anteprima.php?nome=" +
          e.target.value
      );

      rispostaDB = await rispostaDB.json();
      cambiaRiassunti(rispostaDB);
    } else {
      return;
    }
  };

  return (
    <div>
      <div id="content">
        <input
          type="text"
          name="input"
          className="input"
          id="search-input"
          onKeyUp={cercaSulDB}
        />{" "}
        <button
          type="reset"
          className="search"
          id="search-btn"
          onClick={expand}
        ></button>{" "}
      </div>
      {riassunti.map(riassunto => {
        return (
          <React.Fragment>
            <p>{riassunto.Titolo}</p>
            <img
              src={
                "https://vps.lellovitiello.tk/Riassunty/" +
                riassunto.URLImmagine
              }
              width="50"
              height="50"
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default SearchBar;
