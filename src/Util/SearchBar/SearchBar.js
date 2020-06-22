import React, { useState, useEffect } from "react";
import Bottone from "../Bottone";
import $ from "jquery";
import debounce from "debounce";
import { cercaRiassunto } from "../../FirebaseStuff/db";
import "./stileSearchBar.css";

function SearchBar() {
  let [riassunti, cambiaRiassunti] = useState([]);

  const cercaSulDB = async (e) => {
    let testoAccettato = /^[0-9a-zA-Z]+$/;

    if (e.target.value.match(testoAccettato) || e.key === "Backspace") {
      if (e.key === "Backspace" && e.target.value.length === 0) {
        cambiaRiassunti([]);

        return;
      }

      let a = await cercaRiassunto(e.target.value);

      cambiaRiassunti(a);
    } else {
    }
  };

  useEffect(() => {
    document.getElementById("searchBox").onkeypress = debounce((e) => {
      cercaSulDB(e);
    }, 200);
  }, []);

  return (
    <div>
      {" "}
      <div class="search">
        <input type="search" id="searchBox" class="search-box" />{" "}
        <span
          class="search-button"
          onClick={(e) => {
            $(e.currentTarget).parent().toggleClass("open");
          }}
        >
          <span class="search-icon"> </span>{" "}
        </span>{" "}
      </div>{" "}
      <div id="rispostaRiassunti">
        {" "}
        {riassunti.map((riassunto) => {
          return (
            <React.Fragment>
              <div classNameName="row justify-content-center">
                <Bottone
                  TestoBottone={riassunto.nome}
                  link={`/mostraRiassunto/${riassunto.nome}`}
                />{" "}
              </div>{" "}
              <div
                style={{
                  height: "20px",
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
