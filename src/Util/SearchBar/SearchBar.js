import React, { useState } from "react";
import Bottone from "../Bottone";
import $ from "jquery";

function SearchBar() {
  let [riassunti, cambiaRiassunti] = useState([]);

  const expand = e => {
    e.target.classNameList.toggle("close");
    document.getElementById("search-input").classNameList.toggle("square");

    if (!$("#search-input").hasclassName("square")) {
      $("#search-input").blur();

      document.getElementById("search-input").value = "";
      return;
    }

    document.getElementById("search-input").focus();
  };

  const cercaSulDB = async e => {
    let testoAccettato = /^[0-9a-zA-Z]+$/;

    if (e.target.value.match(testoAccettato) || e.key === "Backspace") {
      if (e.key === "Backspace" && e.target.value.length === 0) {
        cambiaRiassunti([]);

        return;
      }
      let rispostaDB = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/anteprima.php?nome=" +
          e.target.value
      );

      rispostaDB = await rispostaDB.json();

      cambiaRiassunti(rispostaDB);
    } else {
    }
  };

  return (
    <div>
      {" "}
      <link rel="stylesheet" href="/stileSearchBar.css" />
      <div class="search">
        <input
          type="search"
          id="searchBox"
          class="search-box"
          onKeyPress={cercaSulDB}
        />{" "}
        <span
          class="search-button"
          onClick={e => {
            $(e.currentTarget)
              .parent()
              .toggleClass("open");
          }}
        >
          <span class="search-icon"> </span>{" "}
        </span>{" "}
      </div>{" "}
      <div id="rispostaRiassunti">
        {" "}
        {riassunti.map(riassunto => {
          return (
            <React.Fragment>
              <div classNameName="row justify-content-center">
                <Bottone
                  TestoBottone={riassunto.Titolo}
                  link={`/mostraRiassunto/${riassunto.ID}`}
                />{" "}
              </div>{" "}
              <div
                style={{
                  height: "20px"
                }}
              >
                {" "}
              </div>{" "}
            </React.Fragment>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
}

export default SearchBar;
