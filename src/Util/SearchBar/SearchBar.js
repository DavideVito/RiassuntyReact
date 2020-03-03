import React, { useState } from "react";
import "./stileSearchBar.css";
import Bottone from "../Bottone";
import $ from "jquery";

function SearchBar() {
  let [riassunti, cambiaRiassunti] = useState([]);
  let [stile, cambiaStile] = useState({});

  const expand = e => {
    let s = "";
    e.target.classList.toggle("close");
    document.getElementById("search-input").classList.toggle("square");

    if (!$("#search-input").hasClass("square")) {
      $("#search-input").blur();
      s = { marginTop: "0" };
      cambiaStile(s);
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
      let s = { marginTop: "-40%" };
      cambiaStile(s);
      cambiaRiassunti(rispostaDB);
    } else {
      return;
    }
  };

  return (
    <div>
      <div onKeyUp={cercaSulDB}>
        <div id="content">
          <input type="text" name="input" className="input" id="search-input" />{" "}
          <button
            type="reset"
            className="search"
            id="search-btn"
            onClick={expand}
          ></button>{" "}
        </div>{" "}
      </div>
      <div style={stile}>
        {riassunti.map(riassunto => {
          return (
            <React.Fragment>
              <div className="row justify-content-center">
                <Bottone
                  TestoBottone={riassunto.Titolo}
                  link={`/mostraRiassunto/${riassunto.ID}`}
                />
              </div>
              <div style={{ height: "20px" }}></div>
            </React.Fragment>
          );
        })}{" "}
      </div>
    </div>
  );
}

export default SearchBar;
